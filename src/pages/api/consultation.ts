import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { verify as verifyHCaptcha } from "hcaptcha";
import Mailgun from "mailgun.js";

const KNOWN_TYPES: Record<string, string> = {
	natal: "Natal chart",
	"natal-solar-return": "Natal chart & annual revolution",
	horary: "Horary",
	elective: "Elective",
	synastry: "Synastry",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
	const apiKey = import.meta.env.MAILGUN_API_KEY;
	const domain = import.meta.env.MAILGUN_DOMAIN;
	const toEmail = import.meta.env.CONTACT_EMAIL;

	if (!apiKey || !domain || !toEmail) {
		const entry = await getEntry("booking", "en");
		return Response.json(
			{ message: entry!.data.messages.errorServer },
			{ status: 500 },
		);
	}

	let data: FormData;
	try {
		data = await request.formData();
	} catch {
		const entry = await getEntry("booking", "en");
		return Response.json({ message: entry!.data.messages.errorServer }, { status: 400 });
	}

	const get = (key: string) => (data.get(key) as string | null)?.trim() ?? "";

	const locale = get("locale") || "en";
	const entry = await getEntry("booking", locale as "en" | "pt");
	const msgs = (entry ?? (await getEntry("booking", "en")))!.data.messages;

	const name = get("name");
	const email = get("email");
	const consultationType = get("consultationType");
	const terms = data.get("terms");

	if (!name || !email || !consultationType) {
		return Response.json({ message: msgs.errorRequired }, { status: 422 });
	}
	if (!EMAIL_RE.test(email)) {
		return Response.json({ message: msgs.errorEmail }, { status: 422 });
	}
	if (!(consultationType in KNOWN_TYPES)) {
		return Response.json({ message: msgs.errorType }, { status: 422 });
	}
	if (terms !== "on") {
		return Response.json({ message: msgs.errorTerms }, { status: 422 });
	}

	// Verify hCaptcha token
	const hcaptchaToken = get("h-captcha-response");
	const hcaptchaSecret = import.meta.env.HCAPTCHA_SECRET_KEY;
	if (!hcaptchaToken || !hcaptchaSecret) {
		return Response.json({ message: msgs.errorCaptcha }, { status: 422 });
	}
	try {
		const result = await verifyHCaptcha(hcaptchaSecret, hcaptchaToken);
		if (!result.success) {
			console.error("hCaptcha rejected token:", result["error-codes"]);
			return Response.json({ message: msgs.errorCaptcha }, { status: 422 });
		}
	} catch (err) {
		console.error("hCaptcha verification error:", err);
		return Response.json({ message: msgs.errorCaptcha }, { status: 502 });
	}

	const typeLabel = KNOWN_TYPES[consultationType];

	const lines: string[] = [
		`Name: ${name}`,
		`Email: ${email}`,
		`Date of birth: ${get("dateOfBirth")}`,
		`Time of birth: ${get("timeOfBirth")}`,
		`City of birth: ${get("cityOfBirth")}`,
		`Country of birth: ${get("countryOfBirth")}`,
		``,
		`Consultation type: ${typeLabel}`,
		`Form language: ${locale}`,
	];

	if (consultationType === "natal" || consultationType === "natal-solar-return") {
		const concerns = get("concerns");
		if (concerns) lines.push(``, `Specific concerns:`, concerns);
	}

	if (consultationType === "horary") {
		const question = get("horaryQuestion");
		if (question) lines.push(``, `Question:`, question);
	}

	if (consultationType === "elective") {
		lines.push(
			``,
			`What to choose a time for: ${get("electiveSubject")}`,
			`Location: ${get("electiveLocation")}`,
			`Timeframe: ${get("electiveTimeframe")}`,
		);
	}

	if (consultationType === "synastry") {
		lines.push(
			``,
			`--- Other person ---`,
			`Relationship: ${get("synastryRelationship") || "Not specified"}`,
			`Name: ${get("otherName")}`,
			`Date of birth: ${get("otherDateOfBirth")}`,
			`Time of birth: ${get("otherTimeOfBirth")}`,
			`City of birth: ${get("otherCityOfBirth")}`,
			`Country of birth: ${get("otherCountryOfBirth")}`,
		);
		const concerns = get("synastryConcerns");
		if (concerns) lines.push(``, `Specific concerns:`, concerns);
	}

	try {
		const mailgun = new Mailgun(globalThis.FormData ?? (await import("form-data")).default);
		const mg = mailgun.client({
			username: "api",
			key: apiKey,
			url: "https://api.eu.mailgun.net",
		});

		await mg.messages.create(domain, {
			from: `Astrofabio Consultations <noreply@${domain}>`,
			to: [toEmail],
			"h:Reply-To": email,
			subject: `New consultation enquiry — ${typeLabel} from ${name}`,
			text: lines.join("\n"),
		});
	} catch (err) {
		console.error("Mailgun error:", err);
		return Response.json({ message: msgs.errorServer }, { status: 502 });
	}

	return Response.json({ message: msgs.success });
};
