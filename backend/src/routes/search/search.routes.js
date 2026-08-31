import express from "express";
import passportAuth from "../../config/passport/passport.auth.js";
import { searchAllController } from "./search.controller.js";

const router = express.Router();

// Middleware
router.use(passportAuth);
router.post("/", searchAllController);

export const searchRoutes = router;
