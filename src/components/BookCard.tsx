import Link from "next/link";
import { Star } from "lucide-react";
import type { Book } from "@/types";
import BookCover from "@/components/BookCover";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="block card-interactive group"
    >
      <BookCover
        bookId={book.id}
        title={book.title}
        coverColor={book.coverColor}
        size="md"
        className="w-full mb-2.5"
      />
      <h3
        className="font-semibold text-text-primary leading-tight"
        style={{ fontSize: 17 }}
      >
        {book.title}
      </h3>
      <p className="text-[13px] text-text-secondary mt-0.5">{book.author}</p>
      <span
        className="inline-flex items-center gap-1 mt-2 text-xs px-2.5 py-1 rounded-full font-medium text-text-secondary"
        style={{
          background: "var(--bg-warm)",
          border: "1px solid rgba(26, 18, 7, 0.06)",
        }}
      >
        <Star size={12} className="text-amber" />
        {book.ageRange} years
      </span>
    </Link>
  );
}
