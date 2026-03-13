"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { GenerationStatus } from "@/types";

interface UseGenerationStatusReturn {
  status: GenerationStatus;
  progress: number;
  audioUrl: string | null;
  error: string | null;
  start: () => void;
}

export function useGenerationStatus(bookId: string): UseGenerationStatusReturn {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    cleanup();
    setProgress(0);
    setError(null);
    setAudioUrl(null);
    setStatus("generating");

    const voiceId = localStorage.getItem("voiceId");
    if (!voiceId) {
      setStatus("error");
      setError("No voice recorded. Please record your voice first.");
      return;
    }

    // Simulate progress 0→90% over ~60s while waiting for API
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        // Slow down as we approach 90
        const increment = Math.max(0.5, (90 - prev) * 0.03);
        return Math.min(90, prev + increment);
      });
    }, 500);

    const controller = new AbortController();
    abortRef.current = controller;

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, voiceId }),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Generation failed (${res.status})`);
        }
        return res.json();
      })
      .then((data: { audioUrl: string }) => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setProgress(100);
        setAudioUrl(data.audioUrl);
        localStorage.setItem(`audio_${bookId}`, data.audioUrl);
        setStatus("done");
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setError(err.message || "Generation failed. Please try again.");
        setStatus("error");
      });
  }, [bookId, cleanup]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { status, progress, audioUrl, error, start };
}
