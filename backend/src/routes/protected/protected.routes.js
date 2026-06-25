import express from "express";
import passportAuth from "../../config/passport/passport.auth.js";
import {
  protectedController,
  refreshController,
} from "./protected.controller.js";

const router = express.Router();

router.get("/", passportAuth, protectedController);
router.get("/refresh", refreshController);

export const protectedRoutes = router;
