import prisma from "../../config/database/database.config.js";
import checkFolderAccessAuthorized from "./folder.utils.js";
import { uploadToCloudinary } from "../file/file.utils.js";
import cloudinary from "../../config/cloudinary/cloudinary.config.js";

const folderAllDataController = async (req, res, next) => {
  try {
    const user = req.user;
    const folderid = req.params.folderId || `${req.user.id}-1`;

    const selectedFolder = await prisma.folder.findUnique({
      where: { id: folderid },
      include: {
        children: {
          include: { folderShare: true },
        },
        files: true,
        folderShare: true,
      },
    });
    const allFolders = await prisma.folder.findMany({
      where: { ownerId: user.id },
      include: { children: true, parent: true },
    });

    if (!selectedFolder)
      return next({
        status: 404,
        name: "SelectedFolderNotFound",
        errorDetails: {
          selectedid: folderid,
        },
      });

    const folderHierarchy = (folderId) => {
      const currFolder = allFolders.find((i) => i.id === folderId);

      const children = currFolder.children.map(
        (child) => folderHierarchy(child.id) || [],
      );

      return { id: folderId, name: currFolder.name, children };
    };

    const generateFolderPath = (folderId) => {
      const currFolder = allFolders.find((i) => i.id === folderId);
      if (!currFolder) return [];
      return [
        ...generateFolderPath(currFolder?.parent?.id || ""),
        { id: currFolder.id, name: currFolder.name },
      ];
    };

    res.status(200).json({
      ok: true,
      data: {
        allFolders: selectedFolder.children,
        allFiles: selectedFolder.files,
        folderStructure: folderHierarchy(`${user.id}-1`),
        folderPath: generateFolderPath(folderid),
      },
    });
  } catch (err) {
    next(err);
  }
};

const folderStructureController = async (req, res, next) => {
  try {
    const user = req.user;
    const allFolders = await prisma.folder.findMany({
      where: { ownerId: user.id },
      include: { children: true },
    });

    const folderHierarchy = (folderId) => {
      const currFolder = allFolders.find((i) => i.id === folderId);

      const children = currFolder.children.map(
        (child) => folderHierarchy(child.id) || [],
      );

      return { id: folderId, name: currFolder.name, children };
    };

    const generateFolderPath = (folderId) => {
      const currFolder = allFolders.find((i) => i.id === folderId);
      if (!currFolder) return [];
      return [
        ...generateFolderPath(currFolder?.parent?.id || ""),
        { id: currFolder.id, name: currFolder.name },
      ];
    };

    res.status(200).json({
      ok: true,
      name: "Success",
      data: {
        folderStructure: folderHierarchy(`${user.id}-1`),
      },
    });
  } catch (err) {
    next(err);
  }
};

const openFolderController = async (req, res, next) => {
  try {
    const user = req.user;
    const folderId = req.params.folderId || `${user.id}-1`;

    // Check if folderId folder exists, and user has access to that folder.
    const checkFolderId = await checkFolderAccessAuthorized(user.id, folderId);
    if (!checkFolderId.ok) return next(checkFolderId.err);

    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        parent: true,
        files: true,
        children: {
          include: {
            folderShare: true,
          },
        },
        folderShare: true,
      },
    });

    const allFolders = await prisma.folder.findMany({
      where: { ownerId: user.id },
      include: { parent: true },
    });

    const generateFolderPath = (folderId) => {
      const currFolder = allFolders.find((i) => i.id === folderId);
      if (!currFolder) return [];
      return [
        ...generateFolderPath(currFolder?.parent?.id || ""),
        { id: currFolder.id, name: currFolder.name },
      ];
    };

    const folderPath = generateFolderPath(folder.id);

    res.status(200).json({
      ok: true,
      name: "AuthorizedAccessFolder",
      message: "User has successfully retrieve the folder.",
      data: { folder: { ...folder, folderPath } },
    });
  } catch (err) {
    next(err);
  }
};

const createFolderController = async (req, res, next) => {
  try {
    const user = req.user;
    let { id, name, parentId } = req.body;

    if (!parentId) parentId = `${user.id}-1`;
    // Check if parentId folder exists, and user has access to that folder.
    const checkParentId = await checkFolderAccessAuthorized(user.id, parentId);
    if (!checkParentId.ok) return next(checkParentId.err);

    const createdFolder = await prisma.folder.create({
      data: { id, name, parentId, ownerId: user.id },
    });

    const allFolders = await prisma.folder.findMany({
      where: { ownerId: user.id },
      include: { children: true, files: true, folderShare: true },
    });

    const allFiles = await prisma.file.findMany({
      where: { ownerId: user.id },
    });

    res.status(201).json({
      ok: true,
      name: "CreatedNewFolder",
      message: "User has successfully created a new folder.",
      data: {
        folder: createdFolder,
        allFolders,
        allFiles,
      },
    });
  } catch (err) {
    next(err);
  }
};

const uploadFolderController = async (req, res, next) => {
  try {
    const user = req.user;
    const parentId = req.body.parentId || `${user.id}-1`;
    const { folderId, name } = req.body;
    const createFolder = await prisma.folder.create({
      data: {
        id: folderId,
        name,
        parentId,
        ownerId: user.id,
      },
    });

    const files = req.files;

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
            folderId: folderId,
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
      message: "Folder upload complete.",
      data: { allFolders, allFiles },
    });
  } catch (err) {
    next(err);
  }
};

const updateFolderController = async (req, res, next) => {
  try {
    const user = req.user;
    const folderId = req.params.folderId;
    const { name, parentId } = req.body;

    // Check if folderId and parentId folders exists, and user has access to that folder.
    const checkFolderId = await checkFolderAccessAuthorized(user.id, folderId);
    if (!checkFolderId.ok) return next(checkFolderId.err);
    console.log("name: ", name);
    const updatedFolder = await prisma.folder.update({
      data: { name: name, parentId },
      where: { id: folderId },
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
      name: "FolderUpdated",
      message: "User has successfully updated the folder.",
      data: {
        updatedFolder,
        allFolders,
        allFiles,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteFolderController = async (req, res, next) => {
  try {
    const user = req.user;
    const folderId = req.params.folderId;

    // Check if parentId folder exists, and user has access to that folder.
    const checkFolderId = await checkFolderAccessAuthorized(user.id, folderId);
    if (!checkFolderId.ok) return next(checkFolderId.err);

    const deleteCloudinaryFiles = async (currentFolderId) => {
      const files = await prisma.file.findMany({
        where: { folderId: currentFolderId },
      });

      for (const file of files) {
        await cloudinary.uploader.destroy(file.publicId);
      }

      const childrenFolder = await prisma.folder.findMany({
        where: { parentId: currentFolderId },
      });
      for (const folder of childrenFolder) {
        deleteCloudinaryFiles(folder.id);
      }
    };

    await deleteCloudinaryFiles(folderId);
    const deletedFolder = await prisma.folder.delete({
      where: { id: folderId },
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
      name: "FolderDeleted",
      message: "User has successfully deleted the folder.",
      data: {
        deletedFolder,
        allFolders,
        allFiles,
      },
    });
  } catch (err) {
    next(err);
  }
};

export {
  folderAllDataController,
  openFolderController,
  folderStructureController,
  createFolderController,
  uploadFolderController,
  updateFolderController,
  deleteFolderController,
};
