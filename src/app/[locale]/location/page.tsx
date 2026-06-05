import { useTranslations, useLocale } from "next-intl";
import { getContent } from "@/lib/data";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function LocationPage() {
  const t = useTranslations("location");
  const locale = useLocale();
  const content = getContent();

  const address = locale === "ro" ? content.site.address_ro : content.site.address_ru;

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t("address_title")}</h3>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t("phone_title")}</h3>
                    <a
                      href={`tel:${content.site.phone}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {content.site.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t("email_title")}</h3>
                    <a
                      href={`mailto:${content.site.email}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {content.site.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t("hours_title")}</h3>
                    <p className="text-gray-600">{t("hours")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-200 h-full min-h-80 flex items-center justify-center rounded-2xl">
                <div className="text-center text-gray-500 p-8">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">
                    {locale === "ro" ? "Chișinău, Republica Moldova" : "Кишинёв, Республика Молдова"}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Chisinau,Moldova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    {locale === "ro" ? "Deschide în Google Maps" : "Открыть в Google Maps"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
