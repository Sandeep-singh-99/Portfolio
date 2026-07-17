"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { getCodeString } from "rehype-rewrite";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
});

function randomId() {
  return Math.random().toString(36).slice(2);
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  node?: any;
}

export default function MermaidCode({ className, children, node }: CodeProps) {
  const id = useRef(`mermaid-${randomId()}`);

  const [container, setContainer] = useState<HTMLElement | null>(null);

  const isMermaid =
    className && className.toLowerCase().startsWith("language-mermaid");

  const code = node ? getCodeString(node.children) : String(children);

  useEffect(() => {
    if (!container || !isMermaid || !code) return;

    mermaid
      .render(id.current, code)
      .then(({ svg, bindFunctions }) => {
        container.innerHTML = svg;

        const svgElement = container.querySelector("svg");

        if (svgElement) {
          svgElement.removeAttribute("width");
          svgElement.removeAttribute("height");

          svgElement.style.width = "100%";
          svgElement.style.height = "auto";
          svgElement.style.display = "block";
          svgElement.style.margin = "0 auto";
          svgElement.style.maxWidth = "100%";
        }

        bindFunctions?.(container);
      })
      .catch(console.error);
  }, [container, code, isMermaid]);

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) setContainer(node);
  }, []);

  if (isMermaid) {
    return (
      <Fragment>
        <code style={{ display: "none" }} />
        <code
          ref={ref}
          className="my-6 w-full overflow-auto rounded-xl border bg-background p-8 flex justify-center items-center"
        />
      </Fragment>
    );
  }

  return <code className={className}>{children}</code>;
}