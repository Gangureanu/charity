import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getEvents } from "@/lib/data";
import { Calendar, MapPin, Tag } from "lucide-react";

export default function EventsPage() {
  const t = useTranslations("events");
  const locale = useLocale();
  const events = getEvents();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t("no_events")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => {
                const title = locale === "ro" ? event.title_ro : event.title_ru;
                const location = locale === "ro" ? event.location_ro : event.location_ru;
                const description = locale === "ro" ? event.description_ro : event.description_ru;
                const dateStr = new Date(event.date).toLocaleDateString(
                  locale === "ro" ? "ro-RO" : "ru-RU",
                  { day: "numeric", month: "long", year: "numeric" }
                );

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Image placeholder */}
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-blue-300" />
                    </div>

                    <div className="p-6">
                      {event.free && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full mb-3">
                          {t("free")}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{dateStr}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>{location}</span>
                        </div>
                      </div>
                      <Link
                        href={`/${locale}/events/${event.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                      >
                        {t("read_more")} →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
