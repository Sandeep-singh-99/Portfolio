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
      className={onClick ? "cursor-pointer" : ""}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={imageUrl}
          alt="Certificate"
          fill
          className="object-contain "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </motion.div>
  );
}
