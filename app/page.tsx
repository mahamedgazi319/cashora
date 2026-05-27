import Link from "next/link";
import { ArrowRight, Zap, Shield, Globe, Gift, TrendingUp, Star } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Earn Rewards Worldwide",
  description: "Complete offers and tasks to earn points. Redeem for gift cards, crypto, and cash.",
};

// ─── Static data — move to /data layer when dynamic ──────────────────────────
const features = [
  {
    icon: Zap,
    title: "Instant Earnings",
    description: "Complete offers and get points added to your balance immediately.",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
  },
  {
    icon: Globe,
    title: "Worldwide Access",
    description: "Available globally with localized offers for your region.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Bank-grade security protecting your account and earnings.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Gift,
    title: "Multiple Rewards",
    description: "Choose from gift cards, PayPal, crypto, and more.",
    color: "text-gold-400",
    bg: "bg-gold-500/10",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Real-time dashboard showing earnings, history, and stats.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: Star,
    title: "Loyalty Tiers",
    description: "Climb tiers to unlock higher payouts and exclusive offers.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

const stats = [
  { value: "250K+",  label: "Active Users" },
  { value: "$2M+",   label: "Paid Out" },
  { value: "150+",   label: "Countries" },
  { value: "10K+",   label: "Daily Offers" },
];

export default function HomePage() {
  return (
    <div className="page-container space-y-20">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center text-center pt-12 pb-4 animate-slide-up">
        <Badge variant="success" className="mb-5">
          <Zap className="w-3 h-3 mr-1" /> Now live worldwide
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-4">
          Earn Real Rewards
          <span className="block text-brand-400">For Your Time</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed mb-8">
          Complete offers, surveys, and tasks from top providers. Earn points
          and redeem them for gift cards, crypto, or cash — your choice.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link href="/register">
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Earning Free
            </Button>
          </Link>
          <Link href="/offers">
            <Button size="lg" variant="secondary">
              Browse Offers
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="text-center">
              <CardContent className="py-5">
                <p className="text-2xl font-bold text-brand-400 tabular-nums">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────────────────────── */}
      <section>
        <div className="text-center mb-10">
          <h2 className="section-title">Everything you need to earn</h2>
          <p className="section-subtitle">
            A complete platform built for scale and simplicity
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} hover>
                <CardContent className="py-6">
                  <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section>
        <Card glow>
          <CardContent className="py-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Ready to start earning?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Join thousands of users already earning rewards daily.
            </p>
            <Link href="/register">
              <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Create Free Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
