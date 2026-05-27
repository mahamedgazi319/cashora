import { Settings, Bell, Shield, Globe, Palette, User } from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="page-container max-w-2xl space-y-6 animate-slide-up">
      <div>
        <h1 className="section-title">Settings</h1>
        <p className="section-subtitle">Manage your account preferences</p>
      </div>

      {/* Appearance */}
      <SettingsSection icon={<Palette className="w-4 h-4" />} title="Appearance">
        <SettingsRow label="Theme" description="Choose your preferred display theme">
          <select className="text-xs bg-surface border border-surface-border text-white rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500/50">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </SettingsRow>
        <SettingsRow label="Language" description="Select your preferred language">
          <select className="text-xs bg-surface border border-surface-border text-white rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500/50">
            <option value="en">English</option>
            <option value="es" disabled>Español (soon)</option>
            <option value="fr" disabled>Français (soon)</option>
            <option value="ar" disabled>العربية (soon)</option>
          </select>
        </SettingsRow>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection icon={<Bell className="w-4 h-4" />} title="Notifications">
        <ToggleRow label="Email notifications" description="Receive updates about offers and rewards" defaultChecked />
        <ToggleRow label="Push notifications" description="Browser push alerts for new offers" />
        <ToggleRow label="Marketing emails" description="Tips, news and platform updates" />
      </SettingsSection>

      {/* Security */}
      <SettingsSection icon={<Shield className="w-4 h-4" />} title="Security">
        <SettingsRow label="Two-Factor Authentication" description="Add an extra layer of protection">
          <Badge variant="warning">Disabled</Badge>
        </SettingsRow>
        <SettingsRow label="Active Sessions" description="Manage where you're logged in">
          <Badge variant="default">1 session</Badge>
        </SettingsRow>
      </SettingsSection>

      {/* Profile */}
      <SettingsSection icon={<User className="w-4 h-4" />} title="Profile">
        <SettingsRow label="Public Profile" description="Control what others can see">
          <Badge variant="success">Public</Badge>
        </SettingsRow>
        <SettingsRow label="Data Export" description="Download a copy of your data">
          <Badge variant="outline">Coming soon</Badge>
        </SettingsRow>
      </SettingsSection>

      {/* Future i18n / region */}
      <SettingsSection icon={<Globe className="w-4 h-4" />} title="Region">
        <SettingsRow label="Country" description="Used for offer availability and currency">
          <Badge variant="outline">Auto-detect</Badge>
        </SettingsRow>
        <SettingsRow label="Currency display" description="Preferred currency for USD conversion">
          <Badge variant="outline">USD</Badge>
        </SettingsRow>
      </SettingsSection>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SettingsSection({
  icon, title, children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">{icon}</span>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
        </div>
      </CardHeader>
      <CardContent className="py-3 divide-y divide-surface-border">{children}</CardContent>
    </Card>
  );
}

function SettingsRow({
  label, description, children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function ToggleRow({
  label, description, defaultChecked = false,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-9 h-5 bg-surface-border rounded-full peer peer-checked:bg-brand-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-4" />
      </label>
    </div>
  );
}
