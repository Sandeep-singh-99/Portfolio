"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface CertificateCardProps {
  imageUrl: string;
}

export default function CertificateCard({ imageUrl }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={imageUrl}
            alt="Certificate"
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Card>
    </motion.div>
  );
}
