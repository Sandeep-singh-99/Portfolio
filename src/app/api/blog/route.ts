import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import { v2 as cloudinary } from "cloudinary";
import Blog from "../../../../models/blog.model";
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
        const title = formData.get("title") as string;
        const image = formData.get("image") as File;
        const content = formData.get("content") as string;
        const tags = formData.get("tags") as string;

        if (!title || !content || !tags) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (image.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "Image size exceeds 10MB" }, { status: 400 });
        }

        const [imageUrl, imagePublicId] = await uploadToCloudinary(image, "image");

        const newBlog = await Blog.create({
            title,
            image: imageUrl,
            imagePublicId,
            content,
            tags: tags.split(",").map((tag: string) => tag.trim()),
        })

        revalidatePath("/")

        return NextResponse.json({ data: newBlog }, { status: 200 })
    } catch (error) {
        console.log("Error creating blog", error);
        return NextResponse.json({ error: "Failed to create Blog"}, {status: 500})
        
    }
}