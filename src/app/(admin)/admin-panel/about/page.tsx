import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function AboutPage() {
  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">About Section</h1>
          <p className="text-gray-600 mt-1">
            This section controls the about content of your portfolio.
          </p>
        </div>

        <Button variant="destructive">Add About</Button>
      </div>

      <main>
        <Card className="p-6">
            <CardContent>
                
            </CardContent>
        </Card>
      </main>
    </section>
  );
}
