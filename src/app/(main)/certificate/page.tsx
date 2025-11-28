import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Certificate, {
  ICertificate,
} from "../../../../models/certificate.model";

import CertificateGallery from "@/components/CertificateGallery";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

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
      <div className="flex flex-col mb-2">
        <p className="text-sm dark:text-gray-400 text-gray-700">Featured</p>
        <h2 className="md:text-xl text-xl font-bold">Certificates</h2>
      </div>
      <CertificateGallery certificates={certificates} limit={3} />

      <div className="text-center mt-10">
        <Link href="/certificate/all-certificate">
          <Button variant="outline" className=" hover:bg-white cursor-pointer ">
            Show all Certificates <MoveRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
