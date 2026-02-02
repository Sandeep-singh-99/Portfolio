import React from "react";
import { ConnectDB } from "../../../../../lib/db";
import Blog, { IBlog } from "../../../../../models/blog.model";
import { MarkdownRender } from "@/components/MarkdownRender";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function fetchBlog(id: string): Promise<IBlog | null> {
  await ConnectDB();
  try {
    const blog = await Blog.findById(id).lean<IBlog>();
    if (!blog) return null;

    return {
      ...blog,
      _id: blog._id?.toString(),
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function BlogPageById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await fetchBlog(id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100">
            404 – Blog Not Found
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            <ArrowLeft size={20} />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-5 pb-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title */}
          <div className="mt-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {blog.title}
            </h1>
          </div>

          {/* Tags */}
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-6">
              Tags
            </h2>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <article className="mt-20 prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <MarkdownRender content={blog.content} />
          </article>
        </div>
      </div>
    </>
  );
}
