"use client";

import React from "react";
import { motion } from "framer-motion";
import { IAbout } from "../../models/about.model";

export default function AboutSection({ about }: { about: IAbout }) {
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="md:text-3xl text-xl font-bold mb-4">About Me</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="md:text-lg text-sm opacity-80 leading-relaxed whitespace-pre-wrap">
            {about.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
