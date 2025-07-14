"use client";

import MDEditor from "@uiw/react-md-editor";

export function MarkdownRender({ content }: { content: string }) {
  return (
    <MDEditor.Markdown source={content} />
  );
}
