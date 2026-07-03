import express from "express";
import folderBaseMiddleware from "./folder.middleware.js";
import passportAuth from "../../config/passport/passport.auth.js";
import {
  createFolderController,
  deleteFolderController,
  openFolderController,
  updateFolderController,
} from "./folder.controller.js";

const router = express.Router();

// User Auth Middleware
router.use(passportAuth);

router.put("/:folderId", updateFolderController);
router.delete("/:folderId", deleteFolderController);

// Base Folder Middleware
router.use(folderBaseMiddleware);

router.post("/", createFolderController);
router.get("/:folderId", openFolderController);

export const folderRoutes = router;
