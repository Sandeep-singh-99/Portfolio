import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* About Section */}
      <Card className="max-w-3xl w-full border-none shadow-2xl bg-white/95 backdrop-blur-sm relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-10" />
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
            About Me
          </CardTitle>
          <p className="mt-4 text-xl text-gray-600 max-w-lg mx-auto">
            Hi, I’m [Your Name], a [Your Profession, e.g., Web Developer] dedicated to building innovative and user-focused solutions.
          </p>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <div className="mt-6 flex flex-col items-center space-y-6">
            {/* Profile Image */}
            <div className="relative group">
              <Avatar className="w-36 h-36 ring-4 ring-blue-200 group-hover:ring-blue-400 transition-all duration-300">
                <AvatarImage
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                />
                <AvatarFallback>YN</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 rounded-full bg-blue-600/10 group-hover:bg-blue-600/20 transition-all duration-300" />
            </div>
            {/* Bio Text */}
            <div className="text-gray-700 max-w-2xl text-lg space-y-4">
              <p>
                With a passion for creating seamless digital experiences, I specialize in modern web development using technologies like React, TypeScript, and Tailwind CSS. My journey began [insert start, e.g., "five years ago when I built my first website"], and since then, I’ve worked on diverse projects ranging from small startups to large-scale applications.
              </p>
              <p>
                I’m skilled in [list skills, e.g., frontend development, UI/UX design, and API integration], with a focus on writing clean, efficient code and delivering intuitive user interfaces. When I’m not coding, you’ll find me [hobby, e.g., "exploring new tech trends or hiking"].
              </p>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                <a href="/projects">View My Work</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}