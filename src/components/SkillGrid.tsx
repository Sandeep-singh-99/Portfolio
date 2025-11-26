"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ISkill } from "../../models/skill.model";

export default function SkillGrid({ skills }: { skills: ISkill[] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6">
      {skills.map((skill: any, index: any) => (
        <motion.div
          key={skill._id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <Tooltip>
            <TooltipTrigger>
              <motion.div
                whileHover={{ scale: 1.12 }}
                className="w-16 h-16 bg-white/5 backdrop-blur-sm rounded-2xl shadow-md 
                flex items-center justify-center border border-white/10 hover:shadow-xl 
                transition cursor-pointer"
              >
                <Image
                  src={skill.skillImage}
                  alt={skill.skillName}
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </motion.div>
            </TooltipTrigger>

            <TooltipContent>
              <p className="text-sm">{skill.skillName}</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      ))}
    </div>
  );
}
