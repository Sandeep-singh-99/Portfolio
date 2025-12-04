import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Certificate from "../../../../../models/certificate.model";

export async function PUT(req: NextRequest) {
  try {
    const { certificateIds } = await req.json();

    if (!Array.isArray(certificateIds)) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    await ConnectDB();

    // Update priorities
    const updatePromises = certificateIds.map((id: string, index: number) => {
      return Certificate.findByIdAndUpdate(id, { priority: index });
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      { message: "Certificates reordered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reordering certificates:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
