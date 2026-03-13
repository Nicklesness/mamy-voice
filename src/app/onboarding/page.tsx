"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mic, BookOpen, Headphones, VolumeX, Clock, Smartphone } from "lucide-react";
import Button from "@/components/ui/Button";
import ProgressDots from "@/components/ui/ProgressDots";

interface Slide {
  image: string;
  imageAlt: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

const slides: Slide[] = [
  {
    image: "/images/onboarding/slide1.png",
    imageAlt: "Bunny reading a bedtime story",
    title: (
      <>
        A mother&apos;s voice is the{" "}
        <span style={{ color: "var(--accent-warm)" }}>most important</span> sound
      </>
    ),
    content: (
      <p className="text-text-secondary leading-relaxed text-center" style={{ fontSize: 15 }}>
        Research shows a mother&apos;s voice calms a child better than any lullaby
      </p>
    ),
  },
  {
    image: "/images/onboarding/slide2.png",
    imageAlt: "Fox with magical storybook",
    title: (
      <>
        How it <span style={{ color: "var(--accent-warm)" }}>works</span>
      </>
    ),
    content: (
      <div className="flex flex-col gap-2.5 w-full">
        {[
          { step: "Read a few short passages aloud", icon: <Mic size={16} /> },
          { step: "Pick a story from our catalog", icon: <BookOpen size={16} /> },
          { step: "Listen to it in your voice", icon: <Headphones size={16} /> },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white/80 rounded-2xl px-4 py-3"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg text-white flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--gradient-cta)" }}
            >
              {i + 1}
            </span>
            <div className="flex items-center gap-2 text-text-secondary">
              {item.icon}
              <span className="text-sm text-text-primary font-medium">{item.step}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    image: "/images/onboarding/slide3.png",
    imageAlt: "Bear cub preparing for bedtime",
    title: (
      <>What you&apos;ll need</>
    ),
    content: (
      <div className="flex flex-col gap-2.5 w-full">
        {[
          { item: "A quiet room", icon: <VolumeX size={18} style={{ color: "var(--accent-warm)" }} /> },
          { item: "3 minutes of free time", icon: <Clock size={18} style={{ color: "var(--accent-warm)" }} /> },
          { item: "Hold phone 20-30 cm away", icon: <Smartphone size={18} style={{ color: "var(--accent-warm)" }} /> },
        ].map((entry, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white/80 rounded-2xl px-4 py-3"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            {entry.icon}
            <span className="text-sm text-text-primary font-medium">{entry.item}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const SWIPE_THRESHOLD = 50;

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const router = useRouter();

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index < 0 || index >= slides.length) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setOffsetX(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setOffsetX(e.touches[0].clientX - touchStartX.current);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (offsetX < -SWIPE_THRESHOLD) next();
    else if (offsetX > SWIPE_THRESHOLD) prev();
    setOffsetX(0);
  }, [offsetX, next, prev]);

  const isLast = current === slides.length - 1;

  return (
    <div
      className="h-svh overflow-hidden select-none relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-screen slides */}
      <div
        className="flex h-full"
        style={{
          transform: `translateX(calc(-${current * 100}% + ${offsetX}px))`,
          transition: offsetX !== 0 ? "none" : "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full flex-shrink-0 h-full relative">
            {/* Background image — full screen */}
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />

            {/* Warm light gradient overlay from bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, #FDF6EE 0%, rgba(253,246,238,0.95) 25%, rgba(253,246,238,0.6) 45%, transparent 65%)",
              }}
            />

            {/* Content overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-28 flex flex-col items-center">
              <h2
                className="text-text-primary text-center"
                style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.3 }}
              >
                {slide.title}
              </h2>
              <div className="w-full mt-4 flex justify-center">
                {slide.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation — floating at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-3 flex flex-col gap-4 z-10">
        <ProgressDots total={slides.length} current={current} />

        <div className="flex gap-3">
          {current > 0 && (
            <Button variant="text" size="lg" onClick={prev} className="!text-white/80">
              Back
            </Button>
          )}
          {isLast ? (
            <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/record")}>
              Start Recording
            </Button>
          ) : (
            <Button variant="primary" size="lg" fullWidth onClick={next}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
