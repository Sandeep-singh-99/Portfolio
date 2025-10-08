import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Project from "../../../../../models/project.model";
import { DeleteImage } from "../../../../../lib/delete-image";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

interface ProjectData {
  projectName?: string;
  projectDesc?: string;
  projectTechStack?: string[];
  githubLink?: string;
  liveLink?: string;
  projectImage?: string;
  projectImagePublicId?: string;
}



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

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    await ConnectDB();
    const { id } = params;

    const projectId = await Project.findById(id);

    if (!projectId) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data: projectId, status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    await ConnectDB();

    const { id } = params;

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const deleteImage = await DeleteImage(project.projectImagePublicId);

    if (deleteImage !== "ok") {
      return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }

    await Project.findByIdAndDelete(id);

    revalidatePath("/admin-panel/projects");
    revalidatePath("/");

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete Project" }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    await ConnectDB();
    const { id } = params;

    const projectExists = await Project.findById(id);

    if (!projectExists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

      const formData = await req.formData();
      const projectName = formData.get("projectName") as string;
      const projectDesc = formData.get("projectDesc") as string;
      const projectSubDesc = formData.get("projectSubDesc") as string;
      const projectTechStack = formData.get("projectTechStack") as string;
      const githubLink = formData.get("githubLink") as string;
      const liveLink = formData.get("liveLink") as string;
      const image = formData.get("projectImage") as File

      let updatedProjectData: ProjectData = {
        ...(projectName && { projectName }),
        ...(projectDesc && { projectDesc }),
        ...(projectSubDesc && { projectSubDesc }),
        ...(projectTechStack && { projectTechStack: projectTechStack.split(",").map((tech: string) => tech.trim()) }),
        ...(githubLink && { githubLink }),
        ...(liveLink && { liveLink }),
      }

        if (image.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
        }

        const deleteImage = await DeleteImage(projectExists.projectImagePublicId);

        if (deleteImage !== "ok") {
          return NextResponse.json({ error: "Failed to delete old image" }, { status: 500 });
        }

        const [imageUrl, imagePublicId] = await uploadToCloudinary(image, "image");

        updatedProjectData = {
          ...updatedProjectData,
          projectImage: imageUrl,
          projectImagePublicId: imagePublicId,
        };

        await Project.findByIdAndUpdate(id, updatedProjectData);
        
        revalidatePath("/admin-panel/projects");
        revalidatePath("/");

        return NextResponse.json({ data: updatedProjectData, message: "Project updated successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to update Project" }, { status: 500 });
  }
}