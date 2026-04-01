import Link from "next/link";
import { Clock } from "lucide-react";
import type { Book } from "@/types";
import BookCover from "@/components/BookCover";

interface BookCardProps {
  book: Book;
}

function formatDuration(minutes: number): string {
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="block card-interactive group overflow-hidden"
    >
      <BookCover
        bookId={book.id}
        title={book.title}
        coverColor={book.coverColor}
        size="md"
        className="w-full mb-2.5"
      />
      <h3
        className="font-semibold text-text-primary leading-tight truncate"
        style={{ fontSize: 17 }}
      >
        {book.title}
      </h3>
      <p className="text-[13px] text-text-secondary mt-0.5 truncate">{book.author}</p>
      <span
        className="inline-flex items-center gap-1 mt-2 text-xs px-2.5 py-1 rounded-full font-medium text-text-secondary"
        style={{
          background: "var(--bg-warm)",
          border: "1px solid rgba(26, 18, 7, 0.06)",
        }}
      >
        <Clock size={12} style={{ color: "var(--accent-warm)" }} />
        {formatDuration(book.estimatedMinutes ?? book.duration)}
      </span>
    </Link>
  );
}
