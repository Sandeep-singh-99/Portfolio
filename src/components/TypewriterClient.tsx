"use client";

import Typewriter from "typewriter-effect";

interface TypewriterClientProps {
  words: string[];
}

// md:text-4xl text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500

export default function TypewriterClient({ words }: TypewriterClientProps) {
  return (
    <h2 className="md:text-4xl text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600">
      <Typewriter
        options={{
          loop: true,
          delay: 100,
          deleteSpeed: 50,
          cursor: "_",
          cursorClassName: "animate-blink",
        }}
        onInit={(typewriter) => {
          words.forEach((text) => {
            typewriter
              .typeString(text)
              .pauseFor(1000)
              .deleteAll()
              .pauseFor(500);
          });
          typewriter.start();
        }}
      />
    </h2>
  );
}
