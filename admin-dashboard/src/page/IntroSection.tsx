import { IntroSectionForm } from "@/components/intro/IntroSectionForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HeroSection() {
  // Use state to handle data updates/deletes
  const [introData, setIntroData] = useState([
    {
      id: 1,
      name: "Akash Yadav",
      description: "Full Stack Developer with expertise in MERN stack",
      techStack: "React, Node.js, MongoDB, Next.js, Prisma",
      image: "/images/profile.jpg",
      file: "/files/resume.pdf",
    },
    {
      id: 2,
      name: "John Doe",
      description: "Backend Engineer specialized in GoLang & PostgreSQL",
      techStack: "Go, PostgreSQL, Redis, Docker",
      image: "/images/john.jpg",
      file: "/files/john_resume.pdf",
    },
  ]);

  // Delete handler
  const handleDelete = (id) => {
    const updatedData = introData.filter((item) => item.id !== id);
    setIntroData(updatedData);
  };

  // Edit handler (for now it's dummy)
  const handleEdit = (id) => {
    alert(`Edit functionality for intro id: ${id} (to be implemented)`);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Intro Section</h1>
          <p className="mt-2 text-gray-600">
            This is the intro section of the admin dashboard.
          </p>
        </div>
        <IntroSectionForm />
      </div>

      <div className="border border-gray-800 dark:border-gray-700 my-5"></div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {introData.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Tech Stack:</strong> {item.techStack}
              </p>
              <a
                href={item.file}
                className="text-blue-500 mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download File
              </a>
            </div>

            <div className="flex gap-2 mt-4">
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
