"use client";

import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  BookOpen,
  Mail,
  Github,
  Sun,
  Moon,
  Laptop,
  FileDown,
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  ArrowRight,
  Layers,
  Compass,
  Command as CommandIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
}

interface BlogItem {
  id: string;
  title: string;
  tags: string[];
}

interface CommandAction {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  category: "Actions" | "Navigation" | "Projects" | "Blogs" | "Appearance";
  badge?: string;
  keywords?: string[];
  perform: () => void;
}

const AUTHOR_EMAIL = "sandeep.necoder@gmail.com";
const AUTHOR_GITHUB = "https://github.com/Sandeep-singh-99";

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CommandMenu({ open: externalOpen, onOpenChange }: CommandMenuProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;

  const setIsOpen = useCallback(
    (val: boolean | ((prev: boolean) => boolean)) => {
      const nextVal = typeof val === "function" ? val(isOpen) : val;
      if (!isControlled) {
        setInternalOpen(nextVal);
      }
      onOpenChange?.(nextVal);
    },
    [isControlled, isOpen, onOpenChange]
  );

  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedType, setCopiedType] = useState<"email" | "github" | null>(null);

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Fetch projects and blogs lazily when opened or prefetch once
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    if (projects.length === 0 && blogs.length === 0) {
      setLoading(true);
      fetch("/api/command-menu")
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          if (data.projects) setProjects(data.projects);
          if (data.blogs) setBlogs(data.blogs);
          if (data.resumeUrl) setResumeUrl(data.resumeUrl);
        })
        .catch((err) => {
          console.error("Failed to fetch command menu data:", err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, projects.length, blogs.length]);

  // Focus input on modal open & reset selection
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const copyToClipboard = useCallback((text: string, type: "email" | "github", label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      toast.success(`${label} copied to clipboard!`, {
        description: text,
      });
      setTimeout(() => setCopiedType(null), 2000);
      setIsOpen(false);
    }
  }, []);

  const downloadResume = useCallback(() => {
    const targetUrl = resumeUrl || "/resume.pdf";
    // Check if Cloudinary or external link
    const link = document.createElement("a");
    link.href = targetUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = "Sandeep_Singh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Opening resume for download", {
      description: "Saved or opened in new tab.",
    });
    setIsOpen(false);
  }, [resumeUrl]);

  const navigateTo = useCallback(
    (url: string) => {
      setIsOpen(false);
      router.push(url);
    },
    [router]
  );

  // Build commands list
  const commands: CommandAction[] = useMemo(() => {
    const list: CommandAction[] = [
      // Core Actions
      {
        id: "action-copy-email",
        title: "Copy Email Address",
        subtitle: AUTHOR_EMAIL,
        icon: copiedType === "email" ? <Check className="size-4 text-emerald-500" /> : <Mail className="size-4" />,
        category: "Actions",
        badge: copiedType === "email" ? "Copied" : "Copy",
        keywords: ["mail", "contact", "send", "reach", "hire"],
        perform: () => copyToClipboard(AUTHOR_EMAIL, "email", "Email address"),
      },
      {
        id: "action-copy-github",
        title: "Copy GitHub Profile Link",
        subtitle: AUTHOR_GITHUB,
        icon: copiedType === "github" ? <Check className="size-4 text-emerald-500" /> : <Github className="size-4" />,
        category: "Actions",
        badge: copiedType === "github" ? "Copied" : "Copy",
        keywords: ["github", "git", "code", "repo", "repository"],
        perform: () => copyToClipboard(AUTHOR_GITHUB, "github", "GitHub URL"),
      },
      {
        id: "action-download-resume",
        title: "Download Resume / CV",
        subtitle: "PDF format (Latest)",
        icon: <FileDown className="size-4 text-sky-500 dark:text-sky-400" />,
        category: "Actions",
        badge: "PDF",
        keywords: ["cv", "resume", "download", "pdf", "experience", "hire"],
        perform: downloadResume,
      },

      // Theme toggle actions
      {
        id: "theme-toggle",
        title: resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        subtitle: `Currently ${resolvedTheme || "system"}`,
        icon: resolvedTheme === "dark" ? <Sun className="size-4 text-amber-500" /> : <Moon className="size-4 text-indigo-400" />,
        category: "Appearance",
        badge: "Theme",
        keywords: ["theme", "mode", "dark", "light", "color", "appearance"],
        perform: () => {
          const next = resolvedTheme === "dark" ? "light" : "dark";
          setTheme(next);
          toast.success(`Switched to ${next} mode`);
          setIsOpen(false);
        },
      },
      {
        id: "theme-system",
        title: "Use System Theme",
        subtitle: "Sync with your OS preference",
        icon: <Laptop className="size-4" />,
        category: "Appearance",
        badge: "Theme",
        keywords: ["system", "auto", "theme", "os"],
        perform: () => {
          setTheme("system");
          toast.success("Switched to system theme");
          setIsOpen(false);
        },
      },

      // General Page Navigation
      {
        id: "nav-home",
        title: "Home",
        subtitle: "Portfolio overview & hero",
        icon: <Compass className="size-4" />,
        category: "Navigation",
        badge: "Go",
        keywords: ["home", "main", "intro", "hero", "root"],
        perform: () => navigateTo("/"),
      },
      {
        id: "nav-all-projects",
        title: "All Projects",
        subtitle: "Explore full project showcase",
        icon: <FolderGit2 className="size-4 text-emerald-500" />,
        category: "Navigation",
        badge: "Go",
        keywords: ["project", "work", "apps", "code", "portfolio"],
        perform: () => navigateTo("/project/all-projects"),
      },
      {
        id: "nav-all-blogs",
        title: "All Articles & Blogs",
        subtitle: "Technical articles & case studies",
        icon: <BookOpen className="size-4 text-violet-500" />,
        category: "Navigation",
        badge: "Go",
        keywords: ["blog", "article", "post", "read", "writing"],
        perform: () => navigateTo("/blog/all-blogs"),
      },
      {
        id: "nav-contact",
        title: "Contact & Connect",
        subtitle: "Get in touch or leave a message",
        icon: <Mail className="size-4 text-pink-500" />,
        category: "Navigation",
        badge: "Go",
        keywords: ["contact", "message", "email", "hire", "touch"],
        perform: () => navigateTo("/contact"),
      },
      {
        id: "nav-all-certificates",
        title: "Certificates & Achievements",
        subtitle: "Accreditations and certifications",
        icon: <Sparkles className="size-4 text-amber-500" />,
        category: "Navigation",
        badge: "Go",
        keywords: ["certificate", "credential", "awards"],
        perform: () => navigateTo("/certificate/all-certificate"),
      },
    ];

    // Dynamic Projects
    projects.forEach((proj) => {
      list.push({
        id: `project-${proj.id}`,
        title: proj.title,
        subtitle: proj.description || proj.techStack?.slice(0, 3).join(", "),
        icon: <FolderGit2 className="size-4 text-emerald-500/80" />,
        category: "Projects",
        badge: proj.techStack?.[0] || "Project",
        keywords: ["project", proj.title, ...(proj.techStack || [])],
        perform: () => navigateTo(`/project/${proj.id}`),
      });
    });

    // Dynamic Blogs
    blogs.forEach((blog) => {
      list.push({
        id: `blog-${blog.id}`,
        title: blog.title,
        subtitle: blog.tags?.length ? `Tags: ${blog.tags.slice(0, 3).join(", ")}` : "Article",
        icon: <BookOpen className="size-4 text-violet-500/80" />,
        category: "Blogs",
        badge: blog.tags?.[0] || "Article",
        keywords: ["blog", "article", blog.title, ...(blog.tags || [])],
        perform: () => navigateTo(`/blog/${blog.id}`),
      });
    });

    return list;
  }, [
    copiedType,
    resolvedTheme,
    projects,
    blogs,
    copyToClipboard,
    downloadResume,
    navigateTo,
    setTheme,
  ]);

  // Filter commands by search term
  const filteredCommands = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return commands;

    return commands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchSubtitle = cmd.subtitle?.toLowerCase().includes(q);
      const matchCategory = cmd.category.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [commands, search]);

  // Keep selected index in bounds
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);

  // Ensure active element is scrolled into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeItem = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Handle arrow navigation and enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].perform();
      }
    }
  };

  // Group commands by category
  const categories = useMemo(() => {
    const groups: { [key: string]: CommandAction[] } = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  return (
    <>
      {/* Backdrop & Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[14vh] px-3">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-background/95 dark:bg-zinc-950/95 border border-border/80 dark:border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col max-h-[75vh]"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              {/* Header / Input Field */}
              <div className="flex items-center px-4 py-3.5 border-b border-border/70 dark:border-zinc-800/80 gap-3">
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search projects, blogs, theme..."
                  className="w-full bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-muted-foreground/70"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-muted-foreground hover:text-foreground text-xs p-1 rounded-md"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-muted-foreground font-mono bg-muted/60 px-1.5 py-0.5 rounded border border-border/60">
                  ESC
                </kbd>
              </div>

              {/* Suggestions / List Content */}
              <div
                ref={listRef}
                className="overflow-y-auto px-2 py-2 flex-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800"
              >
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground space-y-1">
                    <p className="text-sm font-medium">No results found</p>
                    <p className="text-xs text-muted-foreground/80">
                      Try searching for "project", "blog", "resume", or "theme"
                    </p>
                  </div>
                ) : (
                  Object.entries(categories).map(([category, items]) => (
                    <div key={category} className="mb-3">
                      <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {category}
                      </div>
                      <div className="space-y-0.5">
                        {items.map((cmd) => {
                          const itemIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                          const isSelected = itemIndex === selectedIndex;

                          return (
                            <button
                              key={cmd.id}
                              data-index={itemIndex}
                              onClick={() => cmd.perform()}
                              onMouseEnter={() => setSelectedIndex(itemIndex)}
                              className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer ${
                                isSelected
                                  ? "bg-zinc-200/70 dark:bg-zinc-800/80 text-foreground font-medium shadow-xs"
                                  : "text-muted-foreground hover:text-foreground hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <span
                                  className={`p-1.5 rounded-lg border transition-colors ${
                                    isSelected
                                      ? "bg-background text-foreground border-border"
                                      : "bg-muted/50 text-muted-foreground border-transparent"
                                  }`}
                                >
                                  {cmd.icon}
                                </span>
                                <div className="truncate">
                                  <div className="text-sm text-foreground truncate">
                                    {cmd.title}
                                  </div>
                                  {cmd.subtitle && (
                                    <div className="text-xs text-muted-foreground truncate">
                                      {cmd.subtitle}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {cmd.badge && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-muted/80 text-muted-foreground border border-border/50">
                                    {cmd.badge}
                                  </span>
                                )}
                                <ArrowRight
                                  className={`size-3.5 transition-transform ${
                                    isSelected
                                      ? "opacity-100 translate-x-0.5 text-foreground"
                                      : "opacity-0"
                                  }`}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-border/70 dark:border-zinc-800/80 bg-muted/30 dark:bg-zinc-900/40 flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono border border-border/60">
                      ↑
                    </kbd>
                    <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono border border-border/60">
                      ↓
                    </kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border/60">
                      ↵
                    </kbd>
                    <span>Select</span>
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-mono text-[10px] text-muted-foreground/70">
                    Sandeep Singh Portfolio
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
