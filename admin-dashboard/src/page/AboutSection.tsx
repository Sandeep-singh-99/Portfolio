import { AboutSectionForm } from "@/components/about/AboutSectionForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AboutSection() {
  // Use state for dynamic updates
  const [aboutData, setAboutData] = useState([
    {
      id: 1,
      description:
        "I am a passionate Full Stack Developer with experience in building scalable web applications using MERN stack, Next.js, Prisma and PostgreSQL.",
      image: "/images/about1.jpg",
    },
    {
      id: 2,
      description:
        "Enthusiastic Backend Developer skilled in Go, Docker, Microservices and DevOps tools. Always eager to learn new technologies.",
      image: "/images/about2.jpg",
    },
  ]);

  // Delete handler
  const handleDelete = (id) => {
    const updatedData = aboutData.filter((item) => item.id !== id);
    setAboutData(updatedData);
  };

  // Edit handler (currently dummy)
  const handleEdit = (id) => {
    alert(`Edit functionality for about id: ${id} (to be implemented)`);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">About Section</h1>
          <p className="mt-2 text-gray-600">
            This is the about section of the admin dashboard.
          </p>
        </div>
        <AboutSectionForm />
      </div>

      <div className="border border-gray-800 dark:border-gray-700 my-5"></div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aboutData.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-sm">
            <img
              src={item.image}
              alt="About Image"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700">{item.description}</p>

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
