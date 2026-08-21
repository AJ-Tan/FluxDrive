import prisma from "../../config/database/database.config.js";
import checkFolderAccessAuthorized from "../folder/folder.utils.js";

const generateFolderShareController = async (req, res, next) => {
  try {
    const user = req.user;
    const folderId = req.params.folderId;

    const dateNow = new Date();
    const daysToExpire = Number(req.query.expire) || 1 * 24 * 60 * 60 * 1000; // 1 day expiration (default)
    const expiresAt = new Date(dateNow.getTime() + daysToExpire);

    const checkFolderId = await checkFolderAccessAuthorized(user.id, folderId);
    if (!checkFolderId.ok) return next(checkFolderId.err);

    await prisma.folderShare.deleteMany({ where: { folderId: folderId } });
    const folderShare = await prisma.folderShare.create({
      data: { folderId, expiresAt, ownerId: user.id },
    });

    const allFolders = await prisma.folder.findMany({
      where: { ownerId: user.id },
      include: { children: true, files: true, folderShare: true },
    });

    const allFiles = await prisma.file.findMany({
      where: { ownerId: user.id },
    });

    res.status(200).json({
      ok: true,
      name: "FolderShared",
      message: "User has succesfully shared a folder.",
      data: { folderShare, allFolders, allFiles },
    });
  } catch (err) {
    next(err);
  }
};

const openFolderShareController = async (req, res, next) => {
  try {
    const shareId = req.params?.folderShareId;

    const folderShare = await prisma.folderShare.findUnique({
      where: { id: shareId || "", expiresAt: { gt: new Date() } },
      include: {
        folder: {
          include: {
            children: true,
            files: true,
          },
        },
      },
    });

    if (!folderShare)
      return next({
        status: 404,
        name: "InvalidShareLink",
        message:
          "The shared id you have provided is either invalid, or expired.",
        data: {
          invalidShareId: shareId,
        },
      });

    const folders = await prisma.folder.findMany({
      where: { ownerId: folderShare.ownerId },
      include: { children: true, files: true },
    });

    const fetchFolderData = async (folderId) => {
      const folder = folders.find((f) => f.id === folderId);
      if (!folder) return null;

      const children = folder.children;
      const allFolders = [folder];
      const allFiles = folder.files;

      for (const child of children) {
        const childData = await fetchFolderData(child.id);
        if (!childData) continue;

        allFolders.push(...childData.allFolders);
        allFiles.push(...childData.allFiles);
      }

      return { folderShare, allFolders, allFiles };
    };

    const folderData = await fetchFolderData(folderShare.folderId);

    res.status(200).json({
      ok: true,
      name: "FetchedSharedFolder",
      message: "Successfully fetched the shared folder",
      data: { ...folderData },
    });
  } catch (err) {
    next(err);
  }
};

export { generateFolderShareController, openFolderShareController };
