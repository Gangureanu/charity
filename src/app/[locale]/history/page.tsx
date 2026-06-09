import { useTranslations, useLocale } from "next-intl";
import { getContent } from "@/lib/data";
import { Clock } from "lucide-react";

export default function HistoryPage() {
  const t = useTranslations("history");
  const locale = useLocale();
  const content = getContent();
  const milestones = content.milestones;

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Mission & Founding */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("founding_title")}</h2>
              <p className="text-gray-700 leading-relaxed">{t("founding_text")}</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mission_title")}</h2>
              <p className="text-gray-700 leading-relaxed">{t("mission_text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center flex items-center justify-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            {t("milestones_title")}
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden sm:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const title = locale === "ru" ? milestone.title_ru : milestone.title_ro;
                const text = locale === "ru" ? milestone.text_ru : milestone.text_ro;
                return (
                  <div key={index} className="relative flex gap-6">
                    {/* Year bubble */}
                    <div className="shrink-0 w-16 h-16 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center text-xs font-bold shadow-md z-10">
                      <span className="text-sm">{milestone.year}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
