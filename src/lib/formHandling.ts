import { NextResponse } from "next/server";
import { z } from "zod";

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;

function requiredText(label: string, max = 4000) {
  return z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);
}

function optionalText(max = 4000) {
  return z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().max(max).optional()
  );
}

function optionalUrl() {
  return z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().url("Enter a valid URL.").optional()
  );
}

const honeypot = {
  websiteConfirm: optionalText(120)
};

export const sponsorInquirySchema = z.object({
  ...honeypot,
  companyName: requiredText("Company name", 160),
  contactName: requiredText("Contact name", 160),
  roleTitle: requiredText("Role/title", 160),
  email: z.string().trim().email("Enter a valid email address."),
  website: optionalUrl(),
  sponsorInterest: requiredText("Sponsor interest", 80),
  message: optionalText(),
  consent: z.boolean().refine(Boolean, "Consent is required.")
});

export const schoolRequestSchema = z.object({
  ...honeypot,
  adultContactName: requiredText("Adult contact name", 160),
  role: requiredText("Role", 160),
  schoolOrOrgName: requiredText("School or organization name", 220),
  district: optionalText(160),
  schoolEmail: z.string().trim().email("Enter a valid school email address."),
  schoolWebsite: optionalUrl(),
  city: requiredText("City", 120),
  state: requiredText("State", 80),
  isTitleI: requiredText("Title I status", 20),
  currentProgramType: requiredText("Program type", 80),
  requestedMaterials: requiredText("Requested materials"),
  itemLinks: optionalText(),
  approximateBudget: requiredText("Approximate budget", 120),
  studentsReached: requiredText("Students reached", 80),
  howMaterialsWillBeUsed: requiredText("How materials will be used"),
  timeline: optionalText(180),
  canAcceptShippedMaterials: requiredText("Shipping status", 20),
  publicListingPermission: requiredText("Public listing permission", 20),
  photoOrQuotePermission: requiredText("Photo or quote permission", 20),
  message: optionalText()
});

export const volunteerInquirySchema = z.object({
  ...honeypot,
  name: requiredText("Name", 160),
  email: z.string().trim().email("Enter a valid email address."),
  background: requiredText("Background"),
  canJudgeBuildChallenge: z.boolean().optional().default(false),
  canMentorStudents: z.boolean().optional().default(false),
  message: optionalText()
});

type FormSchema = typeof sponsorInquirySchema | typeof schoolRequestSchema | typeof volunteerInquirySchema;

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

function getIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatSubmissionHtml(title: string, data: Record<string, unknown>) {
  const rows = Object.entries(data)
    .filter(([key]) => key !== "websiteConfirm")
    .map(([key, value]) => {
      const displayValue = typeof value === "boolean" ? (value ? "yes" : "no") : String(value ?? "");
      return `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(displayValue)}</td></tr>`;
    })
    .join("");

  return `<h1>${escapeHtml(title)}</h1><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${rows}</table>`;
}

async function sendSubmissionEmail(subject: string, data: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[dev form submission] ${subject}`, data);
      return { delivered: false, devLogged: true };
    }

    throw new Error("FORM_EMAIL_NOT_CONFIGURED");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text: `${subject}\n\n${JSON.stringify(data, null, 2)}`,
      html: formatSubmissionHtml(subject, data)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EMAIL_SEND_FAILED: ${errorText}`);
  }

  return { delivered: true, devLogged: false };
}

export async function handleFormSubmission({
  request,
  schema,
  subject,
  successMessage
}: {
  request: Request;
  schema: FormSchema;
  subject: string;
  successMessage: string;
}) {
  const ip = getIp(request);

  if (isRateLimited(`${subject}:${ip}`)) {
    return NextResponse.json({ message: "Too many submissions. Please wait a minute and try again." }, { status: 429 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid form payload." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ message: "Invalid form payload." }, { status: 400 });
  }

  const rawPayload = payload as Record<string, unknown>;

  if (typeof rawPayload.websiteConfirm === "string" && rawPayload.websiteConfirm.trim() !== "") {
    return NextResponse.json({ message: successMessage });
  }

  const parsed = schema.safeParse(rawPayload);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || "Please check the form and try again.";
    return NextResponse.json({ message: firstIssue }, { status: 400 });
  }

  try {
    await sendSubmissionEmail(subject, parsed.data);
    return NextResponse.json({ message: successMessage });
  } catch (error) {
    if (error instanceof Error && error.message === "FORM_EMAIL_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          message:
            "Form email is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL before accepting production submissions."
        },
        { status: 503 }
      );
    }

    console.error(error);
    return NextResponse.json({ message: "The form could not be sent. Please try again later." }, { status: 502 });
  }
}
