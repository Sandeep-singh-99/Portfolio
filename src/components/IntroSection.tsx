"use client";

import { IIntro } from "../../models/intro.model";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import Link from "next/link";
import LeftSideBar from "./leftsidebar";
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
      {/* Profile Image */}
      <motion.div
        variants={item}
        className="h-32 w-32 relative rounded-full overflow-hidden bg-secondary border-2 border-primary/10 shadow-md"
      >
        <Image
          src={intro.image}
          alt={intro.name}
          width={120}
          height={120}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Title + Typewriter */}
      <motion.div
        variants={item}
        className=" md:flex md:items-center md:gap-2 space-y-2  flex-col md:flex-row"
      >
        <h1 className="md:text-6xl text-4xl font-semibold">
          Hi, I'm <span className="">{intro.name}</span>
        </h1>
      </motion.div>

      {/* Lazy loaded typewriter */}
      <motion.div variants={item} className="min-h-[28px] md:min-h-[36px]">
        <TypewriterClient words={intro.techStack} />
      </motion.div>

      {/* Description */}
      <motion.div variants={item}>
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="md:text-lg text-sm opacity-80 leading-relaxed whitespace-pre-wrap">
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

      {/* Socials */}
      <div className="md:hidden block">
        <LeftSideBar />
      </div>

      <motion.div variants={item}>
        <div className="hidden md:flex flex-row gap-3">
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
