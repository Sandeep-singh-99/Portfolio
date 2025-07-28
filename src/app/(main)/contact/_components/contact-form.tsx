"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        setSuccessMsg("Message sent successfully!");
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMsg("Failed to send message.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold gradient-title">
          Contact Us
        </CardTitle>
        <CardDescription>
          Fill out the form below to get in touch with us.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Your Message"
              className="h-36"
              maxLength={500}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* {successMsg && <p className="text-green-600">{successMsg}</p>} */}
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
