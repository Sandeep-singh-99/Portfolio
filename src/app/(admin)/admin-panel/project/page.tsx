import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectPage() {
  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Project Section</h1>
          <p className="text-gray-600 mt-1">
            This section controls the project content of your portfolio.
          </p>
        </div>

        <Button variant="destructive">Add Project</Button>
      </div>

      <main>
        <Card className="p-6">
          <CardContent></CardContent>
        </Card>
      </main>
    </section>
  );
}
