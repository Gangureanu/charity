import Link from "next/link";
import { useLocale } from "next-intl";
import { getEvents, getTeam } from "@/lib/data";
import { Calendar, Users, FileText, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const locale = useLocale();
  const events = getEvents();
  const team = getTeam();
  const isRu = locale === "ru";
  const isEn = locale === "en";

  const cards = [
    {
      href: `/${locale}/dashboard/events`,
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      label: isRu ? "Мероприятия" : isEn ? "Events" : "Evenimente",
      count: events.length,
      bg: "bg-blue-50",
    },
    {
      href: `/${locale}/dashboard/team`,
      icon: <Users className="w-8 h-8 text-green-600" />,
      label: isRu ? "Члены команды" : isEn ? "Team members" : "Membrii echipei",
      count: team.length,
      bg: "bg-green-50",
    },
    {
      href: `/${locale}/dashboard/content`,
      icon: <FileText className="w-8 h-8 text-amber-600" />,
      label: isRu ? "Контент сайта" : isEn ? "Site content" : "Conținut site",
      count: null,
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isRu ? "Панель управления" : isEn ? "Dashboard" : "Panou de control"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isRu ? "Управляйте содержимым сайта" : isEn ? "Manage your site content" : "Gestionați conținutul site-ului"}
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
          {isRu ? "Последние мероприятия" : isEn ? "Recent events" : "Evenimente recente"}
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-500 text-sm">
            {isRu ? "Нет мероприятий" : isEn ? "No events yet" : "Nu există evenimente"}
          </p>
        ) : (
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {isRu ? event.title_ru : event.title_ro}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {new Date(event.date).toLocaleDateString(isRu ? "ru-RU" : isEn ? "en-GB" : "ro-RO")}
                  </p>
                </div>
                {event.free && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {isRu ? "Бесплатно" : isEn ? "Free" : "Gratuit"}
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
