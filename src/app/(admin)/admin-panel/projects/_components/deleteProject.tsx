"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface DeleteProjectProps {
  id: string;
  onDelete?: () => void;
}

export default function DeleteProject({ id }: DeleteProjectProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/project/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Project deleted successfully");
        router.refresh(); 
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={() => handleDelete(id)}>
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}
