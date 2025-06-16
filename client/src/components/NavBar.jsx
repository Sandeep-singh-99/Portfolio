import React, { useState, useEffect } from 'react';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Trigger effect after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-lg ${
        isScrolled
          ? 'bg-black/70 backdrop-blur-lg shadow-lg'
          : 'bg-black/30 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo or Brand Name */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white text-2xl font-bold tracking-tight">
              Portfolio
            </a>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button (Hidden on Desktop) */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16m-7 6h7'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Visible when toggled) */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        } overflow-hidden transition-all duration-300 ease-in-out bg-black/90 backdrop-blur-md rounded-b-lg`}
      >
        <div className="flex flex-col space-y-4 px-4 py-6">
          <a
            href="#home"
            className="text-white hover:text-gray-300 transition-colors duration-200 text-lg"
            onClick={toggleMobileMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white hover:text-gray-300 transition-colors duration-200 text-lg"
            onClick={toggleMobileMenu}
          >
            About
          </a>
          <a
            href="#projects"
            className="text-white hover:text-gray-300 transition-colors duration-200 text-lg"
            onClick={toggleMobileMenu}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-white hover:text-gray-300 transition-colors duration-200 text-lg"
            onClick={toggleMobileMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}