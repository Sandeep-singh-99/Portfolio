import { SkillSectionForm } from "@/components/skill/SkillSectionForm";
import { Button } from "@/components/ui/button";
import { useSkillStore } from "@/store/useSkillStore";
import { useEffect, useState } from "react";

export default function SkillSection() {

  const { fetchSkillData, skillData, deleteSkill, isDeleteLoading } = useSkillStore()

  useEffect(() => {
    fetchSkillData();
  }, [fetchSkillData]);

  // Dummy skill data (using state to allow updates)
  // const [skillData, setSkillData] = useState([
  //   {
  //     id: 1,
  //     skill: "React.js",
  //     skillImage:
  //       "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  //   },
  //   {
  //     id: 2,
  //     skill: "Node.js",
  //     skillImage:
  //       "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  //   },
  //   {
  //     id: 3,
  //     skill: "MongoDB",
  //     skillImage:
  //       "https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
  //   },
  //   {
  //     id: 4,
  //     skill: "Next.js",
  //     skillImage:
  //       "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  //   },
  // ]);

   if (!skillData || skillData.length === 0) {
      return (
        <div className="p-5">
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
          <p>No data available.</p>
        </div>
      );
    }

  // Delete skill handler
  const handleDelete = (id) => {
    deleteSkill(id);
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
            key={item._id}
            className="flex flex-col items-center border rounded-lg p-4 shadow-sm"
          >
            <img
              src={item.skillImage}
              alt={item.skill}
              className="w-20 h-20 object-contain mb-3"
            />
            <p className="text-lg font-semibold">{item.skill}</p>

            <div className="flex gap-2 mt-3">
              <Button variant="outline" onClick={() => handleEdit(item._id)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                disabled={isDeleteLoading}
                onClick={() => handleDelete(item._id)}
              >
                {isDeleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
