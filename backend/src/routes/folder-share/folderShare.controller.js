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

    res.status(200).json({
      ok: true,
      name: "FolderShared",
      message: "User has succesfully shared a folder.",
      data: { folderShare },
    });
  } catch (err) {
    next(err);
  }
};

const openFolderShareController = async (req, res, next) => {
  try {
    const shareId = req.params?.folderShareId;

    const folderShare = await prisma.folderShare.findUnique({
      where: { id: shareId || "" },
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
        name: "InvalidFolderShare",
        message:
          "The folder share id provided in the parameters does not exists.",
        errDetails: { invalidShareId: shareId },
      });

    if (folderShare.expiresAt) {
      if (new Date() > folderShare.expiresAt)
        return next({
          status: 401,
          name: "FolderShareExpired",
          message: "The shared folder link you provided has expired.",
          errDetails: {
            expiresAt: folderShare.expiresAt,
          },
        });
    }

    const folderId = req.params?.folderId || folderShare.folderId;
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { parent: true, children: true, files: true },
    });
    if (!folder)
      return next({
        status: 404,
        name: "FolderNotFound",
        message: "The shared folder you are trying to access does not exists.",
        errDetails: { folderId },
      });

    let iterateFolder = folder;
    let folderPath = [{ id: folder.id, name: folder.name }];
    while (iterateFolder.id !== folderShare.folderId) {
      if (!iterateFolder.parentId)
        return next({
          status: 401,
          name: "UnauthorizedAccess",
          message:
            "User is not authorized to access this folder using the shared link.",
        });

      iterateFolder = await prisma.folder.findUnique({
        where: { id: iterateFolder.parentId },
      });
      folderPath.unshift({ id: iterateFolder.id, name: iterateFolder.name });
    }

    res.status(200).json({
      ok: true,
      name: "AuthorizedAccess",
      message: "User has authorized access to this folder.",
      data: { folder, folderPath, folderShare },
    });
  } catch (err) {
    next(err);
  }
};

export { generateFolderShareController, openFolderShareController };
