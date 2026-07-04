import express from "express";
import passportAuth from "../../config/passport/passport.auth.js";
import {
  generateFolderShareController,
  openFolderShareController,
} from "./folderShare.controller.js";

const router = express.Router();

router.get("/:folderShareId/:folderId", openFolderShareController);
router.get("/:folderShareId", openFolderShareController);

router.use(passportAuth);
router.post("/:folderId", generateFolderShareController);

export const folderShareRoutes = router;
