"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";

const GlobalChatWidget = dynamic(
  () => import("@/components/GlobalChatWidget").then((mod) => mod.GlobalChatWidget),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          disabled
          aria-label="Loading chat..."
          className="h-14 w-14 rounded-full shadow-2xl bg-black dark:bg-secondary text-white flex items-center justify-center ring-2 ring-white/10 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    ),
  }
);

export default function LazyChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Render only the lightweight floating bubble button initially
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Chat with Sandeep's Assistant"
          className="h-14 w-14 rounded-full shadow-2xl hover:shadow-primary/40 transition-all duration-300 bg-black dark:bg-secondary text-white flex items-center justify-center cursor-pointer ring-2 ring-white/10 hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Chat with Sandeep&apos;s Assistant</span>
        </button>
      </div>
    );
  }

  // Load heavy chat modal & MDX parser only when opened
  return <GlobalChatWidget initialOpen={true} onClose={() => setIsOpen(false)} />;
}
