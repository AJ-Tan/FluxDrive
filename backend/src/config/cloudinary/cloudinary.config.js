import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Cloudinary client setup.
// All file uploads and media operations use this shared instance, so configuration stays centralized.
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default cloudinary;
