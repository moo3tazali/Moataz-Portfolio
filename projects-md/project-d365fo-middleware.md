# 📌 Project Name: D365FO Middleware (NestJS + React)

> **Document purpose:** Architecture and delivery summary for the **D365FO Middleware** workspace (`D365FOMiddleware_Nestbackend`, `dynamics-fo-middleware`) — structured for **CV, LinkedIn, and portfolio** reuse.  
> **Source of truth for technical detail:** `D365FOMiddleware_Nestbackend/AGENTS.md`, `D365FOMiddleware_Nestbackend/.docs/*`, `dynamics-fo-middleware/src/services/core/api-routes.ts`, `D365FOMiddleware_Nestbackend/src/app.module.ts`.  
> **Last verified with SocratiCode:** index in progress (~750 source files scanned; embeddings building); code graph **733** TypeScript/HTML/JS files, **610** dependency edges, **0** circular dependency chains.  
> **Business metrics (Section 11):** Time-saved narrative is based on **ICT → D365 FO** migration (manual re-keying vs automated batches)—add your audited line volumes when available.

### Portfolio elevator pitch (copy-ready)

Full-stack **finance integration platform** for **Microsoft Dynamics 365 Finance & Operations**, replacing manual **ICT → DFO** data entry: a **NestJS 11** API ingests **Excel exports from the legacy ICT system**, validates against cached master data, transforms lines through **16+ entry processors**, and posts to D365 FO via **OData**—plus a **React 19** dashboard for upload, error review, and **Post to DFO** across AR, AP, cash, vendor, and closing. **Sole delivery:** stakeholder discovery through production deploy (backend + frontend).

---

## 1. Business Context

- **What was the business problem?**  
  During the move from the legacy **ICT** system to **D365 Finance & Operations**, finance and logistics teams still received operational data as **ICT Excel exports**. Without automation, every row had to be **re-keyed manually** into D365 FO (correct dimensions, main accounts, tax, journals/invoices)—slow, error-prone, and unscalable for freight/trucking volume across **AR, AP, cash, vendor, and closing** flows.

- **ICT → DFO migration angle**  
  The middleware is the **bridge**: it accepts the same Excel shape operations already export from **ICT**, runs validation and enrichment against master data, and posts to D365 FO in bulk. What would take **days or weeks of manual entry per large export** becomes **upload → validate → post**, with a full audit trail when something fails.

- **Which department / company was this built for?**  
  **MESCO** finance integration context (freight + trucking product lines)—serving a **D365 FO** tenant with company-scoped master data and mappings. *(Exact legal entity count is organizational configuration in D365 and Mongo—not hard-coded in this repo.)*

- **What was broken or inefficient before this system?**  
  **Manual ICT-to-DFO posting**: operators opening D365 FO and recreating vouchers line by line; **no batch error report**; **dimension mistakes** caught late; **no repeatable mapping** from ICT columns to D365 document types; and **OData fragility** when anyone tried to script ad hoc imports.

- **Why was this project critical?**  
  The middleware keeps **Excel as the operational UI** while D365 FO remains the **system of record**, adding **typed validation, batch orchestration, async posting, and operational dashboards**—reducing month-end and daily cut-off risk for freight/trucking finance teams.

---

## 2. Scope & Scale

| Dimension | Value / notes |
|-----------|----------------|
| **Users** | *[Stakeholder input]* — finance operators, AP/AR clerks, integration admins; not encoded as a fixed user count in the repo. |
| **Platform** | **D365 Finance & Operations** (OData)—**not** Dataverse / CE. |
| **Application persistence** | **MongoDB** — **23** Mongoose `*.schema.ts` files (users, refresh tokens, data batches, enhanced/source records, batch errors, master-data cache, resilience cache, app settings, counters). |
| **Entry processor types (enum)** | **28** values in `EntryProcessorTypes` (`data-batch.enum.ts`) |
| **Active processors (factory-registered)** | **16** implementations in `EntryProcessorFactory` (AR×4, vendor×4, closing×4, cash×4) |
| **Excel / line batching** | Default **`maxLinesPerBatch = 1000`** (`entry-processor-utils.service.ts`; also on cash/vendor base processors) |
| **Environments** | `.env.local` / `.env.development` / `.env.production`; Docker Compose dev + production; remote deploy via `docker:deploy` script |
| **Multi-company** | **Yes (by design)** — `company` / `dataAreaId` passed through processors and D365 calls; master data and mappings are company-scoped |
| **Codebase scale (SocratiCode + repo)** | **2** deployable packages · **~733** graph-indexed files · **14** Nest feature modules in `AppModule` · **5** BullMQ queues · **5** queue processors · **4** `IDfoPostingStrategy` implementations · **38** React dashboard `page.tsx` routes · **11** backend `.docs/` guides |

---

## 3. Your Role

- **Main developer or team?** **Sole owner — end to end.** You delivered **both** packages (`D365FOMiddleware_Nestbackend` and `dynamics-fo-middleware`) in full: no separate frontend/backend team split on delivery.
- **Discovery → delivery:** Gathered requirements from **stakeholders** (finance/operations), translated ICT export realities and D365 FO posting rules into a technical plan, then **implemented, deployed, and operated** the solution yourself.
- **Architecture and implementation:** You designed and built the full stack—**MongoDB** batch store, **NestJS** processors and OData integration, **BullMQ** posting pipelines, **React** operator dashboard, Docker deployment, and internal `.docs/` for extending processors.
- **Decisions you owned:** Entry-processor and voucher/batch rules (e.g. 1000-line caps, do not split vouchers); queue topology per D365 document type; OData resilience (circuit breaker, retry, rollback); master-data sync strategy; batch validation/error UX; **Post to DFO** flows per finance module.

**CV one-liner (copy-ready):** *Led solo delivery of ICT-to-D365 FO migration middleware—stakeholder workshops, architecture, NestJS + React implementation, and production deployment.*

---

## 4. Solution Architecture

### Overall architecture

1. **Client:** `dynamics-fo-middleware` — **React 19** SPA with **TanStack Router** (file-based routes), **TanStack Query**, **Axios**, cookie-based auth against the API.
2. **API tier:** **NestJS 11** REST API (`D365FO Middleware` v1.0 in Swagger) — CQRS in domain modules, global success envelope `{ status, meta, data }`, validation pipe, CORS, Helmet, compression, `bot-block` middleware, Swagger at `/docs` (non-production).
3. **ERP:** **Microsoft D365 FO** — OData with **Azure AD** client credentials (`D365FO_*` env vars).
4. **Persistence:** **MongoDB 8** for batches, users, master-data snapshots, cache fallbacks.
5. **Async / cache:** **Redis 7** + **BullMQ** for D365 posting jobs and master-data sync; **multi-layer cache** (in-memory + Redis + Mongo fallback via resilience module).

### Power Apps type

- **Not applicable (D365 FO + custom web app).**  
- **Functional equivalent:** D365 FO native UI for ERP inquiry; **custom middleware + React dashboard** for Excel migration and batch operations.

### Dataverse design

- **N/A.** All application entities live in **MongoDB** (see §2).

### Backend (`AppModule` imports)

`AuthModule`, `VendorModule`, `CashModule`, `ClosingModule`, `AccountsReceivableModule`, `DataBatchModule`, `MasterDataModule`, `SettingsModule`, `ResilienceModule`, `DBModule`, `QueueModule`, `D365FOModule`, `UserModule`, `SchedulerModule` — plus global `ConfigModule` with Joi `ConfigSchema`.

### REST API surface (grouped)

| Area | Controller prefix | Examples |
|------|-------------------|----------|
| **Auth** | `auth` | `login`, `register`, `refresh`, `logout`, `logout-all` |
| **Data batches** | `DataMigration/DataBatch` | `list`, `error-list`, `:batchId`, download enhanced/errors/source |
| **Accounts receivable** | `DataMigration/AccountReceivable` | Freight/Trucking documents & credit notes, `PostToDFO` |
| **Vendor / AP** | `DataMigration/Vendor` | Freight/Trucking documents & adjustments, payments, `PostToDFO` |
| **Cash** | `DataMigration/Cash` | CashIn/CashOut Freight & Trucking, `PostToDFO` |
| **Closing** | `DataMigration/Closing` | Freight/Trucking closing, custody settlement, difference, `PostToDFO` |
| **Master data** | `Finance/MasterData` | customers, vendors, dimensions, billing, main accounts, exchange rates, tax, ledgers + `sync` endpoints |
| **Settings** | `settings` | list, bulk update, by logical name |
| **Excel utility** | `excel` | `to-json` |
| **Scheduler** | `scheduler` | `health`, cleanup tokens/temp files |

URI versioning: default **`v1`** → routes like `/api/v1/...`.

### Frontend dashboard domains

| Module | Routes (examples) |
|--------|-------------------|
| **Accounts receivable** | list, `batch/new`, `batch/$batchId`, errors |
| **Accounts payable** | same pattern |
| **Vendor** | same pattern |
| **Cash in / Cash out / Cash management** | same pattern |
| **Ledger / closing** | same pattern |
| **Settings** | app settings admin |
| **Auth** | `login`, public home |

Shared UX: **batch forms** (Excel upload), **error tables**, **validation modals**, **DFO status** component, **Post to DFO** hooks per module.

### Integration

- **Microsoft D365 FO OData** — posting via domain services wrapped in `D365foClient` (auth, circuit breaker, retry, cache).
- **Excel** — `exceljs` on backend; browser **react-dropzone** on frontend.

### Authentication

- **API users:** JWT access + refresh tokens; **Argon2** password hashing; refresh tokens persisted in MongoDB.
- **D365 FO:** OAuth2 **client credentials** (service principal) for OData.
- **Browser:** Bearer token + refresh via cookies/headers (`X-Refresh-Token` allowed by CORS).

---

## 5. Power Platform Implementation

This section maps **Power Platform concepts** to **this codebase** (for readers familiar with CE/Dataverse projects):

| Concept | Implementation |
|---------|----------------|
| **Canvas / model-driven apps** | **React SPA** (`dynamics-fo-middleware`) — not Power Apps. |
| **Business process flows** | **Batch status** enum: Pending → Processing → Completed / Canceled; queue job lifecycle for D365 posting. |
| **Power Automate** | **BullMQ** workers (5 queues)—see §9. |
| **Plugins** | **TypeScript** domain processors + D365 service layer—not C# Dataverse plugins. |

---

## 6. Advanced Dynamics Usage

> Targets **D365 Finance & Operations (OData)**, not **Dataverse**.

| Area | Implementation notes |
|------|----------------------|
| **Security** | App-level JWT; D365 access via integration service account **[confirm D365 security roles]**. |
| **Financial dimensions** | Validated in entry processors (`RequiredDimensionsConfig`); cached in Mongo via master-data sync. |
| **Multi-company** | `dataAreaId` / company on batches and OData calls. |
| **Document types posted** | Free-text invoices, vendor journals, ledger journals, customer payment journals (per queue/strategy). |
| **Posting reliability** | Chunked header/line posting, **rollback** (`dfo-rollback.service.ts`), error collection for partial failures. |
| **OData discipline** | Fluent **`odata-query-builder.service.ts`**; warmup queries in processors to avoid N+1. |

---

## 7. Key Features Built (concrete)

- **Excel ingestion → raw models → D365-shaped payloads** across AR, vendor, cash, and closing domains.
- **16 registered entry processors** (factory) covering freight + trucking variants for invoices, credit notes, vendor docs, payments, cash in/out, and closing entries.
- **Batch lifecycle** in MongoDB with source records, enhanced records, structured **batch errors**, and downloadable artifacts (enhanced list, error list, source file).
- **Post to DFO** endpoints per domain enqueue **BullMQ** jobs; frontend surfaces **validation errors** (nested invoice/line keys) and **job status**.
- **Master data hub** — sync customers, vendors, dimensions, billing classifications/codes, main accounts, exchange rates, payment terms, tax groups, ledgers; CRUD for account mappings.
- **Resilience stack** — `opossum` circuit breaker, `axios-retry`, Redis + Mongo cache layers on D365 GETs.
- **App settings** — configurable logical settings (bulk update API).
- **Scheduler** — health check, token/temp-file cleanup endpoints.
- **Operator dashboard** — TanStack Table filters, batch wizards, module-specific submit hooks, theme provider, toast notifications.

### Entry processors registered today

| Domain | Processor types (enum) |
|--------|------------------------|
| **AR** | AccountReceivableFreight, AccountReceivableTrucking, Freight/Trucking CreditNote |
| **Vendor** | VendorFreight, VendorTrucking, VendorPaymentFreight, VendorPaymentTrucking |
| **Closing** | LedgerFreightClosingEntry, LedgerTruckingClosingEntry, LedgerClosingFreightDifference, LedgerCustodySettlementEntry |
| **Cash** | CashInFreight, CashOutFreight, CashInTrucking, CashOutTrucking |

*Enum also defines additional types (e.g. AccountPayable*, Custody*, LedgerCash*/Bank*/Visa*) for extension—wire in factory when implementations land.*

---

## 8. Technical Challenges

| Challenge | How the codebase addresses it |
|-----------|--------------------------------|
| **OData reliability at volume** | Circuit breaker + retries + async **BullMQ** posting; chunked header/line batches in strategies. |
| **Voucher / invoice integrity** | Group by voucher+invoice; **do not split vouchers** across batches; 1000-line cap with explicit overflow handling in utils. |
| **Dimension & master-data correctness** | Processor warmup + Mongo-cached master data; CQRS queries for billing codes, mappings, tax. |
| **Partial posting failures** | `IDfoPostingStrategy` rollback + `posting-error-collector`; batch error documents for UI. |
| **Dual runtime (Excel + D365)** | Clear pipeline: upload → enhance → validate → queue → post; status on `DataBatch`. |
| **Frontend/API contract** | Global envelope + typed `validationErrors` maps; shared batch components across modules. |

---

## 9. Performance & Optimization

- **Caching:** `@nestjs/cache-manager`, Redis (`ioredis`, `@keyv/redis`), MongoDB `cache-entry` schema for fallback.
- **Queues (BullMQ on Redis):**
  - `dfo-free-text-invoice-queue`
  - `dfo-vendor-journal-queue`
  - `dfo-ledger-journal-queue`
  - `dfo-customer-payment-journal-queue`
  - `master-data-sync-queue`
- **D365 client:** Circuit-broken GETs; configurable TTLs via resilience config.
- **HTTP:** Compression, Helmet, bot-block; validation pipe whitelist.
- **UI:** React Query `staleTime` 5 min, `refetchOnWindowFocus: false` to limit API churn.

---

## 10. DevOps & Deployment

| Topic | Current practice |
|-------|------------------|
| **Local dev** | `docker compose` — app + **MongoDB 8** + **Redis 7**; `pnpm start:dev` / `start:dev:docker` |
| **Production** | Multi-stage Dockerfile; image **`moatazali/middleware-app:1.0.2`**; `docker-compose.production.yml` with healthchecks |
| **Deploy** | `pnpm docker:deploy` — build, push, SSH to host, `docker compose pull && up -d` |
| **Frontend** | `pnpm build` (Vite + `tsc`); static hosting **[confirm target—CDN/nginx alongside API]** |
| **CI/CD** | *[Not in repo]* — add pipeline for lint, test, image publish |
| **Secrets** | `.env.*` per environment; never commit production credentials |

---

## 11. Impact (MANDATORY NUMBERS)

### Primary value: time saved on ICT → DFO migration

**Before this system:** Each ICT export was handled **manually in D365 FO**—open the right journal or invoice form, enter header and lines, set **financial dimensions**, accounts, tax, and amounts, repeat for the next row. ICT often exports **one row per accounting side**, so a single business voucher can mean **multiple spreadsheet rows** and **multiple D365 lines**. Large files (hundreds to **1,000 lines per batch** in this codebase) are impractical to post by hand in a reasonable window.

**After:** Operators upload the **same ICT-shaped Excel**, the middleware **validates, enriches, and posts** (or returns a structured error list to fix and retry). Review time replaces data-entry time.

### How to quantify (use your real volumes)

| Step | Formula |
|------|---------|
| **Manual minutes per line** | Time study: one ICT row → one D365 line (including dimensions & checks). *Typical planning range: **2–5 min/line** for complex freight/trucking entries—validate with finance.* |
| **Lines migrated per month** | Sum of lines across batches posted (MongoDB `data-batch` / enhanced records). |
| **Hours saved per month** | `lines × manual_minutes_per_line ÷ 60 × automation_rate` — automation_rate ≈ **0.85–0.95** (small residual for upload/review). |

**Illustrative example (replace with your counts):**

| Scenario | Calculation | Result |
|----------|-------------|--------|
| One **1,000-line** ICT cash export | 1,000 × 3 min = **50 hours** manual | **~2–5 hours** upload + review + post via middleware → **~45–48 hours saved per file** |
| **2,000 lines/month** steady state | 2,000 × 3 min ÷ 60 ≈ **100 hours/month** manual | Same automation rate → **~85–95 hours/month saved** |

### Impact table (for CV / portfolio)

| Metric | Value | How measured / narrative |
|--------|-------|---------------------------|
| **Time saved (hours/month)** | **High — primary ROI** | ICT Excel → DFO without manual re-keying; use formula above with your batch line counts. *Illustrative: **~85–100+ hours/month** at 2k lines/month and ~3 min/line manual.* |
| **Manual work reduced (%)** | **~85–95%** (estimate) | Data entry replaced by upload + exception handling; only failed lines need human fix. |
| **Errors / rework reduced (%)** | **[Add your figure]** | Compare reversal/correction journals before vs after; validation catches dimension/account issues **before** D365 post. |
| **Users impacted (active)** | **[Add your figure]** | Finance operators posting ICT migration batches + admins running master-data sync. |
| **Business outcome** | **ICT decommission path enabled** | Legacy ICT exports continue to flow into **D365 FO as system of record** without maintaining parallel manual posting; faster month-end and daily freight/trucking finance cycles. |

**Talking point for interviews:** *“Imagine posting a thousand-line ICT export by hand in D365—that’s weeks of clerical work. We reduced it to a validated batch job with error reports.”*

---

## 12. Reusable Assets

- **`EntryProcessorBase`** + **`EntryProcessorFactory`** — template for new Excel → D365 flows.
- **`D365foClient`** + **`ODataQueryBuilder`** + domain D365 services.
- **`IDfoPostingStrategy`** + queue processors + **`DfoRollbackService`**.
- **Resilience module** — circuit breaker, retry, layered cache.
- **Global API envelope** — interceptor + exception filter (requestId, validation error shape).
- **Frontend** — shared batch table/form/footer, `API_ROUTES` map, services provider pattern.
- **Docs** — `.docs/ADDING_NEW_MODULE_OR_PROCESSOR.md`, `BULLMQ_SETUP.md`, `D365FO_CONFIG.md`, `ODATA_QUERY_BUILDER.md`, `ENV_VARIABLES.md`, processor HTML reports.

---

## 13. What You Would Improve

- **Complete processor coverage** — register remaining `EntryProcessorTypes` enum values (custody, ledger cash/bank/visa variants, vendor adjustments).
- **Observability** — correlation ID from API → BullMQ job → D365 request/response in structured logs (Application Insights or OpenTelemetry).
- **CI/CD** — GitHub Actions / Azure DevOps with automated tests and image promotion.
- **Security hardening** — rotate any credentials referenced in compose examples; use secret manager in production.
- **E2E tests** — sandbox D365 FO with recorded OData fixtures for regression on posting strategies.
- **Root README** — replace Nest starter README with architecture onboarding (link to this portfolio doc).

---

## 14. Skills & Competencies Demonstrated

Use this section as a **skills matrix** for CVs—reword bullets to match what you personally delivered.

### Microsoft Dynamics 365

- D365 **Finance & Operations** OData integration (client credentials, entity-specific posting)
- Financial dimensions, main accounts, billing codes, exchange rates, tax groups
- Document posting patterns: free-text invoice, vendor journal, ledger journal, customer payment journal
- Multi-company (`dataAreaId`) batch processing

### Backend & integration

- REST API design with **OpenAPI/Swagger** and consistent response envelopes
- **CQRS** (`@nestjs/cqrs`) for domain commands and queries
- **BullMQ** background jobs on **Redis**
- **MongoDB** / Mongoose modeling for operational data and master-data cache
- Resilience: **circuit breaker** (`opossum`), **axios-retry**, multi-tier caching
- JWT authentication with refresh tokens and **Argon2** hashing
- Excel parsing and transformation (`exceljs`)

### Frontend & UX

- **React 19** SPA with **TanStack Router** (file-based routing) and **TanStack Query**
- Form-heavy workflows: **react-hook-form**, **zod**, drag-drop upload
- Data tables and filters (**TanStack Table**)
- API client layering (Axios, typed routes, envelope parsing)
- Design system: **Tailwind CSS v4**, **Radix UI**, **shadcn-style** components

### Software engineering

- Monorepo with **two deployable packages** (API + web)
- Domain-driven **feature modules** (vendor, cash, AR, closing, master-data)
- **Strategy** and **factory** patterns for extensible posting and processors
- **Docker Compose** multi-service deployment
- Technical documentation co-located in `.docs/`

### Delivery & leadership

- **Solo end-to-end ownership:** stakeholder interviews, solution design, full-stack build, deployment
- **Legacy modernization:** ICT Excel exports → validated D365 FO posting pipelines
- Cross-functional translation of finance rules into processor and API design

---

## 15. Technologies & Tools

| Layer | Technologies |
|-------|----------------|
| **ERP** | Microsoft Dynamics 365 Finance & Operations, OData, Azure AD app registration |
| **Backend API** | NestJS 11, TypeScript 5.7, Express |
| **Persistence** | MongoDB 8, Mongoose 9 |
| **Queues & cache** | Redis 7, BullMQ 5, `@nestjs/bullmq`, `cache-manager`, Keyv, `@keyv/redis`, `ioredis` |
| **API docs & validation** | `@nestjs/swagger`, `class-validator`, `class-transformer`, Joi (`@nestjs/config`) |
| **Architecture libs** | `@nestjs/cqrs`, `@nestjs/schedule`, `@nestjs/jwt`, `@nestjs/mongoose` |
| **HTTP & security** | Axios, `axios-retry`, Helmet, compression, Argon2 |
| **Resilience** | `opossum` (circuit breaker) |
| **Excel** | `exceljs`, `archiver` (downloads) |
| **Frontend** | React 19, Vite 6, TypeScript 5.9, TanStack Router/Query/Table, Tailwind 4, Radix UI, Zustand, Zod 4, Vitest |
| **Tooling** | pnpm, ESLint 9, Prettier, Jest (backend), Docker Compose |
| **Deploy** | Docker multi-stage build, SSH remote compose (`docker:deploy`) |

---

## 16. Design Patterns

Patterns evidenced in the codebase (strong interview / CV talking points).

| Pattern | Where it appears | Why it matters |
|---------|------------------|----------------|
| **CQRS** | Commands/handlers per domain module (e.g. master-data sync, vendor payment processing) | Separates reads from writes; keeps controllers thin |
| **Strategy** | `IDfoPostingStrategy` — free-text invoice, vendor journal, ledger journal, customer payment journal | Same queue processor shape for different D365 document APIs |
| **Factory** | `EntryProcessorFactory` maps `EntryProcessorTypes` → processor instance | Add new Excel flows without giant switch statements |
| **Template method** | `EntryProcessorBase`, `BaseCashEntryProcessor`, `BaseVendorEntryProcessor` | Shared warmup, batching, dimension validation hooks |
| **Repository** | Data-batch repositories / Mongoose models | Persistence abstraction for batches and errors |
| **Circuit breaker** | `CircuitBreakerService` + `D365foClient` | Prevents cascade failures when D365 is unhealthy |
| **Job queue** | BullMQ processors per document type | Long OData posts off the HTTP thread |
| **Rollback / compensating action** | `DfoRollbackService` + strategy `deleteHeader` / `deleteLinesInBatches` | Partial failure recovery |
| **Global interceptor + filter** | `GlobalResponseInterceptor`, `GlobalExceptionFilter` | Uniform API contract for React clients |
| **DTO + validation** | `class-validator` on controllers; Joi on env | Fail-fast at boundaries |
| **Dual-channel master data** | D365 sync → Mongo cache → processor warmup | Fewer live D365 reads during validation |
| **Services provider (frontend)** | `ServicesProvider` + injected API modules | Testable, swappable API layer in React |

---

## 17. Architecture & Structural Patterns

### System topology

```text
┌────────────────────────────────────────────────────────────────────┐
│  React dashboard (dynamics-fo-middleware)                            │
│  TanStack Router · Query · Excel upload · batch/error UX           │
└────────────────────────────┬───────────────────────────────────────┘
                             │ JWT REST /api/v1
                             ▼
┌────────────────────────────────────────────────────────────────────┐
│  NestJS API (D365FOMiddleware_Nestbackend)                         │
│  Controllers → CQRS → Entry processors → Data batch (MongoDB)      │
│  BullMQ workers → IDfoPostingStrategy → D365foClient               │
└──────────────┬─────────────────────────────┬───────────────────────┘
               │                             │
               ▼                             ▼
        ┌─────────────┐           ┌─────────────────────────┐
        │ Redis       │           │ Microsoft D365 FO        │
        │ BullMQ+cache│           │ OData (system of record) │
        └─────────────┘           └─────────────────────────┘
               │
               ▼
        ┌─────────────┐
        │ MongoDB 8   │
        │ batches·MD  │
        └─────────────┘
```

### Structural conventions

| Pattern | Description |
|---------|-------------|
| **Two-package monorepo** | `D365FOMiddleware_Nestbackend` + `dynamics-fo-middleware` — separate `pnpm install` / builds |
| **Feature module per domain** | `src/modules/<domain>/` with `processors/`, `commands/`, `queries/`, controllers |
| **Path aliases** | `@/*` → `src/*` in both packages |
| **API envelope** | Success: `{ status, meta, data }`; errors with `validationErrors`, `requestId` |
| **Batch-centric workflow** | All migrations flow through `DataBatch` documents and status enum |
| **Async posting tier** | `PostToDFO` enqueues typed jobs consumed by queue processors |
| **Master-data sync tier** | Dedicated `master-data-sync-queue` + REST sync triggers |
| **Frontend route colocation** | `routes/dashboard/<module>/batch/-components` for module-specific UI |

### Domain boundaries (finance streams)

| Stream | Backend module | Frontend dashboard |
|--------|----------------|-------------------|
| **Receivables** | `accounts-receivable` | `accounts-receivable` |
| **Payables / vendor** | `vendor` | `vendor`, `accounts-payable` |
| **Cash** | `cash` | `cash-in`, `cash-out`, `cash-management` |
| **Closing / GL** | `closing` | `ledger` |
| **Master data** | `master-data` | *(API-driven; settings admin)* |
| **Platform** | `auth`, `user`, `data-batch`, `settings`, `scheduler`, `excel` | `settings`, login |

---

## Appendix: Repository map

| Path | Role |
|------|------|
| `D365FOMiddleware_Nestbackend/` | NestJS API, processors, D365 integration, queues |
| `dynamics-fo-middleware/` | React operator dashboard |
| `project-mg-supply.md` | Sister portfolio doc (D365 CE / Dataverse + Nest)—different product |

### BullMQ inventory

| Queue | Processor | Strategy (if applicable) |
|-------|-----------|--------------------------|
| `dfo-free-text-invoice-queue` | `post-free-text-invoice-dfo.processor` | `free-text-invoice-posting.strategy` |
| `dfo-vendor-journal-queue` | `post-vendor-journal-dfo.processor` | `vendor-journal-posting.strategy` |
| `dfo-ledger-journal-queue` | `post-ledger-journal-dfo.processor` | `ledger-journal-posting.strategy` |
| `dfo-customer-payment-journal-queue` | `post-customer-payment-journal-dfo.processor` | `customer-payment-journal-posting.strategy` |
| `master-data-sync-queue` | `master-data-sync.processor` | — |

### Mongoose schemas (23)

`user`, `refresh-token`, `data-batch`, `data-source-record`, `data-enhanced-record`, `data-batch-error`, `app-setting`, `ledger-voucher-counter`, `ledger-entry-batch-counter`, `cache-entry`, `vendor`, `customer`, `financial-dimension`, `financial-dimension-value`, `billing-code`, `billing-classification`, `main-account`, `account-customer-invoice-mapping`, `exchange-rate`, `payment-term`, `tax-item-group-heading`, `ledger`, `sync-job`

### Backend documentation (`.docs/`)

`ADDING_NEW_MODULE_OR_PROCESSOR.md`, `BULLMQ_SETUP.md`, `D365FO_CONFIG.md`, `ODATA_QUERY_BUILDER.md`, `ENV_VARIABLES.md`, `DOCKER.md`, `CASH_OUT_POST_TO_DFO_FLOW.md`, processor HTML reports (`VENDOR_PROCESSORS.html`, etc.)

### Related portfolio file (partial, superseded for CV use)

`D365FOMiddleware_Nestbackend/project-d365fo-middleware-nestbackend.md` — earlier backend-only draft **without** sections 14–17; prefer **this root document** for full CV/portfolio structure.

---

## CV keyword block (optional paste)

`Dynamics 365 Finance & Operations` · `D365 FO` · `ICT migration` · `legacy modernization` · `OData` · `NestJS` · `TypeScript` · `CQRS` · `BullMQ` · `Redis` · `MongoDB` · `Excel integration` · `financial dimensions` · `Azure AD` · `React` · `TanStack Router` · `full-stack solo delivery` · `stakeholder requirements` · `accounts receivable` · `accounts payable` · `freight` · `trucking` · `batch processing`

---

*Sections 1–13 follow the portfolio template aligned with `project-mg-supply.md`; sections 14–17 and appendix inventories were cross-checked with repository structure, `AGENTS.md`, and SocratiCode graph stats. **§3 (role)** and **§11 (ICT → DFO time saved)** reflect stakeholder-confirmed delivery context—plug in audited line counts from production batches when available. Re-run `codebase_status` when the SocratiCode embedding index reaches 100% for exhaustive semantic queries.*
