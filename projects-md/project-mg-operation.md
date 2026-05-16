# 📌 Project Name: MG Operation (Dynamics 365 Logistics + NestJS)

> **Document purpose:** Architecture and delivery summary for the **MG Operation** workspace (`mg-operation`, `mg-operation-backend`) — structured for **CV, LinkedIn, and portfolio** reuse.  
> **Source of truth for technical detail:** `mg-operation/WARP.md`, `mg-operation-backend/docs/ai/APP_DOCUMENTATION.md`, `mg-operation-backend/docs/ai/WARP.md`, `mg-operation/HOUSE_CONTAINER_RELATIONSHIP_CHANGES.md`, `mg-operation/package.json` (v2.0.2), `mg-operation-backend/src/app.module.ts`.  
> **Last verified with SocratiCode:** index green (**4,121** chunks); code graph **1,228** TypeScript files, **970** edges, **4** circular dependency chains (localized to cost-line view hooks).  
> **Business metrics (Section 11):** Not stored in code—use placeholders or replace with audited operations/finance figures.

### Portfolio elevator pitch (copy-ready)

End-to-end **freight-forwarding & logistics operations** on **Microsoft Dynamics 365 / Dataverse**, extended with a **NestJS 11** integration API, a shared **TypeScript Dataverse/XRM client library** (browser + server), **React** model-driven web resources, **25+ shipping/finance PDF templates**, and **D365 Finance & Operations** connectors — covering quotation → operation, cost/sales grids, invoicing, payment requests, settlements, and compliance documents (B/L, manifests, air waybills, release letters).

---

## 1. Business Context

- **What was the business problem?**  
  Operations, finance, and documentation for **freight forwarding and logistics** (sea/air, containers, houses/BLs, tariffs, customer and vendor invoicing) needed to run inside **Microsoft Dynamics 365** with **rich UI** (grids, wizards, PDF outputs) beyond standard model-driven forms—without fragmenting data across spreadsheets and disconnected tools.

- **Which department / company was this built for?**  
  **MG Operation** domain (logistics operations, commercial finance, documentation) on **Dynamics 365 Customer Engagement** (org references include **CRM4 Europe** patterns in code). *(Exact legal entity / BU naming is organizational—confirm with product owner.)*

- **What was broken or inefficient before this system?**  
  Typical failure modes: **manual quotation → operation handoffs**, **re-keying cost/sales lines** into invoices and payment requests, **offline Word/PDF templates** for B/L and transport paperwork, and **weak traceability** between operational records and finance postings.

- **Why was this project critical?**  
  Dataverse remains the **system of record**; the **Nest API** adds orchestration, ERP integration, and machine-to-machine auth; the **React + form-bundle layer** delivers specialized UX and **print-ready documents** tied to the same operation/house/cargo entities.

---

## 2. Scope & Scale

| Dimension | Value / notes |
|-----------|----------------|
| **Users** | *[Stakeholder input]* — ops, finance, documentation, and sales users on model-driven apps; count not fixed in repo. |
| **Entities / tables (typed in frontend `src/modules`)** | **41** entity modules with `model/` definitions (Operation, House, Cargo, Container, TariffQuote, OperationCustomerInvoice, VendorInvoice, OperationPaymentRequest, etc.). |
| **Data volume (records)** | *[Not in repository]* — depends on production Dataverse org history. |
| **Environments (Dev / Test / Prod)** | *[Typical]* Dev + UAT + Prod for Dynamics solutions and Nest (`docker-compose.yml`, `docker-compose.production.yml`, `deploy-prod.sh`, live compose `mg-ops-v1-prod`). |
| **Multi-company / multi–business unit** | **Yes (by design)** — Branch, Agent, Warehouse, finance dimensions (`ServiceFinanceDimension`, `FinanceDimensionValue`), multi-currency invoice flows; D365 F&O modules use **`dataAreaId`**. |
| **Codebase scale (SocratiCode + repo)** | **2** deployable packages · **1,269** indexed files (**1,228** TS in graph) · **4,121** semantic chunks · **41** frontend entity modules · **~39** `DataverseModel` subclasses · **10** `DataverseService` subclasses · **14** React HTML views · **25** PDF builds · **13** `window.MGOperation` namespaces · **22** Nest controllers · **17** `AppModule` feature imports · hub view: `OperationCostAndSalesGrids` (**34** graph connections) |

---

## 3. Your Role

- **Main developer or team?** **Primary owner** of the shared **Dataverse/XRM client library**, **PDF template suite**, and **backend foundation**; collaborated on domain modules and React views across the wider team *(adjust if team size differs)*.

- **Architecture vs implementation?** **Both** — defined the **dual-runtime library pattern** (`DataverseModel` in browser, `DataverseService` on Nest), established **backend module layout** (auth, dataverse core, features, D365 F&O facades), and implemented **document generation** and **integration endpoints**.

- **Decisions and deliverables you owned:**
  - **Dataverse/XRM “fill” library** — Type-safe OData layer: `QueryBuilder`, `ApiRoutesBuilder`, `MapperService`, CRUD, **associate/disassociate**, bulk/batch deletes, relationship expands, and Dynamics batch error parsing (`DataverseModel.ts` / `dataverse.service.ts` + satellite services).
  - **PDF templates** — **25** `@react-pdf/renderer` builds under `src/views/pdf/*` (air/sea master & house packs, B/L, manifests, release letters, payment request, claims, IMO, etc.) with shared `_components` / `_hooks` / `_data` structure and `build-pdfs.ts` pipeline.
  - **Backend structure** — Created and evolved **`mg-operation-backend`**: NestJS 11 app shell, `DataverseService` mirror of frontend patterns, auth (API ticket + client-credentials JWT + Prisma API clients), cache/queue modules, **Features** integration API, and **D365 F&O** integration modules.
  - **Frontend library parity** — Same conceptual API on the bundle (`mgs_op` / `window.MGOperation`) so form scripts and views reuse identical Dataverse access patterns.

---

## 4. Solution Architecture

### Overall architecture

- **Clients:** Dynamics 365 **model-driven app** loads **`mgs_op` IIFE bundle** exposing **`window.MGOperation`** (form onLoad/onSave/onChange, commands). **14** standalone **HTML web resources** from `build-views.ts` and **25** PDF web resources from `build-pdfs.ts`.
- **API tier:** **NestJS 11** REST API — global prefix (e.g. `/api/v1`), Swagger at `/docs`, unified response envelope, Joi-validated config.
- **Platform:** **Microsoft Dataverse** — OData Web API; **Azure AD** app credentials for server; interactive session for browser.
- **ERP:** **D365 Finance & Operations** via **`Dfo365Module`** — customers, vendors, free-text invoices, vendor invoices, payment requests (header/line facades).
- **External compliance:** **Nafeza** ACID verification (`POST …/features/nafeza-acid-validation`).
- **Async / infra:** **Redis** + **BullMQ** for background jobs (e.g. quotation numbering, operation creation from quotation); **Prisma/Postgres** for API client credentials and admin concerns.

### Power Apps type

- **Model-driven:** Primary surface — **TypeScript web resources** wired to **Xrm** (`@types/xrm`), not a canvas-first app.
- **Canvas:** *[Not evidenced as primary in this repo]*.

### Dataverse design (high level)

- **Core tables (examples):** `mesco_operation`, `mesco_house`, `mesco_cargo`, `mesco_container`, `mesco_tariffquote` (and related quote lines), `mesco_operationcustomerinvoice`, `mesco_customerinvoiceline`, `mesco_vendorinvoice`, `mesco_operationpaymentrequest`, `mesco_paymentrequestitem`, `mesco_shipmentdatamodificationrequest`, `mesco_apiticket`, reference data (Branch, Warehouse, ShippingLine, AirLine, VesselsMIS, VatClass, incoterm, …).
- **Relationships:** **N:N House ↔ Container** with explicit associate/disassociate services (`HOUSE_CONTAINER_RELATIONSHIP_CHANGES.md`, `AddContainerToHouseService`); standard lookups for operation-centric financial and cargo lines.

### Backend (`mg-operation-backend`)

**`AppModule` imports:** `AuthModule`, `CacheModule`, `QueueModule`, `UserModule`, `AccountModule`, `SchedularModule`, `UtilsModule`, `Dfo365Module`, `FreeTextInvoiceModule`, `CustomerDfoModule`, `VendorDfoModule`, `VendorInvoiceModule`, `PaymentRequestModule`, `FeaturesModule`, `LeadModule`, `TariffQuoteModule`, `OperationModule`, `LogViewerModule`, `ClientCredentialsModule`, `PrismaModule`, `LoggingModule`.

| Area | Endpoints (representative) |
|------|----------------------------|
| **Features** (`/api/v1/features/*`) | `GET global-search`, `POST nafeza-acid-validation`, `POST account-activity`, `POST generate-quotation-number`, `POST create-operation-from-quotation`, `POST recreate-quotation-numbers` |
| **User** | `GET /user/me` (ticket auth; rejects machine JWT) |
| **D365 F&O** | `free-text-invoice`, `vendor-invoice`, `payment-request`, `customer-dfo`, `vendor-dfo` — create/update header+lines, list/filter by `dataAreaId` |
| **CRM entities** | `operation`, `tariff-quote`, `account`, `lead`, `quote-sales-line`, `quote-cost-line`, `auto-number` |
| **Auth** | `POST /auth/client-token`; admin `POST /admin/api-clients` (API key) |
| **Admin / ops** | `GET /admin/logs/*`; embedded log UI at `/logs` |

### Integration

- **D365 Finance & Operations:** OData/custom services through **`Dfo365Module`** facades.
- **Nafeza:** Egyptian import/export **ACID** validation from operation forms and Features API.
- **Custom CRM actions:** e.g. **`xollsp_CRM4LSPCloneTariffQuote`** (clone quote + lines) — org solution plugins/actions, invoked from legacy JS patterns where still deployed.

### Authentication

- **API:** `Authorization: Ticket <ticketId>` backed by **`mesco_apiticket`** in Dataverse; **`Authorization: Bearer <jwt>`** for client-credentials integrations (Prisma-stored clients); **`X-API-Key`** for admin routes.
- **Dataverse (browser):** Azure AD–authenticated session via Xrm / optional token generation on `DataverseModel`.
- **Ticket warmup:** `TicketManager.warmup()` on bundle load (frontend).

---

## 5. Power Platform Implementation

### Model-driven app customizations

- **Web resource bundle** registers **13** namespaces on `window.MGOperation`: `ContainerNumbers`, `HouseBL`, `Quotation`, `CustomerInvoice`, `CustomerInvoiceLine`, `Operation`, `Cargos`, `ShipmentDataModificationRequest`, `Container`, `Account`, `PaymentRequest`, `Quotesalesline`, `Quotecostline`, `PaymentRequestItem` (`mg-operation/src/index.ts`).
- **UX:** Form locking/validation, ACID verify, quotation→operation, invoice type/VAT/currency behavior, cargo dimension/weight calculations, container–house linking, payment request PDF export, cost-line → vendor invoice / payment request entry points.

### Business process flows

- *[Confirm in Dynamics solution]* — financial and ops progression may use BPFs alongside custom entities; **not enumerated in Git**.

### Power Automate

- *[Not in repository]* — backend **BullMQ** handles selected async workflows (quotation numbering, operation creation).

### Plugins (C#)

- **Not in this repo** — platform plugins/custom actions live in the **managed Dynamics solution**; this codebase consumes their outcomes via Web API and custom action URLs.

---

## 6. Advanced Dynamics Usage

| Area | Implementation notes |
|------|----------------------|
| **Security roles & business units** | `UserService` reads roles from Xrm; global search can scope by **BusinessUnitId**. |
| **Ownership model** | Standard Owner / BU / Team on Dataverse entities. |
| **Approval / financial controls** | Invoice approval buttons, settlements, payment requests — UI-driven with backend F&O posting. |
| **Ribbon / command bar** | Form commands via **`window.MGOperation`** registration. |
| **Web resources** | **TypeScript IIFE bundle** + **single-file HTML views** (`vite-plugin-singlefile`) + **PDF builds**. |
| **PCF** | *[Not identified]* — customization is **HTML web resources + form bundle**. |

---

## 7. Key Features Built (concrete)

- **Quotation → Operation** — `ConvertQuoteToOperation` view; backend `POST …/features/create-operation-from-quotation` (queued).
- **Operation cost & sales hub** — `OperationCostAndSalesGrids`: sales lines, cost lines, customer/vendor invoices, payment requests, settlement dialogs.
- **Customer invoicing** — `CreateCustomerInvoice`, charges view, credit notes, PDF export from forms.
- **Vendor & payment flows** — `CreateVendorInvoiceFromCostLines`, `CreatePaymentRequestFromCostLines`, F&O sync modules.
- **Settlements** — `CreateInvoiceSettlement`, `CreateDirectSettlement`.
- **Containers & cargo** — `OperationContainers`, house–container N:N management, cargo weight/CBM logic.
- **Search** — `OperationAdvancedSearch`, `GlobalAccountLeadSearch` (+ backend global search API).
- **Compliance** — ACID verification (Nafeza); shipment data modification requests.
- **PDF suite (25 templates)** — Air Waybill, Air Cargo Manifest, Manifest, House B/L (+ data-only variant), Master/House air & sea document packs, Release Letter (+ Euro), Delivery Order/Receipt, Payment Request, Claims (AR/EN), Credit Note, IMO list/report, Agreement, Amendment Letter, Proof of Delivery, Shipment Notification, Release Order.
- **Metadata pipeline** — `pnpm generate` (`src/metadata.ts`) for TypeScript from Dataverse definitions.
- **Cross-cutting** — API ticket manager, batch OData error handling, Arabic amount wording (`tafgeet-arabic`) in PDFs.

---

## 8. Technical Challenges

| Challenge | How the codebase addresses it |
|-----------|-------------------------------|
| **Dual runtime, one Dataverse contract** | Shared patterns: query builder, mapper, URL builder, associate/disassociate — **frontend `DataverseModel`** and **backend `DataverseService`**. |
| **House–container N:N integrity** | Change detection, validation by transport/load type, explicit disassociate-before-associate (`HOUSE_CONTAINER_RELATIONSHIP_CHANGES.md`). |
| **Heavy grids & financial submission** | Decomposed React hooks per view; F&O header-then-lines create with chunked line bulk post. |
| **PDF fidelity (incl. Arabic)** | Per-template `_components` / `arabicHelper`; isolated Vite PDF config. |
| **Auth for humans vs integrations** | Ticket auth for users; JWT client-credentials for services; API key for admin. |
| **Multi-system truth** | Dataverse for ops CRM data; D365 F&O for finance postings — Nest facades coordinate both. |
| **Localized hook cycles** | SocratiCode reports **4** circular import chains in `CreatePaymentRequestFromCostLines` / `CreateVendorInvoiceFromCostLines` hooks only — does not affect bundle entry or `DataverseModel` core. |

---

## 9. Performance & Optimization

- **OData:** Typed `$select` / `$expand` / `$filter` via **QueryBuilder**; pagination via `@odata.nextLink`.
- **Build split:** Separate **bundle**, **view**, and **pdf** Vite configs to keep web resource payloads small.
- **Backend:** Redis cache module; BullMQ with retry/backoff on feature jobs; chunked bulk posts to F&O (e.g. 20 lines per chunk).
- **UI:** Ticket warmup; view-level state in hooks rather than monolithic app shell.
- **Measured production metrics:** *[Not in repo]* — profile `OperationCostAndSalesGrids` and PDF generation paths first.

---

## 10. DevOps & Deployment

| Topic | Current practice |
|-------|------------------|
| **CI/CD** | *[Define your pipeline]* — `pnpm build` (views + bundle + optional PDFs), Nest `pnpm run build` / `start:prod`, `deploy-prod.sh`, Docker Compose dev/prod, SSH scripts for live stack (`docker:live:*`). |
| **Solution import/export** | Dynamics **managed solution** for web resources; backend deployed as **Docker** service (`OperationBackend` / `mg-ops-v1-prod`). |
| **Environment management** | `.env.development` / `.env.production`; parameterize org URLs (some hooks still reference fixed CRM host — see Section 13). |
| **Versioning** | Frontend **v2.0.2** (`package.json`); align API and solution versions per release. |

---

## 11. Impact (MANDATORY NUMBERS)

**Replace with measured KPIs.** Illustrative shape only—not validated.

| Metric | Value | How measured |
|--------|-------|----------------|
| Time saved (hours/month) | **[TBD]** | Task timing before/after on doc generation & invoice flows |
| Manual work reduced (%) | **[TBD]** | Sampled process audit (quote→operation, invoicing) |
| Errors / rework reduced (%) | **[TBD]** | Reversal counts, support tickets |
| Users impacted (active) | **[TBD]** | Dynamics usage / Entra reports |
| Business outcome | **[TBD]** | Cycle time quote→invoice, document turnaround, audit readiness |

**Order-of-magnitude illustration (not from repo):** regional freight forwarders often cite **50–200** active ops/finance users and **20–35%** reduction in document prep time after web-resource automation—**validate before use**.

---

## 12. Reusable Assets

- **Shared Dataverse client library** — `DataverseModel` (browser) / `DataverseService` (Nest): CRUD, bulk, relationships, OData query stack.
- **Xrm services** — `LoadingService`, `NotificationService`, `NavigationService`, `ExecutionService`, `UserService`, `TicketManager`.
- **UI kit** — Radix/shadcn-style components (`src/components/ui`), PDF viewer helpers.
- **PDF framework** — Template folder convention (`_components`, `_hooks`, `_data`, `_utils`), `build-pdfs.ts` module discovery.
- **Nest template** — Auth guards, global filter/interceptor, cache, queue, metadata generation, Swagger setup.
- **Documentation** — `HOUSE_CONTAINER_RELATIONSHIP_CHANGES.md`, backend `docs/ai/*`, view-level `DOCUMENTATION.md` where present.

---

## 13. What You Would Improve

- **Environment-parameterize** hardcoded CRM base URLs in hooks and PDF data loaders.
- **Unify MG Supply / MG Operation library** into a publishable internal package to avoid dual maintenance of `DataverseModel` / `DataverseService`.
- **Break view-hook cycles** — refactor the **4** SocratiCode circular chains in payment/vendor-invoice cost-line hooks (extract shared state or submission orchestration).
- **Expand automated tests** — financial submission paths, associate/disassociate edge cases, F&O facade integration tests.
- **Document plugins & flows** in-repo alongside web resources for full ALM narrative.
- **Measured KPIs** — replace Section 11 placeholders with operations analytics.

---

## 14. Skills & Competencies Demonstrated

Use as a **skills matrix** for CVs—emphasize bullets you personally delivered.

### Microsoft Power Platform & Dynamics 365

- Model-driven customization (form scripts, commands, subgrids)
- Dataverse entity modeling, relationships, N:N associate/disassociate
- OData / Web API from TypeScript (browser and server)
- Solution ALM concepts (web resources, managed solutions)
- Custom action consumption (quotation clone patterns)

### Backend & integration

- REST API design with OpenAPI/Swagger and global exception handling
- Server-to-Dataverse integration (Azure AD client credentials)
- **D365 Finance & Operations** OData/service facades (customer, vendor, invoices, payments)
- Background jobs (**BullMQ** on Redis)
- Multi-auth: API tickets, client-credentials JWT, API keys
- **Prisma** for operational/admin data (API clients)

### Frontend & UX

- **Xrm** form scripting (`@types/xrm`, `window.MGOperation`)
- Embedded **React 17** HTML web resources and PDF generation
- Multi-target **Vite** builds (dev, bundle, view, pdf)
- Financial grids, wizards, and settlement dialogs
- Arabic document localization (`tafgeet-arabic`)

### Software engineering

- **Dual-package** delivery (browser + Node) with **mirrored domain library**
- Metadata-driven TypeScript generation (`metadata.ts`)
- Feature-module boundaries (`src/modules/<entity>/`)
- Docker-based API deployment
- Domain documentation for complex relationship logic

---

## 15. Technologies & Tools

| Layer | Technologies |
|-------|----------------|
| **Platform** | Microsoft Dynamics 365 CE, Dataverse, model-driven apps, Azure AD / Entra ID |
| **Backend API** | NestJS 11, TypeScript 5.7, Express, Node.js |
| **API docs & validation** | `@nestjs/swagger`, `class-validator`, `class-transformer`, Joi (`@nestjs/config`) |
| **Architecture libs** | `@nestjs/cqrs`, `@nestjs/bullmq`, `bullmq`, `@nestjs/schedule`, `@nestjs/cache-manager`, `@nestjs/jwt` |
| **Data (admin)** | Prisma 6, PostgreSQL *(API clients / secrets)* |
| **HTTP & security** | Axios, Helmet, compression, global guards/filters, bcrypt (client secrets) |
| **Cache & queues** | Redis, `cacheable`, Keyv, `@keyv/redis` |
| **Logging** | `nestjs-pino`, Pino HTTP |
| **Frontend build** | Vite 6, TypeScript 5.8, ESLint 9, Prettier |
| **UI** | React 17, Tailwind CSS 4, Radix UI, Lucide, `cmdk`, `vite-plugin-singlefile` |
| **PDF** | `@react-pdf/renderer`, `pdfjs-dist`, `tafgeet-arabic` |
| **Dynamics client** | `@types/xrm`, custom `DataverseModel` + `QueryBuilder` |
| **ERP** | D365 F&O via `Dfo365Module` |
| **Integrations** | Nafeza (ACID), Excel (`xlsx`) in tooling/views |
| **Tooling** | pnpm, tsx, Jest (backend), Docker Compose, SSH deploy scripts |

---

## 16. Design Patterns

| Pattern | Where it appears | Why it matters |
|---------|------------------|----------------|
| **Generic repository** | `DataverseModel` / `DataverseService<TModel, TCreate, TUpdate, TSchema>` | One OData stack per entity; eliminates duplicated Web API code |
| **Query builder** | `QueryBuilder` (front), `DataverseQueryBuilderService` (back) | Type-safe `$filter`, `$expand`, `$select`, paging |
| **Mapper / formatter** | `MapperService`, `DataverseMapperService`, `QueryFormatter` | Consistent API ↔ app model transforms |
| **Facade** | `FreeTextInvoiceService`, `FeaturesService` | Coordinates header/line services or multi-entity workflows |
| **Singleton (HTTP)** | `AxiosService` / `DataverseAxiosService.getInstance()` | Shared authenticated client |
| **Module-per-entity** | `src/modules/<Entity>/` with `model/`, `schema/`, `services/` | Clear domain boundaries |
| **Form script registry** | `window.MGOperation` tree in `index.ts` | Discoverable Xrm event wiring |
| **Build-target separation** | `vite.config.bundle.ts`, `.view.ts`, `.pdf.ts` | Right-sized artifacts per deployment type |
| **Template method (PDF)** | `_hooks` + `_data` per document type | Reuse layout/data loading across 25 templates |
| **Guard / decorator auth** | `AuthGuard`, `ApiKeyGuard`, `@PublicRoute()`, client JWT | Secure-by-default API |
| **Queue offload** | `QueueService` + `FEATURE_QUEUE_JOBS` | Resilient quotation/operation generation |
| **DTO + validation** | `class-validator` on Features/DFO DTOs | Fail-fast at API boundary |
| **Dual-channel access** | Browser Dataverse + Nest API | UX responsiveness vs integration/ERP authority |

---

## 17. Architecture & Structural Patterns

### System topology

```text
┌──────────────────────────────────────────────────────────────────────┐
│  Dynamics 365 model-driven app (users)                               │
│  ├─ Form scripts / commands  ← mgs_op bundle (window.MGOperation)  │
│  ├─ React HTML views (14) + PDF web resources (25)                 │
│  └─ Dataverse Web API (browser session)                              │
└───────────────┬──────────────────────────────┬───────────────────────┘
                │ Ticket / REST                  │ OData (reads/writes)
                ▼                                ▼
┌────────────────────────────┐     ┌─────────────────────────────────┐
│  NestJS API (mg-operation- │     │  Microsoft Dataverse             │
│  backend)                  │────▶│  System of record · security     │
│  Features · F&O · CRM      │     └─────────────────────────────────┘
└───────────────┬────────────┘
                │
     ┌──────────┴──────────┐
     ▼                     ▼
┌─────────┐         ┌──────────────────┐
│  Redis  │         │ D365 F&O + Nafeza │
│ cache/  │         │ (finance / ACID) │
│ queue   │         └──────────────────┘
└─────────┘
```

### Structural conventions

| Pattern | Description |
|---------|-------------|
| **Two-package monorepo** | `mg-operation` (UI) + `mg-operation-backend` (API) — separate `pnpm install`, shared library design |
| **Mirrored Dataverse library** | Same CRUD/relationship semantics in browser and Nest |
| **Four Vite targets** | `dev`, `bundle`, `view`, `pdf` |
| **PDF module convention** | `src/views/pdf/<Name>/index.tsx` + `_components`, `_hooks`, `_data` |
| **View module convention** | `src/views/<ViewName>/index.tsx` → single-file HTML output |
| **Feature module (Nest)** | `controller` + `service` extending `DataverseService` or DFO facade |
| **Path aliases** | `@/*` → `src/*` in both packages |
| **Legacy Features routes** | `/features/*` under global prefix for integration-heavy endpoints |

### Domain boundaries (logistics → finance)

| Stream | Primary entities / modules |
|--------|---------------------------|
| **Commercial** | TariffQuote, Quotesalesline, Quotecostline, Operation |
| **Execution** | House, Cargo, Container, ContainerNo, ShipmentDataModificationRequest |
| **Customer revenue** | OperationCustomerInvoice, CustomerInvoiceLine, credit/settlement views |
| **Vendor spend** | VendorInvoice, VendorInvoiceLine, OperationPaymentRequest, PaymentRequestItem |
| **Master data** | Branch, Warehouse, Agent, ShippingLine, AirLine, VesselsMIS, VatClass, incoterm |
| **Finance alignment** | ServiceFinanceDimension, FinanceDimensionValue; DFO customer/vendor/invoice modules |
| **Platform** | APITicket, Account, AsyncOperation |

---

## Appendix: Repository map

| Path | Role |
|------|------|
| `mg-operation/` | Vite/React web resources, form bundle, PDFs, `DataverseModel` |
| `mg-operation-backend/` | NestJS API, `DataverseService`, D365 F&O, Features, auth |

### React views (portfolio inventory)

| View | Purpose |
|------|---------|
| `ConvertQuoteToOperation` | Quote → operation conversion |
| `OperationCostAndSalesGrids` | Cost/sales/invoice/payment hub |
| `CreateCustomerInvoice` | Customer invoice wizard |
| `CreateVendorInvoiceFromCostLines` | Vendor invoice from costs |
| `CreatePaymentRequestFromCostLines` | Payment request from costs |
| `CreateInvoiceSettlement` / `CreateDirectSettlement` | Settlement flows |
| `CreateCreditNote` | Credit note creation |
| `CustomerInvoiceCharge` | Optional invoice charges |
| `OperationContainers` | Container/house/cargo UI |
| `OperationAdvancedSearch` | Operation search |
| `GlobalAccountLeadSearch` | Account/lead search |
| `HouseBLReportView` | House B/L reporting |
| `OperationHeaderSummary` | Operation header summary |

### PDF templates (25)

`Agreement`, `AirCargoManifest`, `AirDeliveryOrder`, `AirWaybill`, `AmendmentLetter`, `ClaimsStatement`, `ClaimsStatementEn`, `CreditNoteInvoice`, `DeliveryOrder`, `DeliveryReceipt`, `HouseAirDocuments`, `HouseBL`, `HouseBLDataOnly`, `HouseSeaDocuments`, `ImoList`, `ImoReport`, `Manifest`, `MasterAirDocuments`, `MasterSeaDocuments`, `PaymentRequest`, `ProofOfDelivery`, `ReleaseLetter`, `ReleaseLetterEuro`, `ReleaseOrder`, `ShipmentNotification`

### `window.MGOperation` namespaces

`ContainerNumbers`, `HouseBL`, `Quotation`, `CustomerInvoice`, `CustomerInvoiceLine`, `Operation`, `Cargos`, `ShipmentDataModificationRequest`, `Container`, `Account`, `PaymentRequest`, `Quotesalesline`, `Quotecostline`, `PaymentRequestItem`

---

## CV keyword block (optional paste)

`Dynamics 365` · `Dataverse` · `Power Platform` · `model-driven apps` · `NestJS` · `TypeScript` · `D365 Finance & Operations` · `OData` · `Azure AD` · `Xrm form scripts` · `web resources` · `React` · `Vite` · `@react-pdf/renderer` · `freight forwarding` · `logistics` · `bill of lading` · `air waybill` · `invoicing` · `payment request` · `BullMQ` · `Redis` · `Prisma`

---

*Sections 1–13 follow the portfolio template aligned with `project-mg-supply.md`. Sections 14–17 and appendix inventories were cross-checked with SocratiCode full index (4,121 chunks), code graph stats (1,228 TS files, 970 edges, 4 circular chains), and semantic search on `DataverseModel`, `DataverseService`, Features API, and PDF build pipeline. Section 3 reflects stated ownership of the Dataverse library, PDF suite, and backend foundation. Business quantities (Section 11) require stakeholder validation.*
