import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Skill from "../../../../models/skill.model";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


interface Skill {
  _id: string;
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

async function fetchSkillData(): Promise<Skill[]> {
  try {
    await ConnectDB();
    const data = await Skill.find({}).sort({ createdAt: -1 });
    return data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

export default async function SkillPage() {
  const skills: Skill[] = await fetchSkillData();

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
    <div className="container mx-auto px-4 py-16 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Professional Skills
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore my expertise across various domains, showcased through a
          curated collection of skills.
        </p>
      </div>

      {Object.keys(groupedSkills).length === 0 ? (
        <p className="text-center text-lg text-muted-foreground">
          No skills found.
        </p>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <div className="flex items-center justify-center mb-6">
                <Badge
                  variant="secondary"
                  className="text-lg font-semibold px-4 py-1 capitalize bg-primary/10 text-primary"
                >
                  {category}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills.map((skill: Skill) => (
                  <Card
                    key={skill._id}
                    className="border-none bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden group"
                    role="region"
                    aria-label={`Skill: ${skill.skillName}`}
                  >
                    <CardHeader className="p-0">
                      <div className="relative w-full h-48 bg-muted/50">
                        <Image
                          src={skill.skillImage}
                          alt={skill.skillName}
                          fill
                          className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          priority
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="text-center py-4">
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {skill.skillName}
                      </CardTitle>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
