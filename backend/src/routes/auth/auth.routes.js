import express from "express";
import expressValidator from "../../utils/validator.js";
import { signupSchema } from "./auth.validation.js";
import {
  signinController,
  signinGuestController,
  signoutController,
  signupController,
} from "./auth.controller.js";
import passportAuth from "../../config/passport/passport.auth.js";

// Authentication routes.
// These endpoints handle user sessions, sign in, sign up, and sign out.
const router = express.Router();

router.post("/signin/guest", signinGuestController);
router.post("/signin", signinController);
router.post("/signup", expressValidator(signupSchema), signupController);
router.post("/signout", passportAuth, signoutController);

export const authRoutes = router;
