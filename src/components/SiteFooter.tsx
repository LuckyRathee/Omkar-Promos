import Link from "next/link";
import { company, nav } from "@/content/site";
import { Logo } from "./Logo";
import { Container } from "./ui/Section";

export function SiteFooter() {
  const { address } = company;
  return (
    <footer className="border-t border-sand bg-oat/70 pb-16 pt-16 sm:pb-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[15px] leading-relaxed text-umber">
              Embroidery digitizing and vector art for embroiderers and promotional product teams.
            </p>
          </div>

          <div>
            <h2 className="text-[13px] font-medium tracking-[0.08em] text-taupe uppercase">Pages</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/quote", label: "Get a quote" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-umber transition-colors hover:text-espresso">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[13px] font-medium tracking-[0.08em] text-taupe uppercase">Contact</h2>
            <address className="mt-4 space-y-2.5 text-[15px] not-italic text-umber">
              <a href={`mailto:${company.email}`} className="block text-espresso underline decoration-walnut/30 underline-offset-4 hover:decoration-walnut">
                {company.email}
              </a>
              <p>
                {address.street}
                <br />
                {address.city}, {address.region} {address.postcode}
                <br />
                {address.country}
              </p>
            </address>
          </div>

          <div>
            <h2 className="text-[13px] font-medium tracking-[0.08em] text-taupe uppercase">Follow</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {company.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-umber transition-colors hover:text-espresso">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stitch-rule mt-14" aria-hidden />
        <p className="mt-6 text-[13px] text-taupe">© Omkar Promos. All rights reserved.</p>
      </Container>
    </footer>
  );
}
