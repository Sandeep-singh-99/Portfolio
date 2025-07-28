"use client";

import Typewriter from "typewriter-effect";

interface TypewriterClientProps {
  words: string[];
}
 // className="text-2xl  font-semibold"
export default function TypewriterClient({ words }: TypewriterClientProps) {
  return (
    <h2 
  className="text-3xl font-bold bg-clip-text text-transparent
             bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
             dark:from-green-300 dark:via-blue-400 dark:to-purple-400"
>
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
