import prisma from "../../config/database/database.config.js";

export const searchAllController = async (req, res, next) => {
  try {
    const { searchText } = req.body;
    const user = req.user;
    const searchFolder = await prisma.folder.findMany({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
        ownerId: user.id,
      },
      include: {
        folderShare: true,
      },
    });
    const searchFile = await prisma.file.findMany({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
        ownerId: user.id,
      },
    });

    const allFolders = await prisma.folder.findMany({
      where: { ownerId: user.id },
      include: { children: true, parent: true },
    });

    const folderHierarchy = (folderId) => {
      const currFolder = allFolders.find((i) => i.id === folderId);

      const children = currFolder.children.map(
        (child) => folderHierarchy(child.id) || [],
      );

      return { id: folderId, name: currFolder.name, children };
    };

    res.status(200).json({
      ok: true,
      data: {
        searchFolder,
        searchFile,
        folderStructure: folderHierarchy(`${user.id}-1`),
      },
    });
  } catch (err) {
    next(err);
  }
};
