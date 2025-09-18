import React from 'react'
import { ConnectDB } from '../../../../lib/db'
import Project from '../../../../models/project.model'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function fetchProjectData() {
  await ConnectDB()
  const data = await Project.find().sort({ createdAt: -1 })
  return data
}

export default async function ProjectPage() {
  const projects = await fetchProjectData()

  const visibleProjects = projects.slice(0, 4)
  const hasMore = projects.length > 4

  return (
    <div id='projects' className="container mx-auto pt-10 px-4 sm:px-6 lg:px-12">
      <div className="text-center mb-10">
        <h1 className="md:text-5xl text-3xl tracking-wider p-2 font-bold bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Featured Projects 🚀
        </h1>
        <p className="mt-2 text-muted-foreground text-sm md:text-lg">Built with modern tech & clean design</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {visibleProjects.map((proj) => (
          <Card key={proj._id} className="rounded-3xl overflow-hidden shadow-xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white transition hover:scale-[1.01] duration-300">
            <Image
              src={proj.projectImage}
              alt={proj.projectName}
              width={600}
              height={300}
              className="w-full h-52 object-fill border-b border-zinc-800"
            />
            <CardContent className="flex flex-col justify-between flex-grow px-6 space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">{proj.projectName}</h2>
                  <div className="flex space-x-3">
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5 hover:text-pink-500 transition" />
                      </a>
                    )}
                    {proj.liveLink && (
                      <a href={proj.liveLink} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-5 h-5 hover:text-indigo-500 transition" />
                      </a>
                    )}
                  </div>
                </div>

                {/* <div className="flex flex-wrap gap-2 mt-4">
                  {proj.projectTechStack.map((tech: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 text-white text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div> */}
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-zinc-800">
                {/* <Badge className="bg-green-600 text-white text-xs">✅ All Systems Operational</Badge> */}

                <Link href={`/project/${proj._id}`}>
                  <Button
                    variant="default"
                    className="text-xs px-4 py-1"
                  >
                    View Details →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <Link href="/project/view-all-projects">
            <Button variant="outline" className=" hover:bg-white ">
              View More Projects →
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
