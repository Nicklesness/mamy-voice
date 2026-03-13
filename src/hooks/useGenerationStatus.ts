"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { GenerationStatus } from "@/types";

interface UseGenerationStatusReturn {
  status: GenerationStatus;
  progress: number;
  start: () => void;
}

export function useGenerationStatus(bookId: string): UseGenerationStatusReturn {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    cleanup();
    setProgress(0);
    setStatus("generating");

    // Increment from 0 to 100 over ~15 seconds (every 150ms, +1%)
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          cleanup();
          setStatus("done");
          return 100;
        }
        return next;
      });
    }, 150);
  }, [cleanup]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { status, progress, start };
}
