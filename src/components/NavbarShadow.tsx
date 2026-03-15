"use client";

import { useEffect, useState } from "react";

export default function NavbarShadow() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute inset-x-0 bottom-0 h-px transition-opacity duration-300 pointer-events-none"
      style={{
        opacity: scrolled ? 1 : 0,
        boxShadow: "0 1px 8px rgba(26, 18, 7, 0.08)",
        height: 1,
      }}
    />
  );
}
