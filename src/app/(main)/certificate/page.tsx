import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Certificate, {
  ICertificate,
} from "../../../../models/certificate.model";
import CertificateCard from "@/components/CertificateCard";

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

export default async function CertificatePage() {
  const certificates = await fetchCertificates();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
        My Certificates
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <CertificateCard key={cert._id} imageUrl={cert.imageUrl} />
        ))}
      </div>
    </div>
  );
}
