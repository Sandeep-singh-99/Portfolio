"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  _id: string;
  projectName: string;
  projectSubDesc: string;
  projectImage: string;
  projectTechStack: string[];
  githubLink?: string;
  liveLink?: string;
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
    <Card className="rounded-2xl overflow-hidden shadow-md border border-zinc-800 bg-zinc-900 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        {/* <div className="md:w-1/2 w-full h-64 md:h-auto relative">
          <Image
            src={projectImage}
            alt={projectName}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div> */}
         <div className="md:w-1/2 w-full bg-zinc-950 flex items-center justify-center rounded-2xl">
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={projectImage}
              alt={projectName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center p-2"
            />
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="flex flex-col justify-between md:w-1/2 w-full px-5 py-5 space-y-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-1">
              {projectName}
            </h2>
            <p className="text-sm text-zinc-400 font-sans">{projectSubDesc}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {projectTechStack.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 text-white text-xs px-2 py-1 rounded-full"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap justify-end items-center gap-3 mt-2">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-zinc-300 hover:text-pink-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-zinc-300 hover:text-indigo-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Live
              </a>
            )}
            <Link href={`/project/${_id}`}>
              <Button size="sm" className="px-3 py-1 text-xs">
                View Details →
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProjectCard;

