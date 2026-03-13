interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  const interactive = typeof onClick === "function";

  return (
    <div
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`
        bg-white rounded-3xl p-5
        border border-[rgba(26,18,7,0.04)]
        ${interactive ? "card-interactive cursor-pointer" : ""}
        ${className}
      `}
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      {children}
    </div>
  );
}
