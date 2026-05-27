/**
 * services/api.ts
 * Base API client — ready for Supabase / custom REST / tRPC integration.
 */

import type { ApiResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

// ─── Generic fetch wrapper ────────────────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}/api${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const error = await res.text();
      return { data: null, error };
    }

    const data = (await res.json()) as T;
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

// ─── Future service namespaces ────────────────────────────────────────────────
// Each will be implemented as its own file under /services/

export const authService = {
  // login: (email, password) => apiFetch("/auth/login", { method: "POST", body: ... }),
  // register: ...
  // logout: ...
};

export const offersService = {
  // getAll: (page, filters) => apiFetch<PaginatedResponse<Offer>>(`/offers?page=${page}`),
  // getById: (id) => apiFetch<Offer>(`/offers/${id}`),
};

export const rewardsService = {
  // getUserBalance: (userId) => apiFetch<Balance>(`/users/${userId}/balance`),
  // withdraw: (userId, amount, method) => apiFetch("/rewards/withdraw", { method: "POST" }),
};

export const userService = {
  // getProfile: (userId) => apiFetch<User>(`/users/${userId}`),
  // updateProfile: (userId, data) => apiFetch(`/users/${userId}`, { method: "PATCH" }),
};

export { apiFetch };
