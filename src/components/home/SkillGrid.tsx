"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ISkill } from "../../../models/skill.model";

const CATEGORY_ORDER = [
  "frontend",
  "backend",
  "database",
  "language",
  "tools",
  "other",
];

const CATEGORY_TITLES: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  language: "Languages",
  tools: "Tools & DevOps",
  other: "Other",
};

export default function SkillGrid({ skills }: { skills: ISkill[] }) {
  // Group skills by category
  const grouped = useMemo(() => {
    return skills.reduce(
      (acc, s) => {
        const cat = (s.skillCategory || "other").toLowerCase().trim();
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(s);
        return acc;
      },
      {} as Record<string, ISkill[]>
    );
  }, [skills]);

  // Order categories
  const categories = useMemo(() => {
    return Object.keys(grouped).sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a);
      const ib = CATEGORY_ORDER.indexOf(b);
      return ia === -1 && ib === -1
        ? a.localeCompare(b)
        : ia === -1
          ? 1
          : ib === -1
            ? -1
            : ia - ib;
    });
  }, [grouped]);

  return (
    <div className="space-y-6">
      {categories.map((category, catIndex) => {
        const categorySkills = grouped[category] || [];
        if (categorySkills.length === 0) return null;

        const title =
          CATEGORY_TITLES[category] ||
          category.charAt(0).toUpperCase() + category.slice(1);

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.35, delay: catIndex * 0.05 }}
            className="space-y-2.5"
          >
            {/* Category Subtitle */}
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
              {title}
            </h3>

            {/* Clean, Modern Pill Badges */}
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <div
                  key={skill._id || skill.skillName}
                  className="
                    group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                    border border-zinc-200 dark:border-zinc-800
                    bg-zinc-50/80 dark:bg-zinc-900/60
                    hover:border-zinc-400 dark:hover:border-zinc-700
                    hover:bg-white dark:hover:bg-zinc-850
                    transition-all duration-200 cursor-default select-none
                  "
                >
                  {skill.skillImage && (
                    <div className="relative size-4 shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <Image
                        src={skill.skillImage}
                        alt={skill.skillName}
                        fill
                        sizes="16px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                    {skill.skillName}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
