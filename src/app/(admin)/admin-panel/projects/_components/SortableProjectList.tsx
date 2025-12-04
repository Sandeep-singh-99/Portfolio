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
import { SortableProjectItem } from "./SortableProjectItem";
import { toast } from "sonner";
import axios from "axios";

interface Project {
  _id: string;
  id: string;
  projectName: string;
  projectDesc: string;
  projectSubDesc: string;
  projectImage: string;
  projectTechStack: string[];
  githubLink: string;
  liveLink: string;
  createdAt: string;
  updatedAt: string;
}

interface SortableProjectListProps {
  initialProjects: Project[];
}

export default function SortableProjectList({
  initialProjects,
}: SortableProjectListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Trigger API update
        updateOrder(newItems);

        return newItems;
      });
    }
  };

  const updateOrder = async (items: Project[]) => {
    try {
      const projectIds = items.map((item) => item._id);
      await axios.put("/api/project/reorder", { projectIds });
      toast.success("Project order updated");
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update project order");
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={projects.map((p) => p._id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <SortableProjectItem key={project._id} project={project} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
