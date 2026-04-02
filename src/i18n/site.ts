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
	},
	pt: {
		menuOpen: "Abrir menu",
		menuClose: "Fechar menu",
		logoAriaLabel: "Fábio Barbosa | Astrologia — Página inicial",
		switchLang: "EN",
		switchLangHref: "/",
		switchLangAriaLabel: "Switch to English",
	},
} as const;

export const navLinks = {
	en: [
		{ href: "/about", label: "About" },
		{ href: "/consultations", label: "Consultations" },
		{ href: "/software", label: "Software" },
	],
	pt: [
		{ href: "/pt/sobre", label: "Sobre" },
		{ href: "/pt/consultas", label: "Consultas" },
		{ href: "/pt/software", label: "Software" },
	],
} as const;
