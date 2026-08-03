# TechUniqueIIT Website SEO Audit Report

**Audit Date:** August 3, 2026  
**Project:** TechUniqueIIT Solutions LLP  
**Scope:** Local Next.js frontend + Express/Mongo backend SEO readiness audit  
**Method:** Static source scan, route review, metadata review, asset size scan, and official Google/Next.js documentation cross-check

---

## Executive Summary

The website has a solid public route structure and several key pages already have basic `title` and `description` metadata. However, the current SEO setup is not complete enough for strong search performance.

The biggest gaps are:

1. No canonical URL strategy.
2. Blog detail pages are client-rendered and do not generate server-side SEO metadata.
3. Careers, FAQ, and Privacy pages are missing page-level metadata.
4. No structured data for Organization, LocalBusiness, FAQ, BlogPosting, Product, or breadcrumbs.
5. Several large public images can hurt Core Web Vitals.
6. Admin/dashboard/login routes are not explicitly marked `noindex`.

Overall status: **SEO foundation partially present, but not production-complete.**

---

## Current Verification Snapshot

| Check | Result |
|---|---|
| Public Next.js routes exist | Passed |
| Basic metadata on Home, Services, Products, Blogs, Company, Contact | Partial |
| Metadata on Careers | Missing |
| Metadata on FAQ | Missing |
| Metadata on Privacy | Missing |
| Dynamic blog metadata | Missing |
| `robots.txt` | Implemented |
| `sitemap.xml` | Implemented |
| Canonical URLs | Missing |
| Structured data / JSON-LD | Missing |
| Social Open Graph/Twitter metadata | Default site-wide metadata implemented |
| Large image assets | Present |
| TypeScript check after cleanup | Passed |

---

## High Priority Issues

### SEO-01: Sitemap

**Status:** Implemented  
**Location:** `frontend/src/app/sitemap.ts`

**Why this matters:** Google recommends a sitemap to tell search engines which URLs are important and which URLs are preferred canonicals.

**Implementation:**

Added `frontend/src/app/sitemap.ts` using Next.js Metadata Route API.

Include:

- `/`
- `/services`
- `/products`
- `/blogs`
- `/careers`
- `/company`
- `/company/faq`
- `/company/privacy`
- `/contact`
- Published blog detail URLs from `/api/blogs`

Exclude:

- `/dashboard`
- `/dashboard/*`
- `/login`
- `/api/*`
- draft/private blog URLs

**Remaining implementation notes:**

- `NEXT_PUBLIC_SITE_URL=https://www.techuniqueiit.com` is set in production env.
- Use fully qualified URLs.
- Published blog slugs are fetched server-side with a cache/revalidate strategy.

---

### SEO-02: Robots File

**Status:** Implemented  
**Location:** `frontend/src/app/robots.ts`

**Implementation:**

Added `frontend/src/app/robots.ts` using Next.js Metadata Route API.

Policy:

```txt
User-Agent: *
Allow: /
Disallow: /dashboard
Disallow: /dashboard/
Disallow: /login
Disallow: /api
Disallow: /api/

Sitemap: https://www.techuniqueiit.com/sitemap.xml
Host: https://www.techuniqueiit.com
```

---

### SEO-03: Root Metadata

**Status:** Implemented  
**Location:** `frontend/src/app/layout.tsx`

**Implementation:**

Root metadata now includes:

- Correct brand name: `TechUniqueIIT`
- `metadataBase` using `NEXT_PUBLIC_SITE_URL`, `SITE_URL`, or `https://www.techuniqueiit.com`
- Strong default title and description
- `title.default` and `title.template`
- Site-wide keywords, author, creator, and publisher
- Default Open Graph metadata
- Default Twitter card metadata
- Public indexing defaults for normal pages

Related page-title cleanup:

- Public pages with branded titles were normalized to plain titles such as `Services`, `Blogs`, and `Contact Us` so the root title template does not duplicate the brand.

**Remaining note:**

Canonical URLs are still tracked separately under the canonical strategy item, because adding one global canonical in the root layout could point multiple pages to the wrong URL.

---

### SEO-04: Home Page Metadata Description Is Wrong

**Status:** Needs fix  
**Location:** `frontend/src/app/page.tsx`

Current home description is contact-focused:

```ts
"Get in touch with TechUniqueIIT. We'd love to hear from you..."
```

This does not describe the homepage. It duplicates the contact-page intent.

**Recommendation:**

Use homepage-specific copy, for example:

```txt
TechUniqueIIT Solutions LLP builds custom software, web applications, mobile apps, maintenance solutions, and digital marketing support for growing businesses.
```

Also consider adding Delhi/India context if local search is important.

---

### SEO-05: Blog Detail Pages Do Not Have Server-Side SEO Metadata

**Status:** Major SEO gap  
**Location:** `frontend/src/app/(public)/blogs/[slug]/page.tsx`

Current issue:

- File starts with `'use client'`.
- Blog data is fetched inside `useEffect`.
- No `generateMetadata`.
- No server-rendered title/description for each blog post.
- No canonical per blog.
- No BlogPosting schema.
- Search engines may receive weak initial HTML before blog content loads.

**Recommendation:**

Refactor into:

- Server page: `page.tsx`
- Client UI component: `BlogDetailClient.tsx`
- `generateMetadata({ params })` to fetch blog by slug and return:
  - `title`
  - `description`
  - `alternates.canonical`
  - `openGraph`
  - `twitter`

Also add JSON-LD:

- `BlogPosting`
- author
- datePublished
- dateModified
- image
- headline
- description

---

### SEO-06: Missing Metadata on Careers, FAQ, and Privacy

**Status:** Missing  
**Locations:**

- `frontend/src/app/(public)/careers/page.tsx`
- `frontend/src/app/(public)/company/faq/page.tsx`
- `frontend/src/app/(public)/company/privacy/page.tsx`

**Recommendation:**

Add page-specific metadata.

Suggested intent:

| Page | Suggested title |
|---|---|
| Careers | `Careers | TechUniqueIIT Solutions` |
| FAQ | `FAQ | TechUniqueIIT Solutions` |
| Privacy | `Privacy Policy | TechUniqueIIT Solutions` |

Descriptions should be unique and accurately summarize each page.

---

### SEO-07: Admin and Login Routes Need Explicit Noindex

**Status:** Needs fix  
**Locations:**

- `frontend/src/app/dashboard/*`
- `frontend/src/app/(auth)/login/page.tsx`

Current issue:

- Dashboard and login routes may inherit default metadata.
- They should not appear in search results.

**Recommendation:**

Add `robots: { index: false, follow: false }` to:

- `frontend/src/app/dashboard/layout.tsx`
- `frontend/src/app/(auth)/login/page.tsx` or auth layout

Also disallow these paths in `robots.ts`.

---

## Medium Priority Issues

### SEO-08: No Canonical URL Strategy

**Status:** Missing

Google treats canonical tags, redirects, and sitemap inclusion as canonicalization signals. Current code does not define canonical links through Next metadata.

**Recommendation:**

Add self-referencing canonical URLs for all indexable pages.

Examples:

- `/` -> `https://www.techuniqueiit.com/`
- `/services` -> `https://www.techuniqueiit.com/services`
- `/blogs/[slug]` -> `https://www.techuniqueiit.com/blogs/{slug}`

---

### SEO-09: No Structured Data

**Status:** Missing

Recommended schema:

| Page/Area | Schema type |
|---|---|
| Site-wide | `Organization` |
| Contact/company | `LocalBusiness` or `ProfessionalService` |
| FAQ | `FAQPage` |
| Blogs list/detail | `Blog`, `BlogPosting` |
| Products | `SoftwareApplication` or `Product` |
| Navigation hierarchy | `BreadcrumbList` |

**Recommendation:**

Add JSON-LD through small reusable components. Keep content accurate and avoid adding fake ratings/reviews.

---

### SEO-10: Open Graph and Twitter Metadata Are Not Centralized

**Status:** Missing/incomplete

The site needs share previews for social platforms.

**Recommendation:**

Add a real `og-image` asset and default Open Graph metadata in `layout.tsx`.

Suggested defaults:

- `siteName: TechUniqueIIT Solutions LLP`
- `type: website`
- `locale: en_IN`
- `url: canonical site URL`
- `images: [{ url: '/og-image.jpg', width: 1200, height: 630 }]`

Blog detail pages should override image/title/description dynamically.

---

### SEO-11: Large Public Images May Hurt Core Web Vitals

**Status:** Needs optimization  
**Location:** `frontend/public`

Largest assets found:

| Asset | Approx size |
|---|---:|
| `winter-holidays-people-emotions...jpg` | 10,173 KB |
| `ai/ai-solutions-hero.jpg` | 3,362 KB |
| `careers/careers-4.jpg` | 3,213 KB |
| `digital-marketing-hero/digital-marketing-hero.jpg` | 2,969 KB |
| `about/about-2.jpg` | 2,892 KB |

**Recommendation:**

- Convert large JPGs to optimized WebP/AVIF.
- Keep hero images ideally under 300-500 KB where quality allows.
- Remove unused large images.
- Avoid `unoptimized` on `next/image` unless absolutely required.
- Use accurate `sizes` values for responsive images.

---

### SEO-12: Blog API Fetching Uses Client-Side Anti-Cache Timestamp

**Status:** Needs review  
**Location:** `frontend/src/services/api.ts`

The Axios interceptor appends `_t={timestamp}` to requests. This may be fine for admin freshness, but for public SEO content it prevents effective caching patterns.

**Recommendation:**

For server-rendered public SEO pages, use `fetch` directly with:

- `next: { revalidate: 300 }` for blog lists/details, or
- `cache: 'no-store'` only when freshness is critical

Do not use the browser Axios interceptor for metadata generation or sitemap generation.

---

## Content SEO Opportunities

### SEO-13: Service Pages Are Too Broad for Competitive Keywords

**Status:** Opportunity

Current site has one `/services` page covering many offerings. For SEO, separate focused pages usually perform better.

Recommended future pages:

- `/services/custom-software-development`
- `/services/web-application-development`
- `/services/mobile-app-development`
- `/services/software-maintenance`
- `/services/digital-marketing`
- `/services/seo-services`

Each page should include:

- Unique H1
- Use-case-specific copy
- Process
- Technologies
- FAQs
- CTA
- internal links to related services/products/blogs

---

### SEO-14: Local SEO Can Be Stronger

**Status:** Opportunity

The site mentions South Delhi/India contact details, but local SEO can be improved.

Recommendation:

- Add `LocalBusiness` or `ProfessionalService` schema.
- Keep NAP consistent:
  - Name: TechUniqueIIT Solutions LLP
  - Email: `info@techuniqueiit.com`
  - Phone: `+91 7838758293`
  - Location: South Delhi, India
- Add a Google Business Profile link if available.
- Add map/business address only if it is accurate and intended to be public.

---

### SEO-15: Product Content Has an Existing Content Gap

**Status:** Existing non-SEO content gap with SEO impact

HRMS and SCMS product galleries are still empty. This reduces product-page depth and conversion value.

Recommendation:

- Add real screenshots for HRMS and SCMS, or
- Add a polished no-gallery state and stronger product copy.

---

## Implementation Checklist

### Phase 1: Technical Foundation

1. Add `NEXT_PUBLIC_SITE_URL`.
2. Fix root metadata typo and defaults.
3. Add `frontend/src/app/sitemap.ts`. **Done**
4. Add `frontend/src/app/robots.ts`.
5. Add canonical URLs to all indexable pages.
6. Add `noindex` to `/dashboard/*` and `/login`.

### Phase 2: Page Metadata

1. Fix home metadata description.
2. Add metadata to Careers.
3. Add metadata to FAQ.
4. Add metadata to Privacy.
5. Add Open Graph and Twitter defaults. **Done**

### Phase 3: Blog SEO

1. Refactor blog detail route into server page + client component.
2. Add `generateMetadata` for blog details.
3. Add BlogPosting JSON-LD.
4. Include published blog slugs in sitemap.

### Phase 4: Structured Data

1. Add Organization schema.
2. Add LocalBusiness/ProfessionalService schema.
3. Add FAQPage schema.
4. Add Product/SoftwareApplication schema.
5. Add BreadcrumbList schema.

### Phase 5: Performance and Content

1. Compress large public images.
2. Remove unused large assets.
3. Avoid `unoptimized` on important images where possible.
4. Create focused service landing pages.
5. Add HRMS/SCMS screenshots or better no-gallery UX.

---

## Recommended Priority Order

| Priority | Item | Impact |
|---|---|---|
| P0 | Add canonical metadata + `noindex` handling | Crawl/indexing and duplicate-control foundation |
| P0 | Fix root/home metadata | Brand and snippet quality |
| P0 | Add noindex for dashboard/login | Prevent private/admin pages in search |
| P1 | Refactor blog detail SEO | Blog discoverability and sharing |
| P1 | Add canonical URLs and a dedicated OG image asset | Duplicate control and social previews |
| P1 | Add missing Careers/FAQ/Privacy metadata | Page-level search clarity |
| P2 | Add structured data | Rich result eligibility and entity clarity |
| P2 | Optimize large images | Core Web Vitals |
| P3 | Build service-specific SEO pages | Organic keyword growth |

---

## Official References Used

- Google Search Central SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central Sitemap Guide: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google Search Central Canonical URL Guide: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Next.js `robots.txt` Metadata Route: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js `sitemap.xml` Metadata Route: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js `generateMetadata`: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

---

## Final Status

The site is ready for the next SEO implementation pass, but not yet fully SEO-ready. Sitemap, robots, and root metadata have been implemented. The next implementation pass should focus on canonical metadata and `noindex` handling. After that, blog detail server metadata and structured data should be handled.



