# TechUniqueIIT Website SEO Audit Report

**Audit Date:** August 3, 2026
**Project:** TechUniqueIIT Solutions LLP
**Scope:** Local Next.js frontend + Express/Mongo backend SEO readiness audit
**Method:** Static source scan, route review, metadata review, asset size scan, and official Google/Next.js documentation cross-check

---

## Executive Summary

The website has a solid public route structure and several key pages already have basic `title` and `description` metadata. However, the current SEO setup is not complete enough for strong search performance.

The biggest gaps are:

1. Service-specific SEO landing pages are still needed for competitive keywords.
2. Real HRMS and SCMS screenshots can still be added when available.

Overall status: **SEO technical foundation implemented for current priority items; content expansion remains.**

---

## Current Verification Snapshot

| Check | Result |
|---|---|
| Public Next.js routes exist | Passed |
| Basic metadata on Home, Services, Products, Blogs, Company, Contact | Implemented |
| Metadata on Careers | Implemented |
| Metadata on FAQ | Implemented |
| Metadata on Privacy | Implemented |
| Dynamic blog metadata | Implemented |
| `robots.txt` | Implemented |
| `sitemap.xml` | Implemented |
| Canonical URLs | Implemented for current indexable routes |
| Structured data / JSON-LD | Implemented for current priority schemas |
| Social Open Graph/Twitter metadata | Implemented with dedicated Open Graph image route |
| Large image assets | Optimized and verified |
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

### SEO-04: Home Page Metadata

**Status:** Implemented
**Location:** `frontend/src/app/page.tsx`

**Implementation:**

Homepage metadata now uses page-specific SEO copy instead of contact-page text.

Updated metadata includes:

- Absolute homepage title: `TechUniqueIIT Solutions LLP | Custom Software, Mobile Apps & Digital Marketing`
- Homepage-specific description for software, web apps, mobile apps, maintenance, and digital marketing
- Matching Open Graph title/description
- Matching Twitter title/description

---

### SEO-05: Blog Detail Server Metadata

**Status:** Implemented
**Location:** `frontend/src/app/(public)/blogs/[slug]/page.tsx`

**Implementation:**

Blog detail SEO has been moved from client-only loading to a server-rendered route with a client display component.

Updated files:

- `frontend/src/app/(public)/blogs/[slug]/page.tsx`
- `frontend/src/app/(public)/blogs/[slug]/BlogDetailClient.tsx`

Implemented:

- Server-side blog fetch by slug
- `generateMetadata({ params })` for dynamic blog title and description
- Per-blog canonical URL through `alternates.canonical`
- Per-blog Open Graph article metadata
- Per-blog Twitter large image metadata
- `BlogPosting` JSON-LD in the server-rendered HTML
- `notFound()` handling with `noindex` metadata for missing blogs
- React `cache()` memoization so metadata and page render share the same fetch result during a request

---

### SEO-06: Careers, FAQ, and Privacy Metadata

**Status:** Implemented
**Locations:**

- `frontend/src/app/(public)/careers/page.tsx`
- `frontend/src/app/(public)/company/faq/page.tsx`
- `frontend/src/app/(public)/company/privacy/page.tsx`

**Implementation:**

Added page-specific metadata for each page:

- `title`
- unique `description`
- self-referencing canonical URL through `alternates.canonical`
- Open Graph title, description, and URL
- Twitter title and description

---

### SEO-09: Structured Data

**Status:** Implemented

Implemented JSON-LD coverage:

| Page/Area | Schema type |
|---|---|
| Site-wide | `Organization` |
| Site-wide business profile | `ProfessionalService` |
| FAQ | `FAQPage` |
| Blog detail | `BlogPosting` |
| Products | `ItemList` with `SoftwareApplication` items |
| Navigation hierarchy | `BreadcrumbList` on current public indexable routes |

Updated files:

- `frontend/src/components/SEO/JsonLd.tsx`
- `frontend/src/app/layout.tsx`
- `frontend/src/app/(public)/products/page.tsx`
- `frontend/src/app/(public)/company/faq/page.tsx`
- `frontend/src/app/(public)/blogs/[slug]/page.tsx`
- Current public static pages for breadcrumb JSON-LD

Notes:

- Fake ratings, review counts, prices, and addresses were not added.
- `ProfessionalService` is used for the business profile with public contact details and South Delhi/India location context.
- JSON-LD serialization escapes `<` to protect script output when dynamic blog data is used.

---
### SEO-10: Open Graph and Twitter Metadata

**Status:** Implemented

Implemented:

- Added `frontend/src/app/opengraph-image.tsx`.
- Generates a 1200x630 PNG Open Graph image using Next.js `ImageResponse`.
- Root Open Graph metadata now uses `/opengraph-image` with explicit `width: 1200` and `height: 630`.
- Root Twitter metadata now uses `/opengraph-image` with `summary_large_image`.
- Blog detail pages still override title, description, and image dynamically when a blog has its own featured image.

Build verification shows `/opengraph-image` is generated as an app route.

---

### SEO-11: Large Public Images May Hurt Core Web Vitals

**Status:** Implemented
**Location:** `frontend/public`, public blog/product/service image components

**Implementation:**

Optimized the current large public image set and removed unused heavy assets.

Used image assets now reduced to:

| Asset | Previous approx size | Current size | Current dimensions |
|---|---:|---:|---:|
| `ai/ai-solutions-hero.jpg` | 3,362 KB | 96.6 KB | 1600x1067 |
| `digital-marketing-hero/digital-marketing-hero.jpg` | 2,969 KB | 122.4 KB | 1600x1600 |
| `company/company-1.jpg` | 1,415 KB | 177.2 KB | 1600x1068 |
| `hero-image.jpg` | 1,289 KB | 173.5 KB | 1600x961 |
| `images/products/ebook-catalog.jpg` | 1,041 KB | 165.2 KB | 1440x900 |
| `images/products/ebook-portfolio.jpg` | 943 KB | 123.3 KB | 1440x900 |
| `images/products/ebook-hero.jpg` | 943 KB | 123.3 KB | 1440x900 |
| `images/products/ebook-audiobook-player.jpg` | 913 KB | 154.6 KB | 1440x900 |
| `blogs/blogs-1.jpg` | 809 KB | 156.0 KB | 1536x1024 |

Removed unused large public files after confirming no local source references:

- `winter-holidays-people-emotions-concept-cheerful-lovely-romantic-redhead-woman-came-home-war.jpg`
- `careers/careers-1.jpg`
- `careers/careers-2.jpg`
- `careers/careers-3.jpg`
- `careers/careers-4.jpg`
- `about/about-1.jpg`
- `about/about-2.jpg`
- `about/about-3.jpg`
- `company/company-2.jpg`
- `company/company-4.jpg`
- `testimonials/testimonial-2.jpg`
- `testimonials/testimonial-4.jpg`
- `testimonials/testimonial-5.jpg`
- `testimonials/testimonial-6.jpg`

Image component improvements:

- Removed `unoptimized` from public blog listing/detail images so Next.js can optimize configured local/remote images.
- Added missing `sizes` values for AI hero, digital marketing hero, company office image, and product lightbox image.

Post-cleanup result:

- Largest remaining public asset is approximately 571 KB.
- No current public blog component still has `unoptimized`.

---|---:|
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

**Status:** Implemented
**Location:** `frontend/src/app/(public)/blogs/page.tsx`, `frontend/src/components/Blogs/BlogList.tsx`, `frontend/src/components/Blogs/FeaturedBlogs.tsx`

**Issue:**

The public blog listing previously fetched posts in the browser with `cache: 'no-store'`, and featured blogs used the shared Axios API client. That shared client appends `_t={timestamp}` to requests, which is useful for admin freshness but prevents cache-friendly public SEO fetches.

**Implementation:**

- Converted `/blogs` to an async server page with `export const revalidate = 300`.
- Added server-side public blog fetching with `fetch(..., { next: { revalidate: 300 } })`.
- Passed server-fetched blog data into `FeaturedBlogs` and `BlogList` as initial props.
- Removed client-side `no-store` blog list fetching.
- Removed public featured-blog usage of the shared Axios client, so `_t={timestamp}` is no longer used for public blog SEO rendering.
- Kept client-side filtering and pagination in `BlogList` for UX without re-fetching.

Result:

- Public blog index content is available during server render.
- Blog list/detail/sitemap public SEO fetches now use Next.js revalidation instead of anti-cache timestamps.
- Admin/dashboard API freshness behavior remains untouched.

---

## Content SEO Opportunities

### SEO-13: Service Pages Are Too Broad for Competitive Keywords

**Status:** Implemented

**Issue:**

The site previously had one broad `/services` page covering multiple offerings. That structure is useful as an overview, but it is too broad for competitive service keywords where each search intent needs a focused landing page.

**Implementation:**

Added focused service landing pages:

- `/services/custom-software-development`
- `/services/web-application-development`
- `/services/mobile-app-development`
- `/services/software-maintenance`
- `/services/digital-marketing`
- `/services/seo-services`

Updated files:

- `frontend/src/data/servicePages.ts`
- `frontend/src/components/Services/ServiceLandingPage.tsx`
- `frontend/src/app/(public)/services/[slug]/page.tsx`
- `frontend/src/components/Services/ServicesList.tsx`
- `frontend/src/components/Home/Features.tsx`
- `frontend/src/app/sitemap.ts`

Each service page now includes:

- Unique H1 and page copy
- Page-specific metadata and canonical URL
- Keyword-focused descriptions
- Service-specific capabilities, deliverables, process, FAQs, technologies, and related service links
- `Service` JSON-LD
- `FAQPage` JSON-LD
- `BreadcrumbList` JSON-LD
- Inclusion in `sitemap.xml`

Additional improvement:

- `robots.txt` and `sitemap.xml` site URL fallback now uses `https://www.techuniqueiit.com` instead of falling back to a Vercel deployment URL when production env is missing.

---

### SEO-14: Local SEO Can Be Stronger

**Status:** Implemented with verified public details

**Issue:**

The site mentioned South Delhi/India contact details, but local SEO signals were scattered across components and the contact page did not have a dedicated local business/NAP section.

**Implementation:**

Added a shared business profile source for consistent NAP and service-area details:

- `frontend/src/data/businessProfile.ts`

Updated local SEO coverage:

- Added visible local business/NAP panel on `/contact`.
- Added service-area coverage for South Delhi, New Delhi, Delhi NCR, and India.
- Added supported languages: English and Hindi.
- Added `ContactPage` JSON-LD on `/contact`.
- Enhanced `ProfessionalService` JSON-LD with stable `@id`, service areas, available languages, service types, and SEO services offer.
- Updated contact metadata with South Delhi and service intent.
- Centralized NAP usage in contact, company office, and privacy contact content.
- Added local-intent keywords such as Delhi NCR software company and South Delhi web application development.

NAP used consistently:

- Name: `TechUniqueIIT Solutions LLP`
- Email: `info@techuniqueiit.com`
- Phone: `+91 7838758293`
- Location: `South Delhi, Delhi, India`

Not added:

- Google Business Profile link, because no verified public profile URL was provided.
- Embedded map or full street address, because only South Delhi/Delhi/India is currently verified and intended to be public.
- Fake opening hours, ratings, reviews, coordinates, or street address.

---

### SEO-15: Product Content Has an Existing Content Gap

**Status:** Implemented with current verified assets

**Issue:**

HRMS and SCMS product galleries were empty. This reduced product-page depth and made the product modal feel incomplete compared with LMS and Ebook/Audiobook products.

**Implementation:**

Updated product content and UX without inventing fake screenshots:

- Added stronger HRMS product copy covering employee records, attendance, leave approvals, payroll inputs, performance reviews, HR reports, and role-based workflows.
- Added stronger SCMS product copy covering commission rules, agent tracking, payout calculations, approvals, exports, and audit trails.
- Added `previewHighlights` content for HRMS and SCMS.
- Added a polished `Product Workflow Preview` state in the product modal when a real screenshot gallery is not available.
- Added `Workflow Preview` badge on HRMS/SCMS product cards.
- Reused the verified HRMS/SCMS portfolio images instead of creating fake application screenshots.
- Updated products JSON-LD descriptions for HRMS and SCMS.
- Added missing Ebook/Audiobook product image in products JSON-LD.
- Fixed products metadata so it reflects LMS, Ebook/Audiobook, HRMS, and SCMS instead of unrelated product wording.

Updated files:

- `frontend/src/components/Products/ProductsList.tsx`
- `frontend/src/components/Products/ProductModal.tsx`
- `frontend/src/app/(public)/products/page.tsx`

Remaining future improvement:

- Replace workflow-preview state with real HRMS and SCMS screenshots when production screenshots are available.

---

## Implementation Checklist

### Phase 1: Technical Foundation

1. Add `NEXT_PUBLIC_SITE_URL`.
2. Fix root metadata typo and defaults.
3. Add `frontend/src/app/sitemap.ts`. **Done**
4. Add `frontend/src/app/robots.ts`.
5. Add canonical URLs to all indexable pages. **Done**
6. Add `noindex` to `/dashboard/*` and `/login`. **Done**

### Phase 2: Page Metadata

1. Fix home metadata description.
2. Add metadata to Careers.
3. Add metadata to FAQ.
4. Add metadata to Privacy.
5. Add Open Graph and Twitter defaults. **Done**

### Phase 3: Blog SEO

1. Refactor blog detail route into server page + client component. **Done**
2. Add `generateMetadata` for blog details. **Done**
3. Add BlogPosting JSON-LD. **Done**
4. Include published blog slugs in sitemap.

### Phase 4: Structured Data

1. Add Organization schema. **Done**
2. Add LocalBusiness/ProfessionalService schema. **Done**
3. Add FAQPage schema. **Done**
4. Add Product/SoftwareApplication schema. **Done**
5. Add BreadcrumbList schema. **Done**

### Phase 5: Performance and Content

1. Compress large public images.
2. Remove unused large assets.
3. Avoid `unoptimized` on important images where possible.
4. Create focused service landing pages. **Done**
5. Add HRMS/SCMS screenshots or better no-gallery UX. **Done with workflow preview state**

---

## Recommended Priority Order

| Priority | Item | Impact |
|---|---|---|
| P0 | Add canonical metadata for current indexable pages | Done |
| P0 | Fix root/home metadata | Brand and snippet quality |
| P0 | Add noindex for dashboard/login | Done |
| P1 | Refactor blog detail SEO | Blog discoverability and sharing |
| P1 | Add canonical URLs and a dedicated OG image asset | Done |
| P1 | Add missing Careers/FAQ/Privacy metadata | Page-level search clarity |
| P2 | Add structured data | Rich result eligibility and entity clarity |
| P2 | Optimize large images | Done |
| P3 | Build service-specific SEO pages | Done |

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

The current technical SEO foundation is implemented through SEO-15. Sitemap, robots, root metadata, homepage metadata, blog detail SEO metadata, Careers/FAQ/Privacy metadata, admin/login `noindex` handling, canonical URLs, current priority structured data, dedicated Open Graph image metadata, large image optimization, public blog caching, service-specific SEO landing pages, verified local SEO signals, and improved HRMS/SCMS product content have been completed. The next implementation pass should focus on adding real HRMS/SCMS screenshots and Google Business Profile linking when available.
