import NavBar from "@/components/navbar";
import AuroraBackground from "@/components/AuroraBackground";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent relative flex flex-col items-center">
      <AuroraBackground />
      <main className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex-1">
        {children}
      </main>
    </div>
  );
}
