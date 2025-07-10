"use client";

import React, { useEffect, useState } from "react";

const words = [
  { text: "React", color: "text-blue-500" },
  { text: "Next.js", color: "text-black dark:text-white" },
  { text: "TypeScript", color: "text-purple-500" },
  { text: "Tailwind CSS", color: "text-teal-500" },
];

export default function CustomTypewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length].text;

    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  const currentColor = words[wordIndex % words.length].color;

  return (
    <h2 className={`text-2xl font-semibold`}>
      <span className={`${currentColor}`}>{text}</span>
      <span className="animate-blink ml-1">|</span>
    </h2>
  );
}
