"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import VoiceRecorder from "@/components/VoiceRecorder";

export default function RecordPage() {
  const router = useRouter();
  const [, setRecordedBlobs] = useState<Blob[]>([]);

  const handleComplete = useCallback((blobs: Blob[]) => {
    setRecordedBlobs(blobs);

    // Store voice recorded flag in localStorage
    localStorage.setItem("voiceRecorded", "true");
    localStorage.setItem("voiceRecordedAt", new Date().toISOString());

    // TODO: upload blobs to /api/voice/clone as separate files

    router.push("/books");
  }, [router]);

  return <VoiceRecorder onComplete={handleComplete} />;
}
