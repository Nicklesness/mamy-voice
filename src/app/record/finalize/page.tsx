"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

async function getBlobFromStorage(): Promise<Blob | null> {
  const stored = sessionStorage.getItem("pendingVoiceBlob");
  if (!stored) return null;

  // IndexedDB fallback
  if (stored === "indexeddb") {
    return new Promise((resolve) => {
      const request = indexedDB.open("mamyVoice", 1);
      request.onsuccess = () => {
        const tx = request.result.transaction("blobs", "readonly");
        const get = tx.objectStore("blobs").get("pendingVoice");
        get.onsuccess = () => resolve(get.result as Blob ?? null);
        get.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    });
  }

  // Base64 data URL
  const res = await fetch(stored);
  return res.blob();
}

function cleanupStorage() {
  sessionStorage.removeItem("pendingVoiceBlob");
  try {
    const request = indexedDB.open("mamyVoice", 1);
    request.onsuccess = () => {
      const tx = request.result.transaction("blobs", "readwrite");
      tx.objectStore("blobs").delete("pendingVoice");
    };
  } catch {
    // ignore
  }
}

export default function FinalizePage() {
  const router = useRouter();
  const [status, setStatus] = useState<"uploading" | "done" | "error">("uploading");
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async () => {
    setStatus("uploading");
    setError(null);

    try {
      const blob = await getBlobFromStorage();

      if (!blob) {
        router.replace("/books");
        return;
      }

      const formData = new FormData();
      formData.append("audio", blob, "recording_0.webm");

      const res = await fetch("/api/voice/clone", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Voice cloning failed");
      }

      cleanupStorage();
      setStatus("done");
      setTimeout(() => router.push("/books"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }, [router]);

  useEffect(() => {
    upload();
  }, [upload]);

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 gap-4" style={{ background: "var(--bg)" }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce-in"
          style={{ background: "var(--success)", color: "white" }}
        >
          <CheckCircle size={32} />
        </div>
        <h2 className="text-text-primary animate-fade-in-up" style={{ fontSize: 22, fontWeight: 700 }}>
          Voice saved!
        </h2>
        <p className="text-text-secondary text-sm animate-fade-in-up delay-200">
          Redirecting to books...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 gap-4" style={{ background: "var(--bg)" }}>
        <h2 className="text-text-primary" style={{ fontSize: 20, fontWeight: 700 }}>
          Something went wrong
        </h2>
        <p className="text-text-secondary text-sm">{error}</p>
        <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
          <Button variant="primary" size="lg" fullWidth onClick={upload}>
            Try Again
          </Button>
          <Button variant="text" fullWidth onClick={() => router.push("/record")}>
            Re-record Voice
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh px-6 gap-6" style={{ background: "var(--bg)" }}>
      <div className="animate-spin">
        <Loader2 size={48} style={{ color: "var(--accent-warm)" }} />
      </div>
      <div className="text-center">
        <h2 className="text-text-primary" style={{ fontSize: 20, fontWeight: 700 }}>
          Saving your voice...
        </h2>
        <p className="text-text-secondary text-sm mt-2">
          Almost there
        </p>
      </div>
    </div>
  );
}
