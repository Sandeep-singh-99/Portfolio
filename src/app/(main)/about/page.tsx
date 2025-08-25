import React from "react";
import { ConnectDB } from "../../../../lib/db";
import About from "../../../../models/about.model";

async function fetchAboutData() {
  await ConnectDB();
  const data = await About.findOne();
  return data;
}

export default async function AboutPage() {
  const aboutData = await fetchAboutData();

  return (
    <div id="about" className="py-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wider px-4 sm:px-6 lg:px-12">
          About Me
        </h1>
      </div>
      <div className="text-center text-[1rem]  md:text-2xl tracking-wider py-10 px-4 sm:px-6 lg:px-12">{aboutData.desc}</div>
    </div>
  );
}

