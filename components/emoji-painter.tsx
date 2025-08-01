"use client";

import React, { useEffect, useRef } from "react";

const plantEmojis = ["🌿", "🌱", "🌵", "🍀", "🌴", "🌲", "🌳", "🌼", "🌸"];

const EmojiPainter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPaintTime = useRef<number>(0);
  const throttleDelay = 100; // ms

  const addEmoji = (x: number, y: number) => {
    if (!containerRef.current) return;

    const emoji = document.createElement("span");
    emoji.textContent =
      plantEmojis[Math.floor(Math.random() * plantEmojis.length)];
    emoji.className = "absolute pointer-events-none select-none text-6xl";
    emoji.style.left = `${x - 12}px`;
    emoji.style.top = `${y - 12}px`;

    containerRef.current.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 3000);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    const now = Date.now();
    if (now - lastPaintTime.current < throttleDelay) return;
    lastPaintTime.current = now;

    if ("touches" in e) {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        addEmoji(touch.clientX, touch.clientY);
      }
    } else {
      addEmoji(e.clientX, e.clientY);
    }
  };

  useEffect(() => {
    const throttled = (e: MouseEvent | TouchEvent) => {
      requestAnimationFrame(() => handleMove(e));
    };

    window.addEventListener("mousemove", throttled);
    window.addEventListener("touchmove", throttled);

    return () => {
      window.removeEventListener("mousemove", throttled);
      window.removeEventListener("touchmove", throttled);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden z-0" />
  );
};

export default EmojiPainter;
