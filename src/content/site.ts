/**
 * All site copy, extracted from omkarpromos.com (October 2026) and lightly
 * edited: typos fixed, run-on sentences split, nothing invented.
 * Facts the old site never stated are marked TODO for the client to supply.
 */

export const company = {
  name: "Omkar Promos",
  tagline: "Your source for all types of digitizing",
  email: "info@omkarpromos.com",
  phone: null as string | null, // TODO: the old site lists no phone number
  address: {
    street: "1008 Harlan Drive",
    city: "San Jose",
    region: "CA",
    postcode: "95129",
    country: "USA",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/omkarpromos" },
    { label: "Facebook", href: "https://www.facebook.com/pages/Omkarpromos/214800735273008" },
    { label: "Twitter", href: "https://twitter.com/omkarpromoss" },
  ],
};

export const nav = [
  { href: "/embroidery-digitizing", label: "Embroidery" },
  { href: "/vector-art", label: "Vector Art" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export const pricing = {
  perThousand: 1.5,
  marketLow: 3,
  marketHigh: 15,
  rushSurcharge: 0,
  turnaround: "24–48 hours",
  vectorTurnaround: "Next day",
};

/** The short promises repeated across the old site, gathered in one place. */
export const promises = [
  { title: "$1.50 per 1,000 stitches", body: "Other digitizers charge $3.00 to $15.00 for the same thousand stitches." },
  { title: "No rush surcharge", body: "Rush jobs cost the same. We only ask that you rush when you really need to." },
  { title: "Back in 24–48 hours", body: "Most embroidery files return within two days. Vector art is next-day as standard." },
  { title: "Free quotes, free stitch estimates", body: "Send your artwork and we'll tell you the price before any work starts." },
];

export const home = {
  welcome: [
    "We built Omkar Promos on a commitment to quality embroidery digitizing, tailored to your needs. Our digitizers, designers and artists are trained professionals who work with current digitizing software and know how designs behave on the machine.",
    "We support every common embroidery file format and focus on quality digitizing at a fair price. Our team answers questions around the clock, by email or live chat, and you can leave a message any time.",
    "Bring us complex work on a tight deadline. We take every job as a challenge, and we don't disappoint.",
  ],
  volumeNote:
    "Placing high volumes every month? Email us your approximate monthly order volume and company details, and we'll tell you the invoicing cycles we can offer.",
};

export const embroidery = {
  intro:
    "Embroidery digitizing turns your artwork into a file an embroidery machine can read. A digitizer plots every stitch point, sets the stitch types and order, and adds compensation for the fabric. Without that file, the machine doesn't know where to sew.",
  body: [
    "We digitize every kind of logo and design to your requirements: left chests, caps, jacket backs, badges and more. Send a high-resolution JPG and tell us the garment, the fabric, and the width and height you need.",
    "Every order comes back as two files: the machine file in your format, and a PDF image of the finished design so you can check spelling and size before it goes on a garment.",
  ],
  punching: {
    title: "Why it's called “punching”",
    body: "Before computers, embroidery machines were driven by paper tape. Each design was punched into the tape, one tiny hole per stitch. The tapes were so long that a coiled roll measured 18 to 24 inches across. Embroiderers still say “punching a design” when they mean digitizing it.",
  },
};

/** File formats from the old Profile page, de-duplicated and grouped by machine brand. */
export const formats: { brand: string; ext: string[] }[] = [
  { brand: "Tajima", ext: ["DST", "DSB", "TBF"] },
  { brand: "Brother · Babylock · Bernina", ext: ["PES", "PEC"] },
  { brand: "Janome", ext: ["JEF", "SEW"] },
  { brand: "Elna · Kenmore", ext: ["SEW"] },
  { brand: "Elna Xquisite", ext: ["EMD"] },
  { brand: "Melco", ext: ["EXP"] },
  { brand: "Barudan", ext: ["DAT", "DSB", "EXY"] },
  { brand: "Pfaff", ext: ["PCS", "VIP", "KSM", "PCM", "PCQ"] },
  { brand: "Viking Husqvarna", ext: ["HUS", "SHV", "VIP"] },
  { brand: "Singer · Poem", ext: ["PCS", "XXX"] },
  { brand: "Compucon", ext: ["XXX"] },
  { brand: "Happy", ext: ["TAP"] },
  { brand: "Pulse", ext: ["PXF", "PSF"] },
  { brand: "ZSK", ext: ["ZSK", "DSZ"] },
];

export const vectorArt = {
  intro:
    "Vector art is drawn in illustration software such as Illustrator, Photoshop and CorelDRAW. Instead of a fixed grid of pixels, it is built from points, lines and shapes, so it stays clean and camera-ready at any size.",
  body: [
    "Blow up a raster image and it turns blocky and pixelated. Blow up a vector and every edge stays smooth. That's why logos belong in vector: the same file works on a business card and on a billboard.",
    "We've spent years training our artists, and we supply vector artwork and image editing to some of the largest suppliers and distributors in the promotional products industry.",
  ],
  services: ["Custom artwork", "Sketch to camera-ready art", "Logo redraw", "Logo design", "Image editing"],
  strengths: [
    "Expertise in Illustrator, Photoshop and CorelDRAW",
    "Next-day service as standard",
    "Your files archived and available 24/7",
    "Custom services for unusual requirements",
  ],
};

export const process = [
  { title: "Send your artwork", body: "Email a high-resolution JPG or use the quote form. Tell us the garment, fabric and size." },
  { title: "Get a free quote", body: "We estimate the stitch count and send you a price before any work starts." },
  { title: "Approve the proof", body: "Once you say go, we digitize the design and send you an image of the finished result." },
  { title: "Pay and download", body: "Happy with it? Pay the PayPal invoice link (no PayPal account needed) and we send your machine file." },
];

export const faqs = [
  {
    q: "What is embroidery digitizing?",
    a: "Before an embroidery machine can sew a logo or design, the art has to be converted into a format the machine can read. A digitizer (that's us) takes your file and plots the points that make up the final design. Without this file the machine doesn't know where to sew.",
  },
  {
    q: "Why can't I open the file you sent me?",
    a: "Every finished design comes as two files. The first can only be opened by an embroidery machine or embroidery software. The second is a PDF image of the completed design, so you can check spelling and sizing without special software.",
  },
  {
    q: "Can I use a left chest logo on a full back?",
    a: "No. A digitized file is a series of x,y points, one stitch to the next. Stretch a 4,000-stitch left chest or cap design over a much larger area and the points spread too far apart: you get baggy stitches and nowhere near enough coverage. The reverse is also true. Squeeze a 10,000-stitch design into a 3″ × 3″ space and you get a knotted mess.",
  },
  {
    q: "What is your standard turnaround time?",
    a: "We aim to return every file within 24–48 hours. Rush service is available at no extra charge. We ask that you only rush jobs when it's truly necessary, so we can keep it free for everyone.",
  },
  {
    q: "How do I pay?",
    a: "First, send us the file you'd like quoted. When you tell us to go ahead, we digitize it and send you an image of the finished design. If you're happy, pay through the PayPal invoice link we send, and we'll email you the embroidery file to take to your local embroidery shop. You don't need a PayPal account.",
  },
  {
    q: "Why do you need to know the fabric?",
    a: "Stitches behave differently on different materials, and we compensate for that. On a towel, for example, we add extra stitches called underlay to give the embroidery a smoother surface. If we don't know it's a towel, we can't add them. Every detail about your job makes for better embroidery.",
  },
  {
    q: "Can I change the thread colors?",
    a: "Yes. The embroidery file tells the machine two things: where to sew and when to change color. It doesn't say which color to change to. Your embroiderer assigns the colors from the thread they have available.",
  },
  {
    q: "Which file format should I ask for?",
    a: "The person doing your embroidery knows best, because they know which format their machines take. If you're not sure, ask for DST, the most common format. If you later need a different format, we'll convert it at no extra charge, as long as the format is available to us.",
  },
];

const thumb = (path: string) => `https://www.omkarpromos.com/graphics/thumbs/${path}.jpg`;

/** Sample work. The originals are 160×120 thumbnails; replace with high-res photos when available. */
export const gallery = {
  embroidery: [
    "31", "32", "33", "28", "29", "30", "04", "01", "02", "03", "08", "05", "06", "07", "10", "34",
    "09", "11", "12", "13", "14", "15", "16", "20", "17", "18", "19", "24", "21", "22", "23",
  ].map((n) => ({ src: thumb(`embroidery/${n}`), alt: `Embroidery digitizing sample ${Number(n)}` })),
  vector: Array.from({ length: 12 }, (_, i) => ({
    src: thumb(`vector-art/${i + 1}`),
    alt: `Vector art sample ${i + 1}`,
  })),
};

export const enquiry = {
  products: ["Embroidery digitizing", "Vector art"],
  types: ["Quote", "Order"],
  contactBy: ["Email", "Phone", "Phone and email"],
  units: ["inches", "mm", "cm"],
  delivery: ["48 hours (2 days)", "24 hours (1 day)", "Rush (as soon as possible)"],
  placements: ["Left chest", "Cap front", "Jacket back", "Sleeve", "Badge / patch", "Other"],
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  legacyPath: string;
};

export const articles: Article[] = [
  {
    slug: "embroidery-digitizing-in-usa",
    title: "Embroidery digitizing in the USA",
    legacyPath: "/Embroidery-Digitizing-in-USA.html",
    excerpt: "Quality, affordable embroidery digitizing in the USA, at $1.50 per thousand stitches.",
    body: [
      "Looking for quality, affordable embroidery digitizing in the USA? Omkar Promos brings you professional digitizing at a price that fits your budget. We aren't only digitizers serving the embroidery trade. We know how to make designs that catch the eye, and we believe quality speaks for itself.",
      "Online, digitizing prices run from $3.00 to $15.00 per thousand stitches. Ours stay at $1.50 per thousand. Compare us with other companies, or send a test job and judge the results yourself.",
      "Our experienced digitizers and designers are what got us here, and they're why we can take on challenging work. We're available 24/7, and we deliver reliable work on time.",
    ],
  },
  {
    slug: "embroidery-digitizing-in-uk",
    title: "Embroidery digitizing in the UK",
    legacyPath: "/Embroidery-Digitizing-in-UK.html",
    excerpt: "Computers made digitizing simpler. We serve embroiderers in the UK as well as the USA.",
    body: [
      "Some people think stitching and digitizing are complicated. Computers have changed that. Whether you're in the UK or the USA, we're here to turn your logo into a clean, creative embroidery file.",
      "Send us the garment details and your image. Tell us whether it's going on a cap, T-shirt, jacket, badge or anything else, and the width and height you need. Our full-time digitizers and designers turn any logo into an easy-to-use, high-quality embroidery file.",
      "Customers in the UK can reach us any time. We listen to what you need, bring fresh ideas, and deliver what we promise.",
    ],
  },
  {
    slug: "embroidery-digitizing-service",
    title: "Our embroidery digitizing service",
    legacyPath: "/Embroidery-Digitizing-Service.html",
    excerpt: "Send us the raw file. We'll take on any image, with free stitch estimates and fast delivery.",
    body: [
      "At Omkar Promos, every client gets first-class digitizing. We take on all kinds of images: send us the raw file and we'll handle the rest. None of it would be possible without our professional digitizers and designers.",
      "What sets us apart is round-the-clock service at affordable rates. If you're new to digitizing, don't worry: our team will guide you through it. Take a look at our gallery to see samples of our work.",
      "We've served embroidery companies for years. Our focus is simple: top-quality digitizing, fast turnaround, low prices, good customer service and free stitch estimates.",
    ],
  },
  {
    slug: "embroidery-digitizing-services",
    title: "The people behind our digitizing",
    legacyPath: "/Embroidery-Digitizing-Services.html",
    excerpt: "Our digitizers have years of experience designing logos. We hire only trained, experienced people.",
    body: [
      "We're proud of our digitizers, who have years of experience turning logos into great embroidery. We only hire people who are trained and experienced in embroidery design.",
      "We digitize all kinds of logos. Before computers, designs were punched by hand into long paper tapes, one tiny hole per stitch, and the coiled tapes measured 18 to 24 inches across. That's why digitizing a design is still called punching.",
      "We work closely with you on every order and are available 24/7, by email or live chat. If you need a specific format, tell us. Send a high-resolution JPG to info@omkarpromos.com to get started.",
    ],
  },
  {
    slug: "embroidery-digitizing-usa-and-canada",
    title: "Embroidery digitizing in the USA and Canada",
    legacyPath: "/blog.html",
    excerpt: "How digitizing software lets embroiderers finish intricate designs faster.",
    body: [
      "Computers and digitizing software have made it far easier for embroiderers to complete intricate work. Digitizing services across the USA and Canada now work out the stitch types and counts a design needs, so you get your job done in the shortest time.",
      "Good digitizing can turn ordinary artwork into a realistic, striking design, however complex the style. You only need to send your idea or a picture of the design.",
      "A reputable digitizing company employs skilled people who keep every detail intact, so the finished embroidery doesn't lose its appeal. Choose one that will meet your expectations.",
    ],
  },
];

/** Old URLs → new routes, applied as permanent redirects in next.config.ts. */
export const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/index.html", destination: "/" },
  { source: "/about_embroidery_digitizing.html", destination: "/about" },
  { source: "/embroidery_digitizing.html", destination: "/embroidery-digitizing" },
  { source: "/embroidery_02.html", destination: "/embroidery-digitizing" },
  { source: "/vector-art.html", destination: "/vector-art" },
  { source: "/embroidery_digitising_faq.html", destination: "/faq" },
  { source: "/enquiry.php", destination: "/quote" },
  { source: "/enquiry.html", destination: "/quote" },
  { source: "/contact_embroidery_digitizer.html", destination: "/contact" },
  { source: "/articles.html", destination: "/articles" },
  { source: "/sitemap.html", destination: "/" },
  ...articles.map((a) => ({ source: a.legacyPath, destination: `/articles/${a.slug}` })),
];
