import dynamic from "next/dynamic";
import IntroPage from "./intro/page";

const SkillPage = dynamic(() => import("./skill/page"));
const AboutPage = dynamic(() => import("./about/page"));
const ProjectPage = dynamic(() => import("./project/page"));
const CertificatePage = dynamic(() => import("./certificate/page"));
const GithubPage = dynamic(() => import("./github/page"));
const BlogPage = dynamic(() => import("./blog/page"));

export default function Home() {
  return (
    <div className="py-10 space-y-10">
      <IntroPage />
      <ProjectPage />
      <SkillPage />
      <AboutPage />
      <GithubPage />
      <CertificatePage />
      <BlogPage />
    </div>
  );
}
