import React from "react";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error" | "tip";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutStyles = {
  info: {
    container:
      "bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200",
    icon: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
    badge: "Info",
  },
  warning: {
    container:
      "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200",
    icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
    badge: "Warning",
  },
  success: {
    container:
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
    badge: "Success",
  },
  error: {
    container: "bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200",
    icon: <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    badge: "Danger",
  },
  tip: {
    container:
      "bg-purple-500/10 border-purple-500/30 text-purple-900 dark:text-purple-200",
    icon: <Lightbulb className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />,
    badge: "Tip",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const current = calloutStyles[type] || calloutStyles.info;

  return (
    <div
      className={cn(
        "my-6 flex gap-3.5 p-4 rounded-xl border backdrop-blur-xs transition-colors",
        current.container,
        className
      )}
    >
      {current.icon}
      <div className="flex-1 space-y-1 text-sm leading-relaxed overflow-hidden">
        {title && (
          <p className="font-semibold text-foreground tracking-tight">
            {title}
          </p>
        )}
        <div className="[&>p]:my-1.5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
