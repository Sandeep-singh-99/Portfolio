"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';


interface DeleteCertificateProps {
  id: string;
  onDelete?: () => void;
}

export default function CertificateDelete({ id }: DeleteCertificateProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
        const response = await fetch(`/api/certificate/${id}`, {
            method: "DELETE",
        });
        const result = await response.json();
        if (response.ok) {
            toast.success(result.message || "Certificate deleted successfully");
            router.refresh(); 
        } else {
            toast.error(result.error || "Failed to delete certificate");
        }
    } catch (error) {
        toast.error("Failed to delete certificate");
    }
  }

  return (
    <div>
        <Button variant={"destructive"} onClick={() => handleDelete(id)}>
            Delete Certificate
        </Button>
    </div>
  )
}
