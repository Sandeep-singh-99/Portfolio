import { Suspense } from "react";
import IntroPage from "./intro/page";
import ProjectPage from "./project/page";
import GithubPage from "./github/page";
import SkillPage from "./skill/page";
import AboutPage from "./about/page";
import CertificatePage from "./certificate/page";
import BlogPage from "./blog/page";

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="py-10 space-y-10">
      <IntroPage />
      <ProjectPage />
      <Suspense fallback={<div className="h-48 animate-pulse bg-muted rounded-xl" />}>
        <GithubPage />
        <SkillPage />
        <AboutPage />
        <CertificatePage />
        <BlogPage />
      </Suspense>
    </div>
  );
}
