"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";

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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      className="h-full"
    >
      <div
        className="
          group relative flex flex-col h-full overflow-hidden rounded-2xl
          border border-zinc-200/90 dark:border-zinc-800/90
          bg-white dark:bg-[#161618]
          hover:border-zinc-300 dark:hover:border-zinc-700
          shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/60
          transition-all duration-300
        "
      >
        {/* Clickable Image Section with Status Overlay */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Link
            href={`/blog/${_id}`}
            aria-label={`Read article: ${title}`}
            className="block h-full w-full"
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </Link>

          {/* Top Article Badge on Image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-sm pointer-events-auto">
              <BookOpen className="size-3 text-blue-400" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">
                Article
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-grow space-y-3">
          {/* Title Header */}
          <div>
            <Link
              href={`/blog/${_id}`}
              className="inline-block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            >
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug line-clamp-2">
                {title}
              </h3>
            </Link>
          </div>

          {/* Tags Pills */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="
                    px-2 py-0.5 rounded-md
                    bg-zinc-100 dark:bg-zinc-800/70
                    border border-zinc-200/80 dark:border-zinc-700/50
                    text-[11px] font-medium text-zinc-700 dark:text-zinc-300
                    transition-colors
                  "
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 px-1">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Card Footer: Read Article CTA */}
          <div className="pt-3 mt-auto border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
              Editorial Post
            </span>

            <Link
              href={`/blog/${_id}`}
              aria-label={`Read article: ${title}`}
              className="
                group/btn inline-flex items-center gap-1 px-3 py-1.5 rounded-lg
                text-xs font-semibold
                bg-zinc-100 hover:bg-zinc-900 hover:text-white
                dark:bg-zinc-800/80 dark:hover:bg-white dark:hover:text-zinc-900
                text-zinc-800 dark:text-zinc-200
                transition-all duration-200
              "
            >
              <span>Read Article</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MainBlogCard;
