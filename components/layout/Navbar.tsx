"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon, Zap, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { NAV_LINKS } from "@/constants";
import { Button } from "@/components/ui/Button";

// ─── Placeholder auth state — replace with real auth context later ────────────
const MOCK_AUTH = { isAuthenticated: false };

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-surface/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Reward<span className="text-brand-400">ify</span>
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "text-brand-400 bg-brand-500/10"
                    : "text-gray-400 hover:text-white hover:bg-surface-hover"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ────────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-hover transition-colors"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Auth area — placeholder */}
            {MOCK_AUTH.isAuthenticated ? (
              <Link href="/profile">
                <button className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center hover:border-brand-500/60 transition-colors">
                  <User className="w-4 h-4 text-brand-400" />
                </button>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-3.5 h-3.5" />}>
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-hover transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface/95 backdrop-blur-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-brand-400 bg-brand-500/10"
                    : "text-gray-400 hover:text-white hover:bg-surface-hover"
                )}
              >
                {link.label}
              </Link>
            ))}

            {!MOCK_AUTH.isAuthenticated && (
              <div className="flex gap-2 pt-2 pb-1">
                <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
