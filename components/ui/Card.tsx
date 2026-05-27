import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = false, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-card border border-surface-border rounded-2xl",
        "shadow-card",
        hover && "transition-all duration-200 hover:border-brand-500/30 hover:shadow-glow cursor-pointer",
        glow && "shadow-glow border-brand-500/20",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 py-4 border-b border-surface-border", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 py-4", className)}>{children}</div>
  );
}

export function CardFooter({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 py-4 border-t border-surface-border", className)}>
      {children}
    </div>
  );
}
