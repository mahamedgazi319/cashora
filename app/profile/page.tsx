import { User, Mail, Calendar, Shield, Edit3 } from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Profile" };

const MOCK_USER = {
  displayName: "Alex Johnson",
  username: "alexj",
  email: "alex@example.com",
  role: "user" as const,
  points: 0,
  createdAt: new Date().toISOString(),
  avatarUrl: null as string | null,
};

export default function ProfilePage() {
  return (
    <div className="page-container max-w-3xl animate-slide-up space-y-6">
      <div>
        <h1 className="section-title">Profile</h1>
        <p className="section-subtitle">Manage your public profile and account details</p>
      </div>

      {/* Avatar + display name */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-brand-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="font-bold text-white text-lg">{MOCK_USER.displayName}</h2>
                <Badge variant="success">{MOCK_USER.role}</Badge>
              </div>
              <p className="text-sm text-gray-500">@{MOCK_USER.username}</p>
            </div>
            <Button variant="secondary" size="sm" leftIcon={<Edit3 className="w-3.5 h-3.5" />}>
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account info */}
      <Card>
        <CardHeader>
          <h3 className="text-sm font-semibold text-white">Account Information</h3>
        </CardHeader>
        <CardContent className="py-5 space-y-4">
          <InfoRow icon={<Mail className="w-4 h-4" />}    label="Email"    value={MOCK_USER.email} />
          <InfoRow icon={<User className="w-4 h-4" />}    label="Username" value={`@${MOCK_USER.username}`} />
          <InfoRow icon={<Calendar className="w-4 h-4" />} label="Member since" value={formatDate(MOCK_USER.createdAt)} />
          <InfoRow icon={<Shield className="w-4 h-4" />}  label="2FA"      value="Not enabled" badge={<Badge variant="warning">Disabled</Badge>} />
        </CardContent>
      </Card>

      {/* Danger zone placeholder */}
      <Card className="border-red-500/20">
        <CardContent className="py-5">
          <h3 className="text-sm font-semibold text-red-400 mb-1">Danger Zone</h3>
          <p className="text-xs text-gray-500 mb-3">Permanently delete your account and all data.</p>
          <Button variant="danger" size="sm">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({
  icon, label, value, badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-600 shrink-0">{icon}</span>
      <span className="text-xs text-gray-500 w-28 shrink-0">{label}</span>
      <span className="text-sm text-white flex-1">{value}</span>
      {badge}
    </div>
  );
}
