import { Gift, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Rewards" };

const rewardTypes = [
  { name: "Gift Cards",  description: "Amazon, Steam, Google Play & more", icon: "🎁", eta: "Q2 2025" },
  { name: "PayPal",      description: "Direct cash to your PayPal account",  icon: "💸", eta: "Q2 2025" },
  { name: "Crypto",      description: "Bitcoin, Ethereum, USDT & more",      icon: "₿", eta: "Q3 2025" },
  { name: "Bank Transfer", description: "Wire funds to your bank account",   icon: "🏦", eta: "Q4 2025" },
];

export default function RewardsPage() {
  return (
    <div className="page-container max-w-3xl space-y-8 animate-slide-up">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
          <Gift className="w-6 h-6 text-gold-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="section-title mb-0">Rewards</h1>
            <Badge variant="warning">Coming Soon</Badge>
          </div>
          <p className="section-subtitle">
            Redeem your points for real-world value across multiple payout methods
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rewardTypes.map((r) => (
          <Card key={r.name} className="opacity-70">
            <CardContent className="py-5 flex items-center gap-4">
              <span className="text-3xl">{r.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{r.name}</p>
                <p className="text-xs text-gray-500">{r.description}</p>
                <p className="text-xs text-gray-600 mt-1">ETA: {r.eta}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card glow>
        <CardContent className="py-6 text-center">
          <p className="text-sm text-gray-400 mb-3">
            Start earning points now so you&apos;re ready when rewards launch.
          </p>
          <Link href="/offers">
            <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Browse Offers</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
