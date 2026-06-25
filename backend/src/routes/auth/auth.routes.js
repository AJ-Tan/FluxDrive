import express from "express";
import expressValidator from "../../utils/validator.js";
import { signupSchema } from "./auth.validation.js";
import {
  signinController,
  signoutController,
  signupController,
} from "./auth.controller.js";

const router = express.Router();

router.post("/signup", expressValidator(signupSchema), signupController);
router.post("/signin", signinController);
router.post("/signout", signoutController);

export const authRoutes = router;
