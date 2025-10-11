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
  projectSubDesc: string
  projectImage: string
  projectTechStack: string[]
  githubLink?: string
  liveLink?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  _id,
  projectName,
  projectSubDesc,
  projectImage,
  projectTechStack,
  githubLink,
  liveLink,
}) => {
  return (
    <Card className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 transition-transform hover:scale-[1.02] hover:shadow-2xl duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-64 md:h-auto relative group">
          <Image
            src={projectImage}
            alt={projectName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Optional overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content Section */}
        <CardContent className="flex flex-col justify-between md:w-1/2 w-full px-6 py-6 space-y-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 hover:text-indigo-400 transition-colors">
              {projectName}
            </h2>
            <p className="text-sm md:text-base text-zinc-300">{projectSubDesc}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {projectTechStack.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 text-white text-xs md:text-sm px-3 py-1 rounded-full"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-4 mt-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm md:text-base font-medium hover:text-pink-500 transition"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm md:text-base font-medium hover:text-indigo-500 transition"
              >
                <Globe className="w-5 h-5" />
                <span>Live</span>
              </a>
            )}
            <Link href={`/project/${_id}`}>
              <Button
                variant="default"
                size="sm"
                className="text-xs md:text-sm px-4 py-2 hover:bg-indigo-600 transition"
              >
                View Details →
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default ProjectCard

