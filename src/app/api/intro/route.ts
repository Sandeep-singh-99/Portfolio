import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import { v2 as cloudinary } from "cloudinary";
import Intro from "../../../../models/intro.model";
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
        const name = formData.get("name") as string;
        const techStack = formData.get("techStack") as string;
        const desc = formData.get("desc") as string;
        const image = formData.get("image") as File;
        const file = formData.get("file") as File;

        if (!name || !techStack || !desc || !image || !file) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (image.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "File size exceeds 10MB" }, { status: 400 });
        }

        const [imageUrl, imagePublicId] = await uploadToCloudinary(image, "image");
        const [fileUrl, filePublicId] = await uploadToCloudinary(file, "auto");

        const newIntro = await Intro.create({
            name,
            techStack: techStack.split(",").map((t) => t.trim()),
            desc,
            image: imageUrl,
            file: fileUrl,
            imagePublicId,
            filePublicId,
        })

        revalidatePath("/admin-panel/intro");
        return NextResponse.json({ data: newIntro }, { status: 200 });
    } catch (error) {
        console.error("Error creating intro:", error);
        return NextResponse.json({ error: "Failed to create intro" }, { status: 500 });
    }
}
