"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SubLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
    useEffect(() => {
    // If user is authenticated and on login page, redirect to dashboard
    if (session.status === "authenticated" && pathname === "/admin-panel/login") {
      router.push("/admin-panel/intro");
    }

    // If user is unauthenticated and trying to access any admin panel route, redirect to login
    if (session.status === "unauthenticated" && pathname.startsWith("/admin-panel/intro")) {
      router.push("/admin-panel/login");
    }
  }, [session.status, pathname, router]);


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
