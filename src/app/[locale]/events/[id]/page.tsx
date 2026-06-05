import Link from "next/link";
import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getEvent } from "@/lib/data";
import { Calendar, MapPin, ArrowLeft, Tag } from "lucide-react";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const event = getEvent(id);
  if (!event) notFound();

  const title = locale === "ro" ? event.title_ro : event.title_ru;
  const location = locale === "ro" ? event.location_ro : event.location_ru;
  const description = locale === "ro" ? event.description_ro : event.description_ru;
  const dateStr = new Date(event.date).toLocaleDateString(
    locale === "ro" ? "ro-RO" : "ru-RU",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/events`}
          className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm mb-6 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === "ro" ? "Înapoi la evenimente" : "Назад к мероприятиям"}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Image */}
          <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <Calendar className="w-24 h-24 text-blue-300" />
          </div>

          <div className="p-8">
            {event.free && (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
                {locale === "ro" ? "Gratuit" : "Бесплатно"}
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="capitalize">{dateStr}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>{location}</span>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                {locale === "ro" ? "Înregistrează-te" : "Зарегистрироваться"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
