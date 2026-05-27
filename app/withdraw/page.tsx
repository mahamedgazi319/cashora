import { CreditCard, Lock } from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BalanceCard } from "@/components/dashboard/BalanceCard";

export const metadata: Metadata = { title: "Withdraw" };

const methods = [
  { name: "PayPal",         min: "$5.00",   icon: "💸", available: false },
  { name: "Gift Cards",     min: "$1.00",   icon: "🎁", available: false },
  { name: "Bitcoin (BTC)",  min: "$10.00",  icon: "₿",  available: false },
  { name: "Ethereum (ETH)", min: "$10.00",  icon: "⟠",  available: false },
  { name: "USDT",           min: "$5.00",   icon: "💵", available: false },
  { name: "Bank Transfer",  min: "$20.00",  icon: "🏦", available: false },
];

export default function WithdrawPage() {
  return (
    <div className="page-container max-w-3xl space-y-8 animate-slide-up">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
          <CreditCard className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="section-title mb-0">Withdraw</h1>
            <Badge variant="warning">Coming Soon</Badge>
          </div>
          <p className="section-subtitle">Cash out your earned points via multiple methods</p>
        </div>
      </div>

      {/* Current balance */}
      <BalanceCard points={0} />

      {/* Withdrawal methods */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-widest">
          Payout Methods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {methods.map((m) => (
            <Card key={m.name} className="opacity-60">
              <CardContent className="py-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{m.name}</p>
                    <p className="text-xs text-gray-500">Min: {m.min}</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" disabled leftIcon={<Lock className="w-3 h-3" />}>
                  Locked
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
