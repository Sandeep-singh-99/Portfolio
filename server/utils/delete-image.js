import cloudinary from "./cloudinary.js";

export const DeleteImage = async (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(error.message);
        }
        return resolve(result);
      });
    });
  };