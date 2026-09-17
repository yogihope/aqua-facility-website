# Aqua Facility Services — Corporate Website

Implementation of the **Aqua Website Revamp Development Specification v1**.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma · MySQL

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

The site runs immediately, **with or without a database**. Content is authored
in `src/content/`, seeded into MySQL, and read back through `src/lib/data.ts`.
If MySQL is unreachable, that layer falls back to the same authored content and
logs one warning — so local setup and database incidents never blank the site.

## Connecting MySQL

1. **Install MySQL 8** (any of these works):
   - MySQL Community Server — https://dev.mysql.com/downloads/mysql/
   - XAMPP / Laragon (bundles MySQL + a GUI)
   - `docker run --name aqua-mysql -e MYSQL_ROOT_PASSWORD=secret -p 3306:3306 -d mysql:8`

2. **Create the database:**

   ```sql
   CREATE DATABASE aqua_web CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Point `.env` at it:**

   ```env
   DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/aqua_web"
   ```

4. **Create the tables and load the content:**

   ```bash
   npm run db:setup     # prisma migrate dev --name init && prisma db seed
   ```

   Then `npm run dev` and the site is reading from MySQL. `npm run db:studio`
   opens Prisma Studio to browse and edit rows.

### Database scripts

| Script | Does |
| --- | --- |
| `npm run db:setup` | Migrate + seed in one step (first-time setup) |
| `npm run db:migrate` | Create/apply a migration after a schema change |
| `npm run db:push` | Push schema without a migration (prototyping only) |
| `npm run db:seed` | Re-run the seed (idempotent — upserts, never duplicates) |
| `npm run db:studio` | Prisma Studio GUI |
| `npm run db:generate` | Regenerate the Prisma client |

## Project structure

```
prisma/
  schema.prisma        CMS data model — mirrors Section 10 of the spec
  seed.ts              Loads src/content into MySQL (idempotent upserts)
src/
  content/             Authored content: services, industries, group, projects,
                       careers, insights, technology, redirects, site settings
  lib/
    data.ts            Prisma reads with authored-content fallback
    seo.ts             Canonicals, OpenGraph, JSON-LD (Organization, Service,
                       BreadcrumbList, Article, JobPosting)
    leadSchema.ts      Shared zod schema — runs on client and server
  components/
    navigation/        Sticky header + mega menu, footer
    sections/          Home and inner-page sections
    forms/             Proposal, contact and application forms
    visual/            Hero operational-ecosystem canvas
    ui/                Design-system primitives
  app/                 Routes (App Router)
  proxy.ts             Canonical trailing-slash enforcement
```

## Editing content

Everything on the site is data. To change copy, edit the matching file in
`src/content/` and re-run `npm run db:seed`. To change it in the database only,
use `npm run db:studio`.

| Content | File | Table |
| --- | --- | --- |
| Company details, contacts, CTAs | `site.ts` | `SiteSettings` |
| Six capability pillars | `services.ts` | `Service` |
| Thirteen sectors | `industries.ts` | `Industry` |
| Group companies | `group.ts` | `GroupCompany` |
| Case studies | `projects.ts` | `CaseStudy` |
| Technology modules | `technology.ts` | `TechCapability` |
| Job openings | `careers.ts` | `Job` |
| Leadership + chairman's message | `leadership.ts` | `Leadership` |
| Awards & recognition | `awards.ts` | `Award` |
| Articles | `insights.ts` | `Insight` |
| Legacy URL map | `redirects.ts` | `Redirect` |

Form submissions land in `Lead` and `JobApplication`.

## How the spec's content-safety rule is enforced

> *"If a fact is not verified, remove the claim rather than filling the space
> with an estimate."* — Section 18

This is enforced in the UI, not just in review:

- **Group entities** without a confirmed legal name (Aspigo, Aqua Corporation,
  Nairuti, Aqua Shield, the Foundation) render a *Pending verification* badge
  and a governance note instead of an unconfirmed claim.
- **Case-study metrics** ship with `verified: false`, so the outcome table shows
  the metric label with a pending marker — never a number.
- **Client names** are gated behind `clientApproved`; until then the card shows
  the anonymised descriptor and an unapproved name never reaches the DOM.
- **The ISO claim** in the home trust strip carries a *Standard to be confirmed*
  marker until the certificate is supplied.
- **Technology modules** carry `live` / `in-rollout` / `planned` status, and the
  UI labels anything that is not live (Section 6.17).
- **Leadership** publishes on management-confirmed names and roles. A leader
  without a headshot renders a monogram plate at the same 4:5 ratio, so setting
  `photoUrl` later swaps the photograph in without moving the layout.
- **Awards** carry `verified`, and every citation field (title, edition, issuer,
  endorsement, date, venue) is transcribed from the certificate rather than
  summarised. `/awards` 404s rather than rendering an empty shell if nothing is
  verified.
- **Certifications and the PAN-India map** are built but held in an
  "awaiting assets" state.
- **The corporate PIN code** is empty rather than guessed, and `cityLine()`
  omits it everywhere until it is supplied.

Flip the corresponding flag in the CMS once management supplies documentation
and the content publishes itself.

## Before go-live

Tracked against Section 18 of the spec:

- [x] Contact details in `src/content/site.ts` (address, PIN, phone, US
      office), carried over from the legacy site.
- [ ] Supply leadership headshots. Drop them into `public/leadership/` and set
      `photoUrl` in `src/content/leadership.ts`.
- [ ] Drop the brand team's SVG masters into `src/components/ui/Logo.tsx`
      (the mark is currently rebuilt as inline SVG).
- [ ] Confirm legal entity names and licence details for the five pending group
      companies, then set `legalNameVerified: true`.
- [ ] Supply verified case-study facts, client permissions and outcome metrics.
- [ ] Add documentary photography — panels in `Repositioning.tsx`, industry and
      case-study cards are sized to be swapped one-for-one.
- [ ] Confirm technology module statuses.
- [ ] Wire CRM push + internal notification in `app/api/leads/route.ts`.
- [ ] Add CAPTCHA/Turnstile verification to both form routes.
- [ ] Enable secure file upload (whitelist, size limit, malware scan) for
      tender/RFP documents and CVs.
- [ ] Add GA4/GTM. Event names and parameters are already emitted to
      `window.dataLayer`; `data-analytics` attributes mark CTA elements.
- [ ] Run a full crawl and extend `src/content/redirects.ts` beyond the
      Appendix A seed list.
- [ ] Legal review of `/privacy-policy` and `/terms`.
- [ ] Promote `Content-Security-Policy-Report-Only` to enforcing in
      `next.config.ts` once asset sources are final.
- [ ] Set `NEXT_PUBLIC_ENV=staging` on the staging deploy — it flips the site to
      `noindex` and disallows all crawling.

## URL structure

Canonical URLs carry a trailing slash, matching Section 3.1. Legacy URLs from
Appendix A resolve in a **single 301 hop** — `next.config.ts` handles the legacy
map and `src/proxy.ts` handles canonical normalisation, in that order, because
Next's built-in normalisation would otherwise create a two-hop chain.

```
/sevices/mechanized-housekeeping/  →  301  →  /services/integrated-facility-management/
```

## Accessibility and motion

Targets WCAG 2.2 AA. Labels are always visible, errors render inline plus a
form-level summary, focus states use brand-safe contrast, and touch targets
clear 44px. `prefers-reduced-motion` disables scroll pinning, parallax, the
marquee and the hero canvas animation.

## Environment variables

```env
DATABASE_URL="mysql://user:password@localhost:3306/aqua_web"
NEXT_PUBLIC_SITE_URL="https://aquafacility.com"
NEXT_PUBLIC_ENV="development"   # "staging" forces noindex
```
