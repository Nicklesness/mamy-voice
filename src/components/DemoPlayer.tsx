"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function DemoPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    rafRef.current = requestAnimationFrame(updateTime);
  }, []);

  useEffect(() => {
    const audio = new Audio("/audio/winnie-the-pooh-demo.mp3");
    audio.preload = "metadata";
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", () => {
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    });

    return () => {
      audio.pause();
      audio.src = "";
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);

    if (playing) {
      audioRef.current.pause();
      cancelAnimationFrame(rafRef.current);
    } else {
      audioRef.current.play();
      rafRef.current = requestAnimationFrame(updateTime);
    }
    setPlaying(!playing);
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * duration;
    setCurrentTime(audioRef.current.currentTime);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative rounded-[28px] p-5 md:p-6" style={{ background: "var(--surface)", boxShadow: "0 20px 60px rgba(232, 115, 74, 0.15), 0 4px 20px rgba(0,0,0,0.06)" }}>
      {/* Click to listen badge */}
      {!hasInteracted && (
        <button
          onClick={togglePlay}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-4 rounded-full text-white font-semibold cursor-pointer animate-cta-breathe"
          style={{
            height: 30,
            fontSize: 12,
            background: "var(--gradient-cta)",
            boxShadow: "var(--shadow-cta)",
            whiteSpace: "nowrap",
          }}
        >
          <Play size={12} className="ml-0" />
          Click to listen
        </button>
      )}

      {/* Cover image */}
      <div
        className={`w-full rounded-2xl mb-4 overflow-hidden ${playing ? "animate-cover-sway" : ""}`}
        style={{ aspectRatio: "1/1" }}
      >
        <Image
          src="/images/landing/player_mockup.png"
          alt="Winnie the Pooh book cover"
          width={300}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Title */}
      <p className="text-text-primary text-center" style={{ fontSize: 16, fontWeight: 700 }}>
        Winnie-the-Pooh
      </p>
      <p className="text-text-secondary text-center mt-0.5" style={{ fontSize: 13 }}>
        A. A. Milne
      </p>

      {/* Sound wave visualization */}
      {playing && (
        <div className="flex items-center justify-center gap-[3px] mt-2 mb-1" style={{ height: 24 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="sound-wave-bar rounded-full"
              style={{ width: 3, background: "var(--accent-warm)", opacity: 0.6 }}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="mt-3">
        <div
          className="w-full h-1.5 rounded-full cursor-pointer"
          style={{ background: "var(--bg-warm)" }}
          onClick={handleProgressClick}
        >
          <div
            className="h-full rounded-full transition-[width] duration-100"
            style={{ width: `${progress}%`, background: "var(--gradient-cta)" }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-text-tertiary" style={{ fontSize: 11 }}>{fmt(currentTime)}</span>
          <span className="text-text-tertiary" style={{ fontSize: 11 }}>{duration ? fmt(duration) : "–:––"}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-3">
        <button
          onClick={() => skip(-15)}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform active:scale-90"
          style={{ background: "var(--bg-warm)" }}
        >
          <SkipBack size={16} className="text-text-secondary" />
        </button>
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer transition-transform active:scale-90"
          style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
        >
          {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        <button
          onClick={() => skip(15)}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform active:scale-90"
          style={{ background: "var(--bg-warm)" }}
        >
          <SkipForward size={16} className="text-text-secondary" />
        </button>
      </div>
    </div>
  );
}
