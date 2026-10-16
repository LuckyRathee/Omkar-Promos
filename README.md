# Omkar-Promos

The new website for Omkar Promos: embroidery digitizing and vector art, San Jose, CA.
Warm, minimal design built with Next.js 16, React 19, Tailwind CSS 4 and Motion.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero with before/after artwork slider, pricing, services, samples, process, FAQ preview |
| `/embroidery-digitizing` | Service details, pricing, 31 samples, 29 machine formats by brand |
| `/vector-art` | What vector art is, services, 12 samples |
| `/about` | Company profile, promises, high-volume orders |
| `/faq` | All 8 FAQs (with FAQPage structured data) |
| `/quote` | Quote / enquiry form with artwork upload |
| `/contact` | Email, address, social links |
| `/articles`, `/articles/[slug]` | The 5 articles from the old site |

Old URLs (`enquiry.php`, `about_embroidery_digitizing.html`, `blog.html`, …) redirect permanently to the new routes. See `legacyRedirects` in `src/content/site.ts`.

## Editing content

All copy lives in **`src/content/site.ts`**: company details, pricing, services, FAQs, file formats, gallery images and articles. Change text there; the pages pick it up.

Sample images currently load from `www.omkarpromos.com/graphics/thumbs/…`. They are 160×120 thumbnails. Replace them with high-resolution photos in `public/` and update the `gallery` entries.

## Quote form email

The form sends requests (with attached artwork) through [Resend](https://resend.com). Set these in `.env.local` or your host's environment:

```bash
RESEND_API_KEY=re_...
QUOTE_TO_EMAIL=info@omkarpromos.com          # optional, defaults to info@omkarpromos.com
QUOTE_FROM_EMAIL="Omkar Promos <quotes@omkarpromos.com>"  # optional; the domain must be verified in Resend
```

Without `RESEND_API_KEY`, the form validates input and then asks visitors to email info@omkarpromos.com instead.

## Still needed from Omkar Promos

- High-resolution photos of sample work
- A phone number (the old site lists none)
- Revision policy and vector art pricing
