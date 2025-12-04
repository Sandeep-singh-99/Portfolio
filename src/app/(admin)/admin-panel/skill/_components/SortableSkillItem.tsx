"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DeleteSkill from "./deleteSkill";
import { GripVertical } from "lucide-react";

interface Skill {
  id: string;
  skillCategory: string;
  skillName: string;
  skillImage: string;
  skillImagePublicId: string;
  priority: number;
}

interface SortableSkillItemProps {
  skill: Skill;
}

export function SortableSkillItem({ skill }: SortableSkillItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative h-full">
      <Card className="group hover:shadow-md transition-all duration-200 border-muted/60 h-full">
        <CardContent className="p-4 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="p-1.5 rounded-md cursor-grab active:cursor-grabbing hover:bg-muted transition-colors"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted p-1">
              <Image
                src={skill.skillImage}
                alt={skill.skillName}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium truncate">{skill.skillName}</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DeleteSkill id={skill.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
