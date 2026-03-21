"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

export default function MiniDemoPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    rafRef.current = requestAnimationFrame(updateTime);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      cancelAnimationFrame(rafRef.current);
    } else {
      audio.play().catch(() => {});
      rafRef.current = requestAnimationFrame(updateTime);
    }
    setPlaying(!playing);
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
    <button
      onClick={togglePlay}
      className="w-full flex items-center gap-3 rounded-2xl p-3 cursor-pointer border-none text-left transition-all duration-200 active:scale-[0.98]"
      style={{
        background: "var(--surface)",
        boxShadow: "0 2px 12px rgba(232, 115, 74, 0.1)",
      }}
    >
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

      {/* Cover thumbnail */}
      <div className="shrink-0 rounded-xl overflow-hidden" style={{ width: 48, height: 48 }}>
        <Image
          src="/images/landing/player_mockup.png"
          alt="Winnie the Pooh"
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary truncate" style={{ fontSize: 13, fontWeight: 600 }}>
              {playing ? "Now playing..." : "Listen to a demo"}
            </p>
            <p className="text-text-tertiary" style={{ fontSize: 11 }}>
              Winnie-the-Pooh · {duration ? fmt(duration) : "0:10"}
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div
          className="w-full h-1 rounded-full mt-1.5 cursor-pointer"
          style={{ background: "var(--bg-warm)" }}
          onClick={(e) => { e.stopPropagation(); handleProgressClick(e); }}
        >
          <div
            className="h-full rounded-full transition-[width] duration-100"
            style={{ width: `${progress}%`, background: "var(--gradient-cta)" }}
          />
        </div>
      </div>

      {/* Play button */}
      <div
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ background: "var(--gradient-cta)" }}
      >
        {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </div>
    </button>
  );
}
