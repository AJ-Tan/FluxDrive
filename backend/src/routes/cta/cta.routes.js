import express from "express";
import expressValidator from "../../utils/validator.js";
import { ctaLandingSchema } from "./cta.validation.js";

const router = express.Router();

router.post("/landingpage", expressValidator(ctaLandingSchema), (req, res) => {
  res.status(200).json({ ok: true, message: "All inputs are valid." });
});

export const ctaRoutes = router;
