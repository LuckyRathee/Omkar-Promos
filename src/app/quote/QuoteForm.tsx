"use client";

import { startTransition, useActionState, useState, type FormEvent, type ReactNode } from "react";
import { enquiry } from "@/content/site";
import { submitQuote, type QuoteState } from "./actions";

const initial: QuoteState = { status: "idle", message: "" };

const input =
  "w-full rounded-xl border border-sand bg-linen px-4 py-3 text-[16px] text-espresso placeholder:text-taupe/70 transition-colors focus:border-walnut focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-[#a8503b]";

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, initial);
  const [files, setFiles] = useState<File[]>([]);
  const err = state.fieldErrors ?? {};

  // Dispatch manually instead of <form action>, which resets every field after
  // the action runs and would wipe the visitor's entries on a validation error.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[24px] border border-sand bg-oat/60 p-10 text-center">
        <p className="font-serif text-[30px]">Request received</p>
        <p className="mx-auto mt-3 max-w-md text-umber">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12" noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Fieldset legend="Your artwork">
        <div className="sm:col-span-2">
          <label
            htmlFor="artwork"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-umber/30 bg-oat/50 px-6 py-10 text-center transition-colors hover:border-walnut hover:bg-oat"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden className="text-walnut">
              <path d="M14 19V6M8.5 11.5 14 6l5.5 5.5M5 21v2h18v-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-serif text-[20px]">Choose files to upload</span>
            <span className="text-[14px] text-taupe">JPG, PNG, PDF, AI, EPS or SVG · up to 3 files, 8 MB each</span>
          </label>
          <input
            id="artwork"
            name="artwork"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.pdf,.ai,.eps,.svg,.cdr,.psd"
            className="sr-only"
            aria-describedby={err.files ? "artwork-error" : undefined}
            aria-invalid={err.files ? true : undefined}
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
          {files.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-[14px] text-umber">
              {files.map((f) => (
                <li key={f.name} className="flex justify-between gap-4 rounded-lg bg-oat/60 px-3 py-2">
                  <span className="truncate">{f.name}</span>
                  <span className="shrink-0 tabular-nums text-taupe">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                </li>
              ))}
            </ul>
          )}
          <FieldError id="artwork-error">{err.files}</FieldError>
          <p className="mt-2 text-[14px] text-taupe">No file handy? Describe the design below and we&rsquo;ll follow up.</p>
        </div>

        <Field label="Service" htmlFor="product">
          <select id="product" name="product" className={input} defaultValue={enquiry.products[0]}>
            {enquiry.products.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field label="Request type" htmlFor="type">
          <select id="type" name="type" className={input}>
            {enquiry.types.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
      </Fieldset>

      <Fieldset legend="Design details">
        <Field label="Placement" htmlFor="placement">
          <select id="placement" name="placement" className={input}>
            {enquiry.placements.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field label="Fabric" htmlFor="fabric" hint="Towel, pique polo, twill cap, fleece…">
          <input id="fabric" name="fabric" className={input} />
        </Field>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-3 sm:col-span-2">
          <Field label="Width" htmlFor="width">
            <input id="width" name="width" inputMode="decimal" className={input} />
          </Field>
          <Field label="Height" htmlFor="height">
            <input id="height" name="height" inputMode="decimal" className={input} />
          </Field>
          <Field label="Unit" htmlFor="unit">
            <select id="unit" name="unit" className={input}>
              {enquiry.units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Estimated quantity" htmlFor="quantity">
          <input id="quantity" name="quantity" inputMode="numeric" className={input} />
        </Field>
        <Field label="Delivery" htmlFor="delivery" hint="Rush costs nothing extra">
          <select id="delivery" name="delivery" className={input}>
            {enquiry.delivery.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Anything else we should know?" htmlFor="details">
            <textarea id="details" name="details" rows={4} className={input} />
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="Your contact details">
        <Field label="Your name" htmlFor="name" required error={err.name}>
          <input id="name" name="name" autoComplete="name" className={input} required aria-invalid={err.name ? true : undefined} aria-describedby={err.name ? "name-error" : undefined} />
        </Field>
        <Field label="Company" htmlFor="company">
          <input id="company" name="company" autoComplete="organization" className={input} />
        </Field>
        <Field label="Email" htmlFor="email" required error={err.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={input} required aria-invalid={err.email ? true : undefined} aria-describedby={err.email ? "email-error" : undefined} />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </Field>
        <Field label="Country" htmlFor="country" required error={err.country}>
          <input id="country" name="country" autoComplete="country-name" className={input} required aria-invalid={err.country ? true : undefined} aria-describedby={err.country ? "country-error" : undefined} />
        </Field>
        <Field label="Contact me by" htmlFor="contactBy">
          <select id="contactBy" name="contactBy" className={input}>
            {enquiry.contactBy.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </Fieldset>

      <div className="flex flex-col gap-4 border-t border-sand pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className={`text-[15px] ${state.status === "error" ? "text-[#8f3f2c]" : "text-taupe"}`}>
          {state.status === "error" ? state.message : "Free quote, no obligation. You pay only after approving the proof."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-walnut px-8 text-[15px] font-medium text-linen transition-colors hover:bg-walnut-deep disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send request"}
        </button>
      </div>
    </form>
  );
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="font-serif text-[26px]">{legend}</legend>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-3 text-[14px] text-umber">
        <span>
          {label}
          {required && <span className="text-walnut"> *</span>}
        </span>
        {hint && <span className="truncate text-[13px] text-taupe">{hint}</span>}
      </label>
      {children}
      <FieldError id={`${htmlFor}-error`}>{error}</FieldError>
    </div>
  );
}

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-[14px] text-[#8f3f2c]">
      {children}
    </p>
  );
}
