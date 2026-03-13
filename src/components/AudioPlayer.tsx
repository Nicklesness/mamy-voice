"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Mic } from "lucide-react";
import type { Book } from "@/types";
import BookCover from "@/components/BookCover";

interface AudioPlayerProps {
  book: Book;
  audioUrl: string | null;
}

export default function AudioPlayer({ book, audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      setTotalSeconds(Math.floor(audio.duration));
      setIsLoaded(true);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentSeconds(Math.floor(audio.duration));
    };

    const onError = () => {
      setIsLoaded(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl]);

  // Update current time via requestAnimationFrame
  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setCurrentSeconds(Math.floor(audioRef.current.currentTime));
    }
    animFrameRef.current = requestAnimationFrame(updateTime);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateTime);
    } else if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, updateTime]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked or other error
      });
    }
  }, [isPlaying, isLoaded]);

  const seekBy = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentSeconds(Math.floor(newTime));
  }, [isLoaded]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent =
    totalSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0;

  return (
    <div
      className="flex flex-col items-center justify-between min-h-svh px-6 py-10 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${book.coverColor}20 0%, ${book.coverColor}08 40%, #FDF6EE 100%)`,
      }}
    >
      {/* Cover section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full animate-fade-in-scale">
        <div className="relative">
          {/* Glow behind cover */}
          <div
            className="absolute -inset-6 rounded-[40px] opacity-30 blur-2xl"
            style={{ backgroundColor: book.coverColor }}
          />
          <div className={isPlaying ? "animate-cover-sway" : ""}>
            <BookCover
              bookId={book.id}
              title={book.title}
              coverColor={book.coverColor}
              size="xl"
              className="relative"
            />
          </div>
        </div>

        {/* Sound waves when playing */}
        {isPlaying && (
          <div className="flex items-end gap-1 h-6 mt-3 animate-fade-in">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="sound-wave-bar w-1 rounded-full bg-accent-warm"
                style={{ height: 6 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info + Controls */}
      <div className="w-full flex flex-col items-center gap-6 pb-4 animate-fade-in-up delay-300">
        {/* Title & Author */}
        <div className="text-center">
          <h2 className="text-[22px] font-bold text-text-primary">{book.title}</h2>
          <p className="text-sm text-text-secondary mt-1 flex items-center justify-center gap-1.5">
            <Mic size={14} className="text-accent-warm" /> Mom&apos;s Voice
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full" style={{ maxWidth: 342 }}>
          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(26, 18, 7, 0.06)" }}
          >
            <div
              className="h-1 rounded-full bg-accent-warm transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span
              className="text-text-tertiary"
              style={{ fontSize: 13, fontWeight: 500, fontVariantNumeric: "tabular-nums", letterSpacing: "0.03em" }}
            >
              {formatTime(currentSeconds)}
            </span>
            <span
              className="text-text-tertiary"
              style={{ fontSize: 13, fontWeight: 500, fontVariantNumeric: "tabular-nums", letterSpacing: "0.03em" }}
            >
              {formatTime(totalSeconds)}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-7">
          {/* Rewind 15s */}
          <button
            onClick={() => seekBy(-15)}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer"
            style={{
              border: "1px solid rgba(26, 18, 7, 0.06)",
              boxShadow: "var(--shadow-sm)",
              opacity: isLoaded ? 1 : 0.4,
            }}
            aria-label="Rewind 15 seconds"
            disabled={!isLoaded}
          >
            <div className="relative flex items-center justify-center">
              <SkipBack size={24} className="text-text-secondary" />
              <span className="absolute text-[8px] font-bold text-text-secondary" style={{ marginLeft: 2 }}>15</span>
            </div>
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlayPause}
            className="w-24 h-24 rounded-full flex items-center justify-center text-white active:scale-[0.92] transition-all duration-150 cursor-pointer"
            style={{
              background: isPlaying ? "var(--accent-deep)" : "var(--gradient-cta)",
              boxShadow: isPlaying
                ? "0 8px 24px rgba(139, 92, 246, 0.3)"
                : "var(--shadow-cta)",
              transition: "background 300ms, box-shadow 300ms, transform 150ms",
              opacity: isLoaded ? 1 : 0.4,
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={!isLoaded}
          >
            {isPlaying ? <Pause size={36} fill="white" /> : <Play size={36} fill="white" className="ml-1" />}
          </button>

          {/* Forward 15s */}
          <button
            onClick={() => seekBy(15)}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer"
            style={{
              border: "1px solid rgba(26, 18, 7, 0.06)",
              boxShadow: "var(--shadow-sm)",
              opacity: isLoaded ? 1 : 0.4,
            }}
            aria-label="Forward 15 seconds"
            disabled={!isLoaded}
          >
            <div className="relative flex items-center justify-center">
              <SkipForward size={24} className="text-text-secondary" />
              <span className="absolute text-[8px] font-bold text-text-secondary" style={{ marginLeft: -2 }}>15</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
