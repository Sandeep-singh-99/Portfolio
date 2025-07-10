import TypewriterClient from "@/components/TypewriterClient";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ConnectDB } from "../../../lib/db";
import Intro from "../../../models/intro.model";

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
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-title">
            {introData?.name}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            {introData?.desc || "This is the default intro description."}
          </p>

          <TypewriterClient words={stack} />

          <Button variant="destructive" className="w-full sm:w-auto">
            Resume
          </Button>
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
