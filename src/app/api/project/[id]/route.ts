import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Project from "../../../../../models/project.model";

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    await ConnectDB();
    const { id } = params;

    const skill = await Project.findById(id);

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(skill, { status: 200 });
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill" },
      { status: 500 }
    );
  }
}