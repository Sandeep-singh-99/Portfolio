"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommandMenu from "./CommandMenu";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const links = [
    { title: "Projects", url: "/project/all-projects" },
    { title: "Blogs", url: "/blog/all-blogs" },
    { title: "Contact", url: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.75rem)] max-w-3xl
        px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full
        border transition-all duration-300 backdrop-blur-xl select-none
        ${
          isScrolled
            ? "bg-white/70 dark:bg-zinc-950/70 border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
            : "bg-white/45 dark:bg-zinc-950/45 border-zinc-200/40 dark:border-zinc-800/50 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo / Text: "sandeep." */}
          <Link
            href="/"
            className="group relative flex items-center gap-1.5 pl-1 py-0.5 rounded-full focus:outline-hidden"
            aria-label="Sandeep Singh Home"
          >
            <div className="flex items-baseline font-mono tracking-tight text-[17px] sm:text-[18px]">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                sandeep
              </span>
              <span className="text-emerald-500 font-bold inline-block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                .
              </span>
            </div>
            <span className="hidden sm:inline-flex text-[10px] tracking-widest uppercase font-mono px-1.5 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border border-zinc-300/40 dark:border-zinc-700/40 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              dev
            </span>
          </Link>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop Navigation Links with animated active pill */}
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center space-x-1 text-sm font-medium pr-1"
            >
              {links.map((link) => {
                const isActive = pathname.startsWith(link.url);
                return (
                  <Link
                    key={link.title}
                    href={link.url}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "text-zinc-900 dark:text-white bg-zinc-200/60 dark:bg-zinc-800/70"
                        : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/40 dark:hover:bg-zinc-850/50"
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

            {/* Command Palette Trigger Button */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800/90 shadow-2xs transition-all duration-150 cursor-pointer group"
              aria-label="Open Command Menu (⌘K or Ctrl+K)"
              title="Search & commands (⌘K / Ctrl+K)"
            >
              <Search
                size={13}
                className="text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-500 transition-colors"
              />
              <span className="hidden sm:inline text-xs text-zinc-500 dark:text-zinc-400 font-sans group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
                Search
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800/80 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-700/60">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="size-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800/90 shadow-2xs transition-all duration-150 cursor-pointer"
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <Moon size={14} className="text-zinc-200" />
                ) : (
                  <Sun size={14} className="text-zinc-700" />
                )}
              </motion.div>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              className="md:hidden size-8 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Framer Motion AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              aria-label="Mobile navigation"
              className="md:hidden mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col space-y-1 overflow-hidden"
            >
              {links.map((link) => {
                const isActive = pathname.startsWith(link.url);
                return (
                  <Link
                    key={link.title}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full px-3 py-2 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-900 dark:text-white"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/40 dark:hover:bg-zinc-850/50"
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Command Menu Modal attached cleanly with navbar lifecycle */}
      <CommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
      />
    </>
  );
}
