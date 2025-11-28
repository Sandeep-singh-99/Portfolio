"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { IBlog } from "../../../../../../models/blog.model";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MarkdownRender } from "@/components/MarkdownRender";

interface BlogDetailsDialogProps {
  blog: IBlog;
}

export default function BlogDetailsDialog({ blog }: BlogDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{blog.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <MarkdownRender content={blog.content} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
