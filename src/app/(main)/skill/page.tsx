import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Skill from "../../../../models/skill.model";
import Image from "next/image";

async function fetchSkillData() {
  await ConnectDB();
  const data = await Skill.find({}).sort({ createdAt: -1 });
  return data;
}

export default async function SkillPage() {
  const skills = await fetchSkillData();
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Professional Skills
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-center space-x-4 mb-6 bg-[#1a1a1c]  p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <Image
              width={24}
              height={24}
              src={skill.skillImage}
              alt={skill.skillName}
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
            <h2 className="text-lg md:text-xl font-semibold text-white">
              {skill.skillName}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
