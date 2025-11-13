"use client";

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
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CertificateForm() {
  const [priority, setPriority] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!image) {
      toast.error("Please upload an image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("certificatePriority", priority.toString());
    if (image) formData.append("certificateImage", image);

    try {
      const response = await fetch("/api/certificate", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Certificate added successfully");
        setPriority(0);
        setImage(null);
        setLoading(false);
      } else {
        toast.error(result.error || "Failed to add certificate");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to add certificate");
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Certificate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Certificate Section</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="certificate">Certificate</Label>
            <Input
              value={priority}
              name="priority"
              onChange={(e) => setPriority(Number(e.target.value))}
              id="priority"
              type="number"
            />
          </div>

          <div className="grid gap-4 py-4">
            <Label htmlFor="certificate">Certificate</Label>
            <Input
              id="certificate"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />

            {image && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected file: <span className="font-medium">{image.name}</span>
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
                { loading && <Loader2Icon className="animate-spin" /> }Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
