"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** If set, fires an Amplitude "section_viewed" event when this section scrolls into view */
  section?: string;
}

export default function ScrollReveal({ children, className = "", delay, section }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (section) {
            track("section_viewed", { section, placement: "landing" });
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [section]);

  const delayClass = delay ? `delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`${isVisible ? `animate-fade-in-up ${delayClass}` : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
