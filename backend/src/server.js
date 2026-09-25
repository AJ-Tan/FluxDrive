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
import { searchRoutes } from "./routes/search/search.routes.js";

// This file boots the API server and wires together all route modules.
// It is the central entry point for the backend application.
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.ORIGIN,
];

// Global middleware.
// express.json() lets the app parse incoming JSON request bodies.
// cookieParser reads auth cookies from browser requests.
// cors allows the frontend dev server and configured production origin to call the API securely.
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// Route groups are mounted under their resource names.
// This keeps the API organized by feature/domain and easier to maintain.
app.use("/protected", protectedRoutes);
app.use("/auth", authRoutes);
app.use("/folder", folderRoutes);
app.use("/file", fileRoutes);
app.use("/folderShare", folderShareRoutes);
app.use("/cta", ctaRoutes);
app.use("/search", searchRoutes);

// Fallback 404 handler.
// If a client hits a non-existent API endpoint, we return a consistent error payload.
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

// Central error response layer.
// This normalizes validation and runtime errors into a single JSON format for the frontend.
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || err.http_code || 500;
  const name = err.name || "UncaughtError";
  const message = err.message || "Internal server error.";
  const errorDetails = err.errorDetails || null;

  res.status(status).json({
    ok: false,
    ...(name && { name }),
    ...(message && { message }),
    ...(errorDetails && { errorDetails }),
  });
});

// Server configuration and startup.
const port = process.env.PORT || 1235;

app.listen(port, "0.0.0.0", (err) => {
  if (err) throw err;
  console.log(`App is currently listening on http://localhost:${port}`);
});
