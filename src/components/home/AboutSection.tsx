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
        <div className="flex flex-col mb-3">
          <p className="text-sm text-gray-700 dark:text-gray-400">About</p>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            About Me
          </h2>
        </div>
        <div className="max-w-none">
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal whitespace-pre-wrap text-pretty">
            {about.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
