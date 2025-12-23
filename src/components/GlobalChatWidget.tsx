"use client";

import * as React from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarkdownRender } from "@/components/MarkdownRender";

export function GlobalChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSendMessage = async (
    e: React.FormEvent,
    msgOverride?: string
  ) => {
    e.preventDefault();
    const msgToSend = msgOverride || message;
    if (!msgToSend.trim()) return;

    // Add user message to history
    setChatHistory((prev) => [...prev, { role: "user", content: msgToSend }]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgToSend }),
      });

      const data = await response.json();

      if (data.response) {
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please check your connection.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom of chat
  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-2"
          >
            <Card className="w-[400px] sm:w-[500px] h-[500px] sm:h-[600px] max-h-[80vh] shadow-2xl border overflow-hidden flex flex-col bg-background/95 backdrop-blur-sm">
              {/* Header */}
              <div className="bg-linear-to-r from-background to-secondary/20 border-b p-3 flex items-center gap-2.5 select-none">
                <Avatar className="h-10 w-10 border shadow-sm">
                  <AvatarImage src="/profilePic.png" alt="Sandeep" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm tracking-tight">
                    Sandeep&#39;s Portfolio Assistant
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Content */}
              <CardContent
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-3 bg-secondary/5 scroll-smooth"
              >
                <div className="flex flex-col gap-4">
                  {/* Welcome Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <Avatar className="h-8 w-8 border bg-background mt-1 shadow-sm">
                      <AvatarImage src="/profilePic.png" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 max-w-[85%]">
                      <div className="bg-background border p-3 rounded-2xl rounded-tl-none shadow-sm text-sm">
                        <p>
                          Hello! I&#39;m Sandeep&#39;s Portfolio Assistant. How
                          can I help you today?
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground/60 ml-1 font-medium">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </motion.div>

                  {/* Chat History */}
                  <AnimatePresence mode="popLayout">
                    {chatHistory.map((chat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex gap-3 ${chat.role === "user" ? "justify-end" : ""}`}
                      >
                        {chat.role === "assistant" && (
                          <Avatar className="h-8 w-8 border bg-background mt-1 shadow-sm">
                            <AvatarImage src="/profilePic.png" alt="AI" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`flex flex-col gap-1 max-w-[85%] ${chat.role === "user" ? "items-end" : ""}`}
                        >
                          <div
                            className={`p-3 rounded-2xl shadow-sm text-sm overflow-hidden ${
                              chat.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-background border rounded-tl-none"
                            }`}
                          >
                            {chat.role === "assistant" ? (
                              <MarkdownRender content={chat.content} />
                            ) : (
                              <p className="whitespace-pre-wrap leading-relaxed">
                                {chat.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <Avatar className="h-8 w-8 border bg-background mt-1 shadow-sm">
                        <AvatarImage src="/profilePic.png" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-background border p-4 rounded-2xl rounded-tl-none shadow-sm text-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Questions (Only show if history is empty) */}
                  {chatHistory.length === 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs text-muted-foreground font-medium ml-1 flex items-center gap-2">
                        <span>✨ Suggested questions</span>
                        <span className="h-px flex-1 bg-border/50"></span>
                      </p>
                      <div className="flex flex-col gap-2">
                        {[
                          "What technologies do you work with?",
                          "Tell me about your recent projects",
                          "How can I contact you for work?",
                        ].map((q, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={(e) => handleSendMessage(e, q)}
                            className="text-left text-sm bg-background/50 hover:bg-accent border border-border/50 hover:border-border rounded-xl px-3 py-2.5 transition-all duration-200 shadow-sm hover:shadow w-fit max-w-full group"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                              {q}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Footer */}
              <div className="p-3 bg-background/95 backdrop-blur border-t z-10">
                <form
                  onSubmit={(e) => handleSendMessage(e)}
                  className="flex items-center gap-2"
                >
                  <Input
                    placeholder="Ask me something..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 rounded-full bg-secondary/20 border-border/50 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:border-primary/50 pl-4 py-2.5 shadow-inner transition-all hover:bg-secondary/40"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className={`h-12 w-12 shrink-0 rounded-full shadow-md transition-all duration-300 ${message.trim() ? "bg-primary hover:bg-primary/90 scale-100" : "bg-muted text-muted-foreground scale-95"}`}
                    disabled={isLoading || !message.trim()}
                  >
                    <Send
                      className={`h-5 w-5 ${message.trim() ? "ml-0.5" : ""}`}
                    />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleChat}
        size="icon"
        className="h-14 w-14 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 bg-foreground text-background z-50"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        <span className="sr-only">Toggle chat</span>
      </Button>
    </div>
  );
}
