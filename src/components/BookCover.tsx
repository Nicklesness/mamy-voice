import Image from "next/image";

interface BookCoverProps {
  bookId: string;
  title: string;
  coverColor: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: { width: 56, height: 56, radius: 14 },
  md: { width: 163, height: 217, radius: 20 },
  lg: { width: 200, height: 267, radius: 24 },
  xl: { width: 260, height: 260, radius: 32 },
};

export default function BookCover({ bookId, title, coverColor, size = "md", className = "" }: BookCoverProps) {
  const s = sizes[size];

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
