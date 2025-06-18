import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = async (file, folder) => {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder,
    resource_type: "auto",
  });
  return result.secure_url;
};
