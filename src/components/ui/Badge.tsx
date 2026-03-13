import type { LucideIcon } from "lucide-react";

type BadgeVariant = "warm" | "deep" | "amber" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: LucideIcon;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; iconColor: string }> = {
  warm: {
    bg: "var(--accent-warm-light)",
    text: "var(--accent-warm)",
    iconColor: "var(--accent-warm)",
  },
  deep: {
    bg: "var(--accent-deep-light)",
    text: "var(--accent-deep)",
    iconColor: "var(--accent-deep)",
  },
  amber: {
    bg: "var(--amber-light)",
    text: "#92400E",
    iconColor: "var(--amber)",
  },
  neutral: {
    bg: "var(--bg-warm)",
    text: "var(--text-secondary)",
    iconColor: "var(--text-secondary)",
  },
};

export default function Badge({ children, variant = "warm", icon: Icon, className = "" }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 h-7 px-3 rounded-full text-xs font-medium ${className}`}
      style={{
        background: styles.bg,
        color: styles.text,
      }}
    >
      {Icon && <Icon size={14} style={{ color: styles.iconColor }} />}
      {children}
    </span>
  );
}
