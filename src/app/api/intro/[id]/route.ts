import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Intro from "../../../../../models/intro.model";
import { DeleteImage } from "../../../../../lib/delete-image";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function uploadToCloudinary(
  file: File,
  type: "image" | "auto"
): Promise<[string, string]> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: type, folder: "portfolio/intro" },
        (err, result) => {
          if (err || !result?.secure_url)
            return reject("Cloudinary upload failed");
          resolve([result.secure_url, result.public_id]);
        }
      )
      .end(buffer);
  });
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await ConnectDB();

    const params = await props.params;
    const { id } = params;

    const intro = await Intro.findById(id);

    if (!intro) {
      return NextResponse.json({ error: "Intro not found" }, { status: 404 });
    }

    const deleteImage = await DeleteImage(intro.imagePublicId);

    if (deleteImage !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete image" },
        { status: 500 }
      );
    }

    const deleteFile = await DeleteImage(intro.filePublicId);

    if (deleteFile !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete file" },
        { status: 500 }
      );
    }

    await Intro.findByIdAndDelete(id);

    revalidatePath("/admin-panel/intro");
    revalidatePath("/");

    return NextResponse.json(
      { message: "Intro deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting intro:", error);
    return NextResponse.json(
      { error: "Failed to delete intro" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await ConnectDB();
    const params = await props.params;
    const { id } = params;

    const intro = await Intro.findById(id);
    if (!intro) {
      return NextResponse.json({ error: "Intro not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const techStack = formData.get("techStack") as string;
    const desc = formData.get("desc") as string;
    const image = formData.get("image") as File;
    const file = formData.get("file") as File;

    if (!name || !techStack || !desc) {
      return NextResponse.json(
        { error: "All text fields are required" },
        { status: 400 }
      );
    }

    let updatedData: any = {
      name,
      techStack: techStack.split(",").map((t) => t.trim()),
      desc,
    };

    // Handle Image Update
    if (image && image.size > 0) {
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Image size exceeds 5MB" },
          { status: 400 }
        );
      }

      const deleteOldImage = await DeleteImage(intro.imagePublicId);
      if (deleteOldImage !== "ok") {
        return NextResponse.json(
          { error: "Failed to delete old image" },
          { status: 500 }
        );
      }

      const [imageUrl, imagePublicId] = await uploadToCloudinary(
        image,
        "image"
      );
      updatedData.image = imageUrl;
      updatedData.imagePublicId = imagePublicId;
    }

    // Handle File Update
    if (file && file.size > 0) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size exceeds 10MB" },
          { status: 400 }
        );
      }

      const deleteOldFile = await DeleteImage(intro.filePublicId);
      if (deleteOldFile !== "ok") {
        return NextResponse.json(
          { error: "Failed to delete old file" },
          { status: 500 }
        );
      }

      const [fileUrl, filePublicId] = await uploadToCloudinary(file, "auto");
      updatedData.file = fileUrl;
      updatedData.filePublicId = filePublicId;
    }

    const updatedIntro = await Intro.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    revalidatePath("/admin-panel/intro");
    revalidatePath("/");

    return NextResponse.json(
      { data: updatedIntro, message: "Intro updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating intro:", error);
    return NextResponse.json(
      { error: "Failed to update intro" },
      { status: 500 }
    );
  }
}
