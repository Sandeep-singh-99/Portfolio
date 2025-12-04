import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Skill, { ISkill } from "../../../../models/skill.model";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const SkillGrid = dynamic(() => import("@/components/SkillGrid"), {
  loading: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  ),
});

async function fetchSkills(): Promise<ISkill[]> {
  await ConnectDB();
  const skills = await Skill.find().sort({ priority: 1 }).lean<ISkill[]>();
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
