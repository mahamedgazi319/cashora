# Rewardify — Global Rewards Platform MVP

> Production-grade MVP foundation for a worldwide rewards platform.  
> Built to scale from 0 to 100K+ users without architectural rewrites.

---

## 🚀 Quick Start

### 1. Initialize the project

```bash
# Clone or unzip the project
cd rewardify

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Architecture

```
rewardify/
├── app/                    # Next.js App Router pages + layouts
│   ├── layout.tsx          # Root layout (metadata, providers, Navbar, Footer)
│   ├── globals.css         # Tailwind base + global styles
│   ├── page.tsx            # Home / landing page
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── dashboard/          # User dashboard
│   ├── profile/            # User profile
│   ├── rewards/            # Rewards placeholder
│   ├── offers/             # Offers placeholder
│   ├── withdraw/           # Withdraw placeholder
│   └── settings/           # Settings page
│
├── components/
│   ├── ui/                 # Atomic, reusable UI components
│   │   ├── Button.tsx      # Multi-variant button
│   │   ├── Card.tsx        # Card + CardHeader/Content/Footer
│   │   ├── Badge.tsx       # Status badges
│   │   └── Input.tsx       # Form input with label/error
│   ├── layout/             # App-wide layout components
│   │   ├── Navbar.tsx      # Responsive navbar with dark mode toggle
│   │   └── Footer.tsx      # Footer with link groups
│   └── dashboard/          # Dashboard-specific components
│       ├── BalanceCard.tsx
│       ├── StatsCard.tsx
│       └── FeaturePlaceholder.tsx
│
├── config/
│   └── site.ts             # App metadata, URLs, links
│
├── constants/
│   └── index.ts            # Nav links, route names, feature roadmap
│
├── hooks/
│   └── useAuth.ts          # Auth hook placeholder (Supabase-ready)
│
├── lib/
│   └── utils.ts            # cn(), formatPoints(), dates, validators
│
├── providers/
│   └── ThemeProvider.tsx   # Dark/light/system theme context
│
├── services/
│   └── api.ts              # Base fetch client + service namespaces
│
├── types/
│   └── index.ts            # Full TypeScript type definitions
│
├── validators/
│   └── auth.ts             # Form validation logic (Zod-ready)
│
├── middleware.ts            # Auth guard placeholder (NextAuth-ready)
├── .env.example            # All future env vars documented
└── tailwind.config.ts      # Custom design tokens and theme
```

**Folders created but intentionally empty — fill as you build:**

| Folder | Purpose |
|--------|---------|
| `features/` | Self-contained feature modules (auth, offers, rewards) |
| `store/` | Global state (Zustand / Jotai) |
| `data/` | Static data, mock fixtures, seed files |
| `utils/` | Additional utility functions |
| `public/` | Static assets (logo, og image) |

---

## 🛣️ Routes

| Route | Page |
|-------|------|
| `/` | Home / Landing |
| `/login` | Sign in |
| `/register` | Create account |
| `/dashboard` | User dashboard |
| `/profile` | Profile management |
| `/offers` | Offers (placeholder) |
| `/rewards` | Rewards (placeholder) |
| `/withdraw` | Withdraw (placeholder) |
| `/settings` | Settings |

---

## 🔮 Future Integration Points

| Feature | Where to integrate |
|---------|-------------------|
| **Supabase Auth** | `hooks/useAuth.ts` → replace stubs |
| **Database** | `services/` → add Supabase client |
| **Offerwalls** | `features/offers/` → new service |
| **Wallet** | `features/wallet/` → balance + tx history |
| **Auth guard** | `middleware.ts` → uncomment route protection |
| **i18n** | `next.config.ts` → add i18n config |
| **Analytics** | `app/layout.tsx` → add PostHog/GA provider |
| **Rate limiting** | `middleware.ts` → Upstash Redis |
| **Admin** | `app/admin/` → new route group |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Brand green | `#22c55e` |
| Gold accent | `#f59e0b` |
| Surface bg | `#0f1117` |
| Card bg | `#161b27` |
| Border | `#1e2736` |

Dark mode is default. Toggle via Navbar sun/moon icon.

---

## 🚢 Deploy (Free)

### Vercel (recommended — zero config)
```bash
npm install -g vercel
vercel
```
Set env vars in Vercel dashboard → Settings → Environment Variables.

### Netlify
```bash
npm run build
# Upload /out or connect GitHub repo
```

---

## 📈 Next Development Milestones

1. **Auth** — Supabase email + Google OAuth → `hooks/useAuth.ts`
2. **Database** — Supabase tables: users, offers, transactions
3. **First offerwall** — AdGate or Theorem Reach integration
4. **Points engine** — Credit/debit logic with transaction history
5. **Withdrawal system** — PayPal or gift card API
6. **Referral system** — Unique codes, commission tracking
7. **Admin dashboard** — User management, offer control
8. **Analytics** — PostHog or Plausible
9. **Crypto payouts** — Coinbase Commerce or NOWPayments
10. **Mobile app** — React Native sharing types from `/types`

---

## 🧪 Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript strict check (no emit)
```
