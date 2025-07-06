import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const DeleteImage = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        return reject(error.message);
      }
       if (result?.result === "ok" || result?.result === "not found") {
        return resolve("ok");
      }

      console.error("Unexpected Cloudinary delete result:", result);
      return resolve(result);
    });
  });
};
