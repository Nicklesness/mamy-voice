import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Clock, BookOpen } from "lucide-react";
import { getBookById } from "@/lib/books";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import BookCover from "@/components/BookCover";

export const dynamic = "force-dynamic";

interface BookPageProps {
  params: Promise<{ bookId: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = await params;
  const book = await getBookById(bookId);

  if (!book) {
    notFound();
  }

  return (
    <div className="relative px-6 md:px-8 pt-12 pb-10 min-h-svh overflow-hidden">
      {/* Background with book color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${book.coverColor}14 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          href="/books"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white mb-6 active:scale-95 transition-all duration-200"
          style={{ boxShadow: "var(--shadow-sm)" }}
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-text-secondary" />
        </Link>

        {/* Cover */}
        <div className="flex justify-center animate-fade-in-scale">
          <div className="relative">
            {/* Glow behind cover */}
            <div
              className="absolute -inset-5 rounded-3xl blur-2xl opacity-25"
              style={{ backgroundColor: book.coverColor }}
            />
            <BookCover
              bookId={book.id}
              title={book.title}
              coverColor={book.coverColor}
              size="lg"
              className="relative"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mt-5 animate-fade-in-up delay-200">
          <h1
            className="text-text-primary md:text-3xl"
            style={{ fontSize: 28, fontWeight: 700 }}
          >
            {book.title}
          </h1>
          <p className="text-sm md:text-base text-text-secondary mt-1">
            {book.author}
          </p>
        </div>

        {/* Badges */}
        <div className="flex justify-center gap-2 mt-4 animate-fade-in-up delay-300">
          <Badge variant="neutral" icon={Star}>
            {book.ageRange} years
          </Badge>
          <Badge variant="neutral" icon={Clock}>
            ~{book.duration} min
          </Badge>
        </div>

        {/* Summary */}
        <div
          className="mt-5 bg-white rounded-[20px] p-5 animate-fade-in-up delay-400"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <p
            className="flex items-center gap-1.5 mb-2"
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--text-tertiary)",
            }}
          >
            <BookOpen size={16} className="text-accent-warm" /> ABOUT THIS STORY
          </p>
          <p className="text-text-primary" style={{ fontSize: 15, lineHeight: 1.7 }}>
            {book.summary}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 space-y-3 animate-fade-in-up delay-500">
          <Link href={`/generate/${book.id}`}>
            <Button variant="primary" size="lg" fullWidth>
              Narrate in Mom&apos;s Voice
            </Button>
          </Link>
          <Link href="/books" className="block mt-3">
            <Button variant="text" fullWidth>
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
