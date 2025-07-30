// 'use client'; // Note: This is typically for Next.js; for Create React App, you can omit this line

// import { hr } from '@uiw/react-md-editor';
// import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

// const links = [
//   {
//     href: 'https://github.com/Sandeep-singh-99',
//     icon: <Github size={20} />,
//     label: 'GitHub',
//   },
//   {
//     href: 'https://linkedin.com/in/yourusername',
//     icon: <Linkedin size={20} />,
//     label: 'LinkedIn',
//   },
//   {
//     href: 'sandeep.necoder@gmail.com',
//     icon: <Mail size={20} />,
//     label: 'Email',
//   },
//   {
//     href: "https://x.com/SinghNecoder",
//     icon: <Twitter size={20} />,
//     label: 'Twitter',
//   },
//   {
//     href: 'https://www.instagram.com/sandeep.necoder',
//     icon: <Instagram size={20} />,
//     label: 'Instagram',
//   }
// ];

// export default function LeftSideBar() {
//   return (
//     <div className="fixed top-1/2 left-2 z-50 hidden md:flex flex-col items-center gap-5 px-3 py-4 bg-zinc-900/70 backdrop-blur-md border border-zinc-700/50 rounded-md shadow-2xl transform -translate-y-1/2">
//       {links.map((link, index) => (
//         <a
//           key={index}
//           href={link.href}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="group relative flex items-center justify-center text-white transition-transform hover:scale-110 hover:text-blue-400"
//         >
//           {link.icon}
//           <span className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow transition-all duration-300 whitespace-nowrap">
//             {link.label}
//           </span>
//         </a>
//       ))}
//     </div>
//   );
// }




'use client';

import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react';

const links = [
  {
    href: 'https://github.com/Sandeep-singh-99',
    icon: <Github size={20} />,
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/yourusername',
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:sandeep.necoder@gmail.com',
    icon: <Mail size={20} />,
    label: 'Email',
  },
  {
    href: 'https://x.com/SinghNecoder',
    icon: <Twitter size={20} />,
    label: 'Twitter',
  },
  {
    href: 'https://www.instagram.com/sandeep.necoder',
    icon: <Instagram size={20} />,
    label: 'Instagram',
  },
];

export default function LeftSideBar() {
  return (
    <div
      className="fixed z-50 flex items-center gap-5 px-3 py-5
      bg-zinc-900/60 backdrop-blur-md border border-zinc-700/40 rounded-xl shadow-xl
      md:top-1/2 md:left-8 lg:left-12 md:flex-col md:transform md:-translate-y-1/2
      bottom-4 left-1/2 flex-row transform -translate-x-1/2
      transition-all duration-500"
    >
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative text-white hover:text-sky-400 transition-all duration-200"
        >
          <div className="p-2 rounded-full bg-zinc-800/60 hover:bg-zinc-700/80 transition-colors">
            {link.icon}
          </div>

          {/* Tooltip */}
          <span
            className="absolute z-50 text-xs text-white bg-black px-2 py-1 rounded shadow-md
            transition-all duration-300 whitespace-nowrap
            md:left-full md:ml-3 md:opacity-0 md:group-hover:opacity-100
            bottom-full mb-2 opacity-0 group-hover:opacity-100"
          >
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
}
