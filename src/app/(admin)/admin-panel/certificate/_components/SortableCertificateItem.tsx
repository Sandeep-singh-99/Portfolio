"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CertificateDelete from "./certificateDelete";
import { FileText, ExternalLink, GripVertical } from "lucide-react";

interface Certificate {
  _id: string;
  imageUrl: string;
  imageUrlPublicId: string;
  priority: number;
}

interface SortableCertificateItemProps {
  certificate: Certificate;
}

export function SortableCertificateItem({
  certificate,
}: SortableCertificateItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: certificate._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const isPDF = certificate.imageUrl.endsWith(".pdf");

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card className="group flex flex-col overflow-hidden border-muted/60 hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative h-56 w-full overflow-hidden bg-muted">
          {isPDF ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground bg-muted/50">
              <FileText className="h-12 w-12" />
              <span className="text-sm font-medium">PDF Document</span>
            </div>
          ) : (
            <Image
              src={certificate.imageUrl}
              alt="Certificate"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-md p-1 z-10">
            <CertificateDelete id={certificate._id} />
          </div>

          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-md cursor-grab active:cursor-grabbing hover:bg-background transition-colors z-10"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <CardContent className="p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs font-normal">
              Priority: {certificate.priority}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="w-full gap-2" asChild>
            <a
              href={certificate.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              View Certificate
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
