"use client";

import React, { useEffect, useRef } from "react";

/** Grid pitch. Fine on purpose - the field should read as a texture. */
const SPACING = 12;
const DOT_SIZE = 2.2;
/** Cursor push: radius, and peak force at the centre of it. */
const CURSOR_RADIUS = 120;
const CURSOR_FORCE = 52;
/** Pull back to the origin. Higher snaps back harder. */
const RETURN_FORCE = 6.4;
const DAMPING = 0.85;
/** Click ripples: expansion speed, ring thickness, lifetime. */
const RIPPLE_SPEED = 220;
const RIPPLE_WIDTH = 34;
const RIPPLE_LIFE = 1.7;
const RIPPLE_FORCE = 24;
const MAX_RIPPLES = 8;
/** Pre-rendered dot sprites, dim to bright. */
const SPRITE_STEPS = 20;

type Dot = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  glow: number;
};

type Ripple = { x: number; y: number; time: number };

export interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * A dot grid that gets pushed out of the way by the pointer and springs
 * back. Each dot is a real particle - force, velocity, position - not a
 * transform read straight off cursor distance, which is why the field
 * keeps moving after the pointer has gone and settles rather than stops.
 *
 * Canvas, with the dots pre-rendered as sprites at twenty brightness
 * steps: at this pitch a band holds a few thousand dots, and per-dot
 * arc() calls would not hold a frame budget. Clicking sends a ring.
 */
export function InteractiveDots({
  children,
  className = "",
}: AuroraBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const dots: Dot[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: -9999, y: -9999, inside: false };

    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let visible = true;
    let lightSprites: HTMLCanvasElement[] = [];
    let darkSprites: HTMLCanvasElement[] = [];

    const createSpritesForInk = (ink: { r: number; g: number; b: number }, baseAlpha: number) => {
      return Array.from({ length: SPRITE_STEPS }, (_, step) => {
        const sprite = document.createElement("canvas");
        sprite.width = 32;
        sprite.height = 32;
        const sctx = sprite.getContext("2d");
        if (sctx) {
          const t = step / (SPRITE_STEPS - 1);
          sctx.beginPath();
          sctx.fillStyle = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${baseAlpha + t * (1 - baseAlpha)})`;
          sctx.arc(16, 16, 16, 0, Math.PI * 2);
          sctx.fill();
        }
        return sprite;
      });
    };

    const buildSprites = () => {
      // Light theme ink: dark slate particles on light background
      const lightInk = { r: 30, g: 41, b: 59 };
      // Dark theme ink: bright white/slate particles on dark background
      const darkInk = { r: 255, g: 255, b: 255 };

      lightSprites = createSpritesForInk(lightInk, 0.4);
      darkSprites = createSpritesForInk(darkInk, 0.3);
    };

    const build = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      dots.length = 0;
      const cols = Math.floor(width / SPACING);
      const rows = Math.floor(height / SPACING);
      const insetX = (width - (cols - 1) * SPACING) / 2;
      const insetY = (height - (rows - 1) * SPACING) / 2;
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const ox = insetX + SPACING * col;
          const oy = insetY + SPACING * row;
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, glow: 0 });
        }
      }
      buildSprites();
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!previous) previous = now;
      // Clamped so a backgrounded tab does not resume with one huge step.
      const dt = Math.min(0.05, Math.max(0, (now - previous) / 1000));
      previous = now;
      if (!visible || document.hidden || dt === 0) return;

      elapsed += dt;
      ctx.clearRect(0, 0, width, height);

      // Frame-rate independent: same settle at 60Hz and 144Hz.
      const glowLerp = 1 - Math.pow(DAMPING, 60 * dt);
      const damping = Math.pow(DAMPING, 60 * dt);

      const isDark = document.documentElement.classList.contains("dark");
      const activeSprites = isDark ? darkSprites : lightSprites;

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        ripples[i].time += dt;
        if (ripples[i].time > RIPPLE_LIFE) ripples.splice(i, 1);
      }

      for (const dot of dots) {
        let fx = 0;
        let fy = 0;
        let glowTarget = 0;

        if (pointer.inside) {
          const dx = dot.ox - pointer.x;
          const dy = dot.oy - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CURSOR_RADIUS * CURSOR_RADIUS) {
            const dist = Math.sqrt(distSq) || 1;
            const falloff = 1 - dist / CURSOR_RADIUS;
            const push = falloff * falloff * CURSOR_FORCE;
            fx += (dx / dist) * push;
            fy += (dy / dist) * push;
            glowTarget = falloff;
          }
        }

        for (const ripple of ripples) {
          const dx = dot.ox - ripple.x;
          const dy = dot.oy - ripple.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const offset = Math.abs(dist - RIPPLE_SPEED * ripple.time);
          if (offset < RIPPLE_WIDTH) {
            const strength =
              (1 - offset / RIPPLE_WIDTH) * (1 - ripple.time / RIPPLE_LIFE);
            glowTarget = Math.max(glowTarget, strength);
            fx += (dx / dist) * strength * RIPPLE_FORCE;
            fy += (dy / dist) * strength * RIPPLE_FORCE;
          }
        }

        fx += (dot.ox - dot.x) * RETURN_FORCE;
        fy += (dot.oy - dot.y) * RETURN_FORCE;

        dot.vx = (dot.vx + fx * dt) * damping;
        dot.vy = (dot.vy + fy * dt) * damping;
        dot.x += dot.vx * dt * 60;
        dot.y += dot.vy * dt * 60;
        dot.glow += (glowTarget - dot.glow) * glowLerp;

        // A slow diagonal wave so the field is never entirely dead.
        const shimmer =
          (Math.sin(0.8 * elapsed + 0.015 * dot.ox + 0.02 * dot.oy) + 1) * 0.04;
        const brightness = Math.min(1, dot.glow + shimmer);
        const spriteIdx = Math.min(
          SPRITE_STEPS - 1,
          Math.max(0, Math.floor((SPRITE_STEPS - 1) * brightness))
        );
        if (activeSprites[spriteIdx]) {
          ctx.globalAlpha = isDark
            ? Math.min(1, 0.45 + shimmer + 0.55 * dot.glow)
            : Math.min(1, 0.55 + shimmer + 0.45 * dot.glow);
          ctx.drawImage(
            activeSprites[spriteIdx],
            dot.x - DOT_SIZE / 2,
            dot.y - DOT_SIZE / 2,
            DOT_SIZE,
            DOT_SIZE
          );
        }
      }

      ctx.globalAlpha = 1;
    };

    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.inside = true;
    };
    const onMove = (event: PointerEvent) =>
      setPointer(event.clientX, event.clientY);
    const onDown = (event: PointerEvent) => {
      setPointer(event.clientX, event.clientY);
      ripples.push({ x: pointer.x, y: pointer.y, time: 0 });
      if (ripples.length > MAX_RIPPLES) {
        ripples.splice(0, ripples.length - MAX_RIPPLES);
      }
    };
    const onLeave = () => {
      pointer.inside = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();

    const resizeWatcher = new ResizeObserver(build);
    resizeWatcher.observe(host);
    // Off-screen the loop keeps ticking but skips all the work.
    const viewWatcher = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    viewWatcher.observe(host);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointercancel", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeWatcher.disconnect();
      viewWatcher.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-full min-h-screen min-h-[100dvh] -z-10 pointer-events-none overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500 select-none ${className}`}
      aria-label="Interactive dot field"
    >
      <canvas ref={canvasRef} aria-hidden className="block h-full w-full absolute inset-0" />
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-slate-50/50 via-transparent to-slate-50/70 dark:from-black/40 dark:via-transparent dark:to-black/60 pointer-events-none" />
      {children}
    </div>
  );
}

export const AuroraBackground = InteractiveDots;
export default InteractiveDots;