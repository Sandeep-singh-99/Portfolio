"use client"
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";

import { useEffect, useState } from "react";

export default function GithubActivity({ username }: { username: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 shadow-lg w-full h-[200px] flex items-center justify-center">
        <div className="animate-pulse bg-muted h-full w-full rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg w-full">
      <h2 className="text-2xl font-semibold text-card-foreground mb-1">
        GitHub Activity
      </h2>
      <p className="text-muted-foreground mb-4">
        Your recent contribution history
      </p>

      <div className="overflow-x-auto flex justify-center">
        <GitHubCalendar
          username={username}
          colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    </div>
  );
}
