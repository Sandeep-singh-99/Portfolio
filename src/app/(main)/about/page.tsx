import React from "react";
import { ConnectDB } from "../../../../lib/db";
import About, { IAbout } from "../../../../models/about.model";
import AboutSection from "@/components/AboutSection";

async function fetchAbout(): Promise<IAbout | null> {
  await ConnectDB();
  const data = await About.find()
    .sort({ createdAt: -1 })
    .limit(1)
    .lean<IAbout[]>();
  if (data.length > 0) {
    return {
      ...data[0],
      _id: data[0]._id?.toString(),
    };
  }
  return null;
}

export default async function AboutPage() {
  const about = await fetchAbout();

  if (!about) return <div>No about info found.</div>;

  return (
    <div>
      <AboutSection about={about} />
    </div>
  );
}
