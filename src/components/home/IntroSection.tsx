"use client";

import { IIntro } from "../../models/intro.model";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, Variants } from "framer-motion";

const TypewriterClient = dynamic(
  () => import("@/components/home/TypewriterClient"),
  {
    ssr: false,
  }
);

const links = [
  {
    href: "https://github.com/Sandeep-singh-99",
    icon: <Github className="size-4" />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/sandeep-singh-7a0219320",
    icon: <Linkedin className="size-4" />,
    label: "LinkedIn",
  },
  {
    href: "mailto:sandeep.necoder@gmail.com",
    icon: <Mail className="size-4" />,
    label: "Email",
  },
  {
    href: "https://x.com/SinghNecoder",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-4 fill-current"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: "X (Twitter)",
  },
  {
    href: "https://www.instagram.com/sandeep.necoder",
    icon: <Instagram className="size-4" />,
    label: "Instagram",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function IntroSection({ intro }: { intro: IIntro }) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
      aria-label="Introduction"
    >
      {/* Top Header: Avatar + Info */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6"
      >
        <div className="relative size-20 sm:size-24 shrink-0 rounded-full p-1 ring-1 ring-border/80 dark:ring-border/50 bg-background/50 shadow-xs">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={intro.image}
              alt={intro.name}
              fill
              priority
              loading="eager"
              sizes="(max-width: 640px) 80px, 96px"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 w-fit select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for opportunities</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Hi, I'm {intro.name}
          </h1>

          <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground font-mono">
            <span className="text-muted-foreground/50 select-none">&gt;</span>
            <TypewriterClient words={intro.techStack} />
          </div>
        </div>
      </motion.div>

      {/* Bio / Description */}
      <motion.div variants={item}>
        <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed font-normal whitespace-pre-wrap max-w-2xl text-pretty">
          {intro.desc}
        </p>
      </motion.div>

      {/* CTAs and Social Links */}
      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-3 pt-1"
      >
        <Button asChild className="h-10 px-5 rounded-full font-medium gap-2 shadow-xs hover:shadow-sm cursor-pointer group transition-all">
          <Link href="/contact">
            <span>Get in touch</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-10 px-5 rounded-full font-medium gap-2 border-border/80 hover:bg-accent/60 cursor-pointer transition-all group"
        >
          <a
            href={intro.file}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Resume / CV (opens in a new tab)"
          >
            <FileText className="size-4" />
            <span>Resume / CV</span>
            <ExternalLink className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Button>

        <div className="hidden sm:block h-5 w-px bg-border/60 mx-1" />

        {/* Social Icons */}
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Tooltip key={link.label}>
              <TooltipTrigger asChild>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="size-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 border border-transparent hover:border-border/50 transition-all duration-200"
                >
                  {link.icon}
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {link.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}