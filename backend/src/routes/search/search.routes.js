import express from "express";
import passportAuth from "../../config/passport/passport.auth.js";
import { searchAllController } from "./search.controller.js";
import folderBaseMiddleware from "../folder/folder.middleware.js";

const router = express.Router();

// Middleware
router.use(passportAuth);

// Base Folder Middleware
router.use(folderBaseMiddleware);

router.post("/", searchAllController);

export const searchRoutes = router;
