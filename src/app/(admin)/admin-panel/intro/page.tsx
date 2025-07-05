import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

export default function IntroPage() {
  return (
    <section className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Intro Section</h1>
          <p className="text-gray-600 mt-1">
            This section controls the hero content of your portfolio.
          </p>
        </div>

        <Button variant="destructive">
          Add Intro
        </Button>
      </div>

      {/* Preview Card */}
      <main>
        <Card className="p-6">
          <CardContent>
           
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
