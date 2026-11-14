import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import Intro from "../../../../models/intro.model";
import Project from "../../../../models/project.model";
import Blog from "../../../../models/blog.model";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    await ConnectDB();

    const [intro, projects, blogs] = await Promise.all([
      Intro.findOne().sort({ createdAt: -1 }).select("name file").lean(),
      Project.find()
        .sort({ priority: 1, createdAt: -1 })
        .select("_id projectName projectSubDesc projectTechStack liveLink githubLink")
        .lean(),
      Blog.find()
        .sort({ createdAt: -1 })
        .select("_id title tags createdAt")
        .lean(),
    ]);

    return NextResponse.json(
      {
        resumeUrl: (intro as any)?.file || null,
        projects: (projects || []).map((p: any) => ({
          id: p._id?.toString(),
          title: p.projectName,
          description: p.projectSubDesc || "",
          techStack: p.projectTechStack || [],
          liveLink: p.liveLink || null,
          githubLink: p.githubLink || null,
        })),
        blogs: (blogs || []).map((b: any) => ({
          id: b._id?.toString(),
          title: b.title,
          tags: b.tags || [],
          createdAt: b.createdAt,
        })),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching command menu data:", error);
    return NextResponse.json(
      {
        resumeUrl: null,
        projects: [],
        blogs: [],
        error: "Failed to load command data",
      },
      { status: 500 }
    );
  }
}
