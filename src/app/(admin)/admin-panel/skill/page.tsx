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
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

async function fetchSkills(): Promise<Skill[]> {
  await ConnectDB();
  const skills = await Skill.find().sort({ priority: 1 });
  return skills.map((skill) => ({
    ...skill.toObject(),
    id: skill._id.toString(),
    createdAt: skill.createdAt,
    updatedAt: skill.updatedAt,
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
