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
        <h1 className="text-3xl font-bold mb-6">My Skills</h1>
        <SkillGrid skills={skills} />
      </div>
    </TooltipProvider>
  );
}
