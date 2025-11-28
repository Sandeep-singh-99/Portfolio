import React from "react";
import BlogForm from "./_components/BlogForm";
import { ConnectDB } from "../../../../../lib/db";
import Blog, { IBlog } from "../../../../../models/blog.model";
import BlogCard from "./_components/BlogCard";

async function fetchBlogs(): Promise<IBlog[]> {
  await ConnectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean<IBlog[]>();
  return blogs.map((blog) => ({
    ...blog,
    _id: blog._id?.toString(),
  }));
}

export default async function AdminPanelBlog() {
  const blogs = await fetchBlogs();

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Blog Section</h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio blog posts.
          </p>
        </div>
        <BlogForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
