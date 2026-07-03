import cloudinary from "../../config/cloudinary/cloudinary.config.js";

export const uploadToCloudinary = async (buffer, folder = "upload") => {
  return new Promise((res, rej) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (err, result) => {
        if (err) rej(err);
        res(result);
      },
    );

    stream.end(buffer);
  });
};
