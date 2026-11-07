"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Types and deletes each word in turn, followed by a blinking pixel
 * caret. Pass a single word to type it once and stop.
 */
export function TypeLoop({
  words,
  className,
  typeMs = 85,
  deleteMs = 45,
  holdMs = 2200,
  startDelay = 600,
}: {
  words: string[];
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  startDelay?: number;
}) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    let len = 0;
    let deleting = false;
    let t = 0;
    // blank the server-rendered word, then start typing
    t = window.setTimeout(() => setText(""), 0);

    const step = () => {
      const word = words[i];
      if (!deleting) {
        len++;
        setText(word.slice(0, len));
        if (len === word.length) {
          if (words.length === 1) return;
          deleting = true;
          t = window.setTimeout(step, holdMs);
          return;
        }
        t = window.setTimeout(step, typeMs);
      } else {
        len--;
        setText(word.slice(0, len));
        if (len === 0) {
          deleting = false;
          i = (i + 1) % words.length;
        }
        t = window.setTimeout(step, deleteMs);
      }
    };
    const start = window.setTimeout(step, startDelay);
    return () => {
      clearTimeout(t);
      clearTimeout(start);
    };
  }, [words, typeMs, deleteMs, holdMs, startDelay]);

  return (
    <span className={className}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden>
        {text}
        <span className="caret" />
      </span>
    </span>
  );
}
