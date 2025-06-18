import React from 'react'

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio built with React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1581090700227-1e8e5f2e1f98?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'E-commerce App',
    description: 'Full-stack MERN app with cart, payment gateway, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'ToDo App',
    description: 'A minimal productivity app with CRUD and authentication features.',
    image: 'https://images.unsplash.com/photo-1601933470928-cfbdb45c8b8e?auto=format&fit=crop&w=800&q=80',
  },
]

export default function ProjectSection() {
  return (
    <div className="py-12 ">
      <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
