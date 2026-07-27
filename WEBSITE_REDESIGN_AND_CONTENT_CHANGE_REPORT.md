# Website Redesign and Content Change Report

**Project:** TechUniqueIIT Solutions LLP Website  
**Report date:** 26 July 2026  
**Scope:** Work completed during the current website review and redesign session

---

## 1. Executive Summary

During this session, **5 public routes were affected**:

| Impact type | Route | Page |
|---|---|---|
| Direct redesign | `/` | Home |
| Shared-component update | `/services` | Services |
| Direct redesign | `/careers` | Careers |
| Direct redesign and content merge | `/company` | Company / About Us |
| Redirect after merge | `/company/about` | Previous About Us page |

After merging About Us into Company, the affected routes now represent **4 distinct live page experiences**:

1. Home
2. Services
3. Careers
4. Company / About Us

The Header and Footer were also updated, so their navigation and credibility improvements affect the complete public website.

### Main objectives completed

- Removed demo-style, unsupported, duplicated, or placeholder content.
- Improved visual hierarchy while following the existing indigo/violet theme.
- Made dense sections more compact and easier to scan.
- Reused shared components instead of maintaining duplicate content.
- Consolidated Company and About Us into one canonical page.
- Updated the company journey to reflect the current year, 2026.
- Matched company facts and services with the information currently shown on the Home page.

---

## 2. Page-by-Page Change Summary

## 2.1 Home Page (`/`)

### A. Client Testimonials

The five testimonial messages were rewritten to sound more natural and specific.

Each testimonial now combines:

- Understanding of the delivered product or service.
- A different team-appreciation angle.
- A practical business outcome.
- Less generic and repetitive praise.

Distinct appreciation themes include:

1. Business-rule understanding and ownership for the Sales Commission System.
2. Workflow discovery and organised management for HRMS.
3. Listening to teachers and administrators for the LMS.
4. Transparency and technical responsibility for legacy application maintenance.
5. Audience research and consistent coordination for digital marketing.

### Why this change was necessary

The previous reviews focused mainly on the product and used broad phrases such as “outstanding” or “results-driven.” This made the reviews feel promotional instead of genuine. The revised copy explains *why* the team was valuable and demonstrates actual understanding of each product.

### B. Core Offerings

The Core Offerings section was redesigned from a large 2×2 text-heavy layout into a compact four-card row on desktop.

Changes include:

- Four equal cards in one desktop row.
- Responsive two-column and one-column layouts for smaller screens.
- Shorter outcome-focused descriptions.
- Modern icon blocks, sequence numbers, and compact action badges.
- Entire cards made clickable.
- Reduced vertical and line spacing.
- Removal of the redundant bottom CTA.
- Addition of **34 relevant capability and technology tags**.

Tag examples include React, Next.js, Angular, Node.js, Python, .NET, GraphQL, AWS, Azure, code takeover, refactoring, Flutter, iOS, Android, SEO, YouTube, LinkedIn, analytics, and lead generation.

### Why this change was necessary

The earlier cards contained a title, subtitle, long paragraph, badge, and CTA, creating too much visual density. The redesign preserves genuine service information while making all four offerings visible together and easier to understand at a glance.

### Main files

- `frontend/src/components/Home/Testimonials.tsx`
- `frontend/src/components/Home/Features.tsx`

---

## 2.2 Services Page (`/services`)

The Services page was **indirectly updated** because it reuses the same `Testimonials` component used on the Home page.

### Result

- Services now displays the improved, product-specific client reviews.
- No second testimonial dataset needs to be maintained.
- Review changes remain consistent between Home and Services.

### Why this change was necessary

Shared content should have one source of truth. Reusing the component prevents the Home and Services pages from showing different versions of the same client feedback.

### Related file

- `frontend/src/app/(public)/services/page.tsx`

---

## 2.3 Careers Page (`/careers`)

The Careers page received a complete credibility and layout cleanup.

### A. Careers Hero

The large photo-and-stat hero was replaced with a wide horizontal branded banner.

Changes include:

- “Join Our Team of Innovators” is now the main page heading.
- Removed all hero buttons.
- Removed the stock-style team image.
- Removed floating achievement cards.
- Added a minimal branded visual instead of relying only on text.
- Added the actual team disciplines currently represented on the website:
  - Engineering
  - Product
  - Digital Strategy
- Referenced leadership by Mohammad Musharaf.

### Removed unsupported hero claims

- `50+` team members
- `12` countries
- `15` open positions
- `4.8/5` employee rating
- `40%` year-over-year growth

### Why this change was necessary

These statistics were not connected to a verifiable data source and conflicted with figures elsewhere on the website. The new banner communicates the employer identity without inventing scale, ratings, or growth.

### B. Benefits & Perks

The six Benefits cards were rebuilt as compact cards displayed in one desktop row.

The previous unverified employment promises were replaced with work-experience benefits grounded in the company’s current services and team structure:

1. Real Product Work
2. Modern Tech Stack
3. Cross-Team Exposure
4. Experienced Guidance
5. End-to-End Exposure
6. Meaningful Ownership

### Removed unverified benefit claims

- Industry-leading compensation
- Performance bonuses
- Health, dental, and vision coverage
- Work-from-anywhere availability
- Guaranteed annual learning budget
- Generous paid-time-off policy
- Regular retreats and company events

### Why this change was necessary

Employment benefits should only be published when they are formally confirmed by company policy. The replacement content communicates real professional exposure without creating contractual expectations.

### C. Open Positions

The section heading was changed from “Join Our Growing Team” to “Current Opportunities.”

The supporting text now explains that every visible job is published and maintained by the TechUniqueIIT team. Job cards continue to load from the existing backend jobs API.

### Why this change was necessary

“Growing team” was an unsupported marketing statement. Connecting the section copy to live published job data makes the page more accurate.

### D. Removed Careers Sections

The following sections and their source components were removed:

- Our Culture
- Join Us

This also removed:

- A fabricated employee quote attributed to “Sarah Chen.”
- Generic culture gallery labels.
- A nonfunctional job-alert form.
- Placeholder `#` social links.
- Placeholder `careers@company.com` contact information.

### Main files

- `frontend/src/app/(public)/careers/page.tsx`
- `frontend/src/components/Careers/CareersHero.tsx`
- `frontend/src/components/Careers/CompanyBenefits.tsx`
- `frontend/src/components/Careers/OpenPositions.tsx`

### Removed files

- `frontend/src/components/Careers/CompanyCulture.tsx`
- `frontend/src/components/Careers/JoinTeam.tsx`

---

## 2.4 Company / About Us Page (`/company`)

Company and About Us were analysed as duplicate pages and merged into one canonical Company page.

### Final section order

1. Company Hero
2. Mission, Approach, and Values
3. Our Expertise
4. Our Journey
5. Our Leadership
6. Office Location
7. Shared Client Testimonials

### A. Company Hero

The hero was rebuilt without stock photography or unsupported achievement cards.

The new hero:

- Uses the existing indigo/violet brand theme.
- Explains the company in practical language.
- Shows the four operating areas: Build, Maintain, Launch, and Grow.
- Uses Home-page-aligned facts:
  - `17+ Yrs` IT leadership
  - `Since 2022` company journey
  - `20+` team members

### Removed hero claims

- “Top 10 Tech Companies 2024”
- “100% YoY Revenue Growth”
- “Industry Leader” award-style messaging

### Why this change was necessary

Awards and revenue claims require evidence. Removing them prevents the Company page from damaging trust and keeps its facts consistent with the Home page.

### B. Mission, Approach, and Values

The global-leader-style Vision statement was replaced with a practical operating approach:

- Understand requirements first.
- Choose technology responsibly.
- Communicate clearly.
- Remain accountable after launch.

Values were updated to:

- Ownership
- Clarity
- Practical Innovation
- Partnership

### Why this change was necessary

The earlier mission and values used generic corporate language. The updated content reflects the strengths repeatedly mentioned in the client testimonials.

### C. Our Expertise

The useful Expertise section from About Us was merged into Company and rebuilt around the same four Core Offerings shown on the Home page:

1. Custom Web & Software Development
2. Software Maintenance & Code Management
3. Mobile App Development
4. Digital Marketing & Social Media

### Why this change was necessary

The previous About page listed services such as AI Solutions, DevOps, and Consulting that were not part of the current Home-page Core Offerings. Matching both pages avoids contradictory service positioning.

### D. Our Journey

The old timeline was replaced with a concise and current 2022–2026 journey.

Only two defensible milestones are shown:

- **2022:** TechUniqueIIT was founded and began its company journey in Delhi.
- **2026:** The current company position, using the same service areas, team size, and leadership experience shown elsewhere on the website.

### Removed timeline claims

- Unverified 2023 “Rapid Growth” milestone
- Unverified 2024 “Innovation Hub” milestone
- “Leading the way in AI” claim

### Why this change was necessary

Inventing one milestone for every year would recreate the same credibility problem. A shorter timeline is more trustworthy when only the founding and current state are supported by existing website data.

### E. Our Leadership

The image-heavy leadership card grid was replaced with a flat, bordered, modern layout.

The new structure contains:

- Mohammad Musharaf — Founder & Managing Director
- Engineering & Product team
- Digital Marketing & Strategy team

Removed elements include:

- Logo images used as team-member photographs.
- Card-heavy presentation.
- Generic `linkedin.com` and `twitter.com` profile links.
- The unsupported `15+ software engineers` sub-claim.

### Why this change was necessary

Using a logo as a portrait and linking to generic social homepages looked unfinished. The simpler structure presents only the people and teams currently described across the website.

### F. Partners Removed and Testimonials Reused

The complete Our Partners component was removed.

This removed unsupported partnership claims involving:

- Microsoft
- Amazon Web Services
- Google Cloud
- Salesforce
- Oracle
- IBM

It also removed the separate generic testimonials attributed to David Wilson and Jennifer Lee.

The Company page now imports the exact same `Testimonials` component used on Home and Services.

### Why this change was necessary

Technology usage does not automatically mean an official partnership. Displaying partner logos without confirmation can create legal and credibility risk. Shared testimonials also prevent duplicate or conflicting review content.

### G. Duplicate Statistics Removed

The separate Company Stats section was removed, including the unsupported `95%+ Client Satisfaction` claim.

The remaining facts appear once in the hero.

### H. Office Copy

The office section retains the South Delhi contact details already repeated in the website’s Contact section. Its copy was made more precise by removing the unsupported “serving globally” statement.

### Main files

- `frontend/src/app/(public)/company/page.tsx`
- `frontend/src/components/Company/CompanyHero.tsx`
- `frontend/src/components/Company/CompanyMission.tsx`
- `frontend/src/components/Company/CompanyExpertise.tsx`
- `frontend/src/components/Company/CompanyJourney.tsx`
- `frontend/src/components/Company/CompanyTeam.tsx`
- `frontend/src/components/Company/CompanyOffices.tsx`

### Removed files

- `frontend/src/components/Company/CompanyPartners.tsx`
- `frontend/src/components/Company/CompanyStats.tsx`

---

## 2.5 Previous About Us Route (`/company/about`)

The separate About Us page no longer renders duplicate content. It now redirects visitors to `/company`.

Header and Footer About Us links were also changed to point directly to `/company`.

### Why a redirect was used

- Existing bookmarks remain functional.
- Previously indexed URLs do not become broken pages.
- All Company information has one canonical destination.
- Future content changes only need to be made once.

### Removed About components

- `frontend/src/components/About/AboutHero.tsx`
- `frontend/src/components/About/AboutMission.tsx`
- `frontend/src/components/About/AboutStory.tsx`
- `frontend/src/components/About/AboutValues.tsx`

---

## 3. Global Header and Footer Changes

### Header

- About Us now links to `/company` instead of the retired duplicate page.

### Footer

- About Us now links to `/company`.
- Generic Twitter, LinkedIn, and GitHub homepage links were removed.
- Unused social-icon code was removed.

### Why this change was necessary

Generic platform URLs are not company social profiles. Removing them is safer than inventing or guessing official handles.

---

## 4. Credibility and Data Improvements

The changes addressed four major credibility problems.

### 4.1 Unsupported numerical claims

Ratings, growth rates, project counts, country counts, openings, client satisfaction, and revenue-growth figures were removed when they were not backed by a live data source or consistent website information.

### 4.2 Placeholder people and organisations

Generic testimonial identities, placeholder employee quotes, generic social profiles, and unconfirmed corporate partners were removed.

### 4.3 Duplicate sources of truth

About and Company previously described the same organisation differently. Testimonials also existed in separate datasets. These have been consolidated.

### 4.4 Outdated timeline information

The earlier About page displayed “2+ Years Experience” and stopped its timeline in 2024. The merged page now reflects the current year, 2026, and the stated 2022 founding year.

---

## 5. Design Improvements

Across the updated pages, the design now follows these principles:

- Minimal indigo/violet visual language consistent with the existing website.
- Fewer oversized cards and heavy shadows.
- Shorter copy with stronger information hierarchy.
- Single-row desktop layouts where requested.
- Responsive fallbacks for tablet and mobile.
- More meaningful visual elements such as icons, capability tags, sequence numbers, timelines, and subtle branded backgrounds.
- Reduced duplicate buttons and unnecessary calls to action.

---

## 6. Maintainability Improvements

- One shared Testimonials component is used on Home, Services, and Company.
- Company and About content now has one canonical page.
- Deleted components no longer carry hidden demo data.
- Open Positions remains driven by the existing jobs API instead of hardcoded vacancy counts.
- Navigation points directly to the canonical Company page.

---

## 7. Data Consistency and Internal Verification Note

The following facts were retained because they are consistently presented on the current Home page and related company components:

- 17+ years of IT leadership
- Company founded in 2022
- 20+ team members
- Mohammad Musharaf as Founder & Managing Director
- South Delhi contact location
- Phone: `+91 7838758293`
- Email: `info@techuniqueiit.com`
- Four Core Offerings

These facts were made **internally consistent with the website**, but they were not independently verified against legal, HR, CRM, or company-registration records during this code session. Before production publication, the company owner should confirm the numerical figures, founding date, names, contact details, and permission to publish each testimonial.

---

## 8. Validation Performed

The following checks were completed for the modified components:

- Targeted ESLint checks passed.
- `git diff --check` passed for edited files.
- Deleted-component reference searches passed.
- Demo-claim and placeholder-string audits were performed.
- Route usage and shared-component imports were checked.

### Known project-level validation limitation

The full TypeScript check is currently affected by stale `.next` generated references to service route files that were already deleted elsewhere in the worktree. This issue is unrelated to the Home, Careers, Company, About, testimonial, or navigation changes documented in this report.

---

## 9. Scope Exclusions

The repository contained unrelated or pre-existing uncommitted changes before this session, including service-route removals, product-page work, Home hero/stat changes, service-list changes, and script changes.

Those changes are **not claimed as part of this report** unless they are specifically described in the sections above.

---

## 10. Final Outcome

The completed work reduced five affected public routes to four consistent page experiences, removed major demo-content risks, improved the Home and Careers layouts, and consolidated Company information into one maintainable page.

The website now communicates its services, team, journey, vacancies, and client feedback with better consistency and fewer unsupported claims.
