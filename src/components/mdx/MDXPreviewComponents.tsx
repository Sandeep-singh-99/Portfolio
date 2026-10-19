"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const mdxPreviewComponents = {
  code: CodeBlock,
  callout: Callout,
  Callout: Callout,
  badge: Badge,
  Badge: Badge,
  button: Button,
  Button: Button,
  a: ({ href = "", children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const text = React.Children.toArray(children)
      .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : ""))
      .join(" ");
    
    const isProjectDetails =
      href.includes("/project/") ||
      text.toLowerCase().includes("project details") ||
      text.toLowerCase().includes("view details");
    const isRepo =
      text.toLowerCase().includes("repo") ||
      text.toLowerCase().includes("github") ||
      href.includes("github.com");
    const isLive =
      text.toLowerCase().includes("live") ||
      text.toLowerCase().includes("demo");

    if (isProjectDetails) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 my-1 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm cursor-pointer no-underline"
          {...props}
        >
          <span>{children}</span>
          <ExternalLink className="w-3 h-3 opacity-90" />
        </a>
      );
    }

    if (isRepo || isLive) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 my-1 text-xs font-medium rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs cursor-pointer no-underline"
          {...props}
        >
          <span>{children}</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      );
    }

    return (
      <a
        href={href}
        target={isInternal ? "_self" : "_blank"}
        rel={isInternal ? undefined : "noopener noreferrer"}
        className="font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
        {...props}
      >
        <span>{children}</span>
        {!isInternal && <ExternalLink className="w-3.5 h-3.5 opacity-70" />}
      </a>
    );
  },
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  blockquote: ({
    children,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-4 border-l-4 border-blue-500 bg-muted/40 px-4 py-2.5 rounded-r-lg italic text-foreground [&>p]:my-1"
      {...props}
    >
      {children}
    </blockquote>
  ),
};
