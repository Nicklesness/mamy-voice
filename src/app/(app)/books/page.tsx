import { getBooks } from "@/lib/books";
import { BookOpen } from "lucide-react";
import BookCard from "@/components/BookCard";
import VoiceProfileLink from "@/components/VoiceProfileLink";

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="relative px-4 md:px-6 pt-12 pb-8 min-h-svh">
      <div className="relative z-10">
        {/* Header */}
        <div className="animate-fade-in-down">
          <div className="flex items-start justify-between">
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 mb-4"
                style={{
                  height: 32,
                  background: "var(--accent-warm-light)",
                  color: "var(--accent-warm)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <BookOpen size={14} />
                Step 2 of 3
              </span>
            </div>
            <VoiceProfileLink />
          </div>
          <h1
            className="text-text-primary"
            style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}
          >
            <span style={{ color: "var(--accent-warm)" }}>Choose</span> a story
          </h1>
          <p className="text-text-secondary mt-1 mb-6" style={{ fontSize: 14 }}>
            Which one should we narrate in your voice?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {books.map((book, i) => (
            <div
              key={book.id}
              className="animate-spring-card"
              style={{ animationDelay: `${i * 80 + 150}ms` }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
