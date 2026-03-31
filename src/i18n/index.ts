import { locales, defaultLocale, htmlLang, siteName, siteUrl, siteMeta, ui } from "./site";
import type { Locale } from "./site";

export { locales, defaultLocale, htmlLang, siteName, siteUrl, siteMeta, ui, type Locale };

export interface HomeContent {
	hero: {
		heading: string[];
		subheading: string;
		cta: string;
		ctaHref: string;
		ctaSecondary: string;
		ctaSecondaryHref: string;
	};
	intro: {
		paragraphs: string[];
	};
}

export const home: Record<Locale, HomeContent> = {
	en: {
		hero: {
			heading: ["See your life", "through the eyes of the sky."],
			subheading:
				"Through traditional Astrology, you can better understand where you come from and what paths lie ahead.",
			cta: "Book a consultation",
			ctaHref: "mailto:fabio@astrofabio.com",
			ctaSecondary: "Learn more",
			ctaSecondaryHref: "#",
		},
		intro: {
			paragraphs: [
				"Over millennia, astrology has been regarded as one of the principal foundations of our knowledge of the natural world. It is an art with a long tradition and a remarkable capacity to describe what characterises us and the circumstances in which we live, the cycles we move through, and the moments most suited for action.",
				"Here I offer astrology consultations based on traditional methods. The starting point is always your natal chart, studied with care and rigour according to a structured system, learned and practised with seriousness. My intention is that you come to terms with your own nature and learn to move with greater clarity within the conditions of the present moment.",
			],
		},
	},
	pt: {
		hero: {
			heading: ["Veja a sua vida", "pelo olhar dos céus."],
			subheading:
				"Com a Astrologia tradicional, pode compreender melhor de onde vem e que caminhos tem à sua frente.",
			cta: "Marcar consulta",
			ctaHref: "mailto:fabio@astrofabio.com",
			ctaSecondary: "Saber mais",
			ctaSecondaryHref: "#",
		},
		intro: {
			paragraphs: [
				"Ao longo de milénios, a astrologia foi considerada uma das principais bases do nosso conhecimento do mundo natural. É uma arte com uma longa tradição e uma capacidade notável de descrever aquilo que nos caracteriza e as circunstâncias em que vivemos, os ciclos que atravessamos e os momentos mais propícios para agir.",
				"Aqui ofereço consultas de astrologia segundo métodos tradicionais. O ponto de partida é sempre o seu mapa natal, estudado com atenção e rigor, segundo um sistema estruturado, aprendido e praticado com seriedade. A minha intenção é que se reconcilie com a sua própria natureza e saiba mover-se com maior clareza dentro das condições do momento.",
			],
		},
	},
};

export const navLinks = {
	en: [
		{ href: "/about", label: "About" },
		{ href: "/consultations", label: "Consultations" },
		{ href: "/calculator", label: "Calculator" },
	],
	pt: [
		{ href: "/pt/sobre", label: "Sobre" },
		{ href: "/pt/consultas", label: "Consultas" },
		{ href: "/pt/calculadora", label: "Calculadora" },
	],
} as const;
