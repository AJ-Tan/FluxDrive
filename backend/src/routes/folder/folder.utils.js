import prisma from "../../config/database/database.config.js";

const checkFolderAccessAuthorized = async (userId, folderID) => {
  try {
    console.log(userId, folderID);
    const folder = await prisma.folder.findUnique({
      where: { id: folderID || `${userId}-1` },
    });
    if (!folder)
      return {
        ok: false,
        err: {
          status: 404,
          name: "FolderNotFound",
          message: "The folder you are trying to access does not exists.",
        },
      };
    if (folder?.ownerId !== userId)
      return {
        ok: false,
        err: {
          status: 401,
          name: "UnauthorizedFolderAccess",
          message: "User is not authorized to access the selected folder.",
        },
      };

    return { ok: true, err: null };
  } catch (err) {
    return { ok: false, err };
  }
};

export default checkFolderAccessAuthorized;
