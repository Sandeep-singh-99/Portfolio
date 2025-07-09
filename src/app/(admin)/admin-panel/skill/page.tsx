import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import SkillForm from './_components/skillForm';


export default function SkillPage() {
  return (
     <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Skill Section</h1>
          <p className="text-gray-600 mt-1">
            This section controls the skill content of your portfolio.
          </p>
        </div>

        {/* <Button variant="destructive">Add Skill</Button> */}
        <SkillForm/>
      </div>

      <main>
        <Card className="p-6">
            <CardContent>
                
            </CardContent>
        </Card>
      </main>
    </section>
  )
}
