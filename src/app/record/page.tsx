"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import VoiceRecorder from "@/components/VoiceRecorder";
import { Loader2 } from "lucide-react";

type CloneState = "idle" | "cloning" | "error";

export default function RecordPage() {
  const router = useRouter();
  const [cloneState, setCloneState] = useState<CloneState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingBlobs, setPendingBlobs] = useState<Blob[] | null>(null);

  const uploadAndClone = useCallback(async (blobs: Blob[]) => {
    setCloneState("cloning");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      blobs.forEach((blob, i) => {
        formData.append("audio", blob, `recording_${i}.webm`);
      });

      const res = await fetch("/api/voice/clone", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Voice cloning failed (${res.status})`);
      }

      // Voice is now saved in DB via the API route — no localStorage needed
      router.push("/books");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(message);
      setCloneState("error");
    }
  }, [router]);

  const handleComplete = useCallback((blobs: Blob[]) => {
    setPendingBlobs(blobs);
    uploadAndClone(blobs);
  }, [uploadAndClone]);

  const handleRetry = useCallback(() => {
    if (pendingBlobs) {
      uploadAndClone(pendingBlobs);
    }
  }, [pendingBlobs, uploadAndClone]);

  if (cloneState === "cloning") {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 gap-6" style={{ background: "var(--bg)" }}>
        <div className="animate-spin">
          <Loader2 size={48} style={{ color: "var(--accent-warm)" }} />
        </div>
        <div className="text-center">
          <h2 className="text-text-primary" style={{ fontSize: 20, fontWeight: 700 }}>
            Cloning your voice...
          </h2>
          <p className="text-text-secondary text-sm mt-2">
            This may take a moment
          </p>
        </div>
      </div>
    );
  }

  if (cloneState === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 gap-6" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <h2 className="text-text-primary" style={{ fontSize: 20, fontWeight: 700 }}>
            Voice cloning failed
          </h2>
          <p className="text-text-secondary text-sm mt-2">
            {errorMessage || "Something went wrong. Please try again."}
          </p>
        </div>
        <button
          onClick={handleRetry}
          className="px-8 py-3 rounded-full text-white font-semibold cursor-pointer border-none"
          style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)", fontSize: 16 }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return <VoiceRecorder onComplete={handleComplete} />;
}
