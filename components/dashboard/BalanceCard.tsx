import { Coins, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPoints, pointsToUSD } from "@/lib/utils";

interface BalanceCardProps {
  points?: number;
  pendingPoints?: number;
}

export function BalanceCard({ points = 0, pendingPoints = 0 }: BalanceCardProps) {
  return (
    <Card glow className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <CardContent className="py-6 relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">
              Total Balance
            </p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-white tabular-nums">
                {formatPoints(points)}
              </span>
              <span className="text-sm font-medium text-brand-400">PTS</span>
            </div>
            <p className="text-sm text-gray-500">
              ≈ {pointsToUSD(points)} USD
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center">
            <Coins className="w-6 h-6 text-brand-400" />
          </div>
        </div>

        {pendingPoints > 0 && (
          <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <TrendingUp className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <span className="text-xs text-yellow-400">
              {formatPoints(pendingPoints)} points pending
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
