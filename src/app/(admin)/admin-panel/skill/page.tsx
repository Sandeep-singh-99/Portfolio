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

interface Skill {
  id: string;
  skillCategory: string;
  skillName: string;
  skillImage: string;
  skillImagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface GroupedSkills {
  [category: string]: Skill[];
}

async function fetchSkills(): Promise<Skill[]> {
  await ConnectDB();
  const skills = await Skill.find().sort({ createdAt: -1 });
  return skills;
}

export default async function SkillPage() {
  const skills: Skill[] = await fetchSkills();

  // Group skills by skillCategory
  const groupedSkills: GroupedSkills = skills.reduce(
    (acc: GroupedSkills, skill: Skill) => {
      const category = skill.skillCategory || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Skill Section</h1>
          <p className="text-muted-foreground mt-2">
            Manage your technical skills and expertise.
          </p>
        </div>
        <SkillForm />
      </div>

      <Separator />

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Your Skills</h2>
          <span className="text-sm text-muted-foreground">
            {skills.length} total skills
          </span>
        </div>

        {Object.keys(groupedSkills).length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-background p-4 mb-4 shadow-sm">
                <Wrench className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No skills added</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Start building your profile by adding your technical skills.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold capitalize tracking-tight">
                    {category}
                  </h3>
                  <Badge variant="secondary" className="ml-2">
                    {categorySkills.length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categorySkills.map((skill: Skill) => (
                    <Card
                      key={skill.id}
                      className="group hover:shadow-md transition-all duration-200 border-muted/60"
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted p-1">
                            <Image
                              src={skill.skillImage}
                              alt={skill.skillName}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="font-medium truncate">
                            {skill.skillName}
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <DeleteSkill id={skill.id} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
