import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import { GlobalChatWidget } from "@/components/GlobalChatWidget";
import NavBar from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sandeep-singh.com"),
  title: {
    default: "Sandeep Singh | Full Stack Developer",
    template: "%s | Sandeep Singh",
  },
  description:
    "Professional portfolio of Sandeep Singh, a Full Stack Developer specializing in modern web technologies like Next.js, React, and Node.js.",
  keywords: [
    "Sandeep Singh",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
  ],
  authors: [
    {
      name: "Sandeep Singh",
      url: "https://github.com/Sandeep-singh-99",
    },
  ],
  creator: "Sandeep Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sandeep-singh.com",
    title: "Sandeep Singh | Full Stack Developer",
    description:
      "Explore the portfolio of Sandeep Singh, featuring projects, skills, and professional experience in full-stack web development.",
    siteName: "Sandeep Singh Portfolio",
    images: [
      {
        url: "/profilePic.png",
        width: 1200,
        height: 630,
        alt: "Sandeep Singh - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Singh | Full Stack Developer",
    description:
      "Professional portfolio of Sandeep Singh, specializing in building high-quality web applications.",
    images: ["/profilePic.png"],
    creator: "@Sandeep_singh_99",
  },
  alternates: {
    canonical: "https://sandeep-singh.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://sandeep-singh.com/#person",
      name: "Sandeep Singh",
      url: "https://sandeep-singh.com",
      image: "https://sandeep-singh.com/profilePic.png",
      jobTitle: "Full Stack Developer",
      sameAs: [
        "https://github.com/Sandeep-singh-99",
        "https://www.linkedin.com/in/sandeep-singh-7a0219320",
        "https://x.com/SinghNecoder",
        "https://www.instagram.com/sandeep.necoder",
      ],
      description:
        "Full Stack Developer specializing in Next.js, React, Node.js, and TypeScript.",
    },
    {
      "@type": "WebSite",
      "@id": "https://sandeep-singh.com/#website",
      url: "https://sandeep-singh.com",
      name: "Sandeep Singh Portfolio",
      description:
        "Portfolio of Sandeep Singh - Full Stack Developer specializing in Next.js, React, and Node.js.",
      publisher: {
        "@id": "https://sandeep-singh.com/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-slate-50 dark:bg-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <NavBar />
          {children}
          <GlobalChatWidget />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
