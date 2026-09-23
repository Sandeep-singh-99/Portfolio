import { MetadataRoute } from "next";
import { ConnectDB } from "../../lib/db";
import Project, { IProject } from "../../models/project.model";
import Blog, { IBlog } from "../../models/blog.model";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sandeep-singh.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/project/all-projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/all-blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/certificate/all-certificate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let dynamicProjects: MetadataRoute.Sitemap = [];
  let dynamicBlogs: MetadataRoute.Sitemap = [];

  try {
    await ConnectDB();

    const projects = await Project.find({}, "_id updatedAt").lean<IProject[]>();
    dynamicProjects = projects.map((p) => ({
      url: `${baseUrl}/project/${p._id}`,
      lastModified: (p as any).updatedAt ? new Date((p as any).updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const blogs = await Blog.find({}, "_id updatedAt").lean<IBlog[]>();
    dynamicBlogs = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b._id}`,
      lastModified: (b as any).updatedAt ? new Date((b as any).updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
  }

  return [...staticRoutes, ...dynamicProjects, ...dynamicBlogs];
}
