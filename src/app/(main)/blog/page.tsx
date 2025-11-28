import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Blog, { IBlog } from "../../../../models/blog.model";
import MainBlogCard from "@/components/MainBlogCard";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

async function fetchBlogs(): Promise<IBlog[]> {
  await ConnectDB();
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(2)
    .lean<IBlog[]>();
  return blogs.map((blog) => ({
    ...blog,
    _id: blog._id?.toString(),
  }));
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col mb-2">
        <p className="text-sm dark:text-gray-400 text-gray-700">Featured</p>
        <h2 className="md:text-xl text-xl font-bold">Blogs</h2>
      </div>
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

      <div className="text-center mt-10">
        <Link href="/blog/all-blogs">
          <Button variant="outline" className=" hover:bg-white cursor-pointer ">
            Show all blogs <MoveRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
