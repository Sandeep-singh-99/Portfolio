"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CertificateCardProps {
  imageUrl: string;
  onClick?: () => void;
  layoutId?: string;
}

export default function CertificateCard({
  imageUrl,
  onClick,
  layoutId,
}: CertificateCardProps) {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? "View enlarged certificate" : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`${
        onClick
          ? "cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl overflow-hidden"
          : ""
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt="Certificate of achievement"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </motion.div>
  );
}
