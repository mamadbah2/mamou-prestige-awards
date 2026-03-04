"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Nomines", href: "/nomines" },
  { label: "Resultats", href: "/resultats" },
  { label: "A Propos", href: "/a-propos" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-lepi-indigo shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-mpa.PNG"
            alt="Logo MPA"
            width={44}
            height={44}
            className="rounded-full"
          />
          <span className="font-serif text-lg font-bold text-lepi-white sm:text-xl">
            MPA <span className="text-lepi-gold">2026</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-lepi-white/80 transition-colors hover:bg-lepi-indigo-light hover:text-lepi-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/voter"
            className="ml-3 rounded-md bg-lepi-gold px-5 py-2 text-sm font-bold text-lepi-indigo transition-colors hover:bg-lepi-gold-light"
          >
            Voter
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-lepi-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="border-t border-lepi-indigo-light bg-lepi-indigo px-4 pb-4 pt-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-lepi-white/80 transition-colors hover:bg-lepi-indigo-light hover:text-lepi-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/voter"
            className="mt-2 block rounded-md bg-lepi-gold px-3 py-2 text-center text-base font-bold text-lepi-indigo transition-colors hover:bg-lepi-gold-light"
            onClick={() => setMobileMenuOpen(false)}
          >
            Voter
          </Link>
        </nav>
      )}
    </header>
  );
}
