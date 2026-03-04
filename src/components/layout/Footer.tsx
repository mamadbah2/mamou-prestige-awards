import Link from "next/link";
import Image from "next/image";
import { LepiPattern } from "@/components/patterns/LepiPattern";

export function Footer() {
  return (
    <footer className="relative bg-lepi-indigo-dark text-lepi-white">
      <LepiPattern opacity={0.04} />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Logo + description */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo-mpa.PNG"
                alt="Logo MPA"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-serif text-lg font-bold">
                MPA <span className="text-lepi-gold">2026</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-lepi-white/70">
              Le Mamou Prestige Award celebre l&apos;excellence, le merite et
              le talent dans la prefecture de Mamou, Republique de Guinee.
            </p>
          </div>

          {/* Column 2: Liens */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-lepi-gold">
              Liens Rapides
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Accueil", href: "/" },
                { label: "Categories", href: "/categories" },
                { label: "Nomines", href: "/nomines" },
                { label: "Resultats", href: "/resultats" },
                { label: "A Propos", href: "/a-propos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-lepi-white/70 transition-colors hover:text-lepi-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact + Social */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-lepi-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-lepi-white/70">
              <li>Mamou, Republique de Guinee</li>
              <li>
                <a
                  href="mailto:contact@mamouprestige.com"
                  className="transition-colors hover:text-lepi-gold"
                >
                  contact@mamouprestige.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+224620000000"
                  className="transition-colors hover:text-lepi-gold"
                >
                  +224 620 00 00 00
                </a>
              </li>
            </ul>

            {/* Social icons (placeholder) */}
            <div className="mt-4 flex gap-3">
              {["Facebook", "Instagram", "YouTube"].map((social) => (
                <span
                  key={social}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-lepi-white/20 text-xs text-lepi-white/60 transition-colors hover:border-lepi-gold hover:text-lepi-gold"
                  title={social}
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-lepi-white/10 pt-6 text-center text-xs text-lepi-white/50">
          &copy; 2026 Mamou Prestige Award. Tous droits reserves.
        </div>
      </div>
    </footer>
  );
}
