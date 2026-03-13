type ButtonVariant = "primary" | "secondary" | "ghost" | "text";
type ButtonSize = "lg" | "md" | "sm";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "text-white hover:brightness-105 active:scale-[0.97]",
  secondary:
    "bg-accent-deep text-white hover:brightness-105 active:scale-[0.97]",
  ghost:
    "bg-transparent text-text-primary hover:bg-[rgba(26,18,7,0.03)] active:scale-[0.97] active:bg-[rgba(26,18,7,0.05)]",
  text:
    "bg-transparent text-accent-warm font-semibold hover:underline active:scale-[0.97] border-none shadow-none",
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: "h-14 px-8 text-lg font-bold rounded-[20px]",
  md: "h-12 px-6 text-base font-semibold rounded-[16px]",
  sm: "h-9 px-4 text-sm font-semibold rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  className = "",
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isGhost = variant === "ghost";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        transition-all duration-200 select-none
        min-h-[44px] min-w-[44px]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-40 pointer-events-none grayscale" : "cursor-pointer"}
        ${isGhost ? "border-[1.5px] border-[rgba(26,18,7,0.1)]" : ""}
        ${className}
      `}
      style={{
        ...(isPrimary
          ? {
              background: "var(--gradient-cta)",
              boxShadow: "var(--shadow-cta)",
            }
          : {}),
        ...(isSecondary
          ? {
              boxShadow: "0 8px 24px rgba(139, 92, 246, 0.25)",
            }
          : {}),
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {children}
    </button>
  );
}
