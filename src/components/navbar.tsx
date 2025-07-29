"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const links = ["About", "Skills", "Projects", "Contact"];

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl 
      px-4 py-3 rounded-2xl backdrop-blur-md shadow-md
      border border-zinc-300/20 dark:border-zinc-700/50
      bg-white/70 dark:bg-zinc-900/70 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="flex items-center">
          <Image src={"/profilePic.png"} alt="Profile Picture" width={30} height={30} className="rounded-full w-10 h-10 object-contain" />
        </Link>


        {/* <Link href={"/"} className="text-lg md:text-2xl font-bold gradient-title tracking-tight">
          Sandeep.
        </Link> */}

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link}
              href={link === "Home" ? "/" : `#${link.toLowerCase()}`}
              className="text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white transition"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Theme toggle + Mobile menu icon */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border 
              border-zinc-400/40 dark:border-zinc-600/40 
              text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300/30 dark:hover:bg-zinc-800/50 transition"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span className="hidden sm:inline">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
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
              key={link}
              href={link === "Home" ? "/" : `#${link.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-md text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300/30 dark:hover:bg-zinc-800/50 transition"
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
