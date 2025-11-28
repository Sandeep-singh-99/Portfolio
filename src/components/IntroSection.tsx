"use client";

import { IIntro } from "../../models/intro.model";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import TypewriterClient from "@/components/TypewriterClient";
import { motion } from "framer-motion";
import Link from "next/link";
import LeftSideBar from "./leftsidebar";
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

export default function IntroSection({ intro }: { intro: IIntro }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="h-32 w-32 relative rounded-full overflow-hidden bg-blue-400"
      >
        <Image
          src={intro.image}
          alt={intro.name}
          width={120}
          height={120}
          className="object-contain"
        />
      </motion.div>

      {/* Title + Typewriter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className=" md:flex md:items-center md:gap-2 space-y-2  flex-col md:flex-row"
      >
        <h1 className="md:text-4xl text-xl font-bold">
          Hi, I'm <span className="">{intro.name}</span>
        </h1>
        <span className="md:text-2xl font-bold hidden md:block">—</span>
        <TypewriterClient words={intro.techStack} />
      </motion.div>

      {/* Description */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.3 }}
        className=" opacity-80"
      >
        <div className="prose dark:prose-invert max-w-none">
          <p className="md:text-lg text-sm opacity-80 leading-relaxed whitespace-pre-wrap">
            {intro.desc}
          </p>
        </div>
      </motion.h2>

      {/* Resume Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
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

       <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.4 }}
      >
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
    </div>
  );
}
