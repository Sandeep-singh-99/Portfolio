"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import CertificateCard from "./CertificateCard";
import { ICertificate } from "../../models/certificate.model";

interface CertificateGalleryProps {
  certificates: ICertificate[];
}

export default function CertificateGallery({
  certificates,
}: CertificateGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert._id}
            imageUrl={cert.imageUrl}
            onClick={() => setSelectedId(cert._id as string)}
            layoutId={cert._id as string}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-5xl z-10 flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute -top-12 right-0 z-20 p-2 text-white hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <X size={32} />
              </button>

              <div className="relative w-full h-[80vh]">
                {(() => {
                  const selectedCert = certificates.find(
                    (c) => c._id === selectedId
                  );
                  return selectedCert ? (
                    <Image
                      src={selectedCert.imageUrl}
                      alt="Certificate"
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  ) : null;
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
