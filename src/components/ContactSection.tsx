"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { toast } from "sonner";

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
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
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
        <h1 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Have a project in mind or just want to say hi? Feel free to send me a
          message!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  className="min-h-[150px] bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-colors resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send size={16} />
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Social Links & Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Connect with me
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/Sandeep-singh-99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-110"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/sandeep-singh-99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-110"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="mailto:sk3356337@gmail.com"
                  className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-110"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-200 dark:border-zinc-800/50">
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">
                Looking for a developer?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                I'm currently available for freelance work and open to full-time
                opportunities. If you have a project that needs some creative
                touch, let's discuss it!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
