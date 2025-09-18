"use client";
import Image from "next/image";
import React from "react";

export const AuroraLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#050508] via-[#0a0c12] to-[#111827]">
      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,30,40,0.8),transparent_70%)] pointer-events-none"></div>

      {/* Aurora Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[15%] left-[-10%] w-[55rem] h-[35rem] bg-gradient-to-r from-purple-500/30 via-blue-400/20 to-transparent blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[15%] right-[-10%] w-[55rem] h-[35rem] bg-gradient-to-r from-pink-400/30 via-purple-500/20 to-transparent blur-[140px] rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Background Gradient PNG */}
      <Image
        className="absolute top-0 right-0 opacity-70 mix-blend-screen pointer-events-none"
        src="/gradient.png"
        width={600}
        height={600}
        alt="Gradient Background"
      />

      {/* Main Page Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};
