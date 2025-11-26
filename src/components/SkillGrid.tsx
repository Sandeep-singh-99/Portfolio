"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ISkill } from "../../models/skill.model";

export default function SkillGrid({ skills }: { skills: ISkill[] }) {
  // Group & sort logic (same solid foundation)
  const grouped = skills.reduce((acc, s) => {
    const cat = (s.skillCategory || "Other").toLowerCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {} as Record<string, ISkill[]>);

  const order = ["frontend", "backend", "database", "language", "tools", "other"];
  const categories = Object.keys(grouped).sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    return ia === -1 && ib === -1 ? a.localeCompare(b) : ia === -1 ? 1 : ib === -1 ? -1 : ia - ib;
  });

  return (
     <section
      id="skills"
      className=" "
    >
      {/* Category Sections */}
      {categories.map((category) => {
        const categorySkills = skills.filter(
          (skill) => skill.skillCategory === category
        );
        if (categorySkills.length === 0) return null;

        return (
          <div key={category} className="mb-5">
            <h2 className="md:text-2xl text-xl font-bold text-white mb-6 capitalize">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2">
              {categorySkills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-start space-x-3 px-4 py-3 rounded-lg
                      border border-gray-800 bg-zinc-950/70 border-dashed
                      hover:bg-zinc-900 transition-all duration-300
                       shadow-sm hover:shadow-md cursor-pointer"
                >
                  {/* Skill Icon */}
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                    {" "}
                    <Image
                      src={skill.skillImage}
                      alt={skill.skillName}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Skill Name */}
                  <h2 className="text-sm font-medium text-gray-200 truncate">
                    {skill.skillName}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
