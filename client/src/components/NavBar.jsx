import React, { useState } from "react";
import { Briefcase, Mail, Menu, PenTool, User, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl mx-auto shadow-gray-500/10 shadow-2xl rounded-full"
      aria-label="Main Navigation"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/15 backdrop-blur-2xl border border-white/15 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Logo/Brand */}
        <a
          href="#"
          className="text-white text-xl sm:text-2xl font-extrabold tracking-tight hover:text-gray-100 transition-colors duration-200"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Portfolio
        </a>

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex items-center space-x-6"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          <a
            href="#about"
            className="text-white/95 text-sm md:text-base font-medium hover:text-white hover:scale-105 transition-all duration-200 flex items-center gap-2"
            aria-label="About page"
          >
            <User className="w-5 h-5" />
            About
          </a>
          <a
            href="#projects"
            className="text-white/95 text-sm md:text-base font-medium hover:text-white hover:scale-105 transition-all duration-200 flex items-center gap-2"
            aria-label="Projects page"
          >
            <Briefcase className="w-5 h-5" />
            Projects
          </a>
          <a
            href="#contact"
            className="text-white/95 text-sm md:text-base font-medium hover:text-white hover:scale-105 transition-all duration-200 flex items-center gap-2"
            aria-label="Contact page"
          >
            <Mail className="w-5 h-5" />
            Contact
          </a>
          <a
            href="#blog"
            className="text-white/95 text-sm md:text-base font-medium hover:text-white hover:scale-105 transition-all duration-200 flex items-center gap-2"
            aria-label="Blog page"
          >
            <PenTool className="w-5 h-5" />
            Blog
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          data-aos="fade-down"
          data-aos-delay="400"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div
          className="md:hidden bg-black/15 backdrop-blur-2xl border border-white/15 rounded-b-xl mt-2 px-4 py-6 shadow-lg"
          data-aos="fade-down"
          data-aos-delay="500"
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#about"
              className="text-white/95 text-base font-medium hover:text-white hover:scale-105 transition-all duration-200 flex items-center gap-2"
              onClick={toggleMenu}
              aria-label="About page"
            >
              <User className="w-5 h-5" />
              About
            </a>
            <a
              href="#projects"
              className="text-white/95 text-base font-medium hover:text-white hover:scale-105 transition-all duration-200 flex items-center gap-2"
              onClick={toggleMenu}
              aria-label="Projects page"
            >
              <Briefcase className="w-5 h-5" />
              Projects
            </a>
            <a
              href="#contact"
              className="text-white/95 text-base font-medium hover:text-white hover:scale-105 transition-all duration-200 flex items-center gap-2"
              onClick={toggleMenu}
              aria-label="Contact page"
            >
              <Mail className="w-5 h-5" />
              Contact
            </a>
            <a
              href="#blog"
              className="text-white/95 text-base font-medium hover:text-white hover:scale-105 transition-all duration-200 flex items-center gap-2"
              onClick={toggleMenu}
              aria-label="Blog page"
            >
              <PenTool className="w-5 h-5" />
              Blog
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}