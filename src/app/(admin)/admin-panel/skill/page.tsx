import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SkillForm from './_components/skillForm';
import { ConnectDB } from '../../../../../lib/db';
import Skill from '../../../../../models/skill.model';
import Image from 'next/image';
import DeleteSkill from './_components/deleteSkill';

async function fetchSkills() {
  await ConnectDB()
  const skill = await Skill.find().sort({ createdAt: -1 });
  return skill;
}

export default async function SkillPage() {
  const skills = await fetchSkills();
  return (
     <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Skill Section</h1>
          <p className="text-gray-600 mt-1">
            This section controls the skill content of your portfolio.
          </p>
        </div>
        <SkillForm/>
      </div>

      <main>
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {skills.length === 0 ? (
              <p className="text-gray-500 text-center">No skills added yet.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <li
                    key={skill._id}
                    className="flex items-center justify-between p-4 border rounded-lg transition"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={skill.skillImage}
                        alt={skill.skillName}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                      <span className="text-lg font-semibold">
                        {skill.skillName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                     <DeleteSkill id={skill.id} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </section>
  )
}
