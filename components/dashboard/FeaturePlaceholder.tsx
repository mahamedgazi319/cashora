import { Clock, Layers, Users, Wallet, Bell, Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FUTURE_FEATURES } from "@/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Users,
  Wallet,
  Bell,
  Coins,
};

export function FeaturesPlaceholder() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-base font-semibold text-white">Coming Soon</h2>
        <Badge variant="outline">Roadmap</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FUTURE_FEATURES.map((feature) => {
          const Icon = iconMap[feature.icon] ?? Layers;
          return (
            <Card key={feature.id} className="opacity-70 hover:opacity-90 transition-opacity">
              <CardContent className="py-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-hover border border-surface-border flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{feature.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-600" />
                      <span className="text-xs text-gray-600">{feature.eta}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
