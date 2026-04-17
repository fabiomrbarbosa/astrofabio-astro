import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const formField = z.object({
	label: z.string(),
	placeholder: z.string(),
});

const home = defineCollection({
	loader: glob({ pattern: "*.yaml", base: "./src/content/home" }),
	schema: z.object({
		hero: z.object({
			heading: z.array(z.string()),
			subheading: z.string(),
			ctaHref: z.string(),
			ctaSecondaryHref: z.string(),
		}),
		intro: z.object({
			heading: z.string(),
			paragraphs: z.array(z.string()),
		}),
	}),
});

const booking = defineCollection({
	loader: glob({ pattern: "*.yaml", base: "./src/content/booking" }),
	schema: z.object({
		heading: z.string(),
		advisory: z.array(z.string()),
		name: z.string(),
		email: z.string(),
		dateOfBirth: z.string(),
		timeOfBirth: z.string(),
		timeOfBirthHint: z.string(),
		cityOfBirth: z.string(),
		countryOfBirth: z.string(),
		typeLabel: z.string(),
		typePlaceholder: z.string(),
		types: z.array(z.object({ value: z.string(), label: z.string() })),
		concerns: formField,
		horary: formField,
		elective: z.object({
			subject: formField,
			location: formField,
			timeframe: formField,
		}),
		synastry: z.object({
			otherHeading: z.string(),
			relationship: formField,
			name: z.string(),
			dateOfBirth: z.string(),
			timeOfBirth: z.string(),
			timeOfBirthHint: z.string(),
			cityOfBirth: z.string(),
			countryOfBirth: z.string(),
			concerns: formField,
		}),
		terms: z.string(),
		submit: z.string(),
		messages: z.object({
			success: z.string(),
			errorRequired: z.string(),
			errorEmail: z.string(),
			errorType: z.string(),
			errorTerms: z.string(),
			errorCaptcha: z.string(),
			errorServer: z.string(),
			errorNetwork: z.string(),
		}),
	}),
});

const consultationType = z.object({
	id: z.string(),
	highlight: z.boolean().optional(),
	discipline: z.string().optional(),
	title: z.string(),
	length: z.string(),
	price: z.number(),
	paragraphs: z.array(z.string()),
});

const consultations = defineCollection({
	loader: glob({ pattern: "*.yaml", base: "./src/content/consultations" }),
	schema: z.object({
		hero: z.object({
			heading: z.string(),
			lead: z.string(),
		}),
		types: z.array(consultationType),
	}),
});

const about = defineCollection({
	loader: glob({ pattern: "*.yaml", base: "./src/content/about" }),
	schema: z.object({
		hero: z.object({
			heading: z.string(),
		}),
		bio: z.object({
			paragraphs: z.array(z.string()),
		}),
	}),
});

const terms = defineCollection({
	loader: glob({ pattern: "*.yaml", base: "./src/content/terms" }),
	schema: z.object({
		hero: z.object({
			heading: z.string(),
		}),
		sections: z.array(
			z.object({
				heading: z.string(),
				paragraphs: z.array(z.string()),
			}),
		),
	}),
});

export const collections = { home, booking, consultations, about, terms };
