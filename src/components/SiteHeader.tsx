"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

/**
 * Sticky header. Transparent over the page top, then a soft linen bar with a
 * hairline once scrolled. Below md the links fold into a disclosure menu.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers which page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        open
          ? "border-b border-sand bg-linen"
          : scrolled
            ? "border-b border-sand bg-linen/90 backdrop-blur-md"
            : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8">
        <Link href="/" aria-label="Omkar Promos home" className="text-espresso">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="relative py-2 text-[15px] text-umber transition-colors hover:text-espresso aria-[current=page]:text-espresso"
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-walnut"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/quote"
            className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-walnut px-4 text-[14px] font-medium text-linen transition-colors hover:bg-walnut-deep sm:px-5"
          >
            Get a quote
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-espresso md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path
                d={open ? "M5 5l10 10M15 5L5 15" : "M3 7h14M3 13h14"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col px-5 pb-6">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-sand last:border-0">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block py-4 font-serif text-2xl text-espresso aria-[current=page]:text-walnut"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
