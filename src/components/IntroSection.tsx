"use client";

import { IIntro } from "../../models/intro.model";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import TypewriterClient from "@/components/TypewriterClient";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IntroSection({ intro }: { intro: IIntro }) {
  return (
    <div className="flex flex-col gap-6">
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
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-2"
      >
        <h1 className="text-3xl font-bold">
          Hi, I'm <span className="text-blue-400">{intro.name}</span>
        </h1>
        <span className="text-2xl font-bold">—</span>
        <TypewriterClient words={intro.techStack} />
      </motion.div>

      {/* Description */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-lg opacity-80 line-clamp-2"
      >
        {intro.desc}
      </motion.h2>

      {/* Resume Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
       <div className="flex items-center gap-5">
         <Button className="flex items-center gap-2 cursor-pointer">
          <FileText size={18} />
          Resume / CV
        </Button>

        <Link href={"/contact"}>
        <Button variant={"ghost"} className="cursor-pointer">
          <Send />
          Get in touch
        </Button>
        </Link>
       </div>
      </motion.div>
    </div>
  );
}
