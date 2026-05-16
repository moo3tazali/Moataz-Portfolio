# 📌 Project Name: Spectra Client (Telemedicine / Pediatric Care Platform — Frontend)

> **Document purpose:** Architecture and delivery summary for **Spectra Client App** — structured for **CV, LinkedIn, and portfolio** reuse.  
> **Source of truth for technical detail:** `README.md`, `WARP.md`, `src/middleware.js`, `src/routes.js`, `src/api/axios.js`, role-based modules under `src/api/` and `src/hooks/queries/`.  
> **Last verified with SocratiCode:** index green (**4,506** chunks · **2,048** files); code graph **2,038** files, **6,945** dependency edges, **8** circular dependency chains.  
> **Business metrics (Section 11):** Not stored in code—values below use **placeholders**; replace with audited figures from product/operations.

### Portfolio elevator pitch (copy-ready)

**Bilingual (Arabic/English) telemedicine frontend** on **Next.js 14 App Router** for a pediatric developmental/behavioral care platform — **four role-based dashboards** (Admin, Doctor, Organization, Client), **real-time** notifications and chat via **SignalR**, **VideoSDK** teleconsultation rooms, **contract & revenue-share** workflows, **early-check assessments**, appointments, medical records, wallets/invoicing, and a public marketing/booking surface — built with **React Query**, **Mantine + Tailwind**, and **react-hook-form + Zod**.

---

## 1. Business Context

- **What was the business problem?**  
  Deliver a unified digital experience for **online medical consultation** and **child-focused care** — connecting families, medical providers, organizations, and platform operators without fragmented tools for booking, sessions, contracts, clinical documentation, and payments.

- **Which department / company was this built for?**  
  **Spectra** — online medical consultation platform (developmental, behavioral, and psychological disorders in children per internal docs). Deployed against backend at `spectra.profound-group.com` (see env samples in `README.md`).

- **What was broken or inefficient before this system?**  
  Typical gaps: **manual appointment coordination**, **no single portal per role**, **weak real-time awareness** when sessions start or clinical artifacts are added, and **complex org/doctor/client contract & percentage rules** handled outside a guided UI.

- **Why was this project critical?**  
  The frontend is the **primary interaction layer** for patients and providers: it enforces **role-appropriate navigation**, drives **telehealth sessions**, surfaces **early-detection surveys**, and operationalizes **B2B org contracts** and **employee revenue shares** — all requiring strong i18n (Arabic default, RTL) and mobile-responsive UX.

---

## 2. Scope & Scale

| Dimension | Value / notes |
|-----------|----------------|
| **Users** | *[Stakeholder input]* — roles encoded: **Admin** (`SystemAdmin`, `CustomerSupport`, `Accountant`), **Doctor** (`Doctor`, `Specialist`, `DepartmentHead`, `ServiceHead`), **Client**, **Organization**. |
| **User-facing surfaces** | **4** dashboard personas + **public** marketing site + **auth** flows + dedicated **`/meet/[appointmentId]`** telehealth experience. |
| **Locales** | **2** — `ar` (default), `en`; RTL/LTR via `next-intl`. |
| **App Router pages** | **~301** `page.js` / `page.jsx` files under `src/app/`. |
| **React Query modules** | **~119** files under `src/hooks/queries/`. |
| **API path modules** | **~36** files under `src/api/` (plus centralized `axios.js`). |
| **Reusable UI components** | **~150+** files under `src/components/`. |
| **Email HTML templates** | **19** under `src/emails/templates/`. |
| **Codebase scale (SocratiCode)** | **2,048** indexed files · **4,506** semantic chunks · **2,038** graph nodes · **6,945** import edges · avg **3.4** deps/file |

---

## 3. Your Role

- **Scope:** **Frontend** — this repository is the client application only; backend APIs and SignalR hubs are consumed, not implemented here.
- **Main developer or team?** *[Fill in — e.g. frontend lead, sole FE on Spectra, or squad size.]*
- **Architecture vs implementation?** *[State what you owned — e.g. meet room UX, contract flows, early-check wizard, admin main-data, API hook conventions.]*
- **Decisions you owned (examples — claim if accurate):**  
  - Role-scoped **Axios** instances and React Query hook layout.  
  - **Middleware** auth + locale + route guards.  
  - **SignalR hub** components (notifications, chat, session lifecycle).  
  - **VideoSDK** meeting shell (doctor vs client layouts, waiting room, in-session panels).  
  - **Zod + RHF** form hooks for registration, contracts, invoicing.  
  - **RTL** layout and `next-intl` message organization.

---

## 4. Solution Architecture

### Overall architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  Browsers (ar / en, RTL + LTR)                                          │
│  Next.js 14 App Router — Server + Client Components                     │
│  ├─ Public site (services, packages, early-check, team booking)       │
│  ├─ Auth (login, family/org/provider signup, password reset)            │
│  ├─ Dashboards: /admin · /doctor · /organization · /client            │
│  └─ Telehealth: /meet/[appointmentId] (VideoSDK + live session UI)      │
└───────────────┬───────────────────────────────┬─────────────────────────┘
                │ HTTPS REST (Axios)            │ WebSocket (SignalR)
                ▼                               ▼
┌───────────────────────────────┐   ┌─────────────────────────────────────┐
│  Spectra Backend API          │   │  SignalR Hubs                       │
│  /api, /public, /admin, …   │   │  /notification, /chat,              │
│  Bearer JWT (accessToken)     │   │  /client-session, meet-session events │
└───────────────────────────────┘   └─────────────────────────────────────┘
```

### Frontend stack (high level)

| Layer | Choice |
|-------|--------|
| **Framework** | Next.js **14.2** App Router, React **18** |
| **i18n** | `next-intl` — middleware + `NextIntlClientProvider`, catalogs `messages/ar.json`, `messages/en.json` |
| **Styling** | Tailwind CSS **3.4** + Mantine **7** (theme, charts, dates, dropzone, carousel) |
| **Server state** | TanStack React Query **5** with tuned defaults (`query-provider.jsx`) |
| **Client state** | Zustand (modals, meet layout, contract wizard slices, etc.) + React Context (`TokenProvider`, `SessionProvider`) |
| **HTTP** | Axios — role-scoped instances with Bearer interceptor |
| **Real-time** | `@microsoft/signalr` **8** |
| **Video** | `@videosdk.live/react-sdk` |
| **Forms** | `react-hook-form` + `zod` + `@hookform/resolvers`; `object-to-formdata` for uploads |
| **Auth token** | Cookie `accessToken`; decode via `jose` in middleware and `lib/token` |

### Multi-role API clients (`src/api/axios.js`)

| Instance | Base path | Typical use |
|----------|-----------|-------------|
| `apiPublic` | `/public` | Guest catalog, registration helpers |
| `apiAuth` | `/public/identity` | Login, register, password reset |
| `apiAdmin` | `/admin` | Platform operations, main-data, invoices |
| `apiUser` | `/user` | Profile, notifications, billing |
| `apiClient` | `/client` | Family portal, schedules, early-check |
| `apiOrg` | `/organization` | Org profile, employees, contracts |
| `apiEmployee` | `/employee` | Doctor dashboard, patients, meet join |
| `apiEmployeeHead` | `/employee-head` | Department/service head flows |

Path builders live in `src/api/<role>/…`; hooks in `src/hooks/queries/<role>/…` call them with consistent `queryKey` conventions.

### Authentication & routing

- **Middleware** (`src/middleware.js`): `next-intl` locale handling + JWT from cookie + **route rewrite to 404** when role mismatches dashboard prefix.
- **Role map:** Admin, Doctor, Client, Organization route prefixes guarded against JWT `role` claim.
- **Post-login redirect:** `getRedirectPath()` — e.g. doctors without active contract → contract dashboard; otherwise appointments home.
- **Server session:** `getAuth()` (`src/lib/auth.js`) hydrates user id, roles, permissions, `hasActiveContract` for `SessionProvider`.

### Real-time (SignalR)

| Hub component | URL suffix | Events / behavior |
|---------------|------------|-------------------|
| `NotificationsHub` | `/notification` | `Receive` → toast + refetch notification queries |
| `ChatHub` | `/chat` | `MessageAdded`, chat lifecycle → optimistic local message merge |
| `AppointmentHub` (client schedules) | `/client-session` | `OnSessionStarted` → join-ready toast + refetch appointments |
| Meet `AppointmentHub` | meet session hub | `OnPrescriptionAdded`, `OnDocumentAdded`, `OnRecommendationAdded`, `OnDiagnoseAdded` → refetch in-session panels |

All hubs use `accessTokenFactory: () => token` for auth.

### Telehealth (`src/app/[locale]/meet/[appointmentId]/`)

- **VideoSDK** `MeetingProvider` wraps room config from API (`useClientMeetRoom` / `useEmployeeMeetRoom`).
- **Split layouts:** doctor (patient info, card permissions on navbar) vs client.
- **VideoCall** component: local/remote participants, controls, waiting room, speak indicator, refresh warning.
- **Dynamic side panel:** prescriptions, documents, recommendations, diagnoses — updated live via SignalR.

---

## 5. Major Feature Domains (Frontend)

### Public & acquisition (`(root)` route group)

- Marketing home, about, services/packages/treatment catalogs, success stories, blog, contact.
- **Early-check** guest flow: age-based surveys, add child, start assessment.
- **Team booking:** doctor profile → book → multi-step family registration (Zod schemas).
- Analytics hooks: Vercel Analytics/Speed Insights, Facebook Pixel utilities.

### Client dashboard

- **Main:** home notifications (upcoming sessions + recommendations carousel), early-check per child, team/services.
- **Schedules:** list + **FullCalendar** month view; real-time session-ready alerts.
- **Profile:** family vs org client types, child/patient management.
- **Packages & service requests**, wallet/orders, settings.

### Doctor (employee) dashboard

- **Appointments:** summaries, client schedules, calendar links, work schedule forms.
- **Clients:** family/org nested routes — sessions, prescriptions, diagnoses, tests, internal exams, **early-check** review.
- **Contracts** (personal + org-linked), staff, chats, wallet, profile/certificates/work permission.
- **Settings:** notifications list UI, password, complaints.

### Organization dashboard

- Profile & **organization contract** (percentage rules: platform / org / employee / client defaults).
- **Employee contracts** with versioning and edit flows.
- Employee roster, join requests.

### Admin dashboard

- **Main-data:** specialties, departments, diagnostics, drugs, services, categories, complaints, interior tests, etc. (CRUD tables + forms).
- **Clients & staff** management, org contracts, guest users.
- **Appointments & reports**, **employee invoicing** (pay single/bulk with Zod-validated bank fields).
- **Early-check** admin views per patient; **settings** (content, permissions, payment methods, video/email config).
- **Patient activity** oversight: prescriptions, documents, diagnoses, medical reports, referrals.

### Cross-cutting UX

- **Chats** with live message sync.
- **Notifications** popover with **Virtuoso** infinite scroll + mark-read mutations.
- **Tables:** TanStack Table + shared `DataTable` / mobile card fallbacks.
- **Rich inputs:** country/state, specialization multi-select, signature canvas, Quill editor, DnD sortable admin lists (`@dnd-kit`, `sortablejs`).
- **HTML email templates** for OTP, appointments, contracts, receipts, early-check (served/generated server-side in tandem with backend).

---

## 6. Advanced / Notable Frontend Concerns

| Area | Implementation notes |
|------|----------------------|
| **RTL & bilingual** | Default locale `ar`; conditional FullCalendar toolbar positions; locale-aware copy in hubs and toasts. |
| **Performance** | `optimizePackageImports` for Mantine; React Query `staleTime: 10s`, selective `refetchOnWindowFocus: false`; route-level prefetch helpers (e.g. admin early-check). |
| **Images** | `next/image` remote pattern for `spectra.profound-group.com`; SVG allowed with `unoptimized` flag. |
| **Error UX** | `QueryWrapper`, `ServerError`, `Toast.Promise` for mutations; `getFormErrors` maps API validation to RHF fields. |
| **Accessibility** | Headless UI primitives; Mantine components for complex widgets. |
| **Security (client)** | JWT in httpOnly-style cookie flow; middleware blocks cross-role URL access; no token → redirect to login on protected prefixes. |

---

## 7. Key Features Built (concrete)

- **Role-based multi-tenant navigation** with centralized `ROUTES` constants (~500+ lines).
- **JWT middleware guards** for `/admin`, `/doctor`, `/client`, `/organization`.
- **Family & org registration** multi-step wizards with Zod (patients array, `useFieldArray`).
- **Organization & employee contracts** — file upload (PDF/DOC), percentage validation, service pickers, version history.
- **Early-check / initial assessment** flows for client, doctor, and admin with optional survey selection UI.
- **Appointment lifecycle** — booking, calendar, session join, meet room with VideoSDK.
- **In-session clinical collaboration** — live updates for prescriptions, files, recommendations, diagnoses.
- **Admin financial ops** — employee invoice payment forms with strict field schemas.
- **Infinite notification feed** + sound on push.
- **Real-time chat** with local cache updates on `MessageAdded`.

---

## 8. Technical Challenges

| Challenge | How the codebase addresses it |
|-----------|-------------------------------|
| **Four personas, one codebase** | Route groups under `src/app/[locale]/(dashboard)/{admin,doctor,organization,client}` + shared `_components` and `src/routes.js`. |
| **RTL + responsive** | Tailwind + Mantine breakpoints in custom theme; locale-conditional layouts. |
| **Auth on server and client** | Middleware decode + `SessionProvider` + `TokenProvider` for hooks/API calls. |
| **Real-time + REST consistency** | SignalR events trigger `queryClient.refetchQueries` with stable `queryKey`s. |
| **Heavy forms & file uploads** | Zod refinements + `getFormData` / `object-to-formdata` for multipart. |
| **Telehealth reliability** | Waiting room, `NoInternet`, meet-finished states, `useWarnOnRefresh` during active call. |
| **Large surface area** | React Query module-per-domain; API path builders separated from UI. |

---

## 9. Performance & Optimization

- **React Query defaults:** reduced refetch noise; smart retry (skip 400/401/403/404/422).
- **Package import optimization** for Mantine in `next.config.mjs`.
- **List virtualization** (`react-virtuoso`) for long notification lists.
- **Prefetch patterns** for admin/doctor data-heavy pages.
- **Client-only VideoSDK mount** — `MeetingProvider` gates on `mounted` + browser check.
- *[Production Web Vitals — fill from Vercel Speed Insights if available.]*

---

## 10. DevOps & Deployment

| Topic | Current practice |
|-------|------------------|
| **Scripts** | `pnpm dev` · `pnpm build` · `pnpm start` · `pnpm lint` |
| **Hosting** | Compatible with **Vercel** (Analytics + Speed Insights integrated) |
| **Env vars** | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SIGNALR_HUB_URL`, `NEXT_PUBLIC_BASE_URL` |
| **CI/CD** | *[Define your pipeline — not committed in excerpts reviewed]* |
| **Node** | 18+ recommended |

---

## 11. Impact (MANDATORY NUMBERS)

**Replace with measured KPIs.**

| Metric | Value | How measured |
|--------|-------|----------------|
| Registered families / orgs | **[TBD]** | Backend analytics |
| Consultations per month | **[TBD]** | Appointment reporting |
| Early-check completions | **[TBD]** | Assessment funnel |
| Avg. time to join session | **[TBD]** | Hub + meet telemetry |
| Support tickets (UX-related) | **[TBD]** | CS tooling |

---

## 12. Reusable Assets

- **`QueryWrapper`** — standard loading/error/success boundary for queries.
- **`src/routes.js`** — single navigation source of truth.
- **`src/api/axios.js`** — interceptor pattern for scoped APIs.
- **Form hook pattern** — colocated `use-*-form.js` with Zod + `Toast.Promise` + `getFormErrors`.
- **Hub components** — reusable SignalR connect/disconnect lifecycle.
- **Dashboard UI primitives** — `InfoData`, role-specific `_components/ui`, shared tables/cards.
- **Email templates** — consistent HTML for transactional comms.

---

## 13. What You Would Improve

*[Edit to your opinion]*

- **TypeScript migration** — codebase is primarily JavaScript; gradual TS would harden API contracts.
- **E2E tests** — Playwright flows for auth, booking, and meet join.
- **SignalR resilience** — automatic reconnect/backoff and unified hub manager.
- **Bundle analysis** — split heavy routes (meet, admin charts) with dynamic imports.
- **Design system consolidation** — reduce overlap between legacy `*.js` components and newer JSX modules.
- **Resolve graph cycles** — SocratiCode reports **8** circular dependency chains (hub: `utils.js`, `routes.js`).

---

## 14. Skills & Competencies Demonstrated

Use as a **skills matrix** for CVs — emphasize **frontend** delivery.

### Frontend engineering

- Next.js **App Router** (layouts, route groups, parallel routes, server components for providers).
- **Internationalization** — `next-intl`, RTL, bilingual UX copy.
- **Component architecture** — shared design system (Tailwind + Mantine), responsive breakpoints.
- **Client/server boundary** — async server providers loading messages + auth; client islands for interactivity.

### Data & state

- **TanStack React Query** — queries, mutations, infinite queries, prefetch, cache invalidation from SignalR.
- **Zustand** for UI/modal/meet state.
- **React Context** for auth session and token propagation.

### Real-time & media

- **SignalR** hub integration (notifications, chat, sessions, in-meet events).
- **VideoSDK** telehealth UI (participants, controls, waiting room).
- **FullCalendar** scheduling views; **Chart.js** / Mantine charts for reports.

### Forms & validation

- **react-hook-form** + **Zod** schemas, `useFieldArray`, cross-field refinements.
- Multipart/file validation (contracts, avatars, admin uploads).
- API error → field mapping utilities.

### Healthcare / product domain

- Multi-role **telemedicine** workflows (client, provider, org, admin).
- **Pediatric early-check** assessments and clinical artifact surfaces.
- **B2B contracts** with revenue-share percentages and versioning.

---

## 15. Technologies & Tools

| Layer | Technologies |
|-------|----------------|
| **Core** | Next.js 14.2, React 18, JavaScript (JSX) |
| **i18n** | next-intl 3.26 |
| **Styling** | Tailwind CSS 3.4, Mantine 7 (core, hooks, dates, charts, carousel, dropzone) |
| **Data fetching** | TanStack React Query 5.59, Axios 1.7 |
| **Tables & lists** | TanStack React Table 8, react-virtuoso 4 |
| **Forms** | react-hook-form 7.54, Zod 3.23, @hookform/resolvers |
| **Real-time** | @microsoft/signalr 8 |
| **Video** | @videosdk.live/react-sdk 0.2 |
| **Calendar** | FullCalendar 6.1 (@fullcalendar/react, daygrid, timegrid, interaction) |
| **UI utilities** | Headless UI 2, Swiper 11, @dnd-kit, sortablejs, react-signature-canvas, Quill 2 |
| **Auth** | jose 5 (JWT decode), cookie-based access token |
| **Analytics** | @vercel/analytics, @vercel/speed-insights |
| **Media** | react-player 2, sharp (images) |
| **Tooling** | ESLint 8, eslint-config-next, PostCSS, pnpm |

---

## 16. Design Patterns

Patterns evidenced in the codebase (strong interview/CV talking points).

| Pattern | Where it appears | Why it matters |
|---------|------------------|----------------|
| **Facade (API instances)** | `apiAdmin`, `apiClient`, … in `axios.js` | Hides base URL + auth; keeps hooks role-correct |
| **Path builder module** | `src/api/admin/main-data.js`, etc. | DRY endpoint strings; easier backend path changes |
| **Custom hook + React Query** | `src/hooks/queries/**` | Separates data layer from presentation |
| **Colocated form hook** | `use-*-form.js` beside routes | Schema, submit, and toast logic encapsulated |
| **Provider composition** | `src/providers/index.jsx` | Ordered tree: i18n → Mantine → Query → Token → Session |
| **Route guard (middleware)** | `middleware.js` | Security before render; locale-aware redirects |
| **Hub subscriber** | `*-hub.jsx` components | Isolated SignalR lifecycle; refetch on domain events |
| **Query wrapper / suspense UX** | `QueryWrapper`, `DataSuspense` | Consistent loading and error surfaces |
| **Optimistic/local cache update** | `useAddMessageLocally` (chat) | Snappy chat without waiting for refetch |
| **Constants registry** | `src/routes.js`, `src/data/roles.js` | Prevents navigation drift across 300+ pages |
| **Server Action auth snapshot** | `getAuth()` in `lib/auth.js` | SSR-friendly session bootstrap |
| **Feature folder (App Router)** | `(dashboard)/admin/(routes)/…/_components` | Scales large teams per domain |

---

## 17. Architecture & Structural Patterns

### App Router topology

```text
src/app/[locale]/
├── (auth)/              # login, signup (family, org, provider), password reset
├── (root)/              # public marketing + guest early-check + team booking
├── (dashboard)/
│   ├── admin/(routes)/  # platform administration
│   ├── doctor/(routes)/ # medical provider (employee)
│   ├── organization/(routes)/
│   └── client/(routes)/ # patient/family portal
├── meet/[appointmentId]/  # telehealth (doctor | client sub-trees)
└── [...rest]            # catch-all 404
```

### Structural conventions

| Pattern | Description |
|---------|-------------|
| **Locale-first URLs** | All user routes prefixed with `/[locale]/` via `next-intl` middleware |
| **Route groups** | `(dashboard)`, `(routes)`, `(auth)` — organize layouts without affecting URL |
| **Role-first API + hooks** | Mirror backend segmentation: `api/<role>` ↔ `hooks/queries/<role>` |
| **Central routes module** | `ROUTES.ADMIN.*`, `ROUTES.CLIENT.*`, … — parameterized path functions |
| **Shared dashboard primitives** | `src/app/[locale]/(dashboard)/_components` for cross-role UI |
| **Role-scoped feature components** | e.g. `@/admin/_components`, `@/client/_components`, `@/doctor/_components` |
| **Meet as sub-application** | Separate layout providers: `LayoutProvider`, `MeetingProvider`, `VideoCall` subtree |
| **Path alias** | `@/` → `src/` via `jsconfig.json` |
| **Legacy + modern components** | `src/components` flat library consumed across all route groups |

### Domain boundaries (frontend modules)

| Stream | Primary areas |
|--------|----------------|
| **Identity & onboarding** | `(auth)`, `hooks/queries/auth`, public registration |
| **Catalog & marketing** | `(root)`, `hooks/queries/public` |
| **Scheduling & sessions** | client/doctor schedules, `appointment` hooks, meet routes |
| **Clinical record** | patient-activity hooks (prescription, diagnose, document, report, referral, …) |
| **Early detection** | early-check hooks + survey UI (client, doctor, admin) |
| **Commercial** | contracts (org, employee, doctor), orders, wallets, invoices |
| **Communication** | chats, notifications, SignalR hubs |
| **Platform admin** | main-data, settings, staff, guests, permissions |
| **Org HR** | employees, join requests, org contract percentages |

### Dependency graph notes (SocratiCode)

**Most connected modules:** `src/lib/utils.js`, `src/routes.js`, `src/i18n/routing.js`, `src/components/card.js`, `src/components/query-wrapper.jsx` — natural hubs for shared utilities; consider splitting if cycles grow.

---

## Appendix: Repository map

| Path | Role |
|------|------|
| `src/app/` | Next.js pages, layouts, route groups |
| `src/api/` | Axios setup + REST path builders by role |
| `src/hooks/queries/` | React Query hooks (server state) |
| `src/components/` | Shared UI library |
| `src/providers/` | App-wide React providers |
| `src/lib/` | Auth, token, cookies, utils, time |
| `src/store/` | Zustand slices |
| `src/data/` | Static enums, copy, role constants |
| `src/emails/templates/` | Transactional HTML templates |
| `messages/` | i18n JSON (`ar`, `en`) |

### SignalR hub inventory

| Component | Hub path |
|-----------|----------|
| `notifications-hub.jsx` | `{SIGNALR}/notification` |
| `chat-hub.jsx` | `{SIGNALR}/chat` |
| Client `appointment-hub.jsx` | `{SIGNALR}/client-session` |
| Meet `appointment-hub.jsx` | meet session hub (in-session clinical events) |

### Meet route inventory

| Area | Purpose |
|------|---------|
| `_components/videoCall.jsx` | Core VideoSDK UI |
| `_components/meeting-provider.jsx` | SDK wrapper + context |
| `doctor/client-layout.jsx` | Doctor meet shell + patient info |
| `client/client-layout.jsx` | Client meet shell |
| `*/dynamic-content/` | Side panel + live hub for clinical artifacts |

---

## CV keyword block (optional paste)

`Next.js` · `React` · `App Router` · `TypeScript-ready JavaScript` · `next-intl` · `RTL` · `Arabic/English` · `telemedicine` · `pediatric healthcare` · `TanStack Query` · `React Hook Form` · `Zod` · `Axios` · `SignalR` · `WebRTC` · `VideoSDK` · `Mantine` · `Tailwind CSS` · `FullCalendar` · `role-based access` · `JWT` · `multi-tenant UI` · `contracts` · `appointments` · `early assessment` · `real-time chat` · `Vercel`

---

*Sections 1–13 follow the portfolio template; sections 14–17 and appendix inventories were cross-checked with SocratiCode semantic search (index **4,506** chunks) and repository structure. Section 3 and Section 11 require your personal input and business metrics.*
