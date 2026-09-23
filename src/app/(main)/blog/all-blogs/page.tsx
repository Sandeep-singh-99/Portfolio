import React from "react";
import type { Metadata } from "next";
import MainBlogCard from "@/components/home/MainBlogCard";
import { ConnectDB } from "../../../../../lib/db";
import Blog, { IBlog } from "../../../../../models/blog.model";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles, guides, and thoughts on modern full stack web development, Next.js, React, Node.js, and software architecture by Sandeep Singh.",
  openGraph: {
    title: "Blog | Sandeep Singh",
    description:
      "Articles, guides, and insights on web development and software engineering by Sandeep Singh.",
    url: "https://sandeep-singh.com/blog/all-blogs",
  },
  alternates: {
    canonical: "https://sandeep-singh.com/blog/all-blogs",
  },
};

async function fetchBlogs(): Promise<IBlog[]> {
  await ConnectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean<IBlog[]>();
  return blogs.map((blog) => ({
    ...blog,
    _id: blog._id?.toString(),
  }));
}

export default async function AllBlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="container mx-auto space-y-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">Blogs</h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">
          My thoughts and writings on technology and development.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <MainBlogCard
            key={blog._id}
            _id={blog._id!}
            title={blog.title}
            image={blog.image}
            tags={blog.tags}
          />
        ))}
      </div>
    </div>
  );
}
