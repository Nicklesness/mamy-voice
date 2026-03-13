interface ProgressDotsProps {
  total: number;
  current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-2 rounded-full"
          style={{
            width: i === current ? 28 : 8,
            background:
              i === current
                ? "var(--gradient-cta)"
                : i < current
                  ? "rgba(232, 115, 74, 0.35)"
                  : "rgba(26, 18, 7, 0.12)",
            transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1), background 300ms",
          }}
        />
      ))}
    </div>
  );
}
