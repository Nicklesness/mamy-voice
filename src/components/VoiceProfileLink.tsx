"use client";

import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";

export default function VoiceProfileLink() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/voice")}
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 cursor-pointer border-none transition-all duration-200 active:scale-95"
      style={{
        background: "var(--accent-warm-light)",
        color: "var(--accent-warm)",
        fontSize: 12,
        fontWeight: 600,
      }}
      aria-label="Voice profile"
    >
      <Mic size={14} />
      My Voice
    </button>
  );
}
