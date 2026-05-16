# 📌 Project Name: MG Supply (Dynamics 365 / Power Platform + NestJS)

> **Document purpose:** Architecture and delivery summary for the **MG Supply v3** workspace (`nest-backend`, `vite-frontend`, `dynamics-plugins`) — structured for **CV, LinkedIn, and portfolio** reuse.  
> **Source of truth for technical detail:** `PROJECT_MEMORY.md`, `nest-backend/docs/APP_DOCUMENTATION-BACKEND.md`, `nest-backend/docs/MG-SUPPLY-ARCHITECTURE-CURRENT-STATE.md`, `vite-frontend/docs/APP_DOCUMENTATION-FRONTEND.md`, `vite-frontend/docs/MODULE-FRONTEND-AI-HANDBOOKS-INDEX.md`, `dynamics-plugins/README.md`, `vite-frontend/docs/MODULES.md`.  
> **Last verified with SocratiCode:** index green (8,291 chunks); code graph 1,690 TypeScript/C# files, 0 circular dependency chains.
> **Business metrics (Section 11):** Not stored in code—values below use **placeholders** or **order-of-magnitude estimates**; replace with audited figures from operations/finance.

### Portfolio elevator pitch (copy-ready)

End-to-end **procurement & inventory platform** on **Microsoft Dynamics 365 / Dataverse**, extended with a **NestJS 11** orchestration API, **TypeScript** model-driven web resources, **C#** platform plugins, **Redis** caching/queues, and **React** satellite views/PDFs — covering PR → RFQ → PO → receiving, multi-level approvals, and warehouse stock operations across **multi-company / multi-BU** scope.

---

## 1. Business Context

- **What was the business problem?**  
  Centralize and digitize **procurement and inventory operations** (purchase requests, RFQ/quotation cycles, purchase orders, stock adjustments/transfers, approvals) on **Microsoft Dynamics 365 / Dataverse** so that workflows are consistent, auditable, and integrated rather than split across email and spreadsheets.

- **Which department / company was this built for?**  
  **MG Supply** domain (purchasing, stock, approvals)—implemented as a **Dataverse-first** solution with a custom **NestJS** REST tier and **model-driven** UI extensions. *(Exact legal entity / BU naming is an organizational detail—confirm with product owner.)*

- **What was broken or inefficient before this system?**  
  Without this stack, typical failure modes are: **unclear approval chains**, **manual PR → RFQ → PO handoffs**, **weak traceability** between quotation scope and purchase requests, and **heavy reliance on ad hoc communication** instead of system-enforced status and plugins.

- **Why was this project critical?**  
  Dataverse is the **system of record**; the Nest API adds **typed workflows, queues, caching, and validation**; web resources and plugins enforce rules **at the UI and platform layer**. Together they reduce operational risk and support scale as transaction volume and company complexity grow.

---

## 2. Scope & Scale

| Dimension | Value / notes |
|-----------|----------------|
| **Users** | *[Stakeholder input]* — e.g. named procurement, warehouse, and approver roles across MG Supply; **not** encoded as a fixed count in this repo. |
| **Entities / tables in Dataverse (documented in frontend module docs)** | **38** domain entities listed in `vite-frontend/docs/MODULES.md` TOC (e.g. Purchase Request, Quotation Request, Purchase Order, Stock Adjustment, Stock Transfer, Warehouse, API Ticket, Approval Step, approval MOA entities, reference data such as currency, supplier, item variation). |
| **Data volume (records)** | *[Not in repository]* — depends on production Dataverse org history; **estimate only with analytics export.** |
| **Environments (Dev / Test / Prod)** | *[Typical for this architecture]* at least **DEV + PROD** for Dynamics solutions and Nest deployment; exact count is **environment-specific** (confirm ALM setup). |
| **Multi-company / multi–business unit** | **Yes (by design)** — domain includes **company-scoped behavior**, **business units**, teams, warehouses, and approval routing (see modules such as Purchase Request, Warehouse, Approval MOA / Approval Step in docs). Exact BU matrix is organizational data. |
| **Codebase scale (SocratiCode + repo)** | **3** deployable packages · **~1,690** indexed source files (mostly TypeScript) · **~40** `DataverseService` entity subclasses · **24** `@CommandHandler` workflows · **21** Nest modules in `AppModule` · **14** `window.MGSupply` namespaces · **14** React views + **2** PDF templates · **4** websources · **3** C# plugins · **14** frontend + **6** backend co-located AI handbooks |

---

## 3. Your Role

- **Main developer or team?** *[Fill in—repository does not state headcount or RACI.]*
- **Architecture vs implementation?** The codebase reflects a deliberate split: **Dataverse** for data and security, **NestJS** for orchestration and heavy validation, **Vite bundle** for **Xrm** integration—whether you **owned** that split should be stated by you.
- **Decisions you owned** *[Examples to claim if accurate]*: plugin registration order for associate/disassociate; ticket auth model; which workflows run via **BullMQ** vs synchronous API; cache TTL tiers; form command surface exposed on `window.MGSupply`.

---

## 4. Solution Architecture

### Overall architecture

- **Clients:** Dynamics 365 **model-driven app** loads **web resource bundle** `mg-supply-v3-bundle.js` exposing **`window.MGSupply`** (form onLoad/onSave/onChange, commands, subgrids). Additional **React** views / PDF / websource builds exist in the same monorepo.
- **API tier:** **NestJS 11** REST API (`Dynamics MG Supply` API v3.0 in Swagger) — CQRS handlers, global envelope `{ status, meta, data }`, validation pipe, CORS, Helmet, compression, optional Swagger outside production.
- **Platform:** **Microsoft Dataverse** — OData/Web API; **Azure AD** app credentials for server and browser-authenticated calls (see backend `azure.config` and frontend Dataverse client).
- **Async / infra:** **Redis** for **BullMQ** queues and **multi-layer cache** (L1 memory + L2 Keyv/Redis).

### Power Apps type

- **Model-driven:** Primary surface—**JavaScript/TypeScript web resources** wired to Xrm (`@types/xrm`), not a standalone canvas-first replacement app.
- **Canvas:** *[Not described as primary in repo docs]* — if used for satellite scenarios, document separately.

### Dataverse design (high level)

- **Core tables (examples):** `mesco_purchaserequest`, `mesco_quotationrequest`, `mesco_purchaseorder`, `mesco_purchaseorderitem`, `mesco_toberequesteditem`, `mesco_tobepurchaseditem`, `mesco_stockadjustment`, `mesco_stocktransfer`, `mesco_warehouse`, `mesco_apiticket`, approval-related entities (`ApprovalStep`, `ApprovalMOA`, rules), stock and receiving entities, master data (supplier, item variation, VAT, etc.). Full field/relationship detail: **`vite-frontend/docs/MODULES.md`**.
- **Relationships:** Documented per entity in `MODULES.md` (lookups, many-to-one). PR ↔ Quotation association is central to **plugin** behavior (see below).

### Backend (non-Dynamics)

- **`AppModule` imports (runtime API)** — verified in `nest-backend/src/app.module.ts`: `LoggerModule`, `CacheModule`, `QueueModule`, `AuthModule`, `DownloadModule`, `UserModule`, `SchedularModule`, `UtilsModule`, `PurchaseOrderModule`, `PurchaseOrderItemModule`, `PurchaseRequestModule`, `ServerErrorLogModule`, `InterWarehouseTransferModule`, `StockAdjustmentModule`, `StockTransferModule`, `ApprovalStepModule`, `ItemVariationModule`, `QuotationRequestModule`, `QuotationItemModule`, `EmailModule`, `ReceiveditemModule`.
- **Additional generated modules** (schemas/services, often no HTTP controller): `api-ticket`, `approval-moa`, `warehouse`, `supplier`, `to-be-purchased-item`, `stock-gl`, `inspected-item`, etc. — see `nest-backend/docs/MG-SUPPLY-ARCHITECTURE-CURRENT-STATE.md` §2–3.
- **Patterns:** CQRS commands/handlers, **three** BullMQ queues (`workflow-parallel`, `workflow-sequential`, `update-record-auto-number`), `DataverseService` generic repository, `IWorkflowExecutor` + **registry** in processors, action **base services** + **factory** routing for approvals, metadata/codegen pipeline.

### REST API surface (NestJS v3.0)

| Area | Endpoints (prefix + `/api` per deployment) |
|------|---------------------------------------------|
| **Purchase Request** | `POST …/release`, `recall`, `retry`, `confirm-pricing`; `PATCH …/ordered-total-price` |
| **Purchase Order** | `POST …/generate`, `release`, `recall`, `retry` (role-guarded: procurement / admin ribbon) |
| **Quotation** | `POST …/quotation-request/generate`; `POST …/quotation-item/requester-technical-confirmation` |
| **Approval Step** | `POST …/approve`, `reject`, `return` |
| **Stock** | `POST …/stock-adjustment/post`, `cancel`, `resync`; `POST …/stock-transfer/post`, `cancel` |
| **Inter-warehouse / receiving** | `POST …/inter-warehouse-transfer/post`, `cancel`; `POST …/received-item/post`, `cancel` |
| **Email & utilities** | `POST …/email/purchase-request`; `POST …/utils/format-number` (API key, public route) |
| **Platform** | `GET …/user/me`; `PUT …/item-variation/bulk`; `GET …/downloads/files`; `GET …/scheduler/health`; manual cleanup triggers (API key) |

Swagger: `/docs` (non-production). Global envelope `{ status, meta, data }`; errors logged to **Server Error Log** entity in production via `GlobalExceptionFilter` (`x-request-id` support).

### Integration

- **External systems:** **Microsoft Graph** (e.g. delegated mail for **send RFQ** flows per frontend docs). Other ERP/finance integrations—**document if deployed** (not specified globally in the excerpts reviewed).

### Authentication

- **API:** `Authorization: Ticket <ticketId>` backed by **API Ticket** entity in Dataverse; optional **`X-API-Key`** for admin/automation (`ADMIN_API_KEY`).
- **Dataverse (browser):** Azure AD–authenticated **Dataverse Web API** via shared client layer.
- **Dev:** `VITE_DEV_AUTH_TICKET` for local testing (frontend).

---

## 5. Power Platform Implementation

### Canvas apps

- Not the primary documented delivery path; **model-driven + web resources** are.

### Model-driven app customizations

- **Web resource bundle** registers **14** namespaces on `window.MGSupply`: `PurchaseRequest`, `ToBePurchasedItem`, `ToBeRequestedItem`, `PurchaseOrder`, `PurchaseOrderItem`, `ApprovalStep`, `ApprovalMOA`, `StockAdjustment`, `StockTransfer`, `InterWarehouseTransfer`, `Receiveditem`, `Warehouse`, `QuotationRequest`, `QuotationItem` (see `vite-frontend/src/index.ts` and `APP_DOCUMENTATION-FRONTEND.md`).
- **UX:** Form locking, subgrid filters, VAT behavior on PO, approval actions, stock post/cancel, warehouse type-driven UI, quotation PDF / send RFQ entry points.

### Business process flows

- *[Confirm in Dynamics solution]* — approval progression is implemented in domain entities and services (**Approval Step**, **Approval MOA**); whether classic **BPF** records are used alongside should be verified in the exported solution.

### Power Automate

- *[Not detailed in the repo docs reviewed]* — list cloud/scheduled flows if any (e.g. notifications). Backend uses **BullMQ** for async work instead of or in addition to cloud flows.

### Plugins (C#)

| Plugin | Behavior |
|--------|-----------|
| **Purchase Request Association Guard** | **PreOperation Associate** — blocks invalid **Purchase Request ↔ Quotation Request** associations by PR status. |
| **Quotation Request Scope Hash** | **PostOperation** Associate/Disassociate — recalculates **`mesco_prscopehash`** when associations change. |
| **Reusable Delete Guard** | **PreOperation Delete** — blocks delete unless status is in configured allow-list (`statusField`, `allowedStatuses`). |

**Language:** **C#** (.NET Framework **net462** assemblies, sandbox, database deployment per README).

---

## 6. Advanced Dynamics Usage

| Area | Implementation notes |
|------|----------------------|
| **Security roles & business units** | **Security Role** entity appears in generated docs; frontend has **security-roles** view handbook; enforcement is **Dataverse-native** plus ticket **Roles** payload on API tickets. |
| **Ownership model** | Standard **Owner / BU / Team** fields on entities (see API Ticket and others in `MODULES.md`). |
| **Approval workflows** | **Approval Step** module (approve / return / reject); **Approval MOA** / rules entities for routing—document **levels** (fixed vs dynamic) from functional spec. |
| **Ribbon / command bar** | **Form commands** exposed through **`window.MGSupply`** registration (not a separate RibbonXml summary in the snippets read). |
| **Web resources** | **TypeScript** compiled to **IIFE** bundle; uses **React** for some views/PDF flows **outside** the core IIFE entry pattern. |
| **PCF** | *[Not identified in the documentation excerpts]* — add if used. |

---

## 7. Key Features Built (concrete)

- **Purchase Request lifecycle:** Release / recall / retry / clone / confirm pricing; **quotation generation** from main grid; email notifications via backend **EmailModule**.
- **Quotation / RFQ:** Plugin-guarded PR↔quotation associations; **scope hash** on quotation requests; **send RFQ** React view with **Microsoft Graph** mail; quotation PDF template (`@react-pdf/renderer`).
- **Purchase Order:** Backend `generate` / `release` / `recall` / `retry` (parallel queue; PO also supports approve/reject/return executors in registry); frontend VAT, order command, PDF template; generate-PO and order-PO React views.
- **PR confirm pricing:** `POST /purchase-request/confirm-pricing` + Excel-driven frontend view (`confirm-pricing`).
- **Approval execution:** **Approval Step** + **Approval MOA** — form lock/subgrid rules; approve / return / reject via API; **`ApprovalStepRegardingFactory`** bridges approval steps to **Purchase Request** queue jobs (extend factory for additional regarding types as needed).
- **Item variation:** `PUT /item-variation/bulk` for bulk maintenance from tooling.
- **Stock operations:** **Stock adjustment**, **stock transfer**, **inter-warehouse transfer** — post/cancel, item-variation and warehouse sync, unique placement validation (`STOCK-ADJUSTMENT-UNIQUE-PLACEMENT-VALIDATION.md`).
- **Receiving:** **Received item** post/cancel with PO/PO-item linkage and quantity rollups.
- **Technical confirmation:** Dedicated React views for technical submit, confirmation, and quotation technical status.
- **Bulk & admin UX:** TBRI bulk import, confirm-pricing Excel flows, security-roles view, ribbon **websources** for enable rules and approval checks.
- **Cross-cutting:** API ticket warmup + 401 retry; BullMQ workflow queues; L1/L2/L3 cache; persisted **server error log** entity.

---

## 8. Technical Challenges

| Challenge | How the codebase addresses it |
|-----------|-------------------------------|
| **Split authority: UI vs server vs platform** | Clear contract: **Nest** owns workflow authority for many mutations; **plugins** enforce association/delete invariants; **frontend** does UX validation and direct Dataverse reads/writes where appropriate. |
| **Token/ticket lifecycle in embedded browser** | **TicketManager** with deduped fetch, optional `window.top` cache, **401 → invalidate → retry** on Axios. |
| **Consistency of PR–quotation links** | **Pre associate guard** + **post hash** update sequence documented in `dynamics-plugins/README.md`. |
| **Scale / latency to Dataverse** | **Redis cache layers**, **BullMQ** offload for heavy paths, OData query discipline via shared services. |
| **Observability in embedded + API tier** | `x-request-id` on errors; production-only **Server Error Log** persistence; scheduler retention for tickets (weekend job) and error logs (30-day daily cleanup). |
| **Role-based automation** | `RolesGuard` + `@RequireRoles` on sensitive endpoints (procurement generate/release, technical confirmation). |
| **Dynamics limitations** | *[Add yours]* — e.g. sandbox plugin timeouts, rollup complexity, client-side vs server-side boundary. |

---

## 9. Performance & Optimization

- **Observed issues:** *[Production metrics not in repo]*.
- **Applied patterns:**
  - **Caching:** L1 in-memory + L2 Redis (`cacheable` / Keyv); L1/L2/L3 TTL env knobs (`CACHE_L1_TTL`, etc.).
  - **Queues (BullMQ on Redis):**
    - **`workflow-parallel-queue`** — concurrency **10** — PO/PR/quotation generate & release, PR approve/reject/return/recall, received-item post/cancel, etc.
    - **`workflow-sequential-queue`** — concurrency **1** — stock adjustment/transfer, inter-warehouse transfer, received-item (serialized stock paths), PR confirm-pricing job.
    - **`update-record-auto-number-queue`** — background auto-number patches (`format-number` API).
  - **Scheduler (`@nestjs/schedule`):** API ticket cleanup (weekend UTC); server error log cleanup (daily midnight, 30-day retention); opt-in via `SCHEDULER_ENABLED`.
  - **UI:** Ticket warmup on load; minimize redundant API calls via ticket cache; Dataverse service abstraction for batch/query patterns.
  - **API:** Compression + Helmet + `bot-block` middleware; global validation pipe; `sanitize-html` where HTML is accepted.

---

## 10. DevOps & Deployment

| Topic | Current documented practice |
|-------|-----------------------------|
| **CI/CD** | *[Define your pipeline]* — repo includes **Vite** builds (`vite.config.bundle.ts`, `build-views.ts`, PDF/websource scripts), **Nest** `pnpm run build` / `start:prod`, `nest-backend/deploy-prod.sh`, and **Docker Compose** (`docker-compose.yml`, `docker-compose.production.yml`); Dynamics **plugin DLLs** built in Visual Studio Release. |
| **Solution import/export** | Standard **Dynamics solution** packaging for web resources + plugin steps; plugin README lists **registration order**. |
| **Environment management** | Separate **Azure/Dataverse URLs** and **API base URL** per environment (frontend `ApiService.BASE_URL`, backend env vars). |
| **Versioning** | API **v3.0** in Swagger; app/version tags—align with git/release tags as per your process. |

---

## 11. Impact (MANDATORY NUMBERS)

**Replace the table below with measured KPIs.** Illustrative example row shows required *shape* only—not validated data.

| Metric | Value | How measured |
|--------|-------|----------------|
| Time saved (hours/month) | **[TBD]** | Before/after task timing or workflow analytics |
| Manual work reduced (%) | **[TBD]** | Sampling or ticket volume comparison |
| Errors / rework reduced (%) | **[TBD]** | Post-go-live defect or reversal counts |
| Users impacted (active) | **[TBD]** | Entra ID / Dynamics usage report |
| Business outcome | **[TBD]** | e.g. spend under management, cycle time PR→PO, audit pass rate |

**Order-of-magnitude illustration (not from this repo):** a regional procurement rollout might cite **50–200** active users and **10–30%** cycle-time improvement—**do not use without validation.**

---

## 12. Reusable Assets

- **Shared Nest infrastructure:** `DataverseService`, `BaseWorkflowQueueProcessor`, global interceptors/filters, CQRS scaffolding, cache module, queue module.
- **Shared frontend:** `ApiService`, `DataverseService` (browser), `Xrm*` helpers, `TicketManager`, `LockFieldsService`, module pattern under `src/modules`.
- **Plugins:** Reusable **delete-by-status** plugin with **unsecure config** string pattern.
- **Generated artifacts:** Entity/schema docs (`MODULES.md`, `CONSTANTS.md`) from codegen pipeline.
- **Living architecture docs:** `nest-backend/docs/MG-SUPPLY-ARCHITECTURE-CURRENT-STATE.md` (as-built API/queue/module map); **14** `*-FRONTEND-AI-HANDBOOK.md` + **6** `*-BACKEND-FOR-AI.md` beside workflow code.

---

## 13. What You Would Improve

*[Candidate prompts aligned with this codebase—edit to your opinion]*

- **Tighten ALM:** Single documented pipeline for **web resource** + **Nest** + **plugin DLL** versions per release.
- **Observability:** Correlation IDs from API through to Dataverse/plugin traces for support.
- **Power Automate vs queues:** Explicit decision matrix for what must be cloud-flow vs BullMQ for operations visibility.
- **PCF / UX:** Where iframe/React islands multiply, consider **standardized shell** and bundle splitting strategy for load time.
- **Test coverage:** Expand Jest coverage for CQRS handlers and critical validation services (stock placement, association rules).

---

## 14. Skills & Competencies Demonstrated

Use this section as a **skills matrix** for CVs—tick or reword bullets to match what you personally delivered.

### Microsoft Power Platform & Dynamics 365

- Model-driven app customization (form scripts, commands, subgrids, enable rules)
- Dataverse entity modeling, relationships, security roles, business units, teams
- Plugin development (Pre/Post Operation, Associate/Disassociate, configurable unsecure config)
- Solution ALM concepts (web resources, plugin registration order, sandbox isolation)
- OData / Web API consumption from TypeScript and server-side clients

### Backend & integration

- REST API design with OpenAPI/Swagger and consistent response envelopes
- Server-to-Dataverse integration with Azure AD client credentials
- Background job orchestration (BullMQ on Redis)
- Multi-layer caching strategies (in-memory + Redis / Keyv)
- Custom authentication (ticket entity + API key) aligned with platform security

### Frontend & UX

- TypeScript form scripting against **Xrm** (`@types/xrm`)
- Embedded React 17 islands inside Dynamics (views, dialogs, PDF generation)
- API client design (Axios interceptors, ticket lifecycle, envelope parsing)
- Direct browser Dataverse access (MSAL / Azure AD) alongside Nest API calls
- Design-system-oriented UI (Tailwind v4, Radix, shadcn-style components)

### Software engineering

- Monorepo delivery across three runtimes (Node, browser bundle, .NET Framework plugins)
- Metadata-driven code generation (schemas, DTOs, enums, docs)
- Domain-driven module boundaries (feature folders, handbook docs per workflow)
- Docker-based deployment for Nest API (dev + production compose files)
- Role-based API guards and scheduled housekeeping jobs

---

## 15. Technologies & Tools

| Layer | Technologies |
|-------|----------------|
| **Platform** | Microsoft Dynamics 365, Dataverse, model-driven apps, Azure AD |
| **Backend API** | NestJS 11, TypeScript 5.7, Express, Node.js |
| **API docs & validation** | `@nestjs/swagger`, `class-validator`, `class-transformer`, Joi (`@nestjs/config`) |
| **Architecture libs** | `@nestjs/cqrs`, `@nestjs/bullmq`, `bullmq`, `@nestjs/schedule`, `@nestjs/cache-manager` |
| **HTTP & security** | Axios, Helmet, compression, global guards/filters/interceptors |
| **Cache & queues** | Redis, `cacheable`, Keyv, `@keyv/redis` |
| **Frontend build** | Vite 8, TypeScript 5.8, ESLint 9, Prettier |
| **UI (satellite views)** | React 17, Tailwind CSS 4, Radix UI, Lucide, `@react-pdf/renderer`, Sonner |
| **Dynamics client** | `@types/xrm`, MSAL browser (`@azure/msal-browser`), custom `DataverseService` |
| **Plugins** | C# / .NET Framework 4.6.2, strong-name signed assemblies, sandbox plugins |
| **Tooling** | pnpm, tsx, Jest (backend scaffold), Visual Studio 2022 (plugins), Docker Compose |
| **Integrations** | Microsoft Graph (email / RFQ flows), Excel generation/import (`xlsx`) |
| **Hardening** | `sanitize-html`, Helmet, bot-block middleware, `RolesGuard` |

---

## 16. Design Patterns

Patterns evidenced in the codebase (good talking points for interviews and CV bullets).

| Pattern | Where it appears | Why it matters |
|---------|------------------|----------------|
| **CQRS** | `@CommandHandler` + `CommandBus` per workflow action (release, post, approve, etc.) | Keeps HTTP thin; isolates business commands; scales to queue execution |
| **Generic repository** | Abstract `DataverseService<TModel, TCreate, TUpdate, TSchema>` | One OData/query/mapper stack for ~40 entities; reduces duplication |
| **Template method** | `*ActionBaseService` classes (e.g. `PurchaseRequestActionBaseService`, `StockAdjustmentPostService` hierarchy) | Shared validate → prepare → execute → persist steps for post/cancel flows |
| **Factory** | `ApprovalStepRegardingFactory`, `WorkflowExecutorFactory` | Routes approval/stock/PR actions by entity type without giant switch statements in controllers |
| **Registry + executor interface** | `WorkflowEntityActionRegistry`, `IWorkflowExecutor`, `ProcessService` | Maps entity + action → workflow service; wraps execute lifecycle in queue processors |
| **Role guard** | `RolesGuard` + `@RequireRoles` on procurement/PO/quotation endpoints | Server-side authorization beyond Dataverse form security |
| **Singleton (module scope)** | `ApiService`, `TicketManager`, `DataverseService` instances on frontend | Stable HTTP clients and ticket cache across form events |
| **Guard / decorator auth** | `AuthGuard`, `ApiKeyGuard`, `@PublicRoute()`, `@RequireApiKey()` | Secure-by-default API; explicit opt-out for health/swagger |
| **Interceptor + filter** | Global response envelope; global exception filter | Predictable API contract for the web bundle and React views |
| **DTO + validation** | `class-validator` on commands/DTOs; Joi on env config | Fail-fast at boundary; typed config per environment |
| **Code generation** | `metadata.ts` → schemas, DTOs, enums, `MODULES.md` / `CONSTANTS.md` | Keeps TypeScript aligned with Dataverse metadata drift |
| **Plugin + config string** | Reusable delete guard (`statusField;allowedStatuses`) | Platform-level invariants without redeploying all entities |
| **Dual-channel data access** | Browser `DataverseService` + Nest `DataverseService` | UX responsiveness (direct reads) vs authoritative workflows (API + queues) |

---

## 17. Architecture & Structural Patterns

### System topology

```text
┌─────────────────────────────────────────────────────────────────┐
│  Dynamics 365 model-driven app (users)                          │
│  ├─ Form scripts / commands  ← mg-supply-v3-bundle.js (IIFE)  │
│  ├─ React views / PDFs / websources (iframe / web resources)    │
│  └─ Dataverse Web API (browser, Azure AD)                       │
└───────────────┬─────────────────────────────┬───────────────────┘
                │ Ticket + REST               │ OData (reads/writes)
                ▼                             ▼
┌───────────────────────────┐     ┌─────────────────────────────┐
│  NestJS API (orchestration)│     │  Microsoft Dataverse         │
│  CQRS · BullMQ · Cache     │────▶│  System of record · security │
└───────────────┬───────────┘     └──────────────▲──────────────┘
                │                                 │
                │ Redis                           │ Plugins (C#)
                ▼                                 │ Pre/Post invariants
         ┌─────────────┐                          │
         │   Redis     │                          │
         │ cache+queue │                          │
         └─────────────┘                          │
```

### Structural conventions

| Pattern | Description |
|---------|-------------|
| **Monorepo, independent packages** | `nest-backend`, `vite-frontend`, `dynamics-plugins` — separate `pnpm install` / VS build; no npm workspaces |
| **Feature module per domain** | `src/modules/<entity>/` with `schema/`, `dto/`, `enums/`, `services/`, optional `handlers/`, `commands/`, `*-BACKEND-FOR-AI.md` |
| **Three-layer authority** | **Plugins** = hard platform rules; **Nest API** = workflow authority + queues; **Frontend** = UX validation + selective direct Dataverse |
| **API envelope** | All success responses: `{ status, meta, data }`; errors normalized globally |
| **Async workflow tier** | Heavy mutations enqueued to **sequential** or **parallel** BullMQ processors (post stock, release PR, approve step, etc.) |
| **Multi-tier cache** | L1 memory + L2 Redis with configurable TTL tiers (L1/L2/L3) for hot Dataverse reads |
| **Build artifact split** | One **IIFE bundle** for forms; separate **view** / **PDF** / **websource** Vite targets; React externalized on views, bundled on PDFs |
| **Path aliases** | `@/*` → `src/*` in both Node packages for consistent imports |
| **Handbook documentation** | Per-workflow `*-BACKEND-FOR-AI.md` / `*-FRONTEND-AI-HANDBOOK.md` beside code for maintainability |

### Domain boundaries (procurement → stock)

| Stream | Primary entities / modules |
|--------|---------------------------|
| **Demand** | Purchase Request, To Be Requested Item, To Be Purchased Item |
| **Sourcing** | Quotation Request, Quotation Item, supplier RFQ / technical confirmation views |
| **Ordering** | Purchase Order, Purchase Order Item, VAT, PDF templates |
| **Approval** | Approval MOA, Approval MOA Rule, Approval Step |
| **Inventory** | Stock Adjustment, Stock Transfer, Inter-Warehouse Transfer, Warehouse, Warehouse Stock, Stock GL |
| **Receiving** | Received Item, Inspected Item, Returned Item |
| **Auxiliary inventory** | Stock Issue, Stock GL, To Be Issued Item |
| **Master / coding** | Item Coding Request, Item Variation, Supplier, VAT Class, reference geo/org data |
| **Platform** | API Ticket, User, Security Role, Server Error Log |

---

## Appendix: Repository map

| Path | Role |
|------|------|
| `nest-backend/` | NestJS API over Dataverse |
| `vite-frontend/` | Web resources, React views, PDFs, Dataverse codegen |
| `dynamics-plugins/` | C# Dataverse plugins (.NET 4.6.2, sandbox) |

### React views & PDFs (portfolio inventory)

| View / artifact | Purpose |
|-----------------|--------|
| `send-quotation-requests` | Send RFQ (Graph mail integration) |
| `generate-quotations` | Bulk quotation generation UI |
| `technical-submit` / `technical-confirmation` / `quotation-technical-status-summary` | Technical approval cycle |
| `confirm-pricing` | PR pricing confirmation (Excel template flows) |
| `generate-po` / `order-purchase-orders` | PO generation and ordering |
| `approval-step-approve` | Approval step action UI |
| `bulk-import-to-be-requested-items` | TBRI bulk import |
| `security-roles` | Security role reference UI |
| `pdf/quotation-template`, `pdf/po-template` | Standalone PDF renders |
| `email-template`, `erd`, `pr-ordered-total-price` | Supporting utilities |

### Websources (ribbon / grid rules)

`ribbon-rules`, `check-current-approvals-for-approval-step`, `grid-selected-rows-match-statuses`, `check-user-security-roles`

### Co-located AI / handbook documentation

**Backend (`*-BACKEND-FOR-AI.md`):** purchase-request, approval-step, stock-adjustment, stock-transfer, inter-warehouse-transfer, quotation-request.

**Frontend (`*-FRONTEND-AI-HANDBOOK.md`):** purchase-request, to-be-requested-item, to-be-purchased-item, purchase-order, purchase-order-item, quotation-request, approval-step, approval-moa, stock-adjustment, stock-transfer, inter-warehouse-transfer, warehouse, api-ticket, security-roles (view). Index: `vite-frontend/docs/MODULE-FRONTEND-AI-HANDBOOKS-INDEX.md`.

**Cross-cutting rules:** `docs/STOCK-ADJUSTMENT-UNIQUE-PLACEMENT-VALIDATION.md`, `docs/API-RESPONSE-AND-ERRORS.md`.

---

## CV keyword block (optional paste)

`Dynamics 365` · `Dataverse` · `Power Platform` · `model-driven apps` · `NestJS` · `TypeScript` · `CQRS` · `BullMQ` · `Redis` · `OData` · `Azure AD` · `Microsoft Graph` · `Xrm form scripts` · `web resources` · `Dataverse plugins` · `C#` · `React` · `Vite` · `procurement` · `inventory` · `approval workflows` · `RFQ` · `purchase order` · `warehouse management`

---

*Sections 1–13 follow the portfolio template; sections 14–17 and appendix inventories were cross-checked with SocratiCode semantic search and `nest-backend/docs/MG-SUPPLY-ARCHITECTURE-CURRENT-STATE.md`. Business quantities (Section 11) and personal role statements (Section 3) require your input.*
