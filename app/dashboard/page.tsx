import { CheckCircle, Clock, CreditCard, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FeaturesPlaceholder } from "@/components/dashboard/FeaturePlaceholder";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Dashboard" };

// Placeholder user — replace with real session data (Supabase/NextAuth)
const MOCK_USER = {
  displayName: "Alex",
  email: "alex@example.com",
  points: 0,
  pendingPoints: 0,
};

const MOCK_STATS = {
  completedOffers: 0,
  pendingRewards: 0,
  totalWithdrawals: 0,
};

export default function DashboardPage() {
  return (
    <div className="page-container space-y-8 animate-slide-up">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="section-title mb-0">
              Welcome back, {MOCK_USER.displayName} 👋
            </h1>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="section-subtitle">Here&apos;s an overview of your account</p>
        </div>
        <Link href="/offers">
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
            Browse Offers
          </Button>
        </Link>
      </div>

      {/* ── Balance + Stats row ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance card spans 1 col on mobile, merges nicely on larger screens */}
        <div className="sm:col-span-2 lg:col-span-1">
          <BalanceCard
            points={MOCK_USER.points}
            pendingPoints={MOCK_USER.pendingPoints}
          />
        </div>

        <StatsCard
          label="Completed Offers"
          value={MOCK_STATS.completedOffers}
          description="No offers completed yet"
          icon={CheckCircle}
          iconColor="text-brand-400"
        />
        <StatsCard
          label="Pending Rewards"
          value={MOCK_STATS.pendingRewards}
          description="Nothing pending"
          icon={Clock}
          iconColor="text-yellow-400"
        />
        <StatsCard
          label="Withdrawals"
          value={MOCK_STATS.totalWithdrawals}
          description="No withdrawals yet"
          icon={CreditCard}
          iconColor="text-purple-400"
        />
      </div>

      <hr className="divider" />

      {/* ── Future Features ───────────────────────────────────────────────── */}
      <FeaturesPlaceholder />
    </div>
  );
}
