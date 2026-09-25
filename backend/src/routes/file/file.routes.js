import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary/cloudinary.config.js";
import { uploadToCloudinary } from "./file.utils.js";
import passportAuth from "../../config/passport/passport.auth.js";
import {
  deleteFileController,
  updateFileController,
  uploadFileController,
} from "./file.controller.js";

// File routes handle uploads, metadata updates, and deletion.
// Every request here is protected by JWT auth, so only signed-in users can manage files.
const router = express.Router();

// Storage config for Cloudinary upload.
// The app accepts temporary in-memory files before sending them to Cloudinary.
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
  },
});
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10485750 }, // 10 MB per file
});

// All file endpoints require an authenticated user.
router.use(passportAuth);

// Routes:
// POST /file -> upload one or more files
// PUT /file/:fileId -> rename or update file metadata
// DELETE /file/:fileId -> remove the file record and asset
router.post("/", upload.array("files"), uploadFileController);
router.put("/:fileId", updateFileController);
router.delete("/:fileId", deleteFileController);

// This middleware transforms format-specific upload errors into API-friendly validation errors.
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

export const fileRoutes = router;
