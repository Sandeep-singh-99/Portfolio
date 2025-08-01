import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import Skill from "../../../../models/skill.model";

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
        const skillCategory = formData.get("skillCategory") as string;
        const skillName = formData.get("skillName") as string;
        const image = formData.get("skillImage") as File;

        if (!skillName) {
            return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
        }
        if (!image || !(image instanceof File)) {
            return NextResponse.json({ error: "Skill image is required" }, { status: 400 });
        }

        const [skillImage, skillImagePublicId] = await uploadToCloudinary(image, "image");

        const newSkill = await Skill.create({
            skillCategory,
            skillName,
            skillImage,
            skillImagePublicId
        });

        revalidatePath("/admin-panel/skill")
        revalidatePath("/");
        return NextResponse.json( { data: newSkill }, { status: 201 });
    } catch (error) {
        console.error("Error creating skill:", error);
        return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
    }
}