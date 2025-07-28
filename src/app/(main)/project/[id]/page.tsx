"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';

interface Project {
  _id: { $oid: string };
  projectName: string;
  projectDesc: string;
  projectImage: string;
  projectTechStack: string[];
  githubLink: string;
  liveLink: string;
  projectImagePublicId: string;
  createdAt: string;
  updatedAt: string
  __v: number;
}

export default function ProjectPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/project/${id}`);
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
        } else {
          setProject(data.data);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
  }

  return (
    <div className="min-h-screen pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-background">
      <Card className="max-w-7xl mx-auto">
        {/* <CardHeader>
          <CardTitle className="text-3xl font-bold">{project.projectName}</CardTitle>
        </CardHeader> */}
        <CardContent className="space-y-6">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={project.projectImage || '/fallback-image.png'}
              alt={`${project.projectName} screenshot`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.projectTechStack.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.projectName} on GitHub`}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.projectName}`}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          </div>

           <div data-color-mode="dark" className="prose dark:prose-invert">
            <MDEditor.Markdown source={project.projectDesc} className='p-4' />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Created: {project.createdAt ? format(new Date(project.createdAt), 'MM/dd/yyyy') : 'N/A'}</p>
            {/* <p>Updated: {project.updatedAt ? format(new Date(project.updatedAt), 'MM/dd/yyyy') : 'N/A'}</p> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}