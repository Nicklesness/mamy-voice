"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
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

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1.5px solid rgba(26, 18, 7, 0.1)",
  background: "var(--surface)",
  fontSize: 15,
  color: "var(--text-primary)",
  outline: "none",
};

function InlineAuthForm({ pendingBlobs, onAuthed }: { pendingBlobs: Blob[]; onAuthed: (blobs: Blob[]) => void }) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!isLogin) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Registration failed");
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(isLogin ? "Invalid email or password" : "Account created but login failed. Try again.");
      }

      // Now authenticated — trigger cloning with the pending blobs
      onAuthed(pendingBlobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh px-6 md:px-10" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-sm md:max-w-md flex flex-col items-center gap-5">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center animate-bounce-in"
          style={{ background: "var(--accent-warm-light)" }}
        >
          <CheckCircle size={28} style={{ color: "var(--accent-warm)" }} />
        </div>
        <div className="text-center animate-fade-in-up delay-200">
          <h2 className="text-text-primary" style={{ fontSize: 22, fontWeight: 700 }}>
            Voice recorded!
          </h2>
          <p className="text-text-secondary text-sm mt-1.5 mx-auto" style={{ maxWidth: 280, lineHeight: 1.6 }}>
            {isLogin ? "Sign in to save your voice and continue" : "Create a free account to save your voice and start narrating books"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 animate-fade-in-up delay-300">
          {!isLogin && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          {error && (
            <p className="text-center" style={{ color: "var(--error)", fontSize: 13 }}>
              {error}
            </p>
          )}

          <Button variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <button
          onClick={() => { setIsLogin(!isLogin); setError(null); }}
          className="bg-transparent border-none cursor-pointer"
          style={{ color: "var(--accent-warm)", fontSize: 14, fontWeight: 600 }}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
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

  // After recording, not logged in → inline register/login form
  if (cloneState === "needsAuth" && pendingBlobs) {
    return <InlineAuthForm pendingBlobs={pendingBlobs} onAuthed={(blobs) => uploadAndClone(blobs)} />;
  }

  if (cloneState === "cloning") {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 md:px-10 gap-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
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
