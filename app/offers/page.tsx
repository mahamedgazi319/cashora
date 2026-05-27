import { Layers, Search, Filter } from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Offers" };

const offerCategories = [
  { name: "Surveys",       icon: "📋", count: 0 },
  { name: "App Downloads", icon: "📱", count: 0 },
  { name: "Games",         icon: "🎮", count: 0 },
  { name: "Videos",        icon: "▶️",  count: 0 },
  { name: "Sign-ups",      icon: "✍️",  count: 0 },
  { name: "Shopping",      icon: "🛒", count: 0 },
];

export default function OffersPage() {
  return (
    <div className="page-container space-y-8 animate-slide-up">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="section-title mb-0">Offers</h1>
            <Badge variant="warning">Coming Soon</Badge>
          </div>
          <p className="section-subtitle">Complete tasks from top providers to earn points</p>
        </div>

        {/* Future: real search/filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface-card border border-surface-border rounded-lg text-sm text-gray-500 opacity-50 cursor-not-allowed">
            <Search className="w-4 h-4" />
            <span>Search offers...</span>
          </div>
          <button disabled className="p-2 bg-surface-card border border-surface-border rounded-lg text-gray-500 opacity-50 cursor-not-allowed">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category grid */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-widest">
          Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {offerCategories.map((cat) => (
            <Card key={cat.name} hover className="text-center opacity-60">
              <CardContent className="py-4">
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <p className="text-xs font-medium text-white">{cat.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">{cat.count} offers</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty state */}
      <Card>
        <CardContent className="py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-hover border border-surface-border flex items-center justify-center mx-auto mb-4">
            <Layers className="w-7 h-7 text-gray-600" />
          </div>
          <h3 className="font-semibold text-white mb-1">Offerwall coming soon</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            We&apos;re integrating with top offer providers. Check back soon for hundreds of tasks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
