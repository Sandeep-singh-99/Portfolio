"use client";
import React from "react";
import Image from "next/image";
import { IBlog } from "../../../../../../models/blog.model";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlogForm from "./BlogForm";
import DeleteBlogDialog from "./DeleteBlogDialog";
import BlogDetailsDialog from "./BlogDetailsDialog";

interface BlogCardProps {
  blog: IBlog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold line-clamp-1">{blog.title}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {blog.content.replace(/[#*`]/g, "")}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2 border-t bg-muted/20">
        <BlogDetailsDialog blog={blog} />
        <BlogForm blog={blog} />
        <DeleteBlogDialog blogId={blog._id!} blogTitle={blog.title} />
      </CardFooter>
    </Card>
  );
}
