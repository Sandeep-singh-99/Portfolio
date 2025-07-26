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
    <div className="py-10 px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 min-h-screen">
        {/* Text Section */}
        <div className="w-full  text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold">
            {introData?.name}
          </h1>

           <TypewriterClient words={stack} />

          <p className="text-base sm:text-lg tracking-wider text-gray-600 dark:text-gray-300">
            {introData?.desc || "This is the default intro description."}
          </p>

         

           <a
            href={introData?.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              View Resume
            </Button>
          </a>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={introData?.image || "/fallback-image.webp"}
            alt="profile picture"
            className="rounded-full object-cover dark:shadow-xl"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>
    </div>
  );
}
