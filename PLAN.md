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
- `BookingForm` and `HomePage` both self-load their own content — no props, no threading
- Page files (`index.astro`, `pt/index.astro`) are trivially thin — Layout + component only
- `site.ts` is the single source for site config, nav links, UI strings
- `Astro.site` used for canonical URL (no duplicate in `site.ts`)
- `aria-current="page"` on active nav links (both desktop and mobile)
- `src/i18n/index.ts` deleted — no barrel file

### Stage 4 — Secondary Pages 🔄

- `/consultations` (`/pt/consultas`) — standalone consultations page with type cards and embedded form ✅
- `/about` (`/pt/sobre`) — full bio page with photo and bio copy ✅
- `/terms` (`/pt/termos`) — terms and conditions ✅

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
- [x] BookingForm — natal, natal+SR, horary, elective, synastry types
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
- [x] `src/content/booking/en.yaml` and `pt.yaml` (renamed from `consultation/`)
- [x] Zod schemas in `src/content.config.ts` (using `astro/zod`)
- [x] `BookingForm` self-loads via `getEntry('booking', locale)` (renamed from `ConsultationForm`)
- [x] `HomePage` self-loads via `getEntry('home', locale)` — no props
- [x] Page files are thin wrappers: Layout + component only
- [x] `site.ts` owns: locales, siteMeta, ui strings, navLinks
- [x] `Astro.site` for canonical/OG URLs (not duplicated in site.ts)
- [x] `src/i18n/index.ts` deleted — no barrel

### Secondary Pages

- [x] `/consultations` page (EN) — `src/pages/consultations.astro` + `ConsultationsPage.astro` (uses `BookingForm`)
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
- [x] `/terms` page (EN) — `src/pages/terms.astro` + `TermsPage.astro`
- [x] `/pt/termos` page (PT)
- [x] `terms` collection in `content.config.ts` with EN + PT YAML (9 sections, astrologer disclaimers)
- [x] `routeEquivalents` map in `site.ts` — unified EN↔PT path lookup for all routes; `LangSwitcher` simplified to single map lookup
- [x] Footer copyright area: safe space notice (🏳️‍🌈🏳️‍⚧️♾️) + T&C link

### Components

- [x] Newsletter signup form embedded in footer second column — beehiiv iframe embed, locale-specific `newsletterFormSrc` URL in `site.ts` (`ui` map), single `<iframe>` driven by `t.newsletterFormSrc`
- [x] Homepage bio section: dark intro band removed; photo + `content.intro.paragraphs` side by side (1:1 grid); "About me / Sobre mim" CTA links to `/about` / `/pt/sobre` via `aboutCta`/`aboutCtaHref` in `ui`
- [x] About page bio content synced to homepage intro paragraphs (both locales)
- [x] `BookingForm.astro` owns its full `<section id="book">` — heading, advisory paragraphs, two-column layout (sticky advisory + glass form card), gradient orbs, all styles. `booking/en.yaml` and `booking/pt.yaml` carry `heading` and `advisory`. Page components render bare `<BookingForm />`. `consultation` block removed from home YAML and schema. `#book` styles removed from `global.css`. `overflow: clip` used on `#book` to contain orb bleed on mobile without creating a scroll container (preserves sticky advisory). `#consultation-form` has `min-width: 0` (prevents grid item overflow) and `padding: 1rem` on mobile (halved from `2rem`).
- [x] `Footer.astro` — site-wide footer (logo, nav links, locale switcher, copyright)
- [x] `LangSwitcher.astro` — extracted language switcher component, used in Header (desktop + mobile) and Footer
- [x] Footer wired into `Layout.astro`
- [x] `SiteLogo` updated with `instanceId` prop to avoid duplicate SVG clipPath IDs when used in both header and footer
- [x] `SiteLogo` `animated` prop (default `true`) — footer passes `animated={false}` via `logo-no-animate` class
- [x] `SiteLogo` and `LangSwitcher` `variant` prop (`"light"` | `"dark"`) — footer passes `variant="dark"` to both; dark variant flips stroke and text from `color-contrast`/`color-ink` to `color-base`
- [x] `SiteLogo` `layout` prop (`"horizontal"` | `"stacked"`) — stacked uses `flex-col items-start` and always shows the text block; footer passes `layout="stacked"`
- [x] Email and Instagram icon links in `Header.astro` — desktop: between nav links and `LangSwitcher`; mobile: below the nav list, left-aligned with text links. `.social-link` uses `color: var(--color-ink)` and `stroke="currentColor"` so icons react to the same color transitions as nav text links.

### Booking Form i18n

- [x] `messages` block added to `booking/en.yaml` and `booking/pt.yaml` (success, errorRequired, errorEmail, errorType, errorTerms, errorCaptcha, errorServer, errorNetwork)
- [x] `messages` schema added to `content.config.ts` booking collection
- [x] `/api/consultation` uses `getEntry('booking', locale)` to return localized response messages
- [x] `BookingForm.astro` passes `errorNetwork` via `data-error-network` attribute; catch block reads it

### Assets & Launch

- [x] Plausible analytics added to `Layout.astro` (self-hosted at plausible.demiurgos.eu)
- [x] Hero background images replaced with CSS orb blobs in `HeroBackground.astro` — `orb1`/`orb2` props accept any CSS color value; `flip` prop swaps orb positions (so `::after` / orb2 always paints on top). SVG files and `preloadImage` prop removed. `.hero-background` has `overflow-x: clip` to clip the orbs' `-25%` offset bleed without creating a scroll container.
- [x] Favicons: `favicon.ico` (32×32 PNG-in-ICO) and `apple-touch-icon.png` (180×180) generated from SVG
- [x] Nav "App" link updated to `https://app.astrofabio.com` (EN + PT)
- [ ] Real photo at `public/images/fabio.jpg`
- [ ] OG image at `public/images/og.jpg`
- [ ] Final EN copy review
- [ ] Final PT copy review (about bio known to need a looser rewrite)
- [ ] Lighthouse audit (performance, a11y, SEO)
- [ ] Coolify deploy tested end-to-end

---

## d) Progress

Overall: ~92%

| Stage                    | Status      | %    |
| ------------------------ | ----------- | ---- |
| 1 — Foundation           | Complete    | 100% |
| 2 — Homepage             | Complete    | 100% |
| 3 — Content Architecture | Complete    | 100% |
| 4 — Secondary Pages      | Complete    | 100% |
| 5 — Polish & Launch      | In progress | 40%  |

---

## e) Next Actions

1. **Page `description` attributes** — each secondary page currently falls back to the site-level description; write bespoke `description` props for `/consultations`, `/about`, `/terms` and their PT equivalents.
2. **Replace photo placeholder** — `public/images/fabio.jpg` is currently missing; bio section and about page both render with an empty grey box.
3. **Final copy review** — EN + PT. PT about bio known to need a looser rewrite.

---

## Notes

- `set:html` is used on all paragraph renderers and the booking form terms label — i18n strings may contain safe HTML (links etc.). The terms checkbox label uses `stopPropagation()` on the link to prevent toggling the checkbox when the link is clicked.
- `body` carries the page padding (not `html`). `overflow-x: clip` is on `html` — do not change to `overflow-x: hidden`, as `hidden` creates a scroll container and breaks `position: sticky` on descendant elements.
- Mailgun EU endpoint is hardcoded: `https://api.eu.mailgun.net`. Do not change to the global endpoint.
- `security.checkOrigin: false` in `astro.config.mjs` is intentional — CSRF is handled by Turnstile instead.
- `overflow: clip` (not `overflow: hidden`) is used to contain orb bleed inside `#book` and inside `.hero-background`. `overflow: hidden` would create a scroll container and break `position: sticky` on `.booking-advisory`. `overflow: clip` clips paint without creating a scroll container. `clip-path: inset(0)` was tried first but only clips visually — it does not prevent the element from contributing to scrollable overflow.
- YAML strings containing a colon followed by a space must be quoted, otherwise YAML parses them as mappings.
- App nav link points to `https://app.astrofabio.com` (both locales), labelled "App" / "App".
- Desktop nav `<ul>` is absolutely centred in the header via `position: absolute; left: 50%; transform: translateX(-50%)` on `header > nav ul`. The lang switcher stays in flow on the right.
- Card scale animation in `ConsultationsPage.astro` is guarded by `if (window.innerWidth <= 641) return` — no effect on mobile. Each card's scale is `1 - depth * 0.05` where `depth` is the sum of progress values for all higher-index cards above it. Transition range = `7.5vh` (matches `margin-bottom`) so only one card transitions at a time and scales stay clean per-index multiples. `transform-origin: top center` keeps the card's top edge anchored at its sticky position during scaling. Do not increase the transition range beyond `margin-bottom` or multiple cards will transition simultaneously, producing chaotic intermediate scale values.
- `routeEquivalents` in `site.ts` is the single source for EN↔PT path mapping — derived from `navLinks` (by index) plus manual entries for homepage and utility pages. Add new translated routes here.
- `booking` content collection (formerly `consultation`) holds booking form UI strings. `BookingForm.astro` (formerly `ConsultationForm.astro`) self-loads it.
- `.button` uses inset box-shadows only for the bevel effect (no background gradient) so alt variants inherit it without overrides. `button-alt-dark` was removed — use `.button-alt` instead (white bg, contrast text), which reads correctly on both light and dark surfaces.
- Logo SVG and animation live in `SiteLogo.astro`; Header imports it with default `animated={true}`. Animation is suppressed on Safari/iOS via `@supports not (font: -apple-system-body)`; paths are visible by default as fallback. Footer passes `animated={false}` which adds `logo-no-animate` class to disable the draw-in animation.
- Logo clip uses `<clipPath>`. A `<mask>` was tried for Chrome anti-aliasing but caused visible clipping on the small stroke. `transform: translateZ(0)` was removed to avoid GPU layer blurring.
- `BookingForm` sends a hidden `locale` field (`en` or `pt`) with the form; `/api/consultation` reads it and appends `Form language:` to the email body.
- Mobile menu scroll lock uses `position: fixed` + `top: -${scrollY}px` + `width: 100%` on `body` (not `overflow: hidden`) to prevent iOS Safari from resetting scroll position when the menu opens. Scroll position is restored from `body.style.top` on close.
