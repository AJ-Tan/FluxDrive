import express from "express";
import folderBaseMiddleware from "./folder.middleware.js";
import passportAuth from "../../config/passport/passport.auth.js";
import {
  createFolderController,
  deleteFolderController,
  updateFolderController,
} from "./folder.controller.js";

const router = express.Router();

// User Auth Middleware
router.use(passportAuth);

router.put("/update/:folderId", updateFolderController);
router.delete("/delete/:folderId", deleteFolderController);

// Base Folder Middleware
router.use(folderBaseMiddleware);

router.post("/create", createFolderController);

export const folderRoutes = router;
