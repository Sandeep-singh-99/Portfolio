// import React from "react";
// import { ConnectDB } from "../../../../lib/db";
// import Skill from "../../../../models/skill.model";
// import Image from "next/image";

// async function fetchSkillData() {
//   await ConnectDB();
//   const data = await Skill.find({}).sort({ createdAt: -1 });
//   return data;
// }

// // px-4 sm:px-6 lg:px-12

// export default async function SkillPage() {
//   const skills = await fetchSkillData();
//   return (
//     <div id="skills" className="container mx-auto py-10">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
//           Professional Skills
//         </h1>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
//         {skills.map((skill) => (
//           <div
//             key={skill.id}
//             className="flex items-center justify-center space-x-4 mb-6 bg-[#1a1a1c]  p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
//           >
//             <Image
//               width={24}
//               height={24}
//               src={skill.skillImage}
//               alt={skill.skillName}
//               className="w-6 h-6 md:w-8 md:h-8 object-contain"
//             />
//             <h2 className="text-lg md:text-xl font-semibold text-white">
//               {skill.skillName}
//             </h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Skill from "../../../../models/skill.model";
import Image from "next/image";

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

async function fetchSkillData() {
  await ConnectDB();
  const data = await Skill.find({}).sort({ createdAt: -1 });
  return data;
}

export default async function SkillPage() {
  const skills = await fetchSkillData();

  // Group skills by skillCategory
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.skillCategory || "Other"; 
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div id="skills" className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Professional Skills
        </h1>
      </div>

      {Object.keys(groupedSkills).map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 capitalize">
            {category}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {groupedSkills[category].map((skill: Skill) => (
              <div
                key={skill._id.toString()}
                className="flex items-center justify-center space-x-4 mb-6 bg-[#1a1a1c] p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <Image
                  width={24}
                  height={24}
                  src={skill.skillImage}
                  alt={skill.skillName}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {skill.skillName}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}