import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Project from "../../../../../models/project.model";
import { DeleteImage } from "../../../../../lib/delete-image";
import { revalidatePath } from "next/cache";

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

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete Project" }, { status: 500 });
  }
}