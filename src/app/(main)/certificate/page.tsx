import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Certificate, {
  ICertificate,
} from "../../../../models/certificate.model";

import CertificateGallery from "@/components/CertificateGallery";

async function fetchCertificates(): Promise<ICertificate[]> {
  await ConnectDB();
  const certificates = await Certificate.find()
    .sort({ createdAt: 1 })
    .lean<ICertificate[]>();
  return certificates.map((cert) => ({
    ...cert,
    _id: cert._id?.toString(),
  }));
}

export default async function CertificatePage() {
  const certificates = await fetchCertificates();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
        My Certificates
      </h1>
      <CertificateGallery certificates={certificates} />
    </div>
  );
}
