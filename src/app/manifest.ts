import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sandeep Singh | Full Stack Developer",
    short_name: "Sandeep Singh",
    description:
      "Professional portfolio of Sandeep Singh, a Full Stack Developer specializing in Next.js, React, Node.js, and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/profilePic.png",
        sizes: "192x192 512x512",
        type: "image/png",
      },
    ],
  };
}
