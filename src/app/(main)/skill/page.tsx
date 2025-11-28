import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Skill, { ISkill } from "../../../../models/skill.model";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkillGrid from "@/components/SkillGrid";

async function fetchSkills(): Promise<ISkill[]> {
  await ConnectDB();
  const skills = await Skill.find().lean<ISkill[]>();
  return skills.map((skill) => ({
    ...skill,
    _id: skill._id?.toString(),
  }));
}

export default async function SkillPage() {
  const skills = await fetchSkills();

  return (
    <TooltipProvider>
      <div className="">
        <div className="flex flex-col mb-2">
          <p className="text-sm dark:text-gray-400 text-gray-700">Featured</p>
          <h2 className="md:text-xl text-xl font-bold">Skills</h2>
        </div>
        <SkillGrid skills={skills} />
      </div>
    </TooltipProvider>
  );
}
