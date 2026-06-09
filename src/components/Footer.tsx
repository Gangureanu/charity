import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { getContent } from "@/lib/data";

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const content = getContent();

  const address = locale === "ro" ? content.site.address_ro : content.site.address_ru;
  const phoneNumbers = [content.site.phone, content.site.phone_secondary].filter(Boolean);
  const facebookLabel = locale === "ro" ? "Facebook" : "Facebook";
  const contactTitle = locale === "ro" ? "Contact" : "Контакты";
  const socialHandle = "TenderHeartMD";

  const toTelHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="bg-[#173341] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={358}
                height={154}
                className="h-14 w-auto"
              />
            </div>
            <p className="text-[#c8ddd0] text-sm leading-relaxed">{tf("tagline")}</p>
            <div className="flex gap-3 mt-4">
              {content.site.facebook && (
                <a href={content.site.facebook} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 bg-[#264a3b] rounded-full flex items-center justify-center hover:bg-[#3f8a55] transition-colors">
                  f
                </a>
              )}
              {content.site.instagram && (
                <a href={content.site.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 bg-[#264a3b] rounded-full flex items-center justify-center hover:bg-[#3f8a55] transition-colors">
                  ig
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c8ddd0] mb-4">
              {t("home")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/history`, label: t("history") },
                { href: `/${locale}/events`, label: t("events") },
                { href: `/${locale}/team`, label: t("team") },
                { href: `/${locale}/location`, label: t("location") },
                { href: `/${locale}/contact`, label: t("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#dce9df] hover:text-[#8fd0a1] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c8ddd0] mb-4">{contactTitle}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#dce9df] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#8fd0a1]" />
                <span>{address}</span>
              </li>
              {phoneNumbers.map((phone, index) => (
                <li key={phone} className="flex items-center gap-2 text-[#dce9df] text-sm">
                  <Phone className={`w-4 h-4 shrink-0 text-[#8fd0a1] ${index > 0 ? "opacity-0" : ""}`} />
                  <a href={toTelHref(phone)} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2 text-[#dce9df] text-sm">
                <Mail className="w-4 h-4 shrink-0 text-[#8fd0a1]" />
                <a href={`mailto:${content.site.email}`} className="hover:text-white transition-colors">
                  {content.site.email}
                </a>
              </li>
              {content.site.facebook && (
                <li className="flex items-center gap-2 text-[#dce9df] text-sm">
                  <span className="w-4 text-center shrink-0 text-[#8fd0a1] font-semibold">f</span>
                  <a href={content.site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {facebookLabel}: {socialHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2d5846] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#aac8b2] text-sm">
            © {new Date().getFullYear()} {tf("rights")}.
          </p>
          <div className="flex gap-4">
            <Link href={`/${locale}/contact`} className="text-[#aac8b2] hover:text-[#8fd0a1] text-sm transition-colors">
              {tf("privacy")}
            </Link>
            <Link href={`/${locale}/contact`} className="text-[#aac8b2] hover:text-[#8fd0a1] text-sm transition-colors">
              {tf("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
