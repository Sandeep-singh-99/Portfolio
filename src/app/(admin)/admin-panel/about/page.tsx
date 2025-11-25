import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import AboutForm from "./_components/aboutForm";
import { ConnectDB } from "../../../../../lib/db";
import About from "../../../../../models/about.model";
import DeleteAbout from "./_components/delete-about";
import { Quote, Info } from "lucide-react";

async function fetchAboutData() {
  await ConnectDB();
  const data = await About.find().sort({ createdAt: -1 });
  return data;
}

export default async function AboutPage() {
  const aboutData = await fetchAboutData();

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">About Section</h1>
          <p className="text-muted-foreground mt-2">
            Manage the about content of your portfolio.
          </p>
        </div>
        <AboutForm />
      </div>

      <Separator />

      <section>
        {aboutData.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-background p-4 mb-4 shadow-sm">
                <Info className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No content yet</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Get started by adding your about details using the form above.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {aboutData.slice(0, 1).map((about) => (
              <Card key={about._id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-muted/20">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    About Description
                  </CardTitle>
                  <DeleteAbout id={about.id} />
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative pl-8 md:pl-12 border-l-4 border-primary/20">
                    <Quote className="absolute top-0 left-0 h-6 w-6 md:h-8 md:w-8 text-muted-foreground/20 -translate-x-1/2 -translate-y-1/2 bg-background p-1" />
                    <p className="text-lg md:text-xl leading-relaxed text-foreground/90 italic whitespace-pre-wrap">
                      {about.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
