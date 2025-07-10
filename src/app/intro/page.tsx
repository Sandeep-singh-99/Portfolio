import TypewriterClient from "@/components/TypewriterClient";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ConnectDB } from "../../../lib/db";
import Intro from "../../../models/intro.model";

async function fetchIntroData() {
  await ConnectDB()
  const data = await Intro.findOne();
  return data;
}

export default async function IntroPage() {
  const introData = await fetchIntroData();

  return (
    <div className="my-8">
      <div className="flex items-center justify-between min-h-screen">
        <div>
          <h1 className="text-5xl font-bold gradient-title mb-4">{introData?.name}</h1>
          <p className="text-lg text-gray-700">
            {introData?.desc || "This is the default intro description."}
          </p>
          <TypewriterClient />
          <Button variant={"outline"}>Get Started</Button>
        </div>

        <div className="p-4">
          <Image
            src={introData?.image || "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg"}
            width={500}
            height={500}
            alt="Data codes through eyeglasses"
            className="shadow-lg rounded-lg object-cover bg-blend-multiply"
            priority
          />
        </div>
      </div>
    </div>
  );
}
