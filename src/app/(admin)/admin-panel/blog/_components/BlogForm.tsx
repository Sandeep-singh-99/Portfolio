"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";
import { Loader, Pencil } from "lucide-react";
import { IBlog } from "../../../../../../models/blog.model";

interface BlogFormProps {
  blog?: IBlog;
}

export default function BlogForm({ blog }: BlogFormProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setTags(blog.tags.join(", "));
      setContent(blog.content);
    }
  }, [blog]);

  const handleContentChange = (value?: string) => {
    setContent(value || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!title || !tags || !content || (!blog && !image)) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const url = blog ? `/api/blog/${blog._id}` : "/api/blog";
      const method = blog ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        toast.success(
          blog ? "Blog updated successfully" : "Blog uploaded successfully"
        );
        if (!blog) {
          setTitle("");
          setTags("");
          setImage(null);
          setContent("");
        }
        setOpen(false);
      } else {
        toast.error(result.error || "Failed to save Blog");
      }
    } catch (error) {
      console.error("Error saving Blog:", error);
      toast.error("Failed to save Blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {blog ? (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline">Add Blog</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[985px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{blog ? "Edit Blog" : "Add Blog"}</DialogTitle>
            <DialogDescription>
              {blog
                ? "Update the details of your blog."
                : "Fill in the details for your new blog."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <div className="flex gap-3">
              <div className="grid w-full gap-2">
                <Label htmlFor="title">Blog Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog Title..."
                  required
                />
              </div>
              <div className="grid w-full gap-2">
                <Label htmlFor="image">
                  Blog Thumbnail Image {blog && "(Optional)"}
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  required={!blog}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Blog Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Blog Tags (comma separated)..."
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Blog Content</Label>
              <MDEditor
                value={content}
                onChange={handleContentChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading && <Loader className="animate-spin mr-2" />} Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
