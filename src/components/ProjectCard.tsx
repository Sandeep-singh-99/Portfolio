"use client"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  _id: string
  projectName: string
  projectImage: string
  projectTechStack: string[]
  githubLink?: string
  liveLink?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  _id,
  projectName,
  projectImage,
  projectTechStack,
  githubLink,
  liveLink,
}) => {
  return (
    <Card className="rounded-3xl overflow-hidden shadow-xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white transition hover:scale-[1.01] duration-300">
      <Image
        src={projectImage}
        alt={projectName}
        width={600}
        height={300}
        className="w-full h-52 object-fill border-b border-zinc-800"
      />
      <CardContent className="flex flex-col justify-between flex-grow px-6 space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{projectName}</h2>
            <div className="flex space-x-3">
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 hover:text-pink-500 transition" />
                </a>
              )}
              {liveLink && (
                <a href={liveLink} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-5 h-5 hover:text-indigo-500 transition" />
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 line-clamp-3">
            {projectTechStack.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-zinc-800 border-zinc-700 text-white text-xs px-3 py-1 rounded-full"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-zinc-800">
          <Link href={`/project/${_id}`}>
            <Button variant="default" className="text-xs px-4 py-1">
              View Details →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
