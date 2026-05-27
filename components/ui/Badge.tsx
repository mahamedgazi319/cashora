import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "gold" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  "bg-surface-hover text-gray-300 border-surface-border",
  success:  "bg-brand-500/10 text-brand-400 border-brand-500/20",
  warning:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  danger:   "bg-red-500/10 text-red-400 border-red-500/20",
  gold:     "bg-gold-500/10 text-gold-400 border-gold-500/20",
  outline:  "bg-transparent text-gray-400 border-surface-border",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
