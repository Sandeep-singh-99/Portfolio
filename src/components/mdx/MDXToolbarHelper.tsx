"use client";

import React from "react";
import {
  Lightbulb,
  AlertTriangle,
  Info,
  Code,
  GitBranch,
  Tag,
} from "lucide-react";

interface MDXToolbarHelperProps {
  onInsert: (snippet: string) => void;
}

export function MDXToolbarHelper({ onInsert }: MDXToolbarHelperProps) {
  const snippets = [
    {
      label: "Tip Callout",
      icon: <Lightbulb className="w-3.5 h-3.5 text-purple-400" />,
      snippet: `\n\n<Callout type="tip" title="Pro Tip">\nEnter helpful tip or best practice here.\n</Callout>\n\n`,
    },
    {
      label: "Warning Callout",
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
      snippet: `\n\n<Callout type="warning" title="Warning">\nEnter warning or cautionary notice here.\n</Callout>\n\n`,
    },
    {
      label: "Info Callout",
      icon: <Info className="w-3.5 h-3.5 text-blue-400" />,
      snippet: `\n\n<Callout type="info" title="Note">\nEnter informative note here.\n</Callout>\n\n`,
    },
    {
      label: "Code Block",
      icon: <Code className="w-3.5 h-3.5 text-emerald-400" />,
      snippet: `\n\n\`\`\`typescript\n// Example Code\nconst greeting: string = "Hello World";\nconsole.log(greeting);\n\`\`\`\n\n`,
    },
    {
      label: "Mermaid Diagram",
      icon: <GitBranch className="w-3.5 h-3.5 text-pink-400" />,
      snippet: `\n\n\`\`\`mermaid\ngraph TD\n  A[Frontend UI] --> B[API Route]\n  B --> C[(Database)]\n\`\`\`\n\n`,
    },
    {
      label: "Badge",
      icon: <Tag className="w-3.5 h-3.5 text-cyan-400" />,
      snippet: ` <Badge variant="secondary">Feature</Badge> `,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-muted/40 border border-border/60 rounded-lg text-xs">
      <span className="font-semibold text-muted-foreground mr-1 text-[11px] uppercase tracking-wider">
        + MDX:
      </span>
      {snippets.map((item, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onInsert(item.snippet)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-background hover:bg-accent border border-border/60 text-foreground transition-colors cursor-pointer hover:border-foreground/30 shadow-2xs"
          title={`Insert ${item.label}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
