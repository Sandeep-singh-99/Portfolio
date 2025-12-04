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
import { SortableCertificateItem } from "./SortableCertificateItem";
import { toast } from "sonner";
import axios from "axios";

interface Certificate {
  _id: string;
  imageUrl: string;
  imageUrlPublicId: string;
  priority: number;
}

interface SortableCertificateListProps {
  initialCertificates: Certificate[];
}

export default function SortableCertificateList({
  initialCertificates,
}: SortableCertificateListProps) {
  const [certificates, setCertificates] =
    useState<Certificate[]>(initialCertificates);

  useEffect(() => {
    setCertificates(initialCertificates);
  }, [initialCertificates]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCertificates((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Trigger API update
        updateOrder(newItems);

        return newItems;
      });
    }
  };

  const updateOrder = async (items: Certificate[]) => {
    try {
      const certificateIds = items.map((item) => item._id);
      await axios.put("/api/certificate/reorder", { certificateIds });
      toast.success("Certificate order updated");
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update certificate order");
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={certificates.map((c) => c._id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <SortableCertificateItem
              key={certificate._id}
              certificate={certificate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
