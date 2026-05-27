// ============================================
// REWARDIFY — App Constants
// ============================================

export const APP_NAME = "Rewardify";
export const APP_TAGLINE = "Earn rewards for completing tasks worldwide";
export const APP_VERSION = "0.1.0";

// Points system
export const POINTS_PER_USD = 100;
export const MIN_WITHDRAWAL_POINTS = 500;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Navigation links
export const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Offers",   href: "/offers" },
  { label: "Rewards",  href: "/rewards" },
  { label: "Withdraw", href: "/withdraw" },
  { label: "Profile",  href: "/profile" },
] as const;

// Dashboard feature placeholders (future integrations)
export const FUTURE_FEATURES = [
  {
    id: "offerwalls",
    title: "Offerwalls",
    description: "Complete offers from top providers and earn points instantly.",
    icon: "Layers",
    eta: "Q2 2025",
  },
  {
    id: "referrals",
    title: "Referral System",
    description: "Invite friends and earn a percentage of their earnings forever.",
    icon: "Users",
    eta: "Q2 2025",
  },
  {
    id: "wallet",
    title: "Digital Wallet",
    description: "Manage your points, view transaction history, and convert to cash.",
    icon: "Wallet",
    eta: "Q3 2025",
  },
  {
    id: "notifications",
    title: "Smart Notifications",
    description: "Get notified about new offers, rewards, and account activity.",
    icon: "Bell",
    eta: "Q3 2025",
  },
  {
    id: "crypto",
    title: "Crypto Payouts",
    description: "Withdraw your earnings in BTC, ETH, USDT and more.",
    icon: "Coins",
    eta: "Q4 2025",
  },
] as const;

// Routes
export const ROUTES = {
  HOME:      "/",
  LOGIN:     "/login",
  REGISTER:  "/register",
  DASHBOARD: "/dashboard",
  PROFILE:   "/profile",
  REWARDS:   "/rewards",
  OFFERS:    "/offers",
  WITHDRAW:  "/withdraw",
  SETTINGS:  "/settings",
} as const;

// Auth (placeholder values - replace with real auth)
export const AUTH_COOKIE_NAME = "rewardify_session";
export const SESSION_DURATION_DAYS = 30;
