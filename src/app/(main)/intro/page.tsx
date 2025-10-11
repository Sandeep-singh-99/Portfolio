import TypewriterClient from "@/components/TypewriterClient";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Intro from "../../../../models/intro.model";

async function fetchIntroData() {
  await ConnectDB();
  const data = await Intro.findOne();
  return data;
}

export default async function IntroPage() {
  const introData = await fetchIntroData();
  const stack = introData?.techStack || [];

  return (
    <div className="px-4 sm:px-6 lg:px-20 pb-10 pt-20 md:pb-4">
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
        {/* Profile Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={introData?.image || "/fallback-image.webp"}
            alt="profile picture"
            className="rounded-full object-cover"
            width={250}
            height={250}
            priority
          />
        </div>

        {/* Text Content */}
        <div className="w-full flex flex-col items-center justify-center text-center md:text-left space-y-4">
          <h1 className="text-4xl sm:text-4xl font-bold">
            Hi, I'm{" "}
            <span
              className="bg-clip-text text-transparent ml-2
             bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
             dark:from-green-300 dark:via-blue-400 dark:to-purple-400"
            >
              {introData?.name}
            </span>
          </h1>

          <TypewriterClient words={stack} />

          {/* 💼 Opportunity Tag Section */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-zinc-800 text-zinc-200 border border-zinc-700">
              💼 Open to opportunities
            </span>
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-zinc-800 text-zinc-200 border border-zinc-700">
              🌍 Remote Work
            </span>
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-zinc-800 text-zinc-200 border border-zinc-700">
              🤝 Freelance
            </span>
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-zinc-800 text-zinc-200 border border-zinc-700">
              🧑‍💻 Collaboration
            </span>
          </div>

          {/* Resume Button */}
          <a
            href={introData?.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold 
               text-blue-500 border border-zinc-600 bg-transparent
               transition-all duration-300 
               hover:shadow-lg hover:scale-105"
            >
              Resume
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
