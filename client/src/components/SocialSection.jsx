import React from 'react';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

export default function SocialSection() {
  const socialLinks = [
    { icon: <Twitter className="h-6 w-6" />, href: 'https://twitter.com/yourprofile', label: 'Twitter' },
    { icon: <Github className="h-6 w-6" />, href: 'https://github.com/yourprofile', label: 'GitHub' },
    { icon: <Linkedin className="h-6 w-6" />, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { icon: <Instagram className="h-6 w-6" />, href: 'https://instagram.com/yourprofile', label: 'Instagram' },
  ];

  return (
    <div
      className="fixed top-1/2 left-2 transform -translate-y-1/2 bg-gray-800/20 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-lg hidden flex-col space-y-6 sm:space-y-4 z-20 sm:flex border border-white/15"
      data-aos="fade-right"
      data-aos-duration="1200"
      data-aos-delay="300"
      data-aos-easing="ease-out-cubic"
    >
      {socialLinks.map((link, index) => (
        <a
          key={index}                               
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className="relative text-white/80 hover:text-white transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay={`${400 + index * 150}`}
        >
          <span className="transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-200">
            {link.icon}
          </span>
          {/* Tooltip */}
          <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
}