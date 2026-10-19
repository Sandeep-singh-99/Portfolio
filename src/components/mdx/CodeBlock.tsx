"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

const MermaidCode = dynamic(() => import("@/components/editor/MermaidCode"), {
  ssr: false,
  loading: () => (
    <pre className="p-4 bg-muted animate-pulse rounded-lg text-xs">
      Loading diagram...
    </pre>
  ),
});

function extractText(node: any): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node.props && node.props.children) return extractText(node.props.children);
  if (node.value && typeof node.value === "string") return node.value;
  if (node.children && Array.isArray(node.children)) return node.children.map(extractText).join("");
  return "";
}

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  node?: any;
  [key: string]: any;
}

export function CodeBlock({ children, className, node, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const rawText = extractText(children) || extractText(node);
  const codeString = rawText.replace(/\n$/, "");

  // Mermaid diagrams
  if (language.toLowerCase() === "mermaid") {
    return (
      <MermaidCode className={className} node={node} {...props}>
        {codeString}
      </MermaidCode>
    );
  }

  // Check if this is an inline code snippet or a multi-line code block
  const isInline = !match && !rawText.includes("\n");

  if (isInline) {
    return (
      <code
        className="px-1.5 py-0.5 rounded-md font-mono text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 font-medium"
        {...props}
      >
        {children}
      </code>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-zinc-800/80 bg-[#1e1e1e] shadow-xl group">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
        <span className="uppercase tracking-wider font-semibold text-zinc-300">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all duration-200 cursor-pointer",
            copied
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              : "bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60"
          )}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax Highlighting Body */}
      <div className="overflow-x-auto text-sm">
        <SyntaxHighlighter
          language={language || "text"}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem 1.25rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-geist-mono), monospace",
            },
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
