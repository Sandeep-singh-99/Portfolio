import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import Project from "../../../../models/project.model";


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
        const projectName = formData.get("projectName") as string;
        const projectDesc = formData.get("projectDesc") as string;
        const projectSubDesc = formData.get("projectSubDesc") as string;
        const projectTechStack = formData.get("projectTechStack") as string;
        const githubLink = formData.get("githubLink") as string;
        const liveLink = formData.get("liveLink") as string;
        const image = formData.get("projectImage") as File;
        const priority = Number(formData.get("priority")) || 0;

        if (!projectName || !projectDesc || !projectTechStack || !githubLink || !liveLink) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (image.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "Image size exceeds 10MB" }, { status: 400 });
        }

        const [imageUrl, imagePublicId] = await uploadToCloudinary(image, "image");

        const newProject = await Project.create({
            projectName,
            projectDesc,
            projectSubDesc,
            projectImage: imageUrl,
            projectTechStack: projectTechStack.split(",").map((tech: string) => tech.trim()),
            githubLink,
            liveLink,
            projectImagePublicId: imagePublicId,
            priority,
        })

        revalidatePath("/admin-panel/projects");
        revalidatePath("/");

        return NextResponse.json({ data: newProject}, { status: 200 });


    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

