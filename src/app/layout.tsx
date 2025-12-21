import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // weight: ["400", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
