# 📌 Project Name: We Rent / OkoRent (Peer-to-Peer Rental Marketplace — Next.js Frontend)

> **Document purpose:** Architecture and delivery summary for the **We Rent V2** frontend workspace — structured for **CV, LinkedIn, and portfolio** reuse.  
> **Delivery status:** **Incomplete** — development paused when the client stopped payment; the UI and integration layer reflect a substantial MVP, but several user-area routes and backend wiring remain unfinished.  
> **Your role (stated):** **Frontend developer** — this repository is the Next.js client; backend APIs are consumed via REST (separate service, not in this repo).  
> **Last verified with SocratiCode:** index green (**905** chunks, **317** files); code graph **303** TypeScript files, **587** dependency edges, **2** circular chains (data-table barrel only).  
> **Business metrics (Section 11):** Not stored in code — use placeholders or validated figures from the client.

### Portfolio elevator pitch (copy-ready)

**B2C/B2B rental marketplace frontend** on **Next.js 16** (App Router) connecting **lessors and lessees** for non–real-estate goods — public discovery, auth onboarding, and a **lessor dashboard** for listings, pricing tiers, availability, and inventory-style tables. Built with **TypeScript**, **TanStack Query**, **React Hook Form + Valibot**, **next-intl**, **Radix/shadcn UI**, **compound product pages**, **maps (pigeon-maps)**, and a centralized **Axios service layer** with JWT session handling.

---

## 1. Business Context

- **What was the business problem?**  
  Digitize **peer-to-peer and business rental** of goods (electronics, tools, vehicles, party equipment, etc.) so users can **discover**, **request**, and **list** items without ad-hoc messaging and spreadsheets. The platform positions itself as an **intermediary** (per Terms copy: **OkoRent / Okorent Sàrl, Luxembourg**) — connecting **Lessors** and **Lessees**, managing listings and payments with commission, not acting as direct lessor.

- **Which department / company was this built for?**  
  **We Rent** product (marketing copy also uses **OkoRent**). Consumer-facing tagline: *“Empowering Renting for a Sustainable Future”* — rent items nearby or **grow a rental business** with listing tools.

- **What was broken or inefficient before this system?**  
  Typical pain: fragmented discovery, unclear pricing/availability, weak trust signals (reviews, verification, damage guarantee), and no single place for lessors to manage stock, online/offline status, and rental periods.

- **Why was this project critical?**  
  A polished web client is the primary touchpoint for **conversion** (search → listing detail → request) and **supply** (signup → add listing → manage inventory). The frontend encodes domain UX (tiered pricing, pickup locations on a map, cancellation policy, service fee) that must stay consistent with backend contracts.

- **Why delivery stopped**  
  Client **stopped paying** before full completion. Remaining work includes several **user dashboard routes** (shell pages only), **forget-password** flow, full **add-listing → API** submission, and likely bookings/inbox/billing integrations.

---

## 2. Scope & Scale

| Dimension | Value / notes |
|-----------|----------------|
| **Users (target)** | *[Stakeholder input]* — B2C renters + B2B/pro lessors; dual personas reflected in “Rent” vs “Rent out” marketing sections. |
| **Catalog / domains** | Categories in UI: Electronics, Fashion, Real Estate, Tools, Hobbies & Sports, Home & Garden, Vehicle, Party, Film & Photography, etc. (`Common.Categories` in i18n). |
| **Geography** | Copy and map defaults suggest **multi-region** readiness; legal entity referenced as **Luxembourg** in Terms JSON. |
| **Languages** | **English** live (`locales: ['en']`); **next-intl** structure ready for more locales (`messages/en/*.json` + generated `.d.json.ts`). |
| **Environments** | *[Typical]* DEV + staging/prod via `serverBaseUrl` env (`Sync` / `Env`); exact matrix not in repo. |
| **Codebase scale (SocratiCode + repo)** | **~317** indexed files · **~286** `src` TS/TSX files · **905** semantic chunks · **43** shadcn-style UI primitives · **50+** compound `Product*` exports · **26** App Router pages · **3** wired API service classes (`auth`, `product`, `ticket`) · **2** minor circular import chains in `data-table` |

---

## 3. Your Role

- **Scope:** **Frontend only** — Next.js application, design-system components, forms, data fetching, i18n, and integration with existing REST endpoints.
- **Team:** *[Fill in]* — repository does not document backend team size; you consumed **`/Auth`**, **`/Product`**, **`/Tickets`** routes from a separate API.
- **Architecture vs implementation:** The codebase shows deliberate **route-group boundaries** (`(public)`, `(auth)`, `user`), **service layer** (`Sync`, `apiServices`), and **compound UI** for listing detail — state which of these you **owned** vs inherited from templates.
- **Decisions you likely owned (confirm if accurate)**  
  - App Router + `[locale]` + route-scoped `_components` / `_hooks` layout  
  - `Sync` HTTP wrapper, `QueryKeyBuilder`, TanStack Query options on services  
  - Valibot schemas via `useValibotSchema` (i18n-aware validation)  
  - Compound `Product` page composition for listing detail  
  - `AuthBoundary` + `/api/auth/me` hydration pattern  
  - Responsive **data-table** (table ↔ cards) for My Listings  
  - Map integration with **dynamic import** (no SSR for pigeon-maps)

---

## 4. Solution Architecture

### Overall architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│  Browser — Next.js 16 App Router (React 19)                     │
│  ├─ (public)  Marketing, listing browse, product detail         │
│  ├─ (auth)    Login, signup, phone OTP                          │
│  └─ user/     Lessor dashboard (listings, add item, nav shells) │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS (Axios Sync)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Backend REST API (external to this repo)                       │
│  Auth · Product · Tickets (guest contact)                       │
└─────────────────────────────────────────────────────────────────┘
```

### Frontend topology

| Layer | Responsibility |
|-------|----------------|
| **Pages** | Thin server components: `setRequestLocale`, delegate to section/feature components |
| **Route `_components/`** | Area-specific UI (`public-sections`, `user-listing-form`, auth forms) |
| **Shared `src/components/`** | UI kit, `product/` compound tree, `data-table/`, `map/`, modals |
| **`src/services/`** | API classes + `Sync` HTTP client + token helpers |
| **`src/providers/`** | Query, API services context, auth, data-table |
| **`messages/en/`** | next-intl namespaces (Common, AuthPages, Product, etc.) |

### Routing (locale-aware)

All routes under `src/app/[locale]/`:

| Area | Routes (from `APP_ROUTES`) |
|------|----------------------------|
| **Public** | `/`, `/listing`, `/listing/:listingId`, `/who-we-are`, `/how-it-works`, `/pricing`, `/contact-us`, `/faqs`, `/terms`, `/privacy`, `/profile` |
| **Auth** | `/login`, `/signup`, `/confirm-phone`, `/forget-password` *(stub page)* |
| **User** | `/user`, `/user/dashboard` *(empty)*, `/user/my-listings`, `/user/my-listings/new`, `/user/bookings`, `/user/inbox`, `/user/clients`, `/user/wishlist`, `/user/calendar`, `/user/billing`, `/user/support` *(mostly shells)* |

**Path aliases:** `@/public/*`, `@/auth/*`, `@/user/*`, `@/app/*`, `@/*` → `src/*`.

### REST API surface (consumed by frontend)

| Service | Endpoints | Usage |
|---------|-----------|--------|
| **Auth** | `POST /Auth/register`, `POST /Auth/login` | Register (FormData), login; JWT stored via `setToken` / cookies |
| **Product** | `GET /Product`, `GET /Product/:listingId` | Featured lists, listing detail (`useQuery` + `queryOptions`) |
| **Ticket** | `POST /Tickets/Guest-Create` | Contact-us guest ticket (FormData) |
| **Next route** | `GET /api/auth/me` | Server-side user decode for client hydration |

### Authentication

- **Login / register:** TanStack `useMutation` → `Auth.login` / `Auth.register` → access token → `mapUserPayload` from JWT claims (`IUser`: id, email, name, surname, mobile, role).
- **Session:** Token helpers in `services/core/token`; client checks via `fetch('/api/auth/me')`.
- **UX:** `AuthBoundary` wraps forms with dynamic `AuthProvider` + skeleton fallbacks; public header drawer shows login/logout.
- **Phone verification:** OTP UI on `/confirm-phone` (6-digit input, resend placeholder).
- **OAuth:** Google/Apple buttons present; **integration appears UI-only** (disabled during auth mutations).

---

## 5. Key Features Built (concrete)

### Public marketing & trust

- **Home:** Hero search, “What are you looking for” (Rent / Rent out tabs), popular categories, featured products (live API list).
- **Who we are:** Hero, achievements counters, mission, team, user feedback carousel with ratings.
- **How it works / Pricing:** Informational layouts; pricing **Essential / Pro / Premium** cards (placeholder feature bullets).
- **Contact us:** Form + contact info sections; ticket API for guest submissions.
- **Legal:** Terms & Conditions (full OkoRent TOS copy in i18n), Privacy, FAQs routes *(some pages minimal)*.

### Discovery & listing detail

- **Listing index** with search filters hook (`lowestPrice`, `highestPrice`, `verifiedAccounts`, `newlyAdded`).
- **Search UX:** `SelectLocationModal`, `SelectPeriodModal` (range calendar, pickup/return display).
- **View listing:** Full **compound `Product`** tree — gallery, tiered pricing (daily/weekly/monthly), calendar, owner card, price breakdown with **service fee %**, map pickup pins (`pigeon-maps` + `getAverageCenter`), reviews distribution, guarantee & cancellation policy, FAQs accordion.
- **Public profile** components for lessor bio/reviews.

### Authentication

- **Login / Signup** with Valibot + React Hook Form, country dropdown, international **phone** (`libphonenumber-js`), password rules, terms link.
- **Auth carousel** on auth layout (testimonials).
- **Confirm phone** flow with OTP component.

### Lessor (user) area

- **Dashboard shell:** Header, horizontal nav, footer, responsive layout.
- **My Listings:** Data table with selection, status badges (online/offline), row actions (edit, barcode, promote, mark online/offline) — **mock row data** in table implementation.
- **Add listing:** Multi-section form — category, title, description, **image uploader** (drag/drop, previews), day/week/month prices, availability dates or “always available”, stock, active flag, **FAQs** repeater, security deposit %; **`useAddListingForm` submit currently logs to console** (API not wired).
- **Reused sections:** User home hero, categories, featured products (same patterns as public).

### Cross-cutting

- **i18n:** `useTranslations` across UI; rich text for marketing (`t.rich`).
- **Notifications:** Sonner toasts (provider stack).
- **Icons:** Lucide + custom SVG pipeline (`npm run generate-icons` with DI scripts).
- **Images:** `next/image` wrapper component, configured qualities 50–95.
- **Bundle analysis:** `@next/bundle-analyzer` via `npm run analyze`.

---

## 6. Technical Challenges

| Challenge | How the codebase addresses it |
|-----------|-------------------------------|
| **JWT user shape (claim URIs)** | `Auth.mapUserPayload` maps Microsoft-style claim keys to `IUser` |
| **SSR vs client-only maps** | `dynamic(() => import('./pigeon-map'), { ssr: false })` in `components/map` |
| **Large listing detail UI** | **Compound components** + Zustand slice in `product/details.tsx` for period, location, pricing math |
| **Consistent API errors** | `ErrorHandler` + `ServerError` type; form mutations use `meta.formControl` pattern |
| **Responsive lessor tables** | `DataTableProvider` auto-switches table ↔ cards at breakpoint |
| **Type-safe navigation** | `typedRoutes: true` in Next config; `AppRoutes` / `UserRoutes` global types |
| **Incomplete delivery** | Many `user/*` pages return empty fragments; listing create not persisted — document honestly as paused MVP |

---

## 7. Performance & Optimization

- **Turbopack** for dev/build (`next dev`, `next build`).
- **React Compiler** enabled (`reactCompiler: true`).
- **Package import optimization** for `lucide-react` (per Next experimental config patterns).
- **Memoized** table pagination and selection cells.
- **Virtualization-ready** dependency: `react-virtuoso` installed for long lists *(verify usage in your branch)*.
- **Code splitting:** Map and auth provider dynamically imported.
- **Strict TypeScript** — no `any` per project rules; ESLint import ordering enforced.

---

## 8. DevOps & Deployment

| Topic | Notes |
|-------|--------|
| **Scripts** | `dev`, `build`, `start`, `lint`, `lint:check`, `lint:imports`, `analyze`, `generate-icons` |
| **CI/CD** | *[Define your pipeline]* — not documented in repo |
| **Env** | API base URL via `Env` helper consumed by `Sync` |
| **Hosting** | Standard Next.js deployment (Node server or Vercel-compatible) |

---

## 9. Impact (MANDATORY NUMBERS)

**Replace with measured KPIs when available.**

| Metric | Value | How measured |
|--------|-------|----------------|
| Time saved (hours/month) | **[TBD]** | Client / operations input |
| Manual listing management reduced | **[TBD]** | Before/after lessor workflow |
| Conversion (search → request) | **[TBD]** | Analytics |
| Users impacted | **[TBD]** | Auth / traffic reports |
| Delivery outcome | **Paused** | Client payment stopped — MVP UI + partial API integration |

---

## 10. Reusable Assets

- **`Sync` HTTP client** — `fetch` / `save` / `del` / `download`, FormData serialization, public vs authenticated instances.
- **`QueryKeyBuilder`** — consistent TanStack Query keys per entity.
- **`apiServices` + `useApiServices()`** — namespaced service access.
- **Compound `Product` component family** — reusable for any rental SKU detail page.
- **`DataTable` kit** — selection, pagination, responsive cards, action menu primitives.
- **`useValibotSchema`** — shared i18n validation (email, phone, password strength, images, FAQs).
- **`AuthBoundary` pattern** — progressive auth hydration without blocking SSR shell.
- **Map module** — pigeon-maps wrappers (Map, Marker, Overlay, ZoomControl).
- **Icon generation scripts** — `scripts/` with `FileSystem`, `SvgTransformer`, `CodeFormatter`.

---

## 11. What You Would Improve (if resumed)

- Wire **`useAddListingForm`** to product create/update API; add edit flow for My Listings actions.
- Implement **stub routes**: dashboard metrics, bookings, calendar, inbox, billing, support.
- Complete **forget-password** and **OAuth** provider flows.
- Resolve **data-table** circular imports (barrel ↔ table ↔ cards).
- Add **E2E tests** (Playwright) for auth and listing detail critical paths.
- Enable **additional locales** beyond `en` with message parity checks.
- Connect listing **filters** to query params + API rather than client-only state.

---

## 12. Skills & Competencies Demonstrated

Use as a **skills matrix** — adjust bullets to what you personally delivered.

### Frontend & UX

- Next.js **App Router** with route groups, layouts, and thin pages
- **React 19** client/server component boundaries, `Suspense`, dynamic imports
- **Internationalization** with next-intl (typed messages, `setRequestLocale`)
- **Compound component** design for complex product/listing pages
- Accessible UI with **Radix UI** primitives and shadcn-style patterns
- **Responsive** layouts, drawers, modals (`ResponsiveModal`, Vaul)
- **Maps** embedding (pigeon-maps) with SSR-safe loading

### Data & forms

- **TanStack Query v5** — `queryOptions`, mutations, devtools
- **React Hook Form** + **Valibot** resolvers (not Zod)
- International **phone** validation (`libphonenumber-js`)
- File upload UX with previews and size/count validation
- Client state with **Zustand** where UI coordination demands it

### Engineering quality

- Centralized **service layer** and error handling
- **Strict TypeScript** and ESLint import discipline
- **Typed routes** and global app types (`TPage`, `TLayout`, `IUser`, `IProduct`)
- Route-scoped colocation (`_components`, `_hooks`) for maintainability
- Performance awareness (React Compiler, bundle analyzer, memoization)

---

## 13. Technologies & Tools

| Layer | Technologies |
|-------|----------------|
| **Framework** | Next.js **16.0.7**, React **19.2.3**, TypeScript **5** |
| **Styling** | Tailwind CSS **4**, `tailwind-merge`, `class-variance-authority`, CSS variables |
| **UI** | Radix UI, shadcn/ui (New York), Lucide, Embla carousel, Vaul drawer |
| **Forms & validation** | React Hook Form **7**, Valibot **1**, `@hookform/resolvers` |
| **Data fetching** | TanStack Query **5**, Axios **1.12** |
| **i18n** | next-intl **4** |
| **State** | Zustand **5**, React context providers |
| **Maps** | pigeon-maps **0.22** |
| **Dates** | dayjs, date-fns, react-day-picker **9** |
| **Lists** | react-virtuoso **4** |
| **Toasts** | Sonner **2** |
| **Build / quality** | Turbopack, ESLint **9**, Prettier, React Compiler, `@next/bundle-analyzer` |
| **Tooling** | tsx (icon script), cross-env, SVGR |

---

## 14. Design Patterns

| Pattern | Where it appears | Why it matters |
|---------|------------------|----------------|
| **Service class per domain** | `Auth`, `Product`, `Ticket` in `services/api/public/` | Encapsulates endpoints + query keys; easy to extend when backend adds APIs |
| **Facade / namespace** | `apiServices.public.*` + `useApiServices()` | Single import surface for pages and hooks |
| **HTTP adapter** | `Sync` with `fetch` / `save` / `del` | DRY Axios setup, FormData, URL builder, error translation |
| **Query key builder** | `QueryKeyBuilder('public.product')` | Predictable cache keys for list vs detail |
| **Query options factory** | `product.listQueryOpt()`, `getQueryOpt(id)` | Co-locates `queryKey` + `queryFn` for `useQuery` |
| **Custom form hook** | `useLoginForm`, `useSignupForm`, `useAddListingForm` | Separates schema, mutation, and submit from presentational form |
| **Boundary + dynamic provider** | `AuthBoundary` → `AuthProvider` | Avoids SSR issues; shows skeleton while resolving user |
| **Compound components** | `Product`, `ProductPricingCard`, `ProductOwnerCard`, … | Composable listing detail without 2000-line files |
| **Context + store hybrid** | React context for product tree; Zustand for rental period/location/price | Local UI state with performant selectors |
| **Controlled data table** | `DataTableProvider` + selection hooks | Parent owns data; table owns selection/view mode |
| **Colocated route modules** | `_components/`, `_hooks/` under `(public)`, `(auth)`, `user` | Clear ownership boundaries per app area |
| **Server bridge route** | `/api/auth/me` | Decodes JWT server-side for client hydration |

---

## 15. Architecture & Structural Patterns

### Route & folder conventions

```text
src/app/[locale]/
├── (public)/          # Marketing + discovery (no auth required)
│   ├── _components/   # public-header, public-sections, view-listing, …
│   └── _hooks/        # use-listing-filters, use-public-nav-links, …
├── (auth)/            # Login, signup, OTP
│   └── _components/
└── user/              # Authenticated lessor area
    ├── _components/
    └── _hooks/        # use-add-listing-form
```

### Provider stack

```text
AppProvider
├── QueryProvider (TanStack Query + devtools)
├── ApiServicesProvider (apiServices context)
└── (per-tree) AuthProvider via AuthBoundary
    DataTableProvider (per table)
```

### Domain boundaries

| Stream | Primary UI / modules |
|--------|----------------------|
| **Acquisition** | Home hero, looking-for, categories, featured products |
| **Trust & brand** | Who we are, achievements, team, feedback, pricing plans |
| **Discovery** | Listing search, filters, location/period modals |
| **Conversion** | View listing (`Product` compound), request CTA, policies |
| **Supply onboarding** | Signup, phone confirm, add listing form |
| **Supply management** | My listings table, row actions, filters (online/offline) |
| **Support & legal** | Contact ticket, Terms, Privacy, FAQs |
| **Planned / stub** | Dashboard, bookings, calendar, inbox, billing, clients, wishlist |

### System diagram (frontend-centric)

```text
┌──────────────────────────────────────────────────────────────┐
│  next-intl [locale]                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  (public)   │  │   (auth)    │  │       user          │ │
│  │  marketing  │  │  login/OTP  │  │  listings / shells  │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         │                │                      │            │
│         └────────────────┼──────────────────────┘            │
│                          ▼                                   │
│              components/ (ui, product, data-table, map)      │
│              hooks/ · boundaries/ · providers/               │
│                          ▼                                   │
│              services/ (Sync → REST API)                     │
│              /api/auth/me (JWT read)                           │
└──────────────────────────────────────────────────────────────┘
```

---

## Appendix: Repository map

| Path | Role |
|------|------|
| `src/app/[locale]/(public)/` | Marketing, listing browse/detail, profile |
| `src/app/[locale]/(auth)/` | Authentication flows |
| `src/app/[locale]/user/` | Lessor dashboard area |
| `src/components/ui/` | Design system (~43 components) |
| `src/components/product/` | Listing detail compound components |
| `src/components/data-table/` | Table, cards, pagination, selection |
| `src/components/map/` | pigeon-maps wrappers (client-only) |
| `src/services/` | API layer (`Sync`, token, auth, product, ticket) |
| `messages/en/` | Translation namespaces |
| `scripts/` | Icon generation pipeline |
| `WARP.md` | Agent/dev architecture notes |

### Public section inventory (`public-sections/index.ts`)

`home-hero` · `looking-for` · `categories` · `featured-products` · `who-we-are-hero` · `achievements` · `our-missions` · `our-team` · `users-feedback` · `support-world` · `plans` · `plan-features` · `contact-us` · `contact-info`

### Pages by completion (honest status)

| Page | Status |
|------|--------|
| Home, who-we-are, how-it-works, pricing, contact-us | **Built** (UI + sections) |
| Listing list & `[listingId]` detail | **Built** (product API integrated on detail/list) |
| Login, signup, confirm-phone | **Built** (auth API integrated) |
| Forget-password | **Stub** (`return null`) |
| User my-listings, new listing | **UI built**; create listing **not API-backed** |
| User dashboard, bookings, calendar, inbox, clients, wishlist, billing, support | **Shell / empty** |
| FAQs, privacy, terms | **Route exists**; verify content depth per branch |

---

## CV keyword block (optional paste)

`Next.js` · `React 19` · `TypeScript` · `App Router` · `TanStack Query` · `React Hook Form` · `Valibot` · `next-intl` · `Tailwind CSS` · `Radix UI` · `shadcn/ui` · `Axios` · `rental marketplace` · `peer-to-peer` · `listing management` · `compound components` · `JWT authentication` · `responsive design` · `pigeon-maps` · `Zustand` · `i18n` · `lessor dashboard` · `OkoRent`

---

*Sections 1–11 follow the portfolio template aligned with `project-mg-supply.md`. Sections 12–15 and appendix inventories were cross-checked with SocratiCode semantic search (905 chunks) and repository structure. Section 3 and Section 9 personal/business figures should be updated with your exact tenure and metrics.*
