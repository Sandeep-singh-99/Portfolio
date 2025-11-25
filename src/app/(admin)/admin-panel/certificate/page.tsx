import React from "react";
import CertificateForm from "./_components/certificateForm";
import { ConnectDB } from "../../../../../lib/db";
import Certificate from "../../../../../models/certificate.model";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CertificateDelete from "./_components/certificateDelete";
import { FileText, Award, ExternalLink } from "lucide-react";
import Image from "next/image";

async function fetchCertificateData() {
  await ConnectDB();
  const data = await Certificate.find().sort({ createdAt: -1 });
  return data;
}

export default async function CertificateAdminPage() {
  const certficateData = await fetchCertificateData();

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground mt-2">
            Manage your certifications and achievements.
          </p>
        </div>
        <CertificateForm />
      </div>

      <Separator />

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Your Certificates
          </h2>
          <span className="text-sm text-muted-foreground">
            {certficateData.length} total
          </span>
        </div>

        {certficateData.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-background p-4 mb-4 shadow-sm">
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No certificates yet</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Add your certifications to showcase your expertise.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certficateData.map((cer: any) => {
              const isPDF = cer.imageUrl.endsWith(".pdf");

              return (
                <Card
                  key={cer._id}
                  className="group flex flex-col overflow-hidden border-muted/60 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    {isPDF ? (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground bg-muted/50">
                        <FileText className="h-12 w-12" />
                        <span className="text-sm font-medium">
                          PDF Document
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={cer.imageUrl}
                        alt="Certificate"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-md p-1">
                      <CertificateDelete id={cer.id} />
                    </div>
                  </div>

                  <CardContent className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs font-normal">
                        Priority: {cer.priority}
                      </Badge>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full gap-2" asChild>
                      <a
                        href={cer.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Certificate
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
