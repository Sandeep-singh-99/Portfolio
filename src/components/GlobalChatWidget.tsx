"use client";

import * as React from "react";
import { MessageCircle, X, Send, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarkdownRender } from "@/components/MarkdownRender";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function GlobalChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<string>("");

  // AbortController ref — used to cancel in-flight streams
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // Scroll container ref
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Initialize session ID from localStorage
  React.useEffect(() => {
    let id = localStorage.getItem("portfolio_chat_session");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("portfolio_chat_session", id);
    }
    setSessionId(id);
  }, []);

  // Auto-scroll to bottom whenever chat updates
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isStreaming]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  // ─── Cancel any in-flight stream ──────────────────────────────────────
  const cancelStream = React.useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // ─── Send message handler ────────────────────────────────────────────
  const handleSendMessage = React.useCallback(
    async (e: React.FormEvent, msgOverride?: string) => {
      e.preventDefault();
      const msgToSend = (msgOverride || message).trim();
      if (!msgToSend || !sessionId) return;

      // If a stream is already running, abort it first
      cancelStream();

      // Add user message + empty assistant placeholder in one atomic update
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: msgToSend },
        { role: "assistant", content: "" },
      ]);
      setMessage("");
      setIsStreaming(true);

      // Create a new AbortController for this request
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msgToSend, sessionId }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader available");

        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          // Append chunk to the LAST assistant message in history
          setChatHistory((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              updated[lastIdx] = {
                ...updated[lastIdx],
                content: updated[lastIdx].content + chunk,
              };
            }
            return updated;
          });
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          // Stream was intentionally cancelled — don't show error
          return;
        }
        console.error("Chat error:", error);
        setChatHistory((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0 && updated[lastIdx].role === "assistant" && !updated[lastIdx].content) {
            updated[lastIdx] = {
              ...updated[lastIdx],
              content: "Sorry, something went wrong. Please try again.",
            };
          }
          return updated;
        });
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [message, sessionId, cancelStream]
  );

  return (
    <div
      className={`fixed z-50 flex flex-col items-end gap-2 ${isOpen ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6" : "bottom-6 right-6"}`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-0 sm:mb-2 w-full h-full sm:w-auto sm:h-auto"
          >
            <div className="w-full h-full sm:w-[450px] sm:h-[600px] sm:max-h-[80vh] shadow-2xl border-0 sm:border border-white/10 rounded-none sm:rounded-2xl overflow-hidden flex flex-col bg-background/95 sm:bg-background/60 backdrop-blur-xl ring-0 sm:ring-1 ring-white/5">
              {/* Header */}
              <div className="bg-secondary/50 border-b border-border/50 p-4 flex items-center justify-between select-none backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                      <AvatarImage src="/profilePic.png" alt="Sandeep" />
                      <AvatarFallback>SS</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background shadow-sm"></span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm tracking-tight text-foreground">
                      Sandeep&#39;s Assistant
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      {isStreaming ? "Typing..." : "Online & Ready"}
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-background/20 text-muted-foreground hover:text-foreground transition-colors sm:hidden"
                  onClick={toggleChat}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </div>

              <CardContent
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-hide"
              >
                {/* Welcome Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-3"
                >
                  <Avatar className="h-8 w-8 border border-white/10 bg-linear-to-br from-primary/10 to-purple-500/10 mt-1 shadow-sm">
                    <AvatarImage src="/profilePic.png" alt="AI" />
                    <AvatarFallback className="text-[10px] bg-transparent">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 max-w-[85%]">
                    <div className="bg-secondary/40 backdrop-blur-md border border-white/5 p-3.5 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
                      <p>
                        Hello! 👋 I&apos;m here to answer questions about Sandeep&apos;s
                        work, experience, and projects. Ask me anything!
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
                  {chatHistory.map((chat, index) => {
                    // Don't render an empty assistant placeholder while streaming dots are shown
                    const isActiveStreamBubble =
                      isStreaming &&
                      chat.role === "assistant" &&
                      index === chatHistory.length - 1 &&
                      chat.content === "";

                    if (isActiveStreamBubble) return null;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex gap-3 ${chat.role === "user" ? "justify-end" : ""}`}
                      >
                        {chat.role === "assistant" && (
                          <Avatar className="h-8 w-8 border border-white/10 bg-linear-to-br from-primary/10 to-purple-500/10 mt-1 shadow-sm">
                            <AvatarImage src="/profilePic.png" alt="AI" />
                            <AvatarFallback className="text-[10px] bg-transparent">
                              AI
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`flex flex-col gap-1 max-w-[85%] ${chat.role === "user" ? "items-end" : ""}`}
                        >
                          <div
                            className={`p-3.5 rounded-2xl shadow-sm text-sm overflow-hidden backdrop-blur-sm ${
                              chat.role === "user"
                                ? "bg-secondary/20 border border-white/10 rounded-tr-none shadow-primary/20"
                                : "bg-secondary/40 border border-white/5 rounded-tl-none"
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
                    );
                  })}
                </AnimatePresence>

                {/* Typing indicator — shown only while streaming AND the bubble is still empty */}
                {isStreaming &&
                  chatHistory.length > 0 &&
                  chatHistory[chatHistory.length - 1].role === "assistant" &&
                  chatHistory[chatHistory.length - 1].content === "" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <Avatar className="h-8 w-8 border border-white/10 bg-linear-to-br from-primary/10 to-purple-500/10 mt-1 shadow-sm">
                        <AvatarImage src="/profilePic.png" alt="AI" />
                        <AvatarFallback className="text-[10px] bg-transparent">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-secondary/40 border border-white/5 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                      </div>
                    </motion.div>
                  )}

                {/* Quick Questions (Only show if history is empty) */}
                {chatHistory.length === 0 && (
                  <div className="space-y-3 pt-2">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold ml-1 flex items-center gap-2">
                      Suggested Topics
                      <span className="h-px flex-1 bg-linear-to-r from-border/50 to-transparent"></span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "What is your tech stack?",
                        "Tell me about your projects",
                        "What skills do you have?",
                        "How can I contact you?",
                      ].map((q, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          onClick={(e) => handleSendMessage(e, q)}
                          className="text-left text-xs bg-secondary/30 hover:bg-secondary/60 hover:text-primary border border-white/5 rounded-xl px-3 py-2 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                        >
                          {q}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Footer */}
              <div className="p-3 bg-background/95 backdrop-blur-md border-t border-border z-10">
                <form
                  onSubmit={(e) => handleSendMessage(e)}
                  className="flex items-center gap-2 relative"
                >
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 rounded-full bg-secondary text-foreground border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-input pl-4 py-6 shadow-xs transition-all hover:bg-secondary/80 text-sm placeholder:text-muted-foreground"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {/* Stop button — visible while streaming */}
                    {isStreaming && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 rounded-full text-destructive hover:bg-destructive/10"
                        onClick={cancelStream}
                      >
                        <Square className="h-4 w-4" />
                        <span className="sr-only">Stop generating</span>
                      </Button>
                    )}
                    <Button
                      type="submit"
                      size="icon"
                      className={`h-9 w-9 cursor-pointer shrink-0 rounded-full shadow-md transition-all duration-300 ${message.trim() ? "bg-primary text-primary-foreground hover:bg-primary/90 scale-100" : "bg-muted text-muted-foreground scale-90 opacity-70"}`}
                      disabled={!message.trim()}
                    >
                      <Send
                        className={`h-4 w-4 ${message.trim() ? "ml-0.5" : ""}`}
                      />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`h-14 w-14 rounded-full shadow-2xl hover:shadow-primary/40 transition-all duration-300 bg-black dark:bg-secondary text-white z-50 flex items-center justify-center cursor-pointer ring-2 ring-white/10 ${isOpen ? "hidden sm:flex" : "flex"}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle chat</span>
      </motion.button>
    </div>
  );
}
