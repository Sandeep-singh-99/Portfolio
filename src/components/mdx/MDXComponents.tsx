import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const mdxComponents = {
  // Headings
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mt-10 mb-5 scroll-m-20"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2 scroll-m-20"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-6 mb-3 scroll-m-20"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-5 mb-2 scroll-m-20"
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraph & Text
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 my-4"
      {...props}
    >
      {children}
    </p>
  ),

  // Links
  a: ({ href = "", children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
        {...props}
      >
        <span>{children}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
      </a>
    );
  },

  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 ml-6 list-disc space-y-2 text-zinc-700 dark:text-zinc-300 text-base sm:text-lg"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 text-zinc-700 dark:text-zinc-300 text-base sm:text-lg"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed pl-1" {...props}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({
    children,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-blue-500 bg-zinc-100/60 dark:bg-zinc-900/50 px-4 py-3 rounded-r-xl italic text-zinc-700 dark:text-zinc-300 [&>p]:my-1"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code & Pre
  code: CodeBlock,
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,

  // Table
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
      <table className="w-full text-left text-sm border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="bg-zinc-100 dark:bg-zinc-900/80 px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800/60"
      {...props}
    >
      {children}
    </td>
  ),

  // Horizontal Rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-zinc-200 dark:border-zinc-800" {...props} />
  ),

  // Images
  img: ({ src = "", alt = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block my-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover max-h-[500px]"
        loading="lazy"
        {...props}
      />
      {alt && (
        <span className="block text-center text-xs text-zinc-500 dark:text-zinc-400 py-2 bg-zinc-50 dark:bg-zinc-900/50">
          {alt}
        </span>
      )}
    </span>
  ),

  // Custom Interactive Components available in MDX
  Callout,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
};
