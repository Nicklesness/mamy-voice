"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function DemoPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasInteracted(true);

    if (playing) {
      audio.pause();
      cancelAnimationFrame(rafRef.current);
    } else {
      audio.play().catch(() => {});
      rafRef.current = requestAnimationFrame(updateTime);
    }
    setPlaying(!playing);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative rounded-[28px] p-5 md:p-6" style={{ background: "var(--surface)", boxShadow: "0 20px 60px rgba(232, 115, 74, 0.15), 0 4px 20px rgba(0,0,0,0.06)" }}>
      {/* Real audio element in DOM */}
      <audio
        ref={audioRef}
        src="/images/winnie-the-pooh-demo.mp3"
        preload="metadata"
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setPlaying(false);
          cancelAnimationFrame(rafRef.current);
        }}
      />

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

      {/* Sound wave — always rendered, visibility toggles */}
      <div className="flex items-center justify-center gap-[3px] mt-2" style={{ height: 24, opacity: playing ? 1 : 0, transition: "opacity 0.3s" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="sound-wave-bar rounded-full"
            style={{ width: 3, background: "var(--accent-warm)", opacity: 0.6 }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-1">
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
      <div className="relative flex items-center justify-center gap-6 mt-3">
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

        {/* Click to listen badge — near the play button */}
        {!hasInteracted && (
          <button
            onClick={togglePlay}
            className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 rounded-full text-white font-semibold cursor-pointer animate-cta-breathe"
            style={{
              height: 26,
              fontSize: 11,
              background: "var(--gradient-cta)",
              boxShadow: "var(--shadow-cta)",
              whiteSpace: "nowrap",
            }}
          >
            <Play size={10} />
            Click to listen
          </button>
        )}
      </div>

      {/* Spacer for badge */}
      {!hasInteracted && <div style={{ height: 20 }} />}
    </div>
  );
}
