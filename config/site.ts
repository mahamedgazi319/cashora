// ============================================
// REWARDIFY — Site Configuration
// ============================================

export const siteConfig = {
  name: "Rewardify",
  tagline: "Earn rewards. Get paid.",
  description:
    "Complete offers, surveys, and tasks to earn points. Redeem for gift cards, crypto, and cash payouts worldwide.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/rewardify",
    github:  "https://github.com/rewardify",
  },
  keywords: [
    "rewards platform",
    "earn money online",
    "gift cards",
    "surveys",
    "cashback",
    "crypto rewards",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
