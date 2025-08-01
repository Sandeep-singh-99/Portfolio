import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Intro from "../../../../../models/intro.model";
import { DeleteImage } from "../../../../../lib/delete-image";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await ConnectDB();

        const { id } = params;

        const intro = await Intro.findById(id);

        if (!intro) {
            return NextResponse.json({ error: "Intro not found" }, { status: 404 });
        }

        const deleteImage = await DeleteImage(intro.imagePublicId);

        if (deleteImage !== "ok") {
            return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
        }

        const deleteFile = await DeleteImage(intro.filePublicId);

        if (deleteFile !== "ok") {
            return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
        }

        await Intro.findByIdAndDelete(id);

        revalidatePath("/admin-panel/intro");
        revalidatePath("/");

        return NextResponse.json({ message: "Intro deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting intro:", error);
        return NextResponse.json({ error: "Failed to delete intro" }, { status: 500 });
    }
}