import { defineMiddleware } from "astro:middleware";

const COOKIE = "preferred-locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function detectLocale(acceptLanguage: string): "pt" | "en" {
	const langs = acceptLanguage
		.split(",")
		.map((part) => {
			const [lang, q = "q=1"] = part.trim().split(";");
			return { lang: lang.trim(), quality: parseFloat(q.split("=")[1]) || 1 };
		})
		.sort((a, b) => b.quality - a.quality);

	for (const { lang } of langs) {
		if (/^pt\b/i.test(lang)) return "pt";
		if (/^en\b/i.test(lang)) return "en";
	}
	return "en";
}

export const onRequest = defineMiddleware(({ request, cookies, redirect }, next) => {
	const { pathname } = new URL(request.url);

	// Only auto-detect on the root entry point
	if (pathname !== "/") return next();

	const preferred = cookies.get(COOKIE)?.value;

	// Respect an explicit prior choice
	if (preferred === "pt") return redirect("/pt", 302);
	if (preferred === "en") return next();

	// First visit — detect from browser preference
	const locale = detectLocale(request.headers.get("accept-language") ?? "");

	cookies.set(COOKIE, locale, { path: "/", maxAge: COOKIE_MAX_AGE });

	if (locale === "pt") return redirect("/pt", 302);
	return next();
});
