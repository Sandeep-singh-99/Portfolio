"use client";

import React from "react";
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
