import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { protectedRoutes } from "./routes/protected/protected.routes.js";
import { authRoutes } from "./routes/auth/auth.routes.js";
import { folderRoutes } from "./routes/folder/folder.routes.js";
import { fileRoutes } from "./routes/file/file.routes.js";
import { folderShareRoutes } from "./routes/folder-share/folderShare.routes.js";
import { ctaRoutes } from "./routes/cta/cta.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }),
);

// Routes
app.use("/protected", protectedRoutes);
app.use("/auth", authRoutes);
app.use("/folder", folderRoutes);
app.use("/file", fileRoutes);
app.use("/folderShare", folderShareRoutes);
app.use("/cta", ctaRoutes);

// Error Handling
app.use((req, res, next) => {
  next({
    status: 404,
    name: "InvalidRoute",
    message: "The route you are trying to access in the server does not exists",
    errorDetails: {
      method: req.method,
      url: `${req.protocol}://${req.host}${req.path}`,
    },
  });
});

app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const name = err.name || "UncaughtError";
  const message = err.message || "Internal server error.";
  const errorDetails = err.errorDetails || null;

  res
    .status(status)
    .json(
      errorDetails
        ? { ok: false, name, message, errorDetails }
        : { ok: false, name, message },
    );
});

// Config
const port = process.env.PORT || 1235;

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`App is currently listening on http://localhost:${port}`);
});
