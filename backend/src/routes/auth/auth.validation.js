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
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),
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
