"use client";

/**
 * useAuth — Placeholder auth hook.
 * Replace implementation with Supabase Auth / NextAuth when ready.
 */

import { useState } from "react";
import type { User, AuthState } from "@/types";

interface UseAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [state] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  });

  async function login(_email: string, _password: string): Promise<void> {
    // TODO: implement with Supabase: await supabase.auth.signInWithPassword(...)
    throw new Error("Auth not implemented yet");
  }

  async function logout(): Promise<void> {
    // TODO: implement with Supabase: await supabase.auth.signOut()
    throw new Error("Auth not implemented yet");
  }

  async function register(
    _email: string,
    _password: string,
    _username: string
  ): Promise<void> {
    // TODO: implement with Supabase: await supabase.auth.signUp(...)
    throw new Error("Auth not implemented yet");
  }

  return { ...state, login, logout, register };
}

// ─── Utility type guard ───────────────────────────────────────────────────────
export function isAuthenticated(user: User | null): user is User {
  return user !== null;
}
