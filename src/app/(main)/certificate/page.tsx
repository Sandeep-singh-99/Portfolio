import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Certificate from "../../../../models/certificate.model";
import Image from "next/image";



async function fetchCertificateData() {
  await ConnectDB();
  const data = await Certificate.find();
  return data;
}

export default async function CertificatePage() {
  const certificates = await fetchCertificateData();
// bg-gray-900/40 border-gray-700 text-white hover:shadow-lg transition-shadow
  return (
    <div className="mx-auto text-center py-20 px-6 sm:px-10 lg:px-20 text-white">
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
              <div
                key={cer._id}
                className=""
              >
                {
                  isPDF ? (
                    <iframe
                      src={`${cer.imageUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-64 border rounded-md overflow-auto"
                    />
                  ) : (
                    <Image
                      src={cer.imageUrl}
                      alt={"certificate image"}
                      width={400}
                      height={192}
                      className="rounded-md border border-gray-700"
                    />
                  )
                }
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
