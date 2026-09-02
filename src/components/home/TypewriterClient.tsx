"use client";

import Typewriter from "typewriter-effect";

interface TypewriterClientProps {
  words: string[];
}

// text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 dark:from-gray-300 dark:via-gray-400 dark:to-gray-600

export default function TypewriterClient({ words }: TypewriterClientProps) {
  return (
    <h2 className="text-sx dark:text-gray-300 text-gray-700">
      <Typewriter
        options={{
          loop: true,
          delay: 100,
          deleteSpeed: 50,
          cursor: "|",
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
