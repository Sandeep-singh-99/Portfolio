"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    {
      title: "Projects",
      url: "/project/all-projects",
    },
    {
      title: "Blogs",
      url: "/blog/all-blogs",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ];

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl
      px-4 py-2.5 rounded-full md:rounded-2xl
      border transition-all duration-300 backdrop-blur-md select-none
      ${
        isScrolled
          ? "bg-white/50 dark:bg-black/50 border-zinc-200/60 dark:border-zinc-800/60 shadow-lg backdrop-blur-lg"
          : "bg-white/30 dark:bg-black/30 border-zinc-200/30 dark:border-zinc-800/40 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="flex items-center">
          <Image
            src={"/profilePic.png"}
            alt="Profile Picture"
            width={30}
            height={30}
            priority
            loading="eager"
            className="rounded-full w-10 h-10 object-contain"
          />
        </Link>

        {/* Theme toggle + Mobile menu icon */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.title}
                href={link.url}
                className="text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white transition"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer px-4 relative flex items-center justify-center"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </motion.div>
          </button>

          {/* Menu icon (mobile only) */}
          <button
            className="md:hidden text-zinc-700 dark:text-zinc-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col items-center space-y-2 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-md text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300/30 dark:hover:bg-zinc-800/50 transition"
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
