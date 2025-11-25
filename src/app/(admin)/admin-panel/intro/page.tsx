import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import IntroForm from "./_components/introFrom";
import { ConnectDB } from "../../../../../lib/db";
import Intro from "../../../../../models/intro.model";
import Image from "next/image";
import { FileText, Download, User, Code } from "lucide-react";
import DeleteIntro from "./_components/deleteIntro";

async function fetchIntroFromDB() {
  await ConnectDB();
  const data = await Intro.find().sort({ createdAt: -1 });
  return data;
}

export default async function IntroPage() {
  const introData = await fetchIntroFromDB();

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Intro Section</h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio's hero section content.
          </p>
        </div>
        <IntroForm />
      </div>

      <Separator />

      <section>
        {introData.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center  text-center">
              <div className="rounded-full bg-background p-4 mb-4 shadow-sm">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No content yet</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Get started by adding your introduction details using the form
                above.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {introData.slice(0, 1).map((intro) => (
              <Card key={intro._id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/5 min-h-[300px] bg-muted">
                    {intro.image ? (
                      <Image
                        src={intro.image}
                        alt={intro.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <User className="h-20 w-20" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-3xl font-bold tracking-tight">
                          {intro.name}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-lg">
                          Full Stack Developer
                        </p>
                      </div>
                      <DeleteIntro id={intro.id} />
                    </div>

                    <div className="mt-6 space-y-6 flex-1">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                          About
                        </h4>
                        <p className="text-base leading-relaxed text-foreground/90">
                          {intro.desc}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {intro.techStack.map((tech: string, i: number) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="px-3 py-1 text-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {intro.file && (
                      <div className="mt-8 pt-6 border-t">
                        <Button className="w-full sm:w-auto" asChild>
                          <a
                            href={intro.file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Resume
                            <Download className="ml-2 h-4 w-4 opacity-70" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
