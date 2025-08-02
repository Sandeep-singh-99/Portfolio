import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Skill from "../../../../models/skill.model";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function fetchSkillData() {
  await ConnectDB();
  const data = await Skill.find({}).sort({ createdAt: -1 });
  return data;
}

export default async function SkillPage() {
  const skills = await fetchSkillData();


  const allowedCategories = ["frontend", "backend", "language", "database", "tools", "other"];

  return (
    <div id="skills" className="container mx-auto py-10 px-2 sm:px-6 lg:px-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Professional Skills
        </h1>
      </div>

      <Tabs defaultValue={allowedCategories[0]}>
        <TabsList className="flex justify-center items-center md:gap-6 md:w-full  mb-3">
          {allowedCategories.map((category) => (
            <TabsTrigger key={category} value={category} className="">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {allowedCategories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
              {skills
                .filter((skill) => skill.skillCategory === category)
                .map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-center space-x-4 mb-1 bg-[#1a1a1c] p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}


