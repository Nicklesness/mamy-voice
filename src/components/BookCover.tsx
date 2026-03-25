import Image from "next/image";

interface BookCoverProps {
  bookId: string;
  title: string;
  coverColor: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  hasImage?: boolean;
}

const sizes = {
  sm: { width: 56, height: 56, radius: 14, responsive: false },
  md: { width: 163, height: 217, radius: 16, responsive: true },
  lg: { width: 200, height: 267, radius: 20, responsive: false },
  xl: { width: 260, height: 260, radius: 24, responsive: false },
};

const BOOKS_WITH_IMAGES = new Set([
  "goodnight-moon", "very-hungry-caterpillar", "where-wild-things",
  "guess-how-much", "giving-tree", "kolobok", "repka",
  "kurochka-ryaba", "teremok", "tri-medvedya",
  "alice-in-wonderland", "through-the-looking-glass",
  "wonderful-wizard-of-oz", "ozma-of-oz", "marvelous-land-of-oz",
  "peter-pan", "jungle-book", "second-jungle-book",
  "treasure-island", "adventures-of-tom-sawyer",
  "grimms-fairy-tales", "adventures-of-huckleberry-finn",
]);

function Fallback({ title, coverColor, radius }: { title: string; coverColor: string; radius: number }) {
  return (
    <div
      className="absolute inset-0 flex items-end p-4"
      style={{ borderRadius: radius, background: coverColor }}
    >
      <span
        className="text-white font-bold leading-tight drop-shadow-md"
        style={{ fontSize: "clamp(13px, 3.5vw, 18px)" }}
      >
        {title}
      </span>
    </div>
  );
}

export default function BookCover({ bookId, title, coverColor, size = "md", className = "" }: BookCoverProps) {
  const s = sizes[size];
  const hasImage = BOOKS_WITH_IMAGES.has(bookId);

  if (s.responsive) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          borderRadius: s.radius,
          backgroundColor: coverColor,
        }}
      >
        {hasImage ? (
          <Image
            src={`/images/books/${bookId}.png`}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 45vw, 200px"
          />
        ) : (
          <Fallback title={title} coverColor={coverColor} radius={s.radius} />
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: s.width,
        height: s.height,
        borderRadius: s.radius,
        backgroundColor: coverColor,
      }}
    >
      {hasImage ? (
        <Image
          src={`/images/books/${bookId}.png`}
          alt={title}
          fill
          className="object-cover"
          sizes={`${s.width}px`}
        />
      ) : (
        <Fallback title={title} coverColor={coverColor} radius={s.radius} />
      )}
    </div>
  );
}
