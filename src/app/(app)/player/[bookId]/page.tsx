"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import Button from "@/components/ui/Button";
import type { Book } from "@/types";

export default function PlayerPage() {
  const params = useParams<{ bookId: string }>();
  const router = useRouter();
  const bookId = params.bookId;
  const [book, setBook] = useState<Book | undefined>();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Fetch book data and generation audioUrl in parallel
    Promise.all([
      fetch(`/api/books/${bookId}`).then((res) => (res.ok ? res.json() : null)),
      fetch(`/api/generation/${bookId}`).then((res) => (res.ok ? res.json() : null)),
    ])
      .then(([bookData, genData]) => {
        if (bookData) setBook(bookData);
        if (genData?.audioUrl) setAudioUrl(genData.audioUrl);
        setChecked(true);
      })
      .catch(() => {
        setChecked(true);
      });
  }, [bookId]);

  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-svh" style={{ background: "var(--bg)" }}>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2 h-2 rounded-full dot-bounce" style={{ background: "var(--accent-warm)" }} />
          ))}
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-svh" style={{ background: "var(--bg)" }}>
        <p className="text-text-secondary">Book not found</p>
      </div>
    );
  }

  if (!audioUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 md:px-10 gap-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-md mx-auto w-full flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-text-primary" style={{ fontSize: 20, fontWeight: 700 }}>
              No narration yet
            </h2>
            <p className="text-text-secondary text-sm mt-2">
              Generate a narration for this book first
            </p>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push(`/generate/${bookId}`)}>
            Generate Narration
          </Button>
          <Button variant="text" fullWidth onClick={() => router.push("/books")}>
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <button
        onClick={() => router.push("/books")}
        className="absolute top-3 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer hover:bg-[rgba(26,18,7,0.08)] active:bg-[rgba(26,18,7,0.12)]"
        style={{ background: "rgba(26, 18, 7, 0.05)" }}
        aria-label="Close"
      >
        <X size={14} style={{ color: "rgba(26, 18, 7, 0.25)" }} />
      </button>
      <AudioPlayer book={book} audioUrl={audioUrl} />
    </div>
  );
}
