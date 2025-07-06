import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import About from "../../../../../models/about.model";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await ConnectDB()

        const { id } = params;

        const existAbout = await About.findById(id)

        if (!existAbout) {
            return NextResponse.json({ error: "About section not found" }, { status: 404 });
        }

        const deletedAbout = await About.findByIdAndDelete(id);

        if (!deletedAbout) {
            return NextResponse.json({ error: "Failed to delete about section" }, { status: 500 });
        }

        revalidatePath("/admin-panel/about");
        return NextResponse.json({ message: "About section deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in DELETE /api/about:", error);
        return NextResponse.json({ error: "Failed to delete about section" }, { status: 500 });       
    }
}