import jwt from "jsonwebtoken";
import prisma from "../config/database/database.config.js";
import "dotenv/config";

const generateToken = (payload, tokenType = "access", expiresIn = "1h") => {
  const secret =
    tokenType === "access"
      ? process.env.SECRET_ACCESS
      : process.env.SECRET_REFRESH;
  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
};

const refreshAccess = (refreshToken) => {
  let token = null;
  let error = null;
  console.log(refreshToken);
  try {
    const payload = jwt.verify(refreshToken, process.env.SECRET_REFRESH);
    token = generateToken({ id: payload.id });
  } catch (err) {
    error = {
      status: 401,
      name: err.name || "UncaughtTokenError",
      message: err.message || "There's an uncaught error with the token.",
      errorDetails: {
        refreshToken,
      },
    };
  }

  return { token, error };
};

export { generateToken, refreshAccess };
