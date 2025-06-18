import React from 'react'

const skills = [
  { name: 'HTML', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Tailwind CSS', image: 'https://www.svgrepo.com/show/374118/tailwind.svg' },
  { name: 'Git', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
]


export default function SkillSection() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center bg-white shadow-md p-4 rounded-xl hover:scale-105 transition-transform">
            <img src={skill.image} alt={skill.name} className="w-16 h-16 object-contain mb-2" />
            <p className="text-lg text-black font-semibold">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
