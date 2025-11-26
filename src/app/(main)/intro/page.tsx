import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Intro, { IIntro } from "../../../../models/intro.model";
import IntroSection from "@/components/IntroSection";

async function fetchIntro(): Promise<IIntro | null> {
  await ConnectDB();
  const data = await Intro.find()
    .sort({ createdAt: -1 })
    .limit(1)
    .lean<IIntro[]>();
  if (data.length > 0) {
    return {
      ...data[0],
      _id: data[0]._id?.toString(),
    } as IIntro;
  }
  return null;
}

export default async function IntroPage() {
  const intro = await fetchIntro();

  if (!intro) return null;

  return (
    <div>
      <IntroSection intro={intro} />
    </div>
  );
}
