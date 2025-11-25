import React from "react";
import { ConnectDB } from "../../../lib/db";
import Intro from "../../../models/intro.model";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

async function fetchIntro() {
  await ConnectDB();
  const data = await Intro.find().sort({ createdAt: -1 }).limit(1);
  return data[0];
}

export default async function Home() {
  const intro = await fetchIntro();

  if (!intro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter">Welcome</h1>
        <p className="text-muted-foreground">
          No profile information available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-12 lg:py-20">
      <div className="flex-1 space-y-8 text-center lg:text-left">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Full Stack Developer
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Hi, I'm <span className="text-primary">{intro.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {intro.desc}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
          {intro.file && (
            <Button size="lg" className="rounded-full" asChild>
              <a href={intro.file} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          )}
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href="#contact">
              Contact Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Tech Stack
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {intro.techStack.map((tech: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm py-1 px-3"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
          {/* Social Links Placeholders - You might want to add these to your DB schema later */}
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:contact@example.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>

      <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10" />
        <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-muted shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
          {intro.image ? (
            <Image
              src={intro.image}
              alt={intro.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
