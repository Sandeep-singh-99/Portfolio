import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Certificate from "../../../../models/certificate.model";
import { Card } from "@/components/ui/card";
import Image from "next/image";

async function fetchCertificateData() {
  await ConnectDB();
  const data = await Certificate.find();
  return data;
}

export default async function CertificatePage() {
  const certificates = await fetchCertificateData();

  return (
    <div className="max-w-3xl mx-auto text-center py-20 px-6 sm:px-10 lg:px-20 text-white">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text mb-10">
        Achievements & Certifications
      </h2>

      {certificates.length === 0 ? (
        <p className="text-gray-400 text-lg">No certificates uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cer: any) => {
            const isPDF = cer.imageUrl.endsWith(".pdf");

            return (
              <Card
                key={cer._id}
                className="p-4 bg-gray-900/40 border-gray-700 text-white hover:shadow-lg transition-shadow"
              >
                {
                  isPDF ? (
                    <iframe
                      src={cer.imageUrl}
                      className="w-full h-48 border rounded-md"
                    />
                  ) : (
                    <Image
                      src={cer.imageUrl}
                      alt={cer.title}
                      width={400}
                      height={192}
                      className="rounded-md border border-gray-700"
                    />
                  )
                }
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
