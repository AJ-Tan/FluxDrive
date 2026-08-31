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

    res.status(200).json({
      ok: true,
      data: {
        searchFolder,
        searchFile,
      },
    });
  } catch (err) {
    next(err);
  }
};
