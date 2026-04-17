import { defineMiddleware } from "astro:middleware";

const COOKIE = "preferred-locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const onRequest = defineMiddleware(({ request, cookies, redirect, preferredLocale }, next) => {
	const { pathname } = new URL(request.url);

	// Only auto-detect on the root entry point
	if (pathname !== "/") return next();

	const preferred = cookies.get(COOKIE)?.value;

	// Respect an explicit prior choice
	if (preferred === "pt") return redirect("/pt", 302);
	if (preferred === "en") return next();

	// First visit — use Astro's built-in Accept-Language negotiation
	const locale = preferredLocale === "pt" ? "pt" : "en";

	cookies.set(COOKIE, locale, { path: "/", maxAge: COOKIE_MAX_AGE });

	if (locale === "pt") return redirect("/pt", 302);
	return next();
});
