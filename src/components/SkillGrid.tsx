"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ISkill } from "../../models/skill.model";

export default function SkillGrid({ skills }: { skills: ISkill[] }) {
  // Group & sort logic (same solid foundation)
  const grouped = skills.reduce(
    (acc, s) => {
      const cat = (s.skillCategory || "Other").toLowerCase();
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(s);
      return acc;
    },
    {} as Record<string, ISkill[]>
  );

  const order = [
    "frontend",
    "backend",
    "database",
    "language",
    "tools",
    "other",
  ];
  const categories = Object.keys(grouped).sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    return ia === -1 && ib === -1
      ? a.localeCompare(b)
      : ia === -1
        ? 1
        : ib === -1
          ? -1
          : ia - ib;
  });

  return (
    <section id="skills" className=" ">
      {/* Category Sections */}
      {categories.map((category, catIndex) => {
        const categorySkills = skills.filter(
          (skill) => skill.skillCategory === category
        );
        if (categorySkills.length === 0) return null;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="mb-8"
          >
            <h2 className="md:text-xl text-lg font-bold text-zinc-800 dark:text-white mb-6 capitalize flex items-center gap-2">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="flex items-center justify-start space-x-3 px-4 py-3 rounded-xl
                      border border-zinc-200 dark:border-zinc-800/50 
                      bg-white dark:bg-zinc-900/50 border-dashed
                      hover:border-blue-500/50 dark:hover:border-blue-500/50
                      hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors duration-300
                      shadow-sm hover:shadow-lg cursor-pointer group"
                >
                  {/* Skill Icon */}
                  <div className="relative w-8 h-8 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={skill.skillImage}
                      alt={skill.skillName}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Skill Name */}
                  <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {skill.skillName}
                  </h2>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
