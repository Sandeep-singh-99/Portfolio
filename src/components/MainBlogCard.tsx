"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface MainBlogCardProps {
  _id: string;
  title: string;
  image: string;
  tags: string[];
}

const MainBlogCard: React.FC<MainBlogCardProps> = ({
  _id,
  title,
  image,
  tags,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        className="
          group relative flex flex-col overflow-hidden rounded-2xl 
          border border-zinc-200 dark:border-[#1e2939]
          bg-white dark:bg-[#171717] 
          shadow-md hover:shadow-xl dark:shadow-none
          transition-all duration-300
          p-0
        "
      >
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <CardContent className="p-3 flex flex-col space-y-2 flex-grow">
          {/* Header: Title */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {title}
            </h2>
          </div>

          {/* Tags */}
          <div className="mt-2">
            <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 mb-2 uppercase tracking-wider">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <div
                  key={index}
                  className="
                    flex items-center justify-center
                    px-2.5 py-1 rounded-md
                    bg-zinc-100 dark:bg-zinc-800/50
                    border border-zinc-200 dark:border-zinc-700/50
                    text-xs font-medium text-zinc-700 dark:text-zinc-300
                  "
                >
                  {tag}
                </div>
              ))}
              {tags.length > 3 && (
                <div className="text-xs text-zinc-500 flex items-center px-1">
                  +{tags.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-medium text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                Read Article
              </span>
            </div>

            <Link
              href={`/blog/${_id}`}
              className="
                flex items-center gap-1 
                text-sm font-medium text-zinc-600 dark:text-zinc-400 
                hover:text-zinc-900 dark:hover:text-white transition-colors
              "
            >
              Read More
              <ArrowRight size={16} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MainBlogCard;
