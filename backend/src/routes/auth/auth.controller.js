import bcrypt from "bcrypt";
import prisma from "../../config/database/database.config.js";
import { generateToken } from "../../utils/jwt.js";
import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";

const signupController = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      ok: true,
      name: "UserCreated",
      message: "User has been successfully created.",
      data: {
        createdUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email || "" },
    });
    if (!user)
      return next({
        status: 401,
        name: "InvalidEmail",
        message: "Invalid credential.",
        errorDetails: {
          validationError: {
            email: ["The email you entered isn’t connected to an account."],
          },
        },
      });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return next({
        status: 401,
        name: "InvalidPassowrd",
        message: "Invalid credential.",
        errorDetails: {
          validationError: {
            password: ["The password you entered is incorrect."],
          },
        },
      });

    const payload = { id: user.id };
    const accessToken = generateToken(payload, "access", "1h");
    const refreshToken = generateToken(payload, "refresh", "3d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

    res.status(200).json({
      ok: true,
      name: "SignedIn",
      message: "User has successfully signed in.",
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
        },
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signoutController = (req, res) => {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    expires: new Date(0),
  });

  res.status(200).json({
    ok: true,
    name: "SignedOut",
    message: "User has sucessfully signed out.",
  });
};

export { signupController, signinController, signoutController };
