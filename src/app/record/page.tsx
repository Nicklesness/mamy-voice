"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import VoiceRecorder from "@/components/VoiceRecorder";
import Button from "@/components/ui/Button";
import { Loader2, CheckCircle } from "lucide-react";

type CloneState = "idle" | "needsAuth" | "cloning" | "error";

function storeBlobAndNavigate(blob: Blob, router: ReturnType<typeof useRouter>) {
  const reader = new FileReader();
  reader.onloadend = () => {
    try {
      sessionStorage.setItem("pendingVoiceBlob", reader.result as string);
      router.push("/login?callbackUrl=/record/finalize");
    } catch {
      // sessionStorage quota exceeded — try IndexedDB fallback
      const request = indexedDB.open("mamyVoice", 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore("blobs");
      };
      request.onsuccess = () => {
        const tx = request.result.transaction("blobs", "readwrite");
        tx.objectStore("blobs").put(blob, "pendingVoice");
        tx.oncomplete = () => {
          sessionStorage.setItem("pendingVoiceBlob", "indexeddb");
          router.push("/login?callbackUrl=/record/finalize");
        };
      };
      request.onerror = () => {
        // Last resort — just navigate, user will need to re-record
        router.push("/login?callbackUrl=/record");
      };
    }
  };
  reader.readAsDataURL(blob);
}

export default function RecordPage() {
  const router = useRouter();
  const { data: session } = useSession();
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

      if (res.status === 401) {
        setCloneState("needsAuth");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Voice cloning failed (${res.status})`);
      }

      router.push("/books");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(message);
      setCloneState("error");
    }
  }, [router]);

  const handleComplete = useCallback((blobs: Blob[]) => {
    setPendingBlobs(blobs);

    if (!session) {
      setCloneState("needsAuth");
      return;
    }

    uploadAndClone(blobs);
  }, [session, uploadAndClone]);

  const handleRetry = useCallback(() => {
    if (pendingBlobs) {
      uploadAndClone(pendingBlobs);
    }
  }, [pendingBlobs, uploadAndClone]);

  // After recording, not logged in → ask to create account
  if (cloneState === "needsAuth" && pendingBlobs) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 gap-6" style={{ background: "var(--bg)" }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce-in"
          style={{ background: "var(--accent-warm-light)" }}
        >
          <CheckCircle size={32} style={{ color: "var(--accent-warm)" }} />
        </div>
        <div className="text-center animate-fade-in-up delay-200">
          <h2 className="text-text-primary" style={{ fontSize: 22, fontWeight: 700 }}>
            Voice recorded!
          </h2>
          <p className="text-text-secondary text-sm mt-2 mx-auto" style={{ maxWidth: 280, lineHeight: 1.6 }}>
            Create a free account to save your voice and start narrating books
          </p>
        </div>
        <div className="w-full max-w-sm flex flex-col gap-3 animate-fade-in-up delay-300">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => storeBlobAndNavigate(pendingBlobs[0], router)}
          >
            Create Account
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => storeBlobAndNavigate(pendingBlobs[0], router)}
          >
            Already have an account? Sign In
          </Button>
        </div>
      </div>
    );
  }

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
