import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./MDXComponents";

interface MDXRenderProps {
  content: string;
}

export async function MDXRender({ content }: MDXRenderProps) {
  if (!content) return null;

  try {
    return (
      <div className="mdx-container w-full">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("MDX rendering error:", error);
    return (
      <div className="p-4 my-4 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-sm font-mono whitespace-pre-wrap">
        <p className="font-semibold mb-2">MDX Parsing Error:</p>
        {String(error)}
      </div>
    );
  }
}
