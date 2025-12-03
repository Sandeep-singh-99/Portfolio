import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const GithubActivity = dynamic(() => import("@/components/GithubActivity"), {
  loading: () => (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg w-full h-[200px] flex items-center justify-center">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  ),
});

export default function GithubPage() {
  return (
    <main className="">
      <GithubActivity username="Sandeep-singh-99" />
    </main>
  );
}
