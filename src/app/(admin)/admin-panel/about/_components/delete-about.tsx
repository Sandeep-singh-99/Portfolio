"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface DeleteAboutProps {
  id: string;
  onDelete?: () => void;
}

export default function DeleteAbout({ id }: DeleteAboutProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/about/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "About section deleted successfully");
        router.refresh(); 
      } else {
        toast.error(result.error || "Failed to delete about section");
      }
    } catch (error) {
      console.error("Error deleting about section:", error);
      toast.error("Failed to delete about section");
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={() => handleDelete(id)}>
        Delete About
      </Button>
    </div>
  );
}
