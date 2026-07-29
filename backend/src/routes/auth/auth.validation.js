import { body } from "express-validator";
import prisma from "../../config/database/database.config.js";

const signupSchema = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .custom(async (email) => {
      const user = await prisma.user.findUnique({
        where: { email: email || "" },
      });
      if (user) throw new Error("Email already exists.");
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be between 6 to 15 characters."),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    const { password } = req.body;
    const comparePassword = password === confirmPassword;
    if (!comparePassword) throw new Error("Password does not match.");
    return true;
  }),
  body("firstName").notEmpty().withMessage("Firstname is required."),
  body("lastName").notEmpty().withMessage("Lastname is required."),
];

export { signupSchema };
