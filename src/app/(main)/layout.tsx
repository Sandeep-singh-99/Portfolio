import NavBar from "@/components/navbar";

import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center">
      <main className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex-1">
        <NavBar />
        {children}
      </main>
    </div>
  );
}
