"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import Button from "@/components/ui/Button";
import { BookOpen, Check, ChevronLeft, Play, RotateCcw, Volume2 } from "lucide-react";
import { READING_PASSAGES, TOTAL_PASSAGES } from "@/lib/reading-texts";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type ScreenState = "idle" | "recording" | "recorded" | "playing" | "complete";

interface RecordedFragment {
  blob: Blob;
  duration: number;
}

interface VoiceRecorderProps {
  onComplete: (blobs: Blob[]) => void;
}

export default function VoiceRecorder({ onComplete }: VoiceRecorderProps) {
  const router = useRouter();
  const {
    state: recorderState,
    duration,
    audioLevel,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    playRecording,
    stopPlaying,
    resetRecording,
  } = useVoiceRecorder();

  const [currentPassage, setCurrentPassage] = useState(0);
  const [fragments, setFragments] = useState<(RecordedFragment | null)[]>(
    Array(TOTAL_PASSAGES).fill(null)
  );
  const [screenState, setScreenState] = useState<ScreenState>("idle");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  // Sync recorder state to screen state
  useEffect(() => {
    if (screenState === "complete") return;
    if (recorderState === "recording") {
      setScreenState("recording");
    } else if (recorderState === "recorded") {
      setScreenState("recorded");
      if (audioBlob) {
        setFragments(prev => {
          const next = [...prev];
          next[currentPassage] = { blob: audioBlob, duration };
          return next;
        });
      }
    } else if (recorderState === "playing") {
      setScreenState("playing");
    } else if (recorderState === "idle" && screenState !== "idle") {
      setScreenState("idle");
    }
  }, [recorderState, audioBlob, duration, currentPassage, screenState]);

  const handleNextPassage = useCallback(() => {
    if (currentPassage >= TOTAL_PASSAGES - 1) {
      setScreenState("complete");
      return;
    }

    setIsTransitioning(true);
    setTextVisible(false);

    setTimeout(() => {
      const nextPassage = currentPassage + 1;
      setCurrentPassage(nextPassage);
      resetRecording();

      setTimeout(() => {
        setTextVisible(true);
        setIsTransitioning(false);
        setScreenState("idle");
      }, 200);
    }, 300);
  }, [currentPassage, resetRecording]);

  const handleFinish = useCallback(() => {
    setScreenState("complete");
  }, []);

  const handleChooseBook = useCallback(() => {
    const blobs = fragments.filter((f): f is RecordedFragment => f !== null).map(f => f.blob);
    onComplete(blobs);
  }, [fragments, onComplete]);

  const handleStartOver = useCallback(() => {
    setFragments(Array(TOTAL_PASSAGES).fill(null));
    setCurrentPassage(0);
    resetRecording();
    setScreenState("idle");
    setTextVisible(true);
  }, [resetRecording]);

  const passage = READING_PASSAGES[currentPassage];
  const isFirstPassage = currentPassage === 0;
  const isLastPassage = currentPassage === TOTAL_PASSAGES - 1;

  // COMPLETE screen
  if (screenState === "complete") {
    return (
      <div className="relative flex flex-col min-h-svh px-6 pt-12 pb-10 overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="animate-bounce-in">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}
            >
              <Check size={48} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h2
            className="text-text-primary text-center mt-6"
            style={{ fontSize: 22, fontWeight: 800 }}
          >
            Voice sample ready!
          </h2>
          <p
            className="text-text-secondary text-center"
            style={{ fontSize: 14, marginTop: 4 }}
          >
            Your voice clone will be created from these recordings
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <Button variant="primary" size="lg" fullWidth onClick={handleChooseBook}>
            Choose a book
          </Button>
          <div className="text-center mt-3">
            <button
              onClick={handleStartOver}
              className="text-sm font-medium cursor-pointer bg-transparent border-none"
              style={{ color: "var(--accent-warm)" }}
            >
              Re-record all
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-svh overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Error message */}
      {error && (
        <div
          className="absolute top-4 left-6 right-6 z-20 rounded-2xl p-4 text-sm text-center animate-fade-in-scale"
          style={{ background: "var(--error-bg)", color: "var(--error)", boxShadow: "var(--shadow-sm)" }}
        >
          {error}
        </div>
      )}

      {/* Header */}
      <div className="shrink-0 px-6 pt-12 pb-2">
        {/* Back button */}
        {isFirstPassage && screenState === "idle" && (
          <button
            onClick={() => router.push("/")}
            className="absolute top-3 left-4 z-10 flex items-center justify-center cursor-pointer bg-transparent border-none"
            aria-label="Back"
          >
            <ChevronLeft size={24} className="text-text-secondary" />
          </button>
        )}

        <p
          className="text-center"
          style={{ fontSize: 13, fontWeight: 700, color: "var(--text-tertiary)" }}
        >
          Read aloud to record your voice
        </p>
      </div>

      {/* Scrollable text area */}
      <div
        className="flex-1 min-h-0 overflow-y-auto px-6 py-4"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(-20px)",
            transition: isTransitioning
              ? "opacity 300ms ease-out, transform 300ms ease-out"
              : undefined,
          }}
        >
          {/* Reading label */}
          <p
            className="flex items-center gap-1.5 mb-3"
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: screenState === "recording" ? "var(--accent-warm)" : "var(--text-tertiary)",
            }}
          >
            <BookOpen size={14} style={{ color: "var(--accent-warm)" }} />
            {screenState === "recording" ? "Read aloud" : "Read this text aloud when recording starts"}
          </p>

          {/* Passage text */}
          {passage.text.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="text-text-primary text-left"
              style={{
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.75,
                marginBottom: i < passage.text.split("\n\n").length - 1 ? 16 : 0,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Controls — always visible at bottom */}
      <div
        className="shrink-0 rounded-t-3xl px-6 pt-5 flex flex-col items-center"
        style={{
          background: "var(--surface)",
          boxShadow: "0 -4px 16px rgba(26, 18, 7, 0.04)",
          paddingBottom: `calc(20px + env(safe-area-inset-bottom, 0px))`,
        }}
      >
        {/* IDLE STATE */}
        {screenState === "idle" && (
          <div className="flex flex-col items-center py-2">
            <div className="relative animate-bounce-in">
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(239, 68, 68, 0.15)" }} />
              <div className="absolute inset-0 rounded-full animate-pulse-ring-outer" style={{ background: "rgba(239, 68, 68, 0.08)" }} />
              <button
                onClick={startRecording}
                className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center active:scale-95 transition-all duration-200 cursor-pointer z-10"
                style={{ background: "var(--recording)", boxShadow: "0 8px 24px rgba(239, 68, 68, 0.3)" }}
                aria-label="Start recording"
              >
                <div className="w-7 h-7 rounded-full bg-white/90" />
              </button>
            </div>
            <span className="text-[13px] text-text-tertiary font-medium mt-2">
              Tap to record
            </span>
          </div>
        )}

        {/* RECORDING STATE */}
        {screenState === "recording" && (
          <>
            {/* Timer */}
            <div className="w-full flex items-center justify-between mb-3">
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-warm)" }}>
                Recording...
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--text-tertiary)",
                }}
              >
                {formatTime(duration)}
              </span>
            </div>

            {/* Audio level bars */}
            <div className="w-full flex items-center justify-center gap-[2.5px] mb-4" style={{ height: 40 }}>
              {Array.from({ length: 24 }).map((_, i) => {
                const baseHeight = 4 + Math.sin(i * 0.7) * 4;
                const height = baseHeight + audioLevel * (40 - baseHeight);
                return (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 3,
                      height: Math.max(4, height),
                      background: "linear-gradient(to top, var(--accent-warm), var(--accent-deep))",
                      transition: "height 80ms linear",
                    }}
                  />
                );
              })}
            </div>

            {/* Stop button */}
            <button
              onClick={stopRecording}
              className="w-16 h-16 rounded-full flex items-center justify-center active:scale-95 transition-all duration-200 cursor-pointer animate-recording-pulse"
              style={{ background: "var(--recording)", boxShadow: "0 8px 24px rgba(239, 68, 68, 0.3)" }}
              aria-label="Stop recording"
            >
              <div className="w-[22px] h-[22px] rounded bg-white/90" />
            </button>
          </>
        )}

        {/* RECORDED STATE */}
        {screenState === "recorded" && (
          <>
            {/* Success badge */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 animate-bounce-in"
              style={{ background: "var(--success-bg)" }}
            >
              <Check size={16} style={{ color: "var(--success)" }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--success)" }}>
                Recorded!
              </span>
            </div>

            <p className="text-[13px] text-text-tertiary mt-1">
              {formatTime(duration)} recorded
            </p>

            {/* Action buttons */}
            <div className="w-full mt-4 flex flex-col gap-2.5 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex gap-2.5">
                <Button variant="ghost" fullWidth onClick={playRecording}>
                  <Play size={18} className="mr-1.5" />
                  Listen
                </Button>
                <Button variant="ghost" fullWidth onClick={resetRecording}>
                  <RotateCcw size={18} className="mr-1.5" />
                  Re-record
                </Button>
              </div>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={isLastPassage ? handleFinish : handleNextPassage}
              >
                {isLastPassage ? "Finish" : "Next passage"}
              </Button>
            </div>
          </>
        )}

        {/* PLAYING STATE */}
        {screenState === "playing" && (
          <>
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2"
              style={{ background: "var(--accent-deep-light)" }}
            >
              <Volume2 size={16} className="animate-pulse-soft" style={{ color: "var(--accent-deep)" }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent-deep)" }}>
                Playing...
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5 h-8 my-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-deep)",
                    animation: `wave-bar-${(i % 5) + 1} ${0.6 + i * 0.05}s ease-in-out infinite`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>

            <div className="w-full">
              <Button variant="secondary" fullWidth onClick={stopPlaying}>
                Stop
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
