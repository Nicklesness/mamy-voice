"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGenerationStatus } from "@/hooks/useGenerationStatus";
import Image from "next/image";
import Button from "@/components/ui/Button";
import BookCover from "@/components/BookCover";
import type { Book } from "@/types";

function ConfettiDots() {
  const colors = ["var(--accent-warm)", "var(--accent-deep)", "var(--amber)", "var(--success)"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => {
        const color = colors[i % colors.length];
        const size = 6 + Math.random() * 4;
        const x = (Math.random() - 0.5) * 300;
        const y = -50 - Math.random() * 200;
        const rotation = Math.random() * 360;
        const delay = Math.random() * 0.3;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: color,
              left: "50%",
              top: "40%",
              animation: `confetti-fly 800ms ease-out ${delay}s both`,
              transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function GeneratePage() {
  const params = useParams<{ bookId: string }>();
  const router = useRouter();
  const bookId = params.bookId;
  const [book, setBook] = useState<Book | undefined>();
  const { status, progress, audioUrl, error, start } = useGenerationStatus(bookId);
  const [hasStarted, setHasStarted] = useState(false);

  // Fetch book data
  useEffect(() => {
    fetch(`/api/books/${bookId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setBook(data);
      });
  }, [bookId]);

  // Auto-start generation once book is loaded
  useEffect(() => {
    if (book && !hasStarted) {
      setHasStarted(true);
      start();
    }
  }, [book, hasStarted, start]);

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-svh">
        <p className="text-text-secondary animate-pulse-soft">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-svh px-6 md:px-10 py-8 overflow-hidden">
      {status === "generating" && (
        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm md:max-w-lg mx-auto">
          <div className="animate-fade-in-scale">
            <Image src="/images/generating.png" alt="Creating magic" width={160} height={160} className="rounded-2xl" />
          </div>

          <div className="relative animate-fade-in-scale delay-100">
            <div
              className="absolute -inset-2 rounded-[18px] animate-spin-slow"
              style={{ border: "2px dashed rgba(232, 115, 74, 0.2)" }}
            />
            <BookCover bookId={book.id} title={book.title} coverColor={book.coverColor} size="sm" />
          </div>

          <div className="text-center animate-fade-in-up delay-200">
            <h1 className="text-text-primary text-xl md:text-2xl font-semibold">
              {book.title}
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              <span style={{ color: "var(--accent-warm)" }}>Creating</span> narration...
            </p>
          </div>

          <div className="w-[280px] md:w-[380px] animate-fade-in-up delay-300">
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(26, 18, 7, 0.06)", boxShadow: "var(--shadow-inner)" }}
            >
              <div
                className="h-1.5 rounded-full transition-all duration-300 ease-out progress-bar-animated"
                style={{ width: `${Math.round(progress)}%`, background: "var(--gradient-cta)" }}
              />
            </div>
            <p
              className="text-center text-text-primary mt-2.5"
              style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
            >
              {Math.round(progress)}%
            </p>
          </div>

          <p className="text-[13px] text-text-tertiary text-center animate-fade-in delay-400">
            Usually a couple of minutes
          </p>

          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-2 h-2 rounded-full dot-bounce" style={{ background: "var(--accent-warm)", opacity: 0.5 }} />
            ))}
          </div>
        </div>
      )}

      {status === "done" && (
        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm md:max-w-lg mx-auto">
          <ConfettiDots />
          <div className="animate-bounce-in">
            <Image src="/images/celebration.png" alt="Celebration" width={180} height={180} className="rounded-2xl" />
          </div>
          <h1 className="text-text-primary text-center text-2xl md:text-3xl font-bold animate-fade-in-up delay-200">
            Narration <span style={{ color: "var(--accent-warm)" }}>ready</span>!
          </h1>
          <p className="text-base text-text-secondary text-center animate-fade-in-up delay-300">{book.title}</p>
          <div className="w-full flex flex-col gap-3 mt-2 animate-fade-in-up delay-400">
            <Button variant="primary" size="lg" fullWidth onClick={() => router.push(`/player/${bookId}`)}>
              Listen
            </Button>
            <Button variant="text" fullWidth onClick={() => router.push("/books")}>
              Back to Catalog
            </Button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm md:max-w-lg mx-auto animate-fade-in-scale">
          <Image src="/images/error.png" alt="Error" width={160} height={160} className="rounded-2xl" />
          <h1 className="text-text-primary text-center" style={{ fontSize: 22, fontWeight: 700 }}>
            Something went wrong
          </h1>
          <p className="text-text-secondary text-center" style={{ fontSize: 15 }}>
            {error || "Couldn't generate the narration. Please try again."}
          </p>
          <Button variant="primary" size="lg" fullWidth onClick={() => setHasStarted(false)}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
