import prisma from "../../config/database/database.config.js";
import checkFolderAccessAuthorized from "./folder.utils.js";

const allDataController = async (req, res, next) => {
  const user = req.user;

  const allFolders = await prisma.folder.findMany({
    where: { ownerId: user.id },
    include: { children: true, files: true },
  });

  const allFiles = await prisma.file.findMany({
    where: { ownerId: user.id },
  });

  res.status(200).json({ ok: true, data: { allFolders, allFiles } });
};

const openFolderController = async (req, res, next) => {
  try {
    const user = req.user;
    const folderId = req.params.folderId;

    // Check if folderId folder exists, and user has access to that folder.
    const checkFolderId = await checkFolderAccessAuthorized(user.id, folderId);
    if (!checkFolderId.ok) return next(checkFolderId.err);

    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        parent: true,
        files: true,
        children: true,
      },
    });

    let iterateFolder = folder;
    const folderPath = [{ id: iterateFolder.id, name: iterateFolder.name }];
    while (iterateFolder.parentId) {
      iterateFolder = await prisma.folder.findUnique({
        where: { id: iterateFolder.parentId },
      });
      folderPath.unshift({ id: iterateFolder.id, name: iterateFolder.name });
    }

    res.status(200).json({
      ok: true,
      name: "AuthorizedAccessFolder",
      message: "User has successfully retrieve the folder.",
      data: { folder, folderPath },
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
      include: { children: true, files: true },
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

const updateFolderController = async (req, res, next) => {
  try {
    const user = req.user;
    const folderId = req.params.folderId;
    const { name, parentId } = req.body;

    // Check if folderId and parentId folders exists, and user has access to that folder.
    const checkFolderId = await checkFolderAccessAuthorized(user.id, folderId);
    if (!checkFolderId.ok) return next(checkFolderId.err);
    const checkParentId = await checkFolderAccessAuthorized(user.id, parentId);
    if (!checkParentId.ok) return next(checkParentId.err);

    const updatedFolder = await prisma.folder.update({
      data: { name, parentId },
      where: { id: folderId },
    });

    res.status(200).json({
      ok: true,
      name: "FolderUpdated",
      message: "User has successfully updated the folder.",
      data: {
        updatedFolder,
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

    const deletedFolder = await prisma.folder.delete({
      where: { id: folderId },
    });

    res.status(200).json({
      ok: true,
      name: "FolderDeleted",
      message: "User has successfully deleted the folder.",
      data: {
        deletedFolder,
      },
    });
  } catch (err) {
    next(err);
  }
};

export {
  allDataController,
  openFolderController,
  createFolderController,
  updateFolderController,
  deleteFolderController,
};
