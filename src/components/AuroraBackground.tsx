"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showDotGrid?: boolean;
  interactiveCursor?: boolean;
}

export default function AuroraBackground({
  children,
  className = "",
  showDotGrid = true,
  interactiveCursor = true,
}: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!interactiveCursor) return;

    // GSAP quickTo for 60fps smooth cursor tracking
    const xTo = gsap.quickTo(orbRef.current, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(orbRef.current, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });
      setIsHovered(true);

      // Center 500px spotlight orb around cursor
      xTo(clientX - 250);
      yTo(clientY - 250);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [interactiveCursor]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-full min-h-screen min-h-[100dvh] -z-10 pointer-events-none overflow-hidden bg-slate-50 dark:bg-[#030712] transition-colors duration-500 select-none ${className}`}
      aria-hidden="true"
    >
      {/* CURSOR-FOLLOWING GSAP NEUTRAL AMBIENT SPOTLIGHT */}
      {interactiveCursor && (
        <div
          ref={orbRef}
          className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full filter blur-[100px] sm:blur-[130px] pointer-events-none transform-gpu will-change-transform transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          } bg-slate-900/10 dark:bg-white/10 z-0`}
        />
      )}

      {/* REPEATING DOT GRID OVERLAY */}
      {showDotGrid && (
        <>
          {/* Base Ambient Dot Grid */}
          <div className="absolute inset-0 z-10">
            {/* Light Mode Grid */}
            <div
              className="absolute inset-0 dark:hidden opacity-40"
              style={{
                backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.12) 1.2px, transparent 1.2px)`,
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0",
              }}
            />

            {/* Dark Mode Grid */}
            <div
              className="absolute inset-0 hidden dark:block opacity-35"
              style={{
                backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.14) 1.2px, transparent 1.2px)`,
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0",
              }}
            />
          </div>

          {/* Interactive Cursor Grid Matrix Spotlight */}
          {interactiveCursor && isHovered && (
            <>
              {/* Light Mode Highlight */}
              <div
                className="absolute inset-0 z-15 pointer-events-none dark:hidden transition-opacity duration-300"
                style={{
                  backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.45) 1.6px, transparent 1.6px)`,
                  backgroundSize: "24px 24px",
                  maskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                }}
              />

              {/* Dark Mode Highlight */}
              <div
                className="absolute inset-0 z-15 pointer-events-none hidden dark:block transition-opacity duration-300"
                style={{
                  backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.5) 1.6px, transparent 1.6px)`,
                  backgroundSize: "24px 24px",
                  maskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                }}
              />
            </>
          )}
        </>
      )}

      {/* Soft Ambient Vignette for Crisp Content Readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-slate-50/50 via-transparent to-slate-50/70 dark:from-[#030712]/40 dark:via-transparent dark:to-[#030712]/60 pointer-events-none" />

      {children}
    </div>
  );
}