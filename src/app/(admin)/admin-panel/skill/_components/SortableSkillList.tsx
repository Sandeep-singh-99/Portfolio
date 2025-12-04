"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableSkillItem } from "./SortableSkillItem";
import { toast } from "sonner";
import axios from "axios";
import { Layers, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Skill {
  id: string;
  skillCategory: string;
  skillName: string;
  skillImage: string;
  skillImagePublicId: string;
  priority: number;
}

interface GroupedSkills {
  [category: string]: Skill[];
}

interface SortableSkillListProps {
  initialSkills: Skill[];
}

export default function SortableSkillList({
  initialSkills,
}: SortableSkillListProps) {
  const [groupedSkills, setGroupedSkills] = useState<GroupedSkills>({});

  useEffect(() => {
    const grouped = initialSkills.reduce((acc: GroupedSkills, skill: Skill) => {
      const category = skill.skillCategory || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
    setGroupedSkills(grouped);
  }, [initialSkills]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which category these items belong to
    let activeCategory = "";
    let overCategory = "";

    for (const [category, skills] of Object.entries(groupedSkills)) {
      if (skills.find((s) => s.id === activeId)) activeCategory = category;
      if (skills.find((s) => s.id === overId)) overCategory = category;
    }

    if (
      activeCategory &&
      overCategory &&
      activeCategory === overCategory &&
      activeId !== overId
    ) {
      setGroupedSkills((prev) => {
        const categorySkills = [...prev[activeCategory]];
        const oldIndex = categorySkills.findIndex((s) => s.id === activeId);
        const newIndex = categorySkills.findIndex((s) => s.id === overId);

        const newCategorySkills = arrayMove(categorySkills, oldIndex, newIndex);

        // Update order in backend
        updateOrder(newCategorySkills);

        return {
          ...prev,
          [activeCategory]: newCategorySkills,
        };
      });
    }
  };

  const updateOrder = async (items: Skill[]) => {
    try {
      const skillIds = items.map((item) => item.id);
      await axios.put("/api/skill/reorder", { skillIds });
      toast.success("Skill order updated");
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update skill order");
    }
  };

  if (Object.keys(groupedSkills).length === 0) {
    return (
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-background p-4 mb-4 shadow-sm">
            <Wrench className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No skills added</h3>
          <p className="text-muted-foreground max-w-sm mt-2">
            Start building your profile by adding your technical skills.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-10">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold capitalize tracking-tight">
                {category}
              </h3>
              <Badge variant="secondary" className="ml-2">
                {categorySkills.length}
              </Badge>
            </div>

            <SortableContext
              items={categorySkills.map((s) => s.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categorySkills.map((skill) => (
                  <SortableSkillItem key={skill.id} skill={skill} />
                ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
