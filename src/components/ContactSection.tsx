"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      phone: formData.get("phone"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="md:text-4xl text-2xl font-extrabold text-zinc-900 dark:text-white">
            Contact
          </h1>
          <p className="md:text-lg text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Get in touch with me. I will get back to you as soon as possible.
          </p>
        </div>

        <Separator className="w-full border border-zinc-200 dark:border-zinc-800 mt-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.12 }}
      >
        <div className="px-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Send me a message</h2>
            <p className="text-zinc-600 dark:text-zinc-400 md:text-sm text-xs">
              Fill out the form below and I will get back to you as soon as
              possible.
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Phone *</Label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+1 (123) xxx-xxxx"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Email *</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Message *</Label>
                <Textarea
                  name="message"
                  placeholder="Tell me about your project or just say hello..."
                  className="h-32"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="font-semibold w-40 cursor-pointer"
              >
                {isLoading && <Loader className="animate-spin" />}
                <span className="flex items-center gap-2">
                  <Send />
                  Send Message
                </span>
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
