// ============================================
// REWARDIFY — Global Type Definitions
// ============================================

// --- User & Auth ---
export type UserRole = "user" | "admin" | "moderator";

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  points: number;
  createdAt: string;
  updatedAt: string;
  // Future: referralCode, tier, kycStatus
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// --- Points & Balance ---
export interface Balance {
  points: number;
  pendingPoints: number;
  lifetimePoints: number;
  // Future: usdEquivalent, cryptoEquivalent
}

// --- Offers ---
export type OfferStatus = "active" | "inactive" | "expired";
export type OfferCategory = "survey" | "app" | "game" | "video" | "signup";

export interface Offer {
  id: string;
  title: string;
  description: string;
  points: number;
  category: OfferCategory;
  status: OfferStatus;
  imageUrl?: string;
  expiresAt?: string;
  // Future: providerId, completionUrl, requirements
}

// --- Rewards ---
export type RewardType = "giftcard" | "crypto" | "paypal" | "bank";
export type RewardStatus = "pending" | "completed" | "failed" | "cancelled";

export interface Reward {
  id: string;
  userId: string;
  type: RewardType;
  amount: number;
  pointsCost: number;
  status: RewardStatus;
  createdAt: string;
  // Future: transactionHash, provider, metadata
}

// --- Stats ---
export interface UserStats {
  completedOffers: number;
  pendingRewards: number;
  totalWithdrawals: number;
  totalPointsEarned: number;
}

// --- UI ---
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface StatCard {
  label: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ComponentType<{ className?: string }>;
}

// --- API (Future) ---
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// --- Settings ---
export interface UserSettings {
  theme: "light" | "dark" | "system";
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  twoFactorEnabled: boolean;
  // Future: currency, timezone, privacyLevel
}
