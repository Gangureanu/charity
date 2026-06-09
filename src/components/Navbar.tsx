"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname as useNextPathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe, Heart } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const nextPathname = useNextPathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const localeLabels: Record<string, string> = {
    ro: "Romana",
    ru: "Russkiy",
    en: "English",
  };
  const localeOptions = routing.locales.filter((candidate) => candidate !== locale);
  const getSwitchPath = (targetLocale: string) =>
    nextPathname.replace(/^\/[^/]+/, `/${targetLocale}`);

  const navLinks: Array<{
    href:
      | "/"
      | "/history"
      | "/events"
      | "/team"
      | "/location"
      | "/contact";
    label: string;
  }> = [
    { href: "/", label: t("home") },
    { href: "/history", label: t("history") },
    { href: "/events", label: t("events") },
    { href: "/team", label: t("team") },
    { href: "/location", label: t("location") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-[0_12px_30px_rgba(92,109,48,0.1)] border-b border-[#e6edd5]"
          : "bg-[#fbfcf7]/90 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ABA Moldova logo"
              width={358}
              height={154}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#73893b] bg-[#eef3e2]"
                    : "text-slate-700 hover:text-[#73893b] hover:bg-[#f6f8ef]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-[#73893b] hover:bg-[#f6f8ef] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{locale}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-[#e6edd5] overflow-hidden z-50">
                  {localeOptions.map((targetLocale) => (
                    <NextLink
                      key={targetLocale}
                      href={getSwitchPath(targetLocale)}
                      className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-[#f6f8ef] hover:text-[#73893b]"
                      onClick={() => setLangOpen(false)}
                    >
                      <span className="font-medium uppercase">{targetLocale}</span>
                      <span className="text-gray-500">{localeLabels[targetLocale] ?? targetLocale}</span>
                    </NextLink>
                  ))}
                </div>
              )}
            </div>

            {/* Donate button */}
            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-1 px-4 py-2 bg-[#d6a33b] text-[#173341] text-sm font-semibold rounded-lg hover:bg-[#c29231] transition-colors"
            >
              <Heart className="w-4 h-4" />
              {t("donate")}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:text-[#73893b] hover:bg-[#f6f8ef] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#e6edd5] shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#73893b] bg-[#eef3e2]"
                    : "text-slate-700 hover:text-[#73893b] hover:bg-[#f6f8ef]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1 px-3 py-2 bg-[#d6a33b] text-[#173341] rounded-md text-sm font-semibold"
            >
              <Heart className="w-4 h-4" />
              {t("donate")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
