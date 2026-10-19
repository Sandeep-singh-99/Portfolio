"use client";

import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { mdxPreviewComponents } from "./MDXPreviewComponents";

interface MDXClientPreviewProps {
  content: string;
}

export function MDXClientPreview({ content }: MDXClientPreviewProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div
      data-color-mode={currentTheme === "dark" ? "dark" : "light"}
      className="mdx-client-preview w-full"
    >
      <MDEditor.Markdown
        source={content}
        components={mdxPreviewComponents}
        style={{ background: "transparent" }}
      />
    </div>
  );
}
