import Link from "next/link";
import { Mail, Lock, User, Zap } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="page-container flex items-center justify-center min-h-[calc(100dvh-8rem)]">
      <div className="w-full max-w-md animate-slide-up">

        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            Reward<span className="text-brand-400">ify</span>
          </span>
        </div>

        <Card>
          <CardContent className="py-8">
            <h1 className="text-xl font-bold text-white mb-1 text-center">Create your account</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Start earning rewards in minutes — it&apos;s free
            </p>

            <div className="space-y-4">
              <Input
                label="Username"
                type="text"
                placeholder="cooluser123"
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail className="w-4 h-4" />}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                leftIcon={<Lock className="w-4 h-4" />}
                hint="Use at least 8 characters, one uppercase and one number"
              />
              <Input
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
              />

              <p className="text-xs text-gray-600 leading-relaxed">
                By creating an account you agree to our{" "}
                <Link href="#" className="text-brand-400 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-brand-400 hover:underline">Privacy Policy</Link>.
              </p>

              <Button className="w-full" size="md">
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
