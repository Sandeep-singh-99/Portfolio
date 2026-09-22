"use client";

import Typewriter from "typewriter-effect";

interface TypewriterClientProps {
  words: string[];
}

export default function TypewriterClient({ words }: TypewriterClientProps) {
  if (!words || words.length === 0) return null;

  return (
    <span className="inline-block font-mono text-sm sm:text-base font-medium text-muted-foreground">
      <Typewriter
        options={{
          loop: true,
          delay: 80,
          deleteSpeed: 40,
          cursor: "|",
          cursorClassName: "text-primary/70 font-light",
        }}
        onInit={(typewriter) => {
          words.forEach((text) => {
            typewriter
              .typeString(text)
              .pauseFor(1500)
              .deleteAll()
              .pauseFor(400);
          });
          typewriter.start();
        }}
      />
    </span>
  );
}
