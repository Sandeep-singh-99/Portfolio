"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getCodeString } from "rehype-rewrite";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  RefreshCw,
} from "lucide-react";

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
  const [isRendered, setIsRendered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const panZoomRef = useRef<any>(null);

  const isMermaid =
    className && className.toLowerCase().startsWith("language-mermaid");

  const code = node ? getCodeString(node.children) : String(children);

  useEffect(() => {
    const currentContainer = container;
    if (!currentContainer || !isMermaid || !code) return;

    let active = true;

    // Clean up any existing svg-pan-zoom instance
    if (panZoomRef.current) {
      try {
        panZoomRef.current.destroy();
      } catch (e) {
        console.error("Error destroying svgPanZoom:", e);
      }
      panZoomRef.current = null;
    }

    const uniqueId = `${id.current}-${randomId()}`;

    async function initMermaid() {
      const activeContainer = currentContainer;
      if (!activeContainer) return;
      try {
        // Dynamically import libraries to prevent SSR "window is not defined" error
        const [{ default: mermaid }, { default: svgPanZoom }] = await Promise.all([
          import("mermaid"),
          import("svg-pan-zoom"),
        ]);

        if (!active) return;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
        });

        const { svg, bindFunctions } = await mermaid.render(uniqueId, code);

        if (!active) return;

        activeContainer.innerHTML = svg;

        const svgElement = activeContainer.querySelector("svg");

        if (svgElement) {
          svgElement.removeAttribute("width");
          svgElement.removeAttribute("height");
          svgElement.style.width = "100%";
          svgElement.style.height = "100%";
          svgElement.style.display = "block";
          svgElement.style.maxWidth = "100%";
          svgElement.style.maxHeight = "100%";

          const pz = svgPanZoom(svgElement, {
            zoomEnabled: true,
            controlIconsEnabled: false,
            fit: true,
            center: true,
            minZoom: 0.1,
            maxZoom: 20,
            mouseWheelZoomEnabled: true,
            dblClickZoomEnabled: true,
            preventMouseEventsDefault: true,
          });

          panZoomRef.current = pz;
          setIsRendered(true);
        }

        bindFunctions?.(activeContainer);
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
        if (active) {
          activeContainer.innerHTML = `<pre class="text-red-500 p-4 text-xs font-mono whitespace-pre-wrap">${err}</pre>`;
        }
      }
    }

    initMermaid();

    return () => {
      active = false;
      if (panZoomRef.current) {
        try {
          panZoomRef.current.destroy();
        } catch (e) {
          console.error("Error destroying svgPanZoom in cleanup:", e);
        }
        panZoomRef.current = null;
      }
    };
  }, [container, code, isMermaid]);

  // Adjust zoom and pan when full-screen is toggled
  useEffect(() => {
    if (panZoomRef.current) {
      const timer = setTimeout(() => {
        if (panZoomRef.current) {
          try {
            panZoomRef.current.resize();
            panZoomRef.current.fit();
            panZoomRef.current.center();
          } catch (e) {
            console.error("Error resizing svgPanZoom:", e);
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) setContainer(node);
  }, []);

  if (isMermaid) {
    return (
      <Fragment>
        <code style={{ display: "none" }} />
        <div
          className={
            isFullscreen
              ? "fixed inset-0 z-50 bg-zinc-950 p-6 flex flex-col w-screen h-screen"
              : "relative w-full border border-zinc-200 dark:border-zinc-800/85 rounded-xl bg-zinc-100/90 dark:bg-zinc-950 my-6 overflow-hidden h-[450px]"
          }
        >
          {/* Render Target */}
          <div
            ref={ref}
            className="w-full h-full flex justify-center items-center overflow-hidden"
          />

          {/* Top-Right Tools */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg shadow transition-all duration-200 cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>

          {/* Bottom-Right Zoom & Pan Controls */}
          {isRendered && (
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-1 bg-zinc-900/90 border border-zinc-800 p-2 rounded-xl shadow-lg text-zinc-300">
                {/* Row 1 */}
                <div />
                <button
                  onClick={() => panZoomRef.current?.panBy({ x: 0, y: 50 })}
                  className="p-2 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  title="Pan Up"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() => panZoomRef.current?.zoomIn()}
                  className="p-2 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  title="Zoom In"
                >
                  <Plus size={16} />
                </button>

                {/* Row 2 */}
                <button
                  onClick={() => panZoomRef.current?.panBy({ x: 50, y: 0 })}
                  className="p-2 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  title="Pan Left"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => {
                    if (panZoomRef.current) {
                      panZoomRef.current.resetZoom();
                      panZoomRef.current.resetPan();
                      panZoomRef.current.fit();
                      panZoomRef.current.center();
                    }
                  }}
                  className="p-2 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  title="Reset Zoom & Pan"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => panZoomRef.current?.panBy({ x: -50, y: 0 })}
                  className="p-2 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  title="Pan Right"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Row 3 */}
                <div />
                <button
                  onClick={() => panZoomRef.current?.panBy({ x: 0, y: -50 })}
                  className="p-2 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  title="Pan Down"
                >
                  <ChevronDown size={16} />
                </button>
                <button
                  onClick={() => panZoomRef.current?.zoomOut()}
                  className="p-2 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  title="Zoom Out"
                >
                  <Minus size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }

  return <code className={className}>{children}</code>;
}