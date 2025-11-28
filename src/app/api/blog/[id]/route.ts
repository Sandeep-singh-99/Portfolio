import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import Blog from "../../../../../models/blog.model";
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDB();
    const { id } = params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ data: blog, status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDB();

    const { id } = params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const deleteImage = await DeleteImage(blog.imagePublicId);

    if (deleteImage !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete image" },
        { status: 500 }
      );
    }

    await Blog.findByIdAndDelete(id);

    revalidatePath("/admin-panel/blog");
    revalidatePath("/");

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete Blog" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDB();
    const { id } = params;

    const blogExists = await Blog.findById(id);

    if (!blogExists) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;
    const image = formData.get("image") as File;

    let updatedBlogData: any = {
      ...(title && { title }),
      ...(content && { content }),
      ...(tags && { tags: tags.split(",").map((tag: string) => tag.trim()) }),
    };

    if (image) {
      if (image.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Image size exceeds 10MB" },
          { status: 400 }
        );
      }

      const deleteImage = await DeleteImage(blogExists.imagePublicId);

      if (deleteImage !== "ok") {
        return NextResponse.json(
          { error: "Failed to delete old image" },
          { status: 500 }
        );
      }

      const [imageUrl, imagePublicId] = await uploadToCloudinary(
        image,
        "image"
      );

      updatedBlogData = {
        ...updatedBlogData,
        image: imageUrl,
        imagePublicId: imagePublicId,
      };
    }

    await Blog.findByIdAndUpdate(id, updatedBlogData);

    revalidatePath("/admin-panel/blog");
    revalidatePath("/");

    return NextResponse.json(
      { data: updatedBlogData, message: "Blog updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update Blog" },
      { status: 500 }
    );
  }
}
