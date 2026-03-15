"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1500 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [started, setStarted] = useState(false);

  // Parse numeric part and suffix — memoize to avoid new object each render
  const { target, suffix, isDecimal, rawNum } = useMemo(() => {
    const match = value.match(/^([\d.]+)(.*)$/);
    return {
      target: match ? parseFloat(match[1]) : 0,
      suffix: match ? match[2] : "",
      isDecimal: match ? match[1].includes(".") : false,
      rawNum: match ? match[1] : "0",
    };
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        setDisplayValue(current.toFixed(1));
      } else {
        setDisplayValue(Math.round(current).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(rawNum);
      }
    }

    requestAnimationFrame(animate);
  }, [started, target, duration, isDecimal, rawNum]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}
