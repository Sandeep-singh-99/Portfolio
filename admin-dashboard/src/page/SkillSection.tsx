import { SkillSectionForm } from "@/components/skill/SkillSectionForm";



export default function SkillSection() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skill Section</h1>
          <p className="mt-2 text-gray-600">
            This is the skill section of the admin dashboard.
          </p>
        </div>

        <SkillSectionForm/>
      </div>

      <div className="border border-gray-800 dark:border-gray-700 my-5"></div>

      <section>
        <h2 className="text-xl font-bold">Skill Content</h2>
        <p className="mt-2 text-gray-600">
          This is the content area for the skill section.
        </p>
      </section>
    </div>
  )
}
