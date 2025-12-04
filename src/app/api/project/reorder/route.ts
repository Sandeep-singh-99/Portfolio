import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Project from "../../../../../models/project.model";

export async function PUT(req: NextRequest) {
  try {
    const { projectIds } = await req.json();

    if (!Array.isArray(projectIds)) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    await ConnectDB();

    // Update priorities in a transaction or batch update
    const updatePromises = projectIds.map((id: string, index: number) => {
      return Project.findByIdAndUpdate(id, { priority: index });
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      { message: "Projects reordered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reordering projects:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
