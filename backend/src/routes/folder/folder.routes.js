import express from "express";
import folderBaseMiddleware from "./folder.middleware.js";
import passportAuth from "../../config/passport/passport.auth.js";
import {
  allDataController,
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

router.get("/", allDataController);
router.get("/:folderId", openFolderController);
router.post("/", createFolderController);

export const folderRoutes = router;
