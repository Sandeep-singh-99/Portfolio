import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SkillForm from "./_components/skillForm";
import { ConnectDB } from "../../../../../lib/db";
import Skill from "../../../../../models/skill.model";
import Image from "next/image";
import DeleteSkill from "./_components/deleteSkill";
import { Layers, Wrench } from "lucide-react";
import SortableSkillList from "./_components/SortableSkillList";

interface Skill {
  id: string;
  skillCategory: string;
  skillName: string;
  skillImage: string;
  skillImagePublicId: string;
  priority: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

async function fetchSkills(): Promise<Skill[]> {
  await ConnectDB();
  const skills = await Skill.find().sort({ priority: 1 }).lean();
  return skills.map((skill: any) => ({
    id: skill._id.toString(),
    skillCategory: skill.skillCategory,
    skillName: skill.skillName,
    skillImage: skill.skillImage,
    skillImagePublicId: skill.skillImagePublicId,
    priority: skill.priority ?? 0,
    createdAt: skill.createdAt ? new Date(skill.createdAt).toISOString() : "",
    updatedAt: skill.updatedAt ? new Date(skill.updatedAt).toISOString() : "",
    __v: skill.__v ?? 0,
  }));
}

export default async function SkillPage() {
  const skills: Skill[] = await fetchSkills();

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Skill Section</h1>
          <p className="text-muted-foreground">
            Manage your skills, add new ones, and reorder them.
          </p>
        </div>
        <SkillForm />
      </div>

      <Separator />

      <SortableSkillList initialSkills={skills} />
    </div>
  );
}
