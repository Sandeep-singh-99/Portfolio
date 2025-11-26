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

  const links = ["About", "Skills", "Projects", "Contact"];

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl
      px-4 py-3 rounded-2xl
      border transition-all duration-300
      ${
        isScrolled
          ? "bg-white/70 dark:bg-zinc-900/70 border-zinc-300/20 dark:border-zinc-700/50 shadow-md backdrop-blur-md"
          : "bg-transparent border-transparent shadow-none"
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
            className="rounded-full w-10 h-10 object-contain"
          />
        </Link>

        {/* Theme toggle + Mobile menu icon */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link}
                href={link === "Home" ? "/" : `${link.toLowerCase()}`}
                className="text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white transition"
              >
                {link}
              </Link>
            ))}
          </nav>

          <button
            onClick={(e) => {
              const newTheme = theme === "dark" ? "light" : "dark";

              // @ts-ignore
              if (!document.startViewTransition) {
                setTheme(newTheme);
                return;
              }

              const x = e.clientX;
              const y = e.clientY;
              const right = window.innerWidth - x;
              const bottom = window.innerHeight - y;
              const maxRadius = Math.hypot(
                Math.max(x, right),
                Math.max(y, bottom)
              );

              // @ts-ignore
              const transition = document.startViewTransition(() => {
                setTheme(newTheme);
              });

              transition.ready.then(() => {
                const clipPath = [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${maxRadius}px at ${x}px ${y}px)`,
                ];

                document.documentElement.animate(
                  {
                    clipPath: clipPath,
                  },
                  {
                    duration: 1000,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                  }
                );
              });
            }}
            className="cursor-pointer px-4 relative flex items-center justify-center"
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
              key={link}
              href={link === "Home" ? "/" : `${link.toLowerCase()}`}
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
