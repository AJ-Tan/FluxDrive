import prisma from "../../config/database/database.config.js";
import checkFolderAccessAuthorized from "../folder/folder.utils.js";
import { uploadToCloudinary } from "./file.utils.js";
import cloudinary from "../../config/cloudinary/cloudinary.config.js";

const uploadFileController = async (req, res, next) => {
  try {
    const user = req.user;
    const folderId = req.body.folderId || `${user.id}-1`;

    // Check if folderId folder exists, and user has access to that folder.
    const checkFolderId = await checkFolderAccessAuthorized(user.id, folderId);
    if (!checkFolderId.ok) return next(checkFolderId.err);

    const files = req.files;
    if (files.length <= 0) throw { code: "NO_FILE" };

    let filesUploaded = [];
    for (let file of files) {
      const fileResult = await uploadToCloudinary(file.buffer);
      filesUploaded.push(
        await prisma.file.create({
          data: {
            name: file.originalname,
            mimeType: fileResult.resource_type,
            fileType: fileResult.format,
            size: fileResult.bytes,
            fileUrl: fileResult.secure_url,
            publicId: fileResult.public_id,
            folderId: file?.folderId ? file.folderId : folderId,
            ownerId: user.id,
          },
        }),
      );
    }

    const allFolders = await prisma.folder.findMany({
      where: { ownerId: user.id },
      include: { children: true, files: true, folderShare: true },
    });

    const allFiles = await prisma.file.findMany({
      where: { ownerId: user.id },
    });

    res.status(200).json({
      ok: true,
      name: "UploadComplete",
      message: "Files upload complete.",
      data: { files: filesUploaded, allFolders, allFiles },
    });
  } catch (err) {
    next(err);
  }
};

const updateFileController = async (req, res, next) => {
  try {
    const user = req.user;
    const fileId = req.params.fileId;
    let { name, folderId } = req.body;

    const file = await prisma.file.findUnique({ where: { id: fileId || "" } });
    if (!file)
      return next({
        status: 404,
        name: "FileNotFound",
        message: "File id provided in the parameter was not found.",
        errDetails: { fileId },
      });

    folderId = folderId || file.folderId;
    // Check if folderId folder exists, and user has access to that folder.
    const checkFolderId = await checkFolderAccessAuthorized(user.id, folderId);
    if (!checkFolderId.ok) return next(checkFolderId.err);

    const updatedFile = await prisma.file.update({
      data: { name, folderId },
      where: { id: fileId },
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
      name: "FileUpdated",
      message: "User has successfully updated the file.",
      data: {
        updatedFile,
        allFolders,
        allFiles,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteFileController = async (req, res, next) => {
  try {
    const user = req.user;
    const fileId = req.params.fileId;

    const file = await prisma.file.findUnique({ where: { id: fileId || "" } });

    if (!file)
      return next({
        status: 404,
        name: "FileNotFound",
        message: "File was not found to delete.",
        errDetails: {
          fileId,
        },
      });

    if (user.id !== file.ownerId)
      return next({
        status: 401,
        name: "UnauthorizedAccess",
        message: "User is not authorized to delete this file.",
        errDetails: {
          fileId,
        },
      });

    const deletedFile = await prisma.file.delete({ where: { id: file.id } });
    await cloudinary.uploader.destroy(deletedFile.publicId); //deleted to file in cloudinary storage.

    const allFolders = await prisma.folder.findMany({
      where: { ownerId: user.id },
      include: { children: true, files: true, folderShare: true },
    });

    const allFiles = await prisma.file.findMany({
      where: { ownerId: user.id },
    });

    res.status(200).json({
      ok: true,
      name: "FileDeleted",
      message: "User has successfully deleted the file.",
      data: { deletedFile, allFolders, allFiles },
    });
  } catch (err) {
    next(err);
  }
};

export { uploadFileController, updateFileController, deleteFileController };
