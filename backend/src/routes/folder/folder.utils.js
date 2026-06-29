import prisma from "../../config/database/database.config.js";

const checkFolderAccessAuthorized = async (userId, folderID, next) => {
  try {
    const folder = await prisma.folder.findUnique({ where: { id: folderID } });
    if (!folder)
      return next({
        status: 404,
        name: "FolderNotFound",
        message: "The folder you are trying to access does not exists.",
      });
    if (folder?.ownerId !== userId)
      return next({
        status: 401,
        name: "UnauthorizedFolderAccess",
        message: "User is not authorized to access the selected folder.",
      });
  } catch (err) {
    next(err);
  }
};

export default checkFolderAccessAuthorized;
