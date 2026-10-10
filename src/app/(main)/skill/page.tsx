import React from "react";
import type { Metadata } from "next";
import { ConnectDB } from "../../../../lib/db";
import Skill, { ISkill } from "../../../../models/skill.model";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Skills | Sandeep Singh",
  description:
    "Explore the technical stack, tools, languages, and frameworks used by Sandeep Singh.",
};

const SkillGrid = dynamic(() => import("@/components/home/SkillGrid"), {
  loading: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[...Array(12)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-lg" />
        ))}
      </div>
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

export const revalidate = 3600;

export default async function SkillPage() {
  const skills = await fetchSkills();

  return (
    <section aria-labelledby="skills-heading">
      <div className="flex flex-col mb-4">
        <p className="text-sm dark:text-gray-400 text-gray-700">Featured</p>
        <h2 id="skills-heading" className="md:text-xl text-xl font-bold">
          Skills
        </h2>
      </div>

      <SkillGrid skills={skills} />
    </section>
  );
}
