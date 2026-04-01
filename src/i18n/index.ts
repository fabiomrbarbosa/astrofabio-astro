import {
	locales,
	defaultLocale,
	htmlLang,
	siteName,
	siteUrl,
	siteMeta,
	ui,
} from "./site";
import type { Locale } from "./site";

export {
	locales,
	defaultLocale,
	htmlLang,
	siteName,
	siteUrl,
	siteMeta,
	ui,
	type Locale,
};

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
	bio: {
		heading: string;
		paragraphs: string[];
	};
	consultation: {
		heading: string;
		advisory: string[];
		form: {
			name: string;
			email: string;
			dateOfBirth: string;
			timeOfBirth: string;
			timeOfBirthHint: string;
			cityOfBirth: string;
			countryOfBirth: string;
			typeLabel: string;
			typePlaceholder: string;
			types: { value: string; label: string }[];
			concerns: {
				label: string;
				placeholder: string;
			};
			horary: {
				label: string;
				placeholder: string;
			};
			elective: {
				subject: { label: string; placeholder: string };
				location: { label: string; placeholder: string };
				timeframe: { label: string; placeholder: string };
			};
			synastry: {
				otherHeading: string;
				name: string;
				dateOfBirth: string;
				timeOfBirth: string;
				timeOfBirthHint: string;
				cityOfBirth: string;
				countryOfBirth: string;
				concerns: { label: string; placeholder: string };
			};
			terms: string;
			submit: string;
		};
	};
}

export const home: Record<Locale, HomeContent> = {
	en: {
		hero: {
			heading: ["Look at your life", "through the mirror of the sky."],
			subheading:
				"Through traditional Astrology, you can better understand who you are and consider which paths lie ahead.",
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
		bio: {
			heading: "About Fábio",
			paragraphs: [
				'I began studying traditional astrology formally in 2023, at the <a href="https://academyofastrology.eu/">Academy of Traditional Astrology</a>, under the guidance of Luís Ribeiro. I also work as a web developer and copywriter, trades that walk the line between art and method.',
				"What drew me to astrology was the conviction that the cosmos is alive and intelligible, not an inert backdrop, and that it is worth learning to read it. Traditional astrology offers exactly that: a system with history, rules, and an internal logic capable of describing who we are, what surrounds us, and the time we move through.",
				"What I bring to a consultation, beyond the technique, is attention to your story and what you need to know, as much as to what the planets actually say. The chart is a tool for orientation, not a verdict.",
				"If you arrived here with genuine curiosity about what your chart has to say, you are in the right place.",
			],
		},
		consultation: {
			heading: "Book a consultation",
			advisory: [
				"A consultation lasts approximately ninety minutes and begins with your natal chart. We may also look at current planetary cycles and any specific question or area of life you wish to explore.",
				"To book, simply fill in the form and I will be in touch within a few days to confirm a time.",
			],
			form: {
				name: "Full name",
				email: "Email address",
				dateOfBirth: "Date of birth",
				timeOfBirth: "Time of birth",
				timeOfBirthHint: "Please be as precise as possible.",
				cityOfBirth: "City of birth",
				countryOfBirth: "Country of birth",
				typeLabel: "Type of consultation",
				typePlaceholder: "Please select a consultation type",
				types: [
					{ value: "natal", label: "Natal chart" },
					{
						value: "natal-solar-return",
						label: "Natal chart & annual revolution",
					},
					{ value: "horary", label: "Horary" },
					{ value: "elective", label: "Elective" },
					{ value: "synastry", label: "Synastry" },
				],
				concerns: {
					label: "Specific concerns",
					placeholder:
						"Is there a particular area of life or theme you would like to focus on?",
				},
				horary: {
					label: "Your question",
					placeholder:
						"State your question as precisely as you can. Feel free to add any context that might help me understand it: the circumstances that led to it, how long it has been on your mind, and anything else you consider relevant.",
				},
				elective: {
					subject: {
						label: "What are you choosing a time for?",
						placeholder:
							"e.g. signing a contract, starting a business, getting married…",
					},
					location: {
						label: "Where will it take place?",
						placeholder: "City and country",
					},
					timeframe: {
						label: "Timeframe",
						placeholder:
							"e.g. sometime in the next three months, between June and August 2025…",
					},
				},
				synastry: {
					otherHeading: "The other person",
					name: "Their full name",
					dateOfBirth: "Their date of birth",
					timeOfBirth: "Their time of birth",
					timeOfBirthHint: "Please be as precise as possible.",
					cityOfBirth: "Their city of birth",
					countryOfBirth: "Their country of birth",
					concerns: {
						label: "Specific concerns",
						placeholder:
							"Is there a particular dynamic or question you would like to explore in this synastry?",
					},
				},
				terms: "I have read and accept the terms and conditions.",
				submit: "Send enquiry",
			},
		},
	},
	pt: {
		hero: {
			heading: ["Olhe para a sua vida", "pelo espelho do céu."],
			subheading:
				"Com a Astrologia tradicional, poderá compreender melhor quem é e avaliar que caminhos tem à sua frente.",
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
		bio: {
			heading: "Sobre Fábio",
			paragraphs: [
				'Comecei a estudar astrologia tradicional formalmente em 2023, na <a href="https://academiadeastrologia.com/">Academia de Estudos Astrológicos</a>, sob orientação de Luís Ribeiro. Trabalho também como web developer e copywriter, ofícios que caminham na fronteira entre a arte e o método.',
				"O que me trouxe à astrologia foi a convicção de que o cosmos é algo vivo e inteligível, não um pano de fundo inerte, e que vale a pena aprender a lê-lo. A astrologia tradicional oferece exactamente isso: um sistema com história, regras e uma lógica interna capaz de descrever quem somos, o que nos rodeia e o tempo que atravessamos.",
				"O que trago a uma consulta, para além do mapa, é a minha atenção à sua história e àquilo que procura saber, tanto quanto ao que os planetas têm para dizer. Considero que o seu mapa é um instrumento de orientação, não um veredicto.",
				"Se chegou aqui com curiosidade genuína sobre o que o seu mapa tem para lhe dizer, está no lugar certo.",
			],
		},
		consultation: {
			heading: "Marcar consulta",
			advisory: [
				"Uma consulta tem a duração aproximada de noventa minutos e começa com o seu mapa natal. Podemos também observar os ciclos planetários actuais e qualquer questão ou área da vida que deseje explorar.",
				"Para marcar, preencha o formulário e entrarei em contacto em alguns dias para confirmar um horário.",
			],
			form: {
				name: "Nome completo",
				email: "Endereço de email",
				dateOfBirth: "Data de nascimento",
				timeOfBirth: "Hora de nascimento",
				timeOfBirthHint: "Seja o mais preciso possível.",
				cityOfBirth: "Cidade de nascimento",
				countryOfBirth: "País de nascimento",
				typeLabel: "Tipo de consulta",
				typePlaceholder: "Por favor seleccione um tipo de consulta",
				types: [
					{ value: "natal", label: "Mapa natal" },
					{
						value: "natal-solar-return",
						label: "Mapa natal e revolução solar",
					},
					{ value: "horary", label: "Horária" },
					{ value: "elective", label: "Eletiva" },
					{ value: "synastry", label: "Sinastria" },
				],
				concerns: {
					label: "Preocupações específicas",
					placeholder:
						"Existe alguma área da vida ou tema particular que gostaria de explorar?",
				},
				horary: {
					label: "A sua pergunta",
					placeholder:
						"Formule a sua pergunta com a maior precisão possível. Sinta-se à vontade para acrescentar contexto que me ajude a compreendê-la: as circunstâncias que a motivaram, há quanto tempo a tem em mente, e tudo o que considere relevante.",
				},
				elective: {
					subject: {
						label: "Para que evento quer escolher um momento?",
						placeholder: "ex: assinar um contrato, iniciar um negócio, casar…",
					},
					location: {
						label: "Onde vai acontecer?",
						placeholder: "Cidade e país",
					},
					timeframe: {
						label: "Período disponível",
						placeholder:
							"ex: nos próximos três meses, entre junho e agosto de 2025…",
					},
				},
				synastry: {
					otherHeading: "A outra pessoa",
					name: "Nome completo",
					dateOfBirth: "Data de nascimento",
					timeOfBirth: "Hora de nascimento",
					timeOfBirthHint: "Seja o mais preciso possível.",
					cityOfBirth: "Cidade de nascimento",
					countryOfBirth: "País de nascimento",
					concerns: {
						label: "Preocupações específicas",
						placeholder:
							"Existe alguma dinâmica ou questão particular que gostaria de explorar nesta sinastria?",
					},
				},
				terms: "Li e aceito os termos e condições.",
				submit: "Enviar pedido",
			},
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
