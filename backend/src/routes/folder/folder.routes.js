import express from "express";
import folderBaseMiddleware from "./folder.middleware.js";
import passportAuth from "../../config/passport/passport.auth.js";
import {
  createFolderController,
  deleteFolderController,
  folderAllDataController,
  folderStructureController,
  openFolderController,
  updateFolderController,
  uploadFolderController,
} from "./folder.controller.js";
import multer from "multer";

const router = express.Router();

// Multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10485750 }, //10 MB
});

// User Auth Middleware
router.use(passportAuth);

router.put("/:folderId", updateFolderController);
router.delete("/:folderId", deleteFolderController);

// Base Folder Middleware
router.use(folderBaseMiddleware);

router.get("/folderStructure", folderStructureController);
router.get("/allData/:folderId", folderAllDataController);
router.get("/allData/", folderAllDataController);
router.get("/", openFolderController);
router.get("/:folderId", openFolderController);
router.post("/", createFolderController);
router.post("/upload", upload.array("files"), uploadFolderController);

// File validations
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return next({
        status: 400,
        name: "ValidationError",
        message: "Some of the data sent are invalid.",
        errorDetails: {
          validationError: [
            { files: ["Each file must be smaller than 10MB."] },
          ],
        },
      });
    }
  } else if (err.code === "NO_FILE") {
    return next({
      status: 400,
      name: "ValidationError",
      message: "Some of the data sent are invalid.",
      errorDetails: {
        validationError: [{ files: ["There's no file to upload."] }],
      },
    });
  }
  next(err);
});

export const folderRoutes = router;
