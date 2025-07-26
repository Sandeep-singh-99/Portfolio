import NavBar from "@/components/navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4">
        {children}
      </div>
    </>
  );
}
