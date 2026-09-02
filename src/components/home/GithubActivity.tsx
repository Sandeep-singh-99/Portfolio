"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const ActivityCalendar = dynamic(
  () =>
    import("react-activity-calendar").then(
      (mod) => mod.ActivityCalendar
    ),
  {
    ssr: false,
  }
);

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type ApiContribution = {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
};

type CalendarContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

const levelMap: Record<
  ContributionLevel,
  CalendarContribution["level"]
> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface GithubActivityProps {
  username?: string;
}

export default function GithubActivity({
  username = "Sandeep-singh-99",
}: GithubActivityProps) {
  const { resolvedTheme } = useTheme();

  const [data, setData] = useState<CalendarContribution[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch("/api/github", {
          cache: "no-store",
        });

        const json = await res.json();

        console.log("GitHub API response:", json);

        if (!res.ok) {
          throw new Error(
            json?.error || "Failed to fetch GitHub activity"
          );
        }

        const flat: ApiContribution[] =
          json.weeks?.flatMap(
            (week: {
              contributionDays: ApiContribution[];
            }) => week.contributionDays
          ) ?? [];

        const formatted: CalendarContribution[] = flat.map(
          (item) => ({
            date: item.date,
            count: item.contributionCount,
            level: levelMap[item.contributionLevel],
          })
        );

        console.log("GitHub contribution days:", formatted.length);

        if (formatted.length === 0) {
          throw new Error("GitHub returned empty contribution data");
        }

        setData(formatted);
        setTotal(json.totalContributions ?? 0);
      } catch (error) {
        console.error("GitHub activity error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="h-[200px] w-full animate-pulse rounded-xl bg-muted" />
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Failed to load GitHub activity
      </div>
    );
  }

  return (
    <section className="w-full space-y-4">
      <div className="flex flex-col">
        <p className="mb-1 text-sm text-gray-700 dark:text-gray-400">
          Featured
        </p>

        <h2 className="text-xl font-bold">
          GitHub Activity
        </h2>
      </div>

      <div className="w-full overflow-x-auto">
        <ActivityCalendar
          data={data}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          colorScheme={
            resolvedTheme === "dark" ? "dark" : "light"
          }
          theme={{
            light: [
              "#ebedf0",
              "#9be9a8",
              "#40c463",
              "#30a14e",
              "#216e39",
            ],
            dark: [
              "#161b22",
              "#0e4429",
              "#006d32",
              "#26a641",
              "#39d353",
            ],
          }}
          labels={{
            totalCount: `${total} contributions in the last year`,
          }}
        />
      </div>
    </section>
  );
}