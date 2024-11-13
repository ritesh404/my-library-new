import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer().then((ab) => Buffer.from(ab));

  try {
    const response: { secure_url: string } | undefined = await new Promise(
      (resolve) => {
        cloudinary.uploader
          .upload_stream((error, uploadResult) => {
            return resolve(uploadResult);
          })
          .end(buffer);
      }
    );

    if (!response) {
      throw new Error("No response from Cloudinary");
    }
    return response.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
