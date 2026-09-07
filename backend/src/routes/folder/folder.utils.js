import cloudinary from "../../config/cloudinary/cloudinary.config.js";
import prisma from "../../config/database/database.config.js";

export const checkFolderAccessAuthorized = async (userId, folderID) => {
  try {
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

export const deleteCloudinaryFolderFiles = async (currentFolderId) => {
  const currFolder = await prisma.folder.findUnique({
    where: { id: currentFolderId },
    include: {
      files: true,
      children: true,
    },
  });
  if (!currFolder) return;

  for (const file of currFolder.files) {
    await cloudinary.uploader.destroy(file.publicId);
  }

  for (const child of currFolder.children) {
    await deleteCloudinaryFolderFiles(child.id);
  }
};
