"use client";

import Typewriter from "typewriter-effect";

interface TypewriterClientProps {
  words: string[];
}

export default function TypewriterClient({ words }: TypewriterClientProps) {
  return (
    <h2 className="text-2xl font-semibold">
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
