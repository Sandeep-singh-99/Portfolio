import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import About from "../../../../models/about.model";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        await ConnectDB()

        const existAbout = await About.findOne({});

        if (existAbout) {
            return NextResponse.json({ error: "About section already exists" }, { status: 400 });
        }

       const { desc } = await req.json();

        if (!desc) {
            return NextResponse.json({ error: "Description is required" }, { status: 400 });
        }

        const newAbout = await About.create({ desc });

        revalidatePath("/admin-panel/about");
        revalidatePath("/");
        return NextResponse.json({data: newAbout}, { status: 201 });

    } catch (error) {
        console.error("Error in POST /api/about:", error);
        return NextResponse.json({ error: "Failed to create about section" }, { status: 500 });
    }
}