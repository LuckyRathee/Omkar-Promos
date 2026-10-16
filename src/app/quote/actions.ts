"use server";

import { company, enquiry } from "@/content/site";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "country" | "files", string>>;
};

const MAX_FILES = 3;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/**
 * Validates the quote request and emails it (with artwork attached) through
 * Resend. Needs RESEND_API_KEY; QUOTE_TO_EMAIL and QUOTE_FROM_EMAIL are optional.
 * Without a key it returns an honest error asking the visitor to email instead.
 */
export async function submitQuote(_prev: QuoteState, fd: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never see or fill this field.
  if (str(fd, "website")) return { status: "success", message: "Thanks, we've received your request." };

  const fields = {
    name: str(fd, "name"),
    company: str(fd, "company"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    country: str(fd, "country"),
    product: str(fd, "product"),
    type: str(fd, "type"),
    placement: str(fd, "placement"),
    width: str(fd, "width"),
    height: str(fd, "height"),
    unit: str(fd, "unit"),
    fabric: str(fd, "fabric"),
    quantity: str(fd, "quantity"),
    delivery: str(fd, "delivery"),
    contactBy: str(fd, "contactBy"),
    details: str(fd, "details"),
  };

  const files = fd.getAll("artwork").filter((f): f is File => f instanceof File && f.size > 0);

  const fieldErrors: QuoteState["fieldErrors"] = {};
  if (!fields.name) fieldErrors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) fieldErrors.email = "Enter an email address like name@company.com.";
  if (!fields.country) fieldErrors.country = "Enter your country.";
  if (files.length > MAX_FILES) fieldErrors.files = `Attach up to ${MAX_FILES} files.`;
  else if (files.some((f) => f.size > MAX_FILE_BYTES)) fieldErrors.files = "Each file must be 8 MB or smaller.";
  if (!enquiry.products.includes(fields.product)) fields.product = enquiry.products[0];

  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `Our online form isn't connected yet. Please email your artwork and details to ${company.email}.`,
    };
  }

  const size = fields.width || fields.height ? `${fields.width || "?"} × ${fields.height || "?"} ${fields.unit}` : "Not given";
  const lines = [
    ["Name", fields.name],
    ["Company", fields.company],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Country", fields.country],
    ["Service", fields.product],
    ["Request", fields.type],
    ["Placement", fields.placement],
    ["Design size", size],
    ["Fabric", fields.fabric],
    ["Quantity", fields.quantity],
    ["Delivery", fields.delivery],
    ["Contact by", fields.contactBy],
    ["Details", fields.details],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const attachments = await Promise.all(
    files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()).toString("base64") })),
  );

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? `Omkar Promos website <quotes@omkarpromos.com>`,
      to: [process.env.QUOTE_TO_EMAIL ?? company.email],
      reply_to: fields.email,
      subject: `${fields.type || "Quote"} request: ${fields.product} from ${fields.name}`,
      text: lines,
      attachments,
    }),
  });

  if (!res.ok) {
    return {
      status: "error",
      message: `We couldn't send your request just now. Please try again, or email ${company.email}.`,
    };
  }

  return {
    status: "success",
    message: "Thanks. We've received your artwork and will email your free quote soon.",
  };
}
