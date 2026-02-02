// "use client";
// import { useTheme } from "next-themes";
// import { ActivityCalendar } from "react-activity-calendar";

// import { useEffect, useState } from "react";

// export default function GithubActivity({ username }: { username: string }) {
//   const { resolvedTheme } = useTheme();
//   const [contributionData, setContributionData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [totalContributions, setTotalContributions] = useState(0);
// // https://github-contributions-api.jogruber.de/v4/
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://github-contributions-api.deno.dev${username}.json`,
//         );
//         const data = await response.json();
//         setContributionData(data.contributions || []);
//         setTotalContributions(
//           data.total?.lastYear ||
//             data.contributions?.reduce(
//               (acc: number, curr: any) => acc + curr.count,
//               0,
//             ) ||
//             0,
//         );
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching GitHub contributions:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [username]);



//   if (loading) {
//     return (
//       <div className="bg-card rounded-2xl border border-border p-6 shadow-lg w-full h-[200px] flex items-center justify-center">
//         <div className="animate-pulse bg-muted h-full w-full rounded-lg"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <div className="mb-4">
//         <h2 className="text-sm dark:text-gray-400 text-gray-700">
//           Featured
//         </h2>
//         <div className="flex items-center justify-between">
//           <p className="md:text-xl text-xl font-bold">
//             GitHub Activity
//           </p>
//           <span className="text-sm font-medium text-card-foreground bg-muted px-2 py-1 rounded-md">
//             Total: {totalContributions.toLocaleString()} contributions
//           </span>
//         </div>
//       </div>

//       <div className="overflow-x-auto flex justify-center">
//         <ActivityCalendar
//           data={contributionData}
//           theme={{
//             light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
//             dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
//           }}
//           colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
//           fontSize={12}
//           blockSize={12}
//           blockMargin={4}
//         />
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const ActivityCalendar = dynamic(
  () =>
    import('react-activity-calendar').then(
      (mod) => mod.ActivityCalendar
    ),
  { ssr: false }
);

type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

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

const levelMap: Record<ContributionLevel, CalendarContribution['level']> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const USERNAME = 'ramxcodes';

export default function GithubActivity() {
  const { resolvedTheme } = useTheme();
  const [data, setData] = useState<CalendarContribution[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://github-contributions-api.deno.dev/${USERNAME}.json`
        );
        if (!res.ok) throw new Error('Fetch failed');

        const json = await res.json();
        const flat: ApiContribution[] = json.contributions?.flat() ?? [];

        const formatted = flat.map((item) => ({
          date: item.date,
          count: item.contributionCount,
          level: levelMap[item.contributionLevel],
        }));

        setTotal(formatted.reduce((s, i) => s + i.count, 0));
        setData(formatted);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="h-[200px] w-full animate-pulse rounded-xl bg-muted" />;
  }

  if (error) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Failed to load GitHub activity
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
       <div className='flex flex-col mb-2'>
         <p className="text-sm dark:text-gray-400 text-gray-700">Featured</p>
        <h2 className="md:text-xl text-xl font-bold">GitHub Activity</h2>
       </div>
      </div>

      <div className="overflow-x-auto">
        <ActivityCalendar
          data={data}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          // hideTotalCount
          colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
          theme={{
            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
          }}
        />
      </div>
    </section>
  );
}
