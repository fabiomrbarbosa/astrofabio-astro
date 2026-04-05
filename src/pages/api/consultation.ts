import type { APIRoute } from "astro";
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
		return Response.json(
			{ message: "Server configuration error. Please contact me directly." },
			{ status: 500 },
		);
	}

	let data: FormData;
	try {
		data = await request.formData();
	} catch {
		return Response.json({ message: "Invalid request." }, { status: 400 });
	}

	const get = (key: string) => (data.get(key) as string | null)?.trim() ?? "";

	const name = get("name");
	const email = get("email");
	const consultationType = get("consultationType");
	const terms = data.get("terms");

	if (!name || !email || !consultationType) {
		return Response.json({ message: "Please fill in all required fields." }, { status: 422 });
	}
	if (!EMAIL_RE.test(email)) {
		return Response.json({ message: "Please enter a valid email address." }, { status: 422 });
	}
	if (!(consultationType in KNOWN_TYPES)) {
		return Response.json({ message: "Please select a valid consultation type." }, { status: 422 });
	}
	if (terms !== "on") {
		return Response.json({ message: "Please accept the terms and conditions." }, { status: 422 });
	}

	// Verify hCaptcha token
	const hcaptchaToken = get("h-captcha-response");
	const hcaptchaSecret = import.meta.env.HCAPTCHA_SECRET_KEY;
	if (!hcaptchaToken || !hcaptchaSecret) {
		return Response.json({ message: "Security check failed. Please try again." }, { status: 422 });
	}
	try {
		const result = await verifyHCaptcha(hcaptchaSecret, hcaptchaToken);
		if (!result.success) {
			console.error("hCaptcha rejected token:", result["error-codes"]);
			return Response.json({ message: "Security check failed. Please try again." }, { status: 422 });
		}
	} catch (err) {
		console.error("hCaptcha verification error:", err);
		return Response.json(
			{ message: "Could not verify the security challenge. Please try again." },
			{ status: 502 },
		);
	}

	const typeLabel = KNOWN_TYPES[consultationType];

	const locale = get("locale") || "en";

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
		return Response.json(
			{ message: "Your message could not be sent. Please try again or contact me directly." },
			{ status: 502 },
		);
	}

	return Response.json({
		message:
			"Thank you — your enquiry has been received. I will be in touch within a few days to confirm a time.",
	});
};
