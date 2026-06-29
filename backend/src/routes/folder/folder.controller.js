import prisma from "../../config/database/database.config.js";
import checkFolderAccessAuthorized from "./folder.utils.js";

const createFolderController = async (req, res, next) => {
  try {
    const user = req.user;
    let { name, parentId } = req.body;

    if (!parentId) parentId = `${user.id}-base`;
    await checkFolderAccessAuthorized(user.id, parentId, next);

    const createdFolder = await prisma.folder.create({
      data: { name, parentId, ownerId: user.id },
    });

    res.status(201).json({
      ok: true,
      name: "CreatedNewFolder",
      message: "User has successfully created a new folder.",
      data: {
        createdFolder,
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

    await checkFolderAccessAuthorized(user.id, folderId, next);
    if (parentId) await checkFolderAccessAuthorized(user.id, parentId, next);

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

    await checkFolderAccessAuthorized(user.id, folderId, next);

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
  createFolderController,
  updateFolderController,
  deleteFolderController,
};
