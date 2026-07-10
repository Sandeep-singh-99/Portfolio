"use client";

import { IIntro } from "../../models/intro.model";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, Variants } from "framer-motion";

const TypewriterClient = dynamic(
  () => import("@/components/TypewriterClient"),
  {
    ssr: false,
  }
);

const links = [
  {
    href: "https://github.com/Sandeep-singh-99",
    icon: <Github size={20} />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/sandeep-singh-7a0219320",
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
  },
  {
    href: "mailto:sandeep.necoder@gmail.com",
    icon: <Mail size={20} />,
    label: "Email",
  },
  {
    href: "https://x.com/SinghNecoder",
    icon: <Twitter size={20} />,
    label: "Twitter",
  },
  {
    href: "https://www.instagram.com/sandeep.necoder",
    icon: <Instagram size={20} />,
    label: "Instagram",
  },
];


const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function IntroSection({ intro }: { intro: IIntro }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4"
    >

      <motion.div
        variants={item}
        className="flex flex-row items-center gap-8">
        <div className="relative h-24 w-24 md:h-28 md:w-28 shrink-0 overflow-hidden rounded-full">
          <Image
            src={intro.image}
            alt={intro.name}
            fill
            priority
            sizes="112px"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Hi, I'm {intro.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-muted-foreground">
            <div className="inline-flex items-center">
              <TypewriterClient words={intro.techStack} />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div variants={item}>
        <div className="prose dark:prose-invert max-w-none mt-5">
          <h2 className="text-[15px] dark:text-gray-300 text-gray-700 opacity-80 leading-relaxed whitespace-pre-wrap">
            {intro.desc}
          </h2>
        </div>
      </motion.div>

      {/* Resume Button */}
      <motion.div variants={item}>
        <div className="flex items-center gap-5">
          <a
            href={intro.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 cursor-pointer"
            >
              <FileText size={18} />
              Resume / CV
            </Button>
          </a>

          <Link href={"/contact"}>
            <Button variant={"default"} className="cursor-pointer">
              <Send />
              Get in touch
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="flex flex-row gap-3">
          {links.map((link, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transition-all duration-200"
                >
                  <div className="p-3 rounded-full bg-muted/50 hover:bg-accent text-muted-foreground hover:text-primary transition-colors border border-border/50 hover:border-accent-foreground/20">
                    {link.icon}
                  </div>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}