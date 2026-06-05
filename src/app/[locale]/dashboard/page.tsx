import Link from "next/link";
import { useLocale } from "next-intl";
import { getEvents, getTeam } from "@/lib/data";
import { Calendar, Users, FileText, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const locale = useLocale();
  const events = getEvents();
  const team = getTeam();

  const cards = [
    {
      href: `/${locale}/dashboard/events`,
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      label: locale === "ro" ? "Evenimente" : "Мероприятия",
      count: events.length,
      bg: "bg-blue-50",
    },
    {
      href: `/${locale}/dashboard/team`,
      icon: <Users className="w-8 h-8 text-green-600" />,
      label: locale === "ro" ? "Membrii echipei" : "Члены команды",
      count: team.length,
      bg: "bg-green-50",
    },
    {
      href: `/${locale}/dashboard/content`,
      icon: <FileText className="w-8 h-8 text-amber-600" />,
      label: locale === "ro" ? "Conținut site" : "Контент сайта",
      count: null,
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {locale === "ro" ? "Panou de control" : "Панель управления"}
        </h1>
        <p className="text-gray-600 mt-1">
          {locale === "ro" ? "Gestionați conținutul site-ului" : "Управляйте содержимым сайта"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className={`w-14 h-14 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.label}</p>
                {card.count !== null && (
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.count}</p>
                )}
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent events */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === "ro" ? "Evenimente recente" : "Последние мероприятия"}
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-500 text-sm">
            {locale === "ro" ? "Nu există evenimente" : "Нет мероприятий"}
          </p>
        ) : (
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {locale === "ro" ? event.title_ro : event.title_ru}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {new Date(event.date).toLocaleDateString(locale === "ro" ? "ro-RO" : "ru-RU")}
                  </p>
                </div>
                {event.free && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {locale === "ro" ? "Gratuit" : "Бесплатно"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
