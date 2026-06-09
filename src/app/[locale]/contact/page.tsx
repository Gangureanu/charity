"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from "lucide-react";

interface SiteContent {
  site: {
    phone: string;
    phone_secondary: string;
    email: string;
    address_ro: string;
    address_ru: string;
    facebook: string;
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/content")
      .then((response) => response.json())
      .then(setContent)
      .catch(() => setContent(null));
  }, []);

  const phoneNumbers = [content?.site.phone, content?.site.phone_secondary].filter(
    (phone): phone is string => Boolean(phone)
  );
  const address = locale === "ro" ? content?.site.address_ro : content?.site.address_ru;
  const toTelHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
  const infoTitle = locale === "ro" ? "Date de contact" : "Контактные данные";
  const addressLabel = locale === "ro" ? "Adresă" : "Адрес";
  const facebookLabel = locale === "ro" ? "Facebook" : "Facebook";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission - in production, connect to email service
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setLoading(false);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-blue-100 text-xl">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{infoTitle}</h2>
              <div className="space-y-5 text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 shrink-0 text-[#a3c61e]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{addressLabel}</p>
                    <p className="mt-1 leading-relaxed">{address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 shrink-0 text-[#a3c61e]" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{t("phone")}</p>
                    {phoneNumbers.map((phone) => (
                      <a
                        key={phone}
                        href={toTelHref(phone)}
                        className="block hover:text-[#a3c61e] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 shrink-0 text-[#a3c61e]" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{t("email")}</p>
                    <a href={`mailto:${content?.site.email ?? "fundatiadpc@gmail.com"}`} className="block hover:text-[#a3c61e] transition-colors">
                      {content?.site.email ?? "fundatiadpc@gmail.com"}
                    </a>
                  </div>
                </div>
                {content?.site.facebook && (
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-1 shrink-0 rounded-full bg-[#a3c61e] text-[#314106] text-[11px] font-bold flex items-center justify-center">
                      f
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-900">{facebookLabel}</p>
                      <a
                        href={content.site.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-[#a3c61e] transition-colors"
                      >
                        TenderHeartMD
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {status === "success" && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-green-700 font-medium">{t("success")}</p>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <p className="text-red-700 font-medium">{t("error")}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("name")}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone")}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("message")}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {t("send")}
              </button>
            </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
