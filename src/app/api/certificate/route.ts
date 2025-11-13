import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import Certificate from "../../../../models/certificate.model";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function uploadToCloudinary(file: File, type: "image" | "auto"): Promise<[string, string]> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: type, folder: "portfolio/intro" },
      (err, result) => {
        if (err || !result?.secure_url) return reject("Cloudinary upload failed");
        resolve([result.secure_url, result.public_id]);
      }
    ).end(buffer);
  });
}

export async function POST(req: NextRequest) {
    try {
        await ConnectDB();

        const formData = await req.formData();
        const CPriority = formData.get("certificatePriority") as string;
        const image = formData.get("certificateImage") as File;

        if (!image || !(image instanceof File)) {
            return NextResponse.json({ error: "Certificate image is required" }, { status: 400 });
        }

        const [certificateImage, certificateImagePublicId] = await uploadToCloudinary(image, "image");

        const newCertificate = await Certificate.create({
            priority: CPriority,
            imageUrl: certificateImage,
            imageUrlPublicId: certificateImagePublicId
        })

        revalidatePath("/");
        return NextResponse.json( { data: newCertificate }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
    }
}