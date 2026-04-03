# astrofabio.com — Project Plan

> **How to use this file:**
> At the start of a new session say: _"Claude, continue with PLAN.md"_
> At the end of every session, Claude must update this file — marking completed items, adjusting the progress percentage, and refreshing the Next Actions section.

---

## a) General Work Plan

Personal astrology website for Fábio Barbosa (traditional astrologer, Lisbon).
Live at **astrofabio.com**, self-hosted via Coolify on Docker.

**Stack:** Astro v6 SSR + `@astrojs/node`, Tailwind v4, bilingual EN/PT, Cloudflare Turnstile, Mailgun EU.

**Content management:** YAML files per locale under `src/content/`, validated via Zod schemas in `src/content.config.ts`. Site config and nav live in `src/i18n/site.ts`. No `index.ts` barrel — components import directly from their source.

**Design intent:** Minimal, typographic, dark/light capable. Personal and direct voice throughout. No em dashes. No declarative quality claims.

---

## b) Implementation by Stages

### Stage 1 — Foundation ✅

Core Astro setup, SSR, Tailwind v4, bilingual routing, header, layout, middleware.

### Stage 2 — Homepage ✅

- Hero section with animated chart rings and fixed background SVG
- Intro band (dark full-bleed)
- Bio section with photo placeholder
- Consultation section with intro copy
- Consultation form (dynamic fields by type, Turnstile, Mailgun EU submission)
- Form state persisted in localStorage across pages/sessions; cleared on submit
- URL `?type=` param pre-selects consultation type and scrolls to form
- Hidden fieldset inputs disabled so irrelevant fields excluded from FormData
- Synastry: relationship field (mandatory), second person's time of birth (mandatory)

### Stage 3 — Content Architecture ✅

- Content moved from TypeScript objects to YAML files per locale
- Astro content collections with Zod schemas (`src/content.config.ts`, using `astro/zod`)
- `ConsultationForm` and `HomePage` both self-load their own content — no props, no threading
- Page files (`index.astro`, `pt/index.astro`) are trivially thin — Layout + component only
- `site.ts` is the single source for site config, nav links, UI strings
- `Astro.site` used for canonical URL (no duplicate in `site.ts`)
- `aria-current="page"` on active nav links (both desktop and mobile)
- `src/i18n/index.ts` deleted — no barrel file

### Stage 4 — Secondary Pages 🔄

- `/consultations` (`/pt/consultas`) — standalone consultations page with type cards and embedded form ✅
- `/about` (`/pt/sobre`) — full bio page with photo and bio copy ✅
- `/terms` — terms and conditions (linked from form checkbox)

### Stage 5 — Polish & Launch 🔲

- Replace `public/images/fabio.jpg` placeholder with real photo
- OG image at `public/images/og.jpg`
- Final copy review (EN + PT)
- Favicon audit
- Lighthouse / a11y pass
- DNS + Coolify deploy verification

---

## c) Checklist

### Foundation

- [x] Astro v6 SSR project with `@astrojs/node` adapter
- [x] Tailwind v4 with `@theme` tokens in `global.css`
- [x] Bilingual routing — EN default, PT at `/pt/`
- [x] Middleware for preferred-locale cookie
- [x] Fixed transparent header with scroll-triggered solid bg
- [x] Animated SVG logo with clip path and draw-in animation
- [x] Mobile menu (slide-in overlay)
- [x] `aria-current="page"` on active nav links

### Homepage

- [x] Hero section — animated circles, fixed background SVG, CTA buttons
- [x] Intro band — full-bleed dark section
- [x] Bio section — photo + text grid
- [x] Consultation section — intro copy + form
- [x] EN bio copy (4 paragraphs)
- [x] PT bio copy (4 paragraphs)
- [x] ConsultationForm — natal, natal+SR, horary, elective, synastry types
- [x] Cloudflare Turnstile integration
- [x] Mailgun EU API route (`/api/consultation`)
- [x] Form localStorage persistence (save on input, restore on load, clear on submit)
- [x] URL `?type=` param pre-selection (scroll handled by `#book` hash)
- [x] Hidden fieldset inputs disabled to exclude from FormData
- [x] Synastry relationship field (mandatory, EN + PT)
- [x] Synastry second person's time of birth enforced as required
- [x] Chart SVGs inlined via `?raw` for the animated circles overlay
- [x] Background hero SVGs served as regular files from `public/images/`; abstracted into `HeroBackground.astro` component (takes `src` prop)

### Content Architecture

- [x] `src/content/home/en.yaml` and `pt.yaml`
- [x] `src/content/consultation/en.yaml` and `pt.yaml`
- [x] Zod schemas in `src/content.config.ts` (using `astro/zod`)
- [x] `ConsultationForm` self-loads via `getEntry('consultation', locale)`
- [x] `HomePage` self-loads via `getEntry('home', locale)` — no props
- [x] Page files are thin wrappers: Layout + component only
- [x] `site.ts` owns: locales, siteMeta, ui strings, navLinks
- [x] `Astro.site` for canonical/OG URLs (not duplicated in site.ts)
- [x] `src/i18n/index.ts` deleted — no barrel

### Secondary Pages

- [x] `/consultations` page (EN) — `src/pages/consultations.astro` + `ConsultationsPage.astro`
- [x] `/pt/consultas` page (PT)
- [x] `consultations` collection in `content.config.ts` with EN + PT YAML
- [x] Consultation type icon SVGs (`icon-natal.svg`, `icon-horary.svg`, etc.)
- [x] Consultations page hero CTAs (Book → `#book`, Learn more → `#cards-track`)
- [x] Per-card Book CTA (links to `?type=${id}#book`, pre-selects type in form)
- [x] `bookCta` / `learnMore` UI strings consolidated in `site.ts` (removed from home YAML)
- [x] Home and consultations page `#book` anchor on the form section
- [x] `/about` page (EN) — `src/pages/about.astro` + `AboutPage.astro`
- [x] `/pt/sobre` page (PT)
- [x] `about` collection defined in `content.config.ts` with EN + PT YAML
- [ ] `/terms` page (EN)
- [ ] `/terms` page (PT)
- [ ] `terms` collection or MDX files

### Components

- [ ] `NewsletterBox.astro` — newsletter signup section component (EN + PT copy, form UI, integration TBD)
- [ ] `Footer.astro` — site-wide footer (nav links, locale switcher, copyright, social links TBD)
- [ ] Footer wired into `Layout.astro`
- [ ] Footer and newsletter copy added to `site.ts` (or dedicated YAML if substantial)

### Assets & Launch

- [x] Plausible analytics added to `Layout.astro` (self-hosted at plausible.demiurgos.eu)
- [x] Hero background images preloaded via `preloadImage` prop on `Layout.astro`
- [ ] Real photo at `public/images/fabio.jpg`
- [ ] OG image at `public/images/og.jpg`
- [ ] Final EN copy review
- [ ] Final PT copy review (about bio known to need a looser rewrite)
- [ ] Lighthouse audit (performance, a11y, SEO)
- [ ] Coolify deploy tested end-to-end

---

## d) Progress

Overall: ~83%

| Stage                    | Status      | %    |
| ------------------------ | ----------- | ---- |
| 1 — Foundation           | Complete    | 100% |
| 2 — Homepage             | Complete    | 100% |
| 3 — Content Architecture | Complete    | 100% |
| 4 — Secondary Pages      | In progress | 75%  |
| 5 — Polish & Launch      | In progress | 20%  |

---

## e) Next Actions

1. **Newsletter box component** — `NewsletterBox.astro` with EN + PT copy; decide on integration (Mailgun list, third-party, or just a mailto for now). Add to relevant pages.
2. **Footer component** — `Footer.astro` with nav links, locale switcher, copyright line; wire into `Layout.astro` so it appears on all pages.
3. **Create `/terms` page** — define `terms` collection in `content.config.ts` with EN + PT YAML, build a simple page (plain copy, no special layout). Link from the consultation form checkbox (`terms` field in `consultation/en.yaml`).
4. **Replace photo placeholder** — `public/images/fabio.jpg` is currently missing; bio section and about page both render with an empty grey box.

---

## Notes

- `set:html` is used on all paragraph renderers — i18n strings may contain safe HTML (links etc.).
- `body` carries the page padding (not `html`), `overflow-x: hidden` is on `html`. Do not move this.
- Mailgun EU endpoint is hardcoded: `https://api.eu.mailgun.net`. Do not change to the global endpoint.
- `security.checkOrigin: false` in `astro.config.mjs` is intentional — CSRF is handled by Turnstile instead.
- YAML strings containing a colon followed by a space must be quoted, otherwise YAML parses them as mappings.
- Software nav link points to the external tool at `https://astrocalculadora.demiurgos.eu` (both locales).
- Desktop nav `<ul>` is absolutely centred in the header via `position: absolute; left: 50%; transform: translateX(-50%)` on `header > nav ul`. The lang switcher stays in flow on the right.
- Card scale animation in `ConsultationsPage.astro` is guarded by `if (window.innerWidth <= 641) return` — no effect on mobile.
- `.button` uses inset box-shadows only for the bevel effect (no background gradient) so alt variants inherit it without overrides.
- Logo SVG and animation live in `SiteLogo.astro`; Header imports it. Animation is suppressed on Safari/iOS via `@supports not (font: -apple-system-body)`; paths are visible by default as fallback.
- Logo clip uses `<clipPath>`. A `<mask>` was tried for Chrome anti-aliasing but caused visible clipping on the small stroke. `transform: translateZ(0)` was removed to avoid GPU layer blurring.
