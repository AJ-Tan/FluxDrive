import { body } from "express-validator";

export const ctaLandingSchema = [
  body("firstName").notEmpty().withMessage("This is required"),
  body("lastName").notEmpty().withMessage("This is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("This is required")
    .isEmail()
    .withMessage("Invalid format"),
  body("contact").notEmpty().withMessage("This is required"),
];
