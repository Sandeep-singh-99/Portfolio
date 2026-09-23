import React from "react";
import type { Metadata } from "next";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sandeep Singh for software engineering, full stack development opportunities, collaborations, or inquiries.",
  openGraph: {
    title: "Contact | Sandeep Singh",
    description:
      "Get in touch with Sandeep Singh for web development and software engineering opportunities.",
    url: "https://sandeep-singh.com/contact",
  },
  alternates: {
    canonical: "https://sandeep-singh.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto">
      <ContactSection />
    </div>
  );
}
