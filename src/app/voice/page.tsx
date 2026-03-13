"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Mic, RotateCcw, Trash2, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

type PageState = "loading" | "ready" | "deleting";

export default function VoiceProfilePage() {
  const router = useRouter();
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [recordedAt, setRecordedAt] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pageState, setPageState] = useState<PageState>("loading");

  // Validate voice_id on mount
  useEffect(() => {
    const voiceId = localStorage.getItem("voiceId");
    const storedRecordedAt = localStorage.getItem("voiceRecordedAt");

    if (!voiceId) {
      setVoiceRecorded(false);
      setRecordedAt(null);
      setPageState("ready");
      return;
    }

    // Validate voice_id via API
    fetch(`/api/voice/status?voice_id=${encodeURIComponent(voiceId)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Status check failed");
        return res.json();
      })
      .then((data: { exists: boolean }) => {
        if (data.exists) {
          setVoiceRecorded(true);
          setRecordedAt(storedRecordedAt);
        } else {
          // Voice no longer exists on server — clear local state
          localStorage.removeItem("voiceRecorded");
          localStorage.removeItem("voiceRecordedAt");
          localStorage.removeItem("voiceId");
          localStorage.removeItem("voiceDate");
          setVoiceRecorded(false);
          setRecordedAt(null);
        }
      })
      .catch(() => {
        // On network error, trust localStorage
        setVoiceRecorded(localStorage.getItem("voiceRecorded") === "true");
        setRecordedAt(storedRecordedAt);
      })
      .finally(() => {
        setPageState("ready");
      });
  }, []);

  const handleDelete = useCallback(async () => {
    const voiceId = localStorage.getItem("voiceId");

    setPageState("deleting");

    if (voiceId) {
      try {
        await fetch(`/api/voice/delete?voice_id=${encodeURIComponent(voiceId)}`, {
          method: "DELETE",
        });
      } catch {
        // Continue with local cleanup even if API fails
      }
    }

    localStorage.removeItem("voiceRecorded");
    localStorage.removeItem("voiceRecordedAt");
    localStorage.removeItem("voiceId");
    localStorage.removeItem("voiceDate");
    setVoiceRecorded(false);
    setRecordedAt(null);
    setShowDeleteConfirm(false);
    setPageState("ready");
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  if (pageState === "loading" || pageState === "deleting") {
    return (
      <div className="flex items-center justify-center min-h-svh" style={{ background: "var(--bg)" }}>
        <div className="animate-spin">
          <Loader2 size={32} style={{ color: "var(--accent-warm)" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-svh px-6 pt-12 pb-10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.push("/books")}
          className="flex items-center justify-center cursor-pointer bg-transparent border-none"
          aria-label="Back"
        >
          <ChevronLeft size={24} className="text-text-secondary" />
        </button>
        <h1 className="text-text-primary" style={{ fontSize: 24, fontWeight: 700 }}>
          My Voice
        </h1>
      </div>

      {voiceRecorded ? (
        <>
          {/* Voice card */}
          <div
            className="rounded-3xl p-6 mb-6 animate-fade-in-up"
            style={{ background: "var(--surface)", boxShadow: "var(--shadow-md)" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-warm-light)" }}
              >
                <Mic size={24} style={{ color: "var(--accent-warm)" }} />
              </div>
              <div>
                <p className="text-text-primary font-bold" style={{ fontSize: 16 }}>
                  Voice recorded
                </p>
                {recordedAt && (
                  <p className="text-text-tertiary" style={{ fontSize: 13 }}>
                    {formatDate(recordedAt)}
                  </p>
                )}
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              Your voice sample is ready. It will be used to narrate stories for your child.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => router.push("/record")}
            >
              <RotateCcw size={18} className="mr-2" />
              Re-record Voice
            </Button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center justify-center gap-2 py-3 cursor-pointer bg-transparent border-none transition-all duration-200 active:scale-95"
              style={{ color: "var(--error)", fontSize: 14, fontWeight: 600 }}
            >
              <Trash2 size={16} />
              Delete Voice
            </button>
          </div>

          {/* Delete confirmation */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div
                className="w-full max-w-[390px] rounded-t-3xl p-6 animate-fade-in-up"
                style={{ background: "var(--surface)" }}
              >
                <h3 className="text-text-primary text-center mb-2" style={{ fontSize: 18, fontWeight: 700 }}>
                  Delete voice?
                </h3>
                <p className="text-text-secondary text-center text-sm mb-6 leading-relaxed">
                  This will delete your voice profile. You&apos;ll need to record again to narrate stories.
                </p>
                <div className="flex flex-col gap-2.5">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    fullWidth
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Keep
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in-up">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{ background: "rgba(26, 18, 7, 0.04)" }}
          >
            <Mic size={32} className="text-text-tertiary" />
          </div>
          <p className="text-text-primary text-center mb-1" style={{ fontSize: 18, fontWeight: 700 }}>
            No voice recorded yet
          </p>
          <p className="text-text-secondary text-center text-sm mb-8">
            Record your voice to start narrating stories
          </p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => router.push("/record")}
          >
            Record Your Voice
          </Button>
        </div>
      )}
    </div>
  );
}
