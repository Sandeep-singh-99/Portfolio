"use client";
import React from "react";
import Sidebar from "@/components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  if (session.status === "authenticated") {
    router.push("/admin-panel/intro");
  }

  if (pathname === "/admin-panel/login") {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
