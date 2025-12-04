import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Skill from "../../../../../models/skill.model";

export async function PUT(req: NextRequest) {
  try {
    const { skillIds } = await req.json();

    if (!Array.isArray(skillIds)) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    await ConnectDB();

    // Update priorities
    const updatePromises = skillIds.map((id: string, index: number) => {
      return Skill.findByIdAndUpdate(id, { priority: index });
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      { message: "Skills reordered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reordering skills:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
