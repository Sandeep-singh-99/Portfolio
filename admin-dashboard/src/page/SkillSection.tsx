import { SkillSectionForm } from "@/components/skill/SkillSectionForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SkillSection() {
  // Dummy skill data (using state to allow updates)
  const [skillData, setSkillData] = useState([
    {
      id: 1,
      skill: "React.js",
      skillImage:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
      id: 2,
      skill: "Node.js",
      skillImage:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    },
    {
      id: 3,
      skill: "MongoDB",
      skillImage:
        "https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
    },
    {
      id: 4,
      skill: "Next.js",
      skillImage:
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    },
  ]);

  // Delete skill handler
  const handleDelete = (id) => {
    const updatedData = skillData.filter((item) => item.id !== id);
    setSkillData(updatedData);
  };

  // Dummy edit handler
  const handleEdit = (id) => {
    alert(`Edit functionality for skill id: ${id} (to be implemented)`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skill Section</h1>
          <p className="mt-2 text-gray-600">
            This is the skill section of the admin dashboard.
          </p>
        </div>

        <SkillSectionForm />
      </div>

      <div className="border border-gray-800 dark:border-gray-700 my-5"></div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skillData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center border rounded-lg p-4 shadow-sm"
          >
            <img
              src={item.skillImage}
              alt={item.skill}
              className="w-20 h-20 object-contain mb-3"
            />
            <p className="text-lg font-semibold">{item.skill}</p>

            <div className="flex gap-2 mt-3">
              <Button variant="outline" onClick={() => handleEdit(item.id)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
