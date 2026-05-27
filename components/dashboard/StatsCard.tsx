import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  iconColor?: string;
}

export function StatsCard({
  label,
  value,
  description,
  icon: Icon,
  trend = "neutral",
  iconColor = "text-gray-500",
}: StatsCardProps) {
  return (
    <Card className="transition-all duration-200 hover:border-surface-border/80">
      <CardContent className="py-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            {label}
          </p>
          <Icon className={cn("w-4 h-4 shrink-0", iconColor)} />
        </div>
        <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
        {description && (
          <p className={cn(
            "text-xs mt-1",
            trend === "up"      && "text-brand-400",
            trend === "down"    && "text-red-400",
            trend === "neutral" && "text-gray-500",
          )}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
