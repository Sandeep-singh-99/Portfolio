import React from "react";
import CertificateForm from "./_components/certificateForm";
import { ConnectDB } from "../../../../../lib/db";
import Certificate from "../../../../../models/certificate.model";
import { Card, CardContent } from "@/components/ui/card";
import CertificateDelete from "./_components/certificateDelete";

async function fetchCertificateData() {
  await ConnectDB();
  const data = await Certificate.find().sort({ createdAt: -1 });
  return data;
}

export default async function CertificateAdminPage() {
  const certficateData = await fetchCertificateData();
  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Certificate Form</h1>
          <p className="text-gray-600 mt-1">
            This section controls the certificate content of your portfolio.
          </p>
        </div>

        <CertificateForm />
      </div>

      <main>
        <Card className="p-4">
          <CardContent>
            {certficateData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No about data available.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Add new content using the form above to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* {certficateData.map((cer) => (
                    <div>

                    </div>
                ))} */}

                 {certficateData.map((cer: any) => {
                  const isPDF = cer.imageUrl.endsWith(".pdf");

                  return (
                    <div
                      key={cer._id}
                      className="border rounded-lg p-3 flex flex-col gap-3 shadow-sm"
                    >
                      {/* File preview */}
                      {isPDF ? (
                        <iframe
                          src={cer.imageUrl}
                          className="w-full h-48 border rounded-md"
                          title="PDF preview"
                        ></iframe>
                      ) : (
                        <img
                          src={cer.imageUrl}
                          alt="Certificate"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      )}

                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-600">
                          Priority: {cer.priority}
                        </p>

                        {/* Delete Button */}
                        <CertificateDelete id={cer.id} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
