import React from "react";
import type { Metadata } from "next";
import { ConnectDB } from "../../../../../lib/db";
import Certificate, {
  ICertificate,
} from "../../../../../models/certificate.model";
import CertificateGallery from "@/components/certificate/CertificateGallery";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Professional certifications, licenses, and technical credentials earned by Sandeep Singh in web development and computer science.",
  openGraph: {
    title: "Certificates | Sandeep Singh",
    description:
      "Professional certifications and technical credentials earned by Sandeep Singh.",
    url: "https://sandeep-singh.com/certificate/all-certificate",
  },
  alternates: {
    canonical: "https://sandeep-singh.com/certificate/all-certificate",
  },
};

export const revalidate = 3600;

async function fetchCertificates(): Promise<ICertificate[]> {
  await ConnectDB();
  const certificates = await Certificate.find()
    .sort({ priority: 1 })
    .lean<ICertificate[]>();
  return certificates.map((cert) => ({
    ...cert,
    _id: cert._id?.toString(),
  }));
}

export default async function AllCertificatePage() {
  const certificates = await fetchCertificates();

  return (
    <div className="container mx-auto space-y-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">Certificates</h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">
          My certifications and achievements.
        </p>
      </div>
      <Separator />
      <CertificateGallery certificates={certificates} />
    </div>
  );
}
