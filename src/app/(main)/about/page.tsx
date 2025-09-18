// import React from "react";
// import { ConnectDB } from "../../../../lib/db";
// import About from "../../../../models/about.model";

// async function fetchAboutData() {
//   await ConnectDB();
//   const data = await About.findOne();
//   return data;
// }

// export default async function AboutPage() {
//   const aboutData = await fetchAboutData();

//   return (
//     <div id="about" className="py-10">
//       <div className="text-center">
//         <h1 className="text-4xl md:text-6xl font-bold tracking-wider px-4 sm:px-6 lg:px-12">
//           About Me
//         </h1>
//       </div>
//       <div className="text-center text-[1rem]  md:text-2xl tracking-wider py-10 px-4 sm:px-6 lg:px-12">{aboutData.desc}</div>
//     </div>
//   );
// }

import React from "react";

export default function AboutPage() {
  return (
    <section
      id="about"
      className="relative py-20 px-6 sm:px-10 lg:px-20 text-white"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text">
          About Me
        </h2>

        {/* Content */}
        <p className="mt-8 text-lg md:text-xl text-gray-300 leading-relaxed">
          Hi, I’m <span className="text-blue-400 font-semibold">Sandeep Singh</span>, 
          a passionate <span className="text-purple-400 font-semibold">Full Stack Developer </span> 
          who loves building clean, scalable, and user-friendly web applications. 
          I enjoy turning ideas into reality through modern technologies and efficient code.
        </p>

        <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
          Currently, I’m pursuing my{" "}
          <span className="text-pink-400 font-semibold">Master of Computer Applications (MCA) </span> 
          at <span className="text-purple-400 font-semibold">Chandigarh University</span>, 
          continuously learning and expanding my skills to stay ahead in the ever-evolving tech world. 
          My goal is to create impactful digital solutions that deliver seamless user experiences 
          and solve real-world problems.
        </p>
      </div>
    </section>
  );
}

