import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl mx-auto shadow-gray-500/10 shadow-2xl rounded-full">
      <div className="flex items-center justify-between px-6 py-3 bg-black/15 backdrop-blur-2xl border border-white/15 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Logo/Brand */}
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-tight hover:text-gray-100 transition-colors duration-200"
        >
          Portfolio
        </Link>

        {/* Navigation Links */}
        <div
          className="flex items-center space-x-6"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <Link
            to="/about"
            className="text-white/95 text-sm font-medium hover:text-white hover:scale-105 transition-all duration-200"
            aria-label="About page"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="text-white/95 text-sm font-medium hover:text-white hover:scale-105 transition-all duration-200"
            aria-label="Projects page"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="text-white/95 text-sm font-medium hover:text-white hover:scale-105 transition-all duration-200"
            aria-label="Contact page"
          >
            Contact
          </Link>
          <Link
            to="/blog"
            className="text-white/95 text-sm font-medium hover:text-white hover:scale-105 transition-all duration-200"
            aria-label="Blog page"
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}