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
    <div className="text-center text-lg md:text-2xl tracking-wider py-10 px-4 sm:px-6 lg:px-12">{aboutData.desc}</div>
  );
}
