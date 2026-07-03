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

const router = express.Router();

// Storage Config
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
  },
});
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10485750 }, //10 MB
});

// Middleware
router.use(passportAuth);

// Routes
router.post("/", upload.array("files"), uploadFileController);
router.put("/:fileId", updateFileController);
router.delete("/:fileId", deleteFileController);

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

export const fileRoutes = router;
