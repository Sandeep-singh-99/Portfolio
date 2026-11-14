"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Share2,
  Check,
  Lock,
  ExternalLink,
  Github,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface CopyLinkButtonProps {
  projectName: string;
}

export function CopyLinkButton({ projectName }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link copied to clipboard!", {
          description: `Direct link to ${projectName} is ready to share.`,
        });
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            aria-label={`Share or copy link for ${projectName}`}
            className="h-9 px-3.5 rounded-full border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500 animate-in zoom-in-50 duration-200" />
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Copied
                </span>
              </>
            ) : (
              <>
                <Share2 className="size-3.5" />
                <span className="text-xs font-medium">Share</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          Copy project URL
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface HeroShowcaseFrameProps {
  imageSrc: string;
  projectName: string;
  liveLink?: string;
  githubLink?: string;
}

export function HeroShowcaseFrame({
  imageSrc,
  projectName,
  liveLink,
}: HeroShowcaseFrameProps) {
  // Extract a clean domain or fallback mockup domain
  let displayDomain = "sandeep-singh.com";
  if (liveLink && liveLink.trim() !== "") {
    try {
      const parsed = new URL(liveLink);
      displayDomain = parsed.hostname.replace(/^www\./, "");
    } catch {
      displayDomain = projectName.toLowerCase().replace(/[^a-z0-9]/g, "") + ".app";
    }
  } else {
    displayDomain = projectName.toLowerCase().replace(/[^a-z0-9]/g, "") + ".dev";
  }

  return (
    <div className="relative group w-full my-8">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-1.5 sm:-inset-2 rounded-3xl bg-gradient-to-r from-blue-500/15 via-violet-500/15 to-emerald-500/10 blur-xl opacity-60 dark:opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none -z-10"
      />

      {/* Browser Window Mockup Frame */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-[#161618] shadow-xl dark:shadow-2xl dark:shadow-black/70 backdrop-blur-sm transition-all duration-300">
        {/* macOS style Window Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/90 dark:bg-zinc-900/80 select-none">
          {/* Traffic Light Window Controls */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-400/80 border border-red-500/30" />
            <span className="size-3 rounded-full bg-amber-400/80 border border-amber-500/30" />
            <span className="size-3 rounded-full bg-emerald-400/80 border border-emerald-500/30" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 text-xs font-mono max-w-[220px] sm:max-w-xs md:max-w-sm truncate shadow-xs">
            <Lock className="size-3 shrink-0 text-emerald-500" />
            <span className="truncate">{displayDomain}</span>
          </div>

          {/* Quick link indicator */}
          <div className="flex items-center gap-2 text-zinc-400">
            {liveLink && liveLink.trim() !== "" ? (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${projectName} in new window`}
                className="p-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <ArrowUpRight className="size-4" />
              </a>
            ) : (
              <Globe className="size-3.5 opacity-60" />
            )}
          </div>
        </div>

        {/* Screenshot Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={imageSrc}
            alt={`Screenshot of ${projectName} user interface`}
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />
        </div>
      </div>
    </div>
  );
}

export function MotionContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
