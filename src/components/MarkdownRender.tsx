"use client";

import MDEditor from "@uiw/react-md-editor";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function MarkdownRender({ content }: { content: string }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div data-color-mode={currentTheme === "dark" ? "dark" : "light"}>
      <MDEditor.Markdown
        source={content}
        style={{ background: "transparent" }}
      />
    </div>
  );
}
