import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Skill from "../../../../../models/skill.model";
import { DeleteImage } from "../../../../../lib/delete-image";
import { revalidatePath } from "next/cache";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDB();

    const { id } = params;

    const skill = await Skill.findById(id);

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const deleteImage = await DeleteImage(skill.skillImagePublicId);

    if (deleteImage !== 'ok') {
        return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }

    await Skill.findByIdAndDelete(id);

    revalidatePath("/admin-panel/skill");

    return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
