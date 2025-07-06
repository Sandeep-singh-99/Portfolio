"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface DeleteIntroProps {
  id: string;
  onDelete?: () => void;
}

export default function DeleteIntro({ id }: DeleteIntroProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/intro/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Intro deleted successfully");
        router.refresh(); 
      } else {
        toast.error(result.error || "Failed to delete intro");
      }
    } catch (error) {
      console.error("Error deleting intro:", error);
      toast.error("Failed to delete intro");
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={() => handleDelete(id)}>
        Delete Intro
      </Button>
    </div>
  );
}
