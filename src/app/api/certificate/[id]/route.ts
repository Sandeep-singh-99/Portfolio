import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Certificate from "../../../../../models/certificate.model";
import { DeleteImage } from "../../../../../lib/delete-image";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextRequest,  { params }: { params: { id: string }}) {
    try {
        await ConnectDB();

        const { id } = params;

        const certificate = await Certificate.findById(id);

        if (!certificate) {
            return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
        }

        const deleteImage = await DeleteImage(certificate.imageUrlPublicId);

        if (deleteImage !== 'ok') {
            return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
        }

        await Certificate.findByIdAndDelete(id);

        revalidatePath("/");

        return NextResponse.json({ message: "Certificate deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
    }
}