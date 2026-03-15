import Image from "next/image";

interface BookCoverProps {
  bookId: string;
  title: string;
  coverColor: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: { width: 56, height: 56, radius: 14, responsive: false },
  md: { width: 163, height: 217, radius: 16, responsive: true },
  lg: { width: 200, height: 267, radius: 20, responsive: false },
  xl: { width: 260, height: 260, radius: 24, responsive: false },
};

export default function BookCover({ bookId, title, coverColor, size = "md", className = "" }: BookCoverProps) {
  const s = sizes[size];

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
        <Image
          src={`/images/books/${bookId}.png`}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 200px"
        />
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
      <Image
        src={`/images/books/${bookId}.png`}
        alt={title}
        fill
        className="object-cover"
        sizes={`${s.width}px`}
      />
    </div>
  );
}
