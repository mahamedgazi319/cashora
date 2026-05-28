import Link from "next/link";

import {
  Zap,
  Twitter,
  Github,
  Globe,
} from "lucide-react";

import { siteConfig } from "@/config/site";

const footerLinks = {

  Platform: [

    { label: "Home", href: "/" },

    { label: "Offers", href: "/offers" },

    { label: "Rewards", href: "/rewards" },

    { label: "Withdraw", href: "/withdraw" },

    { label: "Referral", href: "/referral" },

  ],

  Account: [

    { label: "Login", href: "/login" },

    { label: "Register", href: "/register" },

    { label: "Dashboard", href: "/dashboard" },

    { label: "Settings", href: "/settings" },

  ],

  Legal: [

    {
      label: "Privacy Policy",
      href: "/privacy",
    },

    {
      label: "Terms of Service",
      href: "/terms",
    },

    {
      label: "Cookie Policy",
      href: "/cookie",
    },

  ],

};

export function Footer() {

  return (

    <footer className="border-t border-surface-border bg-surface mt-auto">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}

          <div className="col-span-2 md:col-span-1">

            <Link
              href="/"
              className="flex items-center gap-2 group mb-4"
            >

              <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">

                <Zap className="w-3.5 h-3.5 text-white" />

              </div>

              <span className="font-bold text-white">

                Reward
                <span className="text-brand-400">
                  ify
                </span>

              </span>

            </Link>

            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">

              {siteConfig.description}

            </p>

            <div className="flex items-center gap-3 mt-4">

              <SocialLink
                href={siteConfig.links.twitter}
                icon={
                  <Twitter className="w-4 h-4" />
                }
              />

              <SocialLink
                href={siteConfig.links.github}
                icon={
                  <Github className="w-4 h-4" />
                }
              />

              <SocialLink
                href={siteConfig.url}
                icon={
                  <Globe className="w-4 h-4" />
                }
              />

            </div>

          </div>

          {/* Link groups */}

          {Object.entries(footerLinks).map(

            ([group, links]) => (

              <div key={group}>

                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">

                  {group}

                </h4>

                <ul className="space-y-2">

                  {links.map((link) => (

                    <li key={link.href}>

                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-white transition-colors"
                      >

                        {link.label}

                      </Link>

                    </li>

                  ))}

                </ul>

              </div>

            )

          )}

        </div>

        <div className="mt-10 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-2">

          <p className="text-xs text-gray-600">

            © {new Date().getFullYear()}
            {" "}
            Rewardify.
            All rights reserved.

          </p>

          <p className="text-xs text-gray-600">

            Built for scale.
            Ready for growth.

          </p>

        </div>

      </div>

    </footer>

  );

}

function SocialLink({

  href,

  icon,

}: {

  href: string;

  icon: React.ReactNode;

}) {

  return (

    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-lg border border-surface-border flex items-center justify-center text-gray-500 hover:text-white hover:border-brand-500/30 transition-colors"
    >

      {icon}

    </a>

  );

}
