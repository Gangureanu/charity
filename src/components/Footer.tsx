import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Heart, Phone, Mail, MapPin } from "lucide-react";
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold">ABA Moldova</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{tf("tagline")}</p>
            <div className="flex gap-3 mt-4">
              {content.site.facebook && (
                <a href={content.site.facebook} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  f
                </a>
              )}
              {content.site.instagram && (
                <a href={content.site.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  ig
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
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
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">{contactTitle}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <span>{address}</span>
              </li>
              {phoneNumbers.map((phone, index) => (
                <li key={phone} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className={`w-4 h-4 shrink-0 text-blue-400 ${index > 0 ? "opacity-0" : ""}`} />
                  <a href={toTelHref(phone)} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-blue-400" />
                <a href={`mailto:${content.site.email}`} className="hover:text-white transition-colors">
                  {content.site.email}
                </a>
              </li>
              {content.site.facebook && (
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-4 text-center shrink-0 text-blue-400 font-semibold">f</span>
                  <a href={content.site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {facebookLabel}: {socialHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ABA Moldova. {tf("rights")}.
          </p>
          <div className="flex gap-4">
            <Link href={`/${locale}/contact`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              {tf("privacy")}
            </Link>
            <Link href={`/${locale}/contact`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              {tf("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
