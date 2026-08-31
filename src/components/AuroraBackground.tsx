"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function AuroraBackground({
  children,
  className = "",
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // GSAP quickTo for 60fps smooth cursor tracking
    const xTo = gsap.quickTo(mouseRef.current, "x", {
      duration: 0.45,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(mouseRef.current, "y", {
      duration: 0.45,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      isHoveredRef.current = true;
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const gridSpacing = 24;
    const blackholeRadius = 220;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");

      const cx = mouseRef.current.x;
      const cy = mouseRef.current.y;

      const cols = Math.ceil(canvas.width / gridSpacing) + 2;
      const rows = Math.ceil(canvas.height / gridSpacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const originalX = i * gridSpacing;
          const originalY = j * gridSpacing;

          let drawX = originalX;
          let drawY = originalY;
          let dotAlpha = isDark ? 0.15 : 0.14;
          let dotRadius = 1.2;

          if (isHoveredRef.current && cx > -500) {
            const dx = cx - originalX;
            const dy = cy - originalY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < blackholeRadius && dist > 1) {
              // Quadratic gravitational warp math: pull grid dots toward cursor
              const factor = Math.pow(1 - dist / blackholeRadius, 2);
              const pullAmount = factor * 68;

              drawX = originalX + (dx / dist) * pullAmount;
              drawY = originalY + (dy / dist) * pullAmount;

              dotAlpha = isDark ? 0.15 + factor * 0.65 : 0.14 + factor * 0.55;
              dotRadius = 1.2 + factor * 1.6;
            }
          }

          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${dotAlpha})`
            : `rgba(15, 23, 42, ${dotAlpha})`;

          ctx.beginPath();
          ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-full min-h-screen min-h-[100dvh] -z-10 pointer-events-none overflow-hidden bg-slate-50 dark:bg-[#030712] transition-colors duration-500 select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Soft Ambient Vignette for Crisp Content Readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-slate-50/50 via-transparent to-slate-50/70 dark:from-[#030712]/40 dark:via-transparent dark:to-[#030712]/60 pointer-events-none" />
      {children}
    </div>
  );
}