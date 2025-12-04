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
import SortableCertificateList from "./_components/SortableCertificateList";

async function fetchCertificateData() {
  await ConnectDB();
  const data = await Certificate.find().sort({ priority: 1 });
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
          <SortableCertificateList initialCertificates={certficateData} />
        )}
      </section>
    </div>
  );
}
