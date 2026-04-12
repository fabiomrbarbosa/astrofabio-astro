// Site-wide configuration and identity — locales, language settings, metadata, UI strings, nav.

export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const htmlLang: Record<Locale, string> = {
	en: "en-GB",
	pt: "pt-PT",
};

// Site identity and SEO metadata
export const siteName = "Fábio Barbosa";

export const siteMeta: Record<
	Locale,
	{ tagline: string; title: string; description: string }
> = {
	en: {
		tagline: "Astrology",
		title: "Fábio Barbosa | Astrology",
		description:
			"Traditional astrology consultations with Fábio Barbosa. Better understand your natal chart, the cycles you move through, and the moments most suited for action.",
	},
	pt: {
		tagline: "Astrologia",
		title: "Fábio Barbosa | Astrologia",
		description:
			"Consultas de astrologia tradicional com Fábio Barbosa. Compreenda melhor o seu mapa natal, os ciclos que atravessa e os momentos mais propícios para agir.",
	},
};

// UI strings for navigation and components
export const ui = {
	en: {
		menuOpen: "Open menu",
		menuClose: "Close menu",
		logoAriaLabel: "Fábio Barbosa | Astrology — Home",
		switchLang: "PT",
		switchLangHref: "/pt",
		switchLangAriaLabel: "Ver em Português",
		bookCta: "Book a consultation",
		learnMore: "Learn more",
		safeSpace: "A queer and neurodivergent-safe space 🏳️‍🌈🏳️‍⚧️♾️",
		termsLabel: "Terms & Conditions",
		termsHref: "/terms",
		aboutCta: "About me",
		aboutCtaHref: "/about",
		newsletterFormSrc:
			"https://subscribe-forms.beehiiv.com/3af7cb73-fa6d-4831-9c56-773ce888c7f2",
	},
	pt: {
		menuOpen: "Abrir menu",
		menuClose: "Fechar menu",
		logoAriaLabel: "Fábio Barbosa | Astrologia — Página inicial",
		switchLang: "EN",
		switchLangHref: "/",
		switchLangAriaLabel: "Switch to English",
		bookCta: "Marcar consulta",
		learnMore: "Saber mais",
		safeSpace: "Um espaço seguro para pessoas queer e neurodivergentes 🏳️‍🌈🏳️‍⚧️♾️",
		termsLabel: "Termos e Condições",
		termsHref: "/pt/termos",
		aboutCta: "Sobre mim",
		aboutCtaHref: "/pt/sobre",
		newsletterFormSrc:
			"https://subscribe-forms.beehiiv.com/c16033c5-d868-480e-bc29-89806791202f",
	},
} as const;

export const navLinks = {
	en: [
		{ href: "/about", label: "About" },
		{ href: "/consultations", label: "Consultations" },
		{ href: "https://app.astrofabio.com", label: "App" },
	],
	pt: [
		{ href: "/pt/sobre", label: "Sobre" },
		{ href: "/pt/consultas", label: "Consultas" },
		{ href: "https://app.astrofabio.com", label: "App" },
	],
} as const;

// Complete map of every path to its equivalent in the other locale.
// Derived from navLinks (same index = same page) plus manually listed routes.
export const routeEquivalents: Record<string, string> = {
	"/": "/pt",
	"/pt": "/",
	...Object.fromEntries([
		...navLinks.en.map((l, i) => [l.href, navLinks.pt[i].href]),
		...navLinks.pt.map((l, i) => [l.href, navLinks.en[i].href]),
	]),
	"/terms": "/pt/termos",
	"/pt/termos": "/terms",
};
