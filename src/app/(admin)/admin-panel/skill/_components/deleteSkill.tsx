"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface DeleteSkillProps {
  id: string;
  onDelete?: () => void;
}

export default function DeleteSkill({ id }: DeleteSkillProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/skill/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Skill deleted successfully");
        router.refresh(); 
      } else {
        toast.error(result.error || "Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Failed to delete skill");
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={() => handleDelete(id)}>
        <Trash2 />
      </Button>
    </div>
  );
}
