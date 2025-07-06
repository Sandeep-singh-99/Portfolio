import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import AboutForm from "./_components/aboutForm";
import { ConnectDB } from "../../../../../lib/db";
import About from "../../../../../models/about.model";


async function fetchAboutData() {
  await ConnectDB();
  const data = await About.find().sort({ createdAt: -1 });
  return data;
}

export default async function AboutPage() {
  const aboutData = await fetchAboutData();
  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">About Section</h1>
          <p className="text-gray-600 mt-1">
            This section controls the about content of your portfolio.
          </p>
        </div>

        <AboutForm />
      </div>

      <main>
        <Card className="p-6">
            <CardContent>
                {
                    aboutData.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No about data available.</p>
                            <p className="text-gray-400 text-sm mt-2">
                                Add new content using the form above to get started.
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {aboutData.map((about) => (
                                <li key={about._id} className="border p-4 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-semibold">{about.desc}</h2>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </CardContent>
        </Card>
      </main>
    </section>
  );
}
