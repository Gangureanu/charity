import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getContent } from "@/lib/data";
import {
  Heart,
  Users,
  Calendar,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const content = getContent();
  const stats = content.stats;
  const te = useTranslations("events");
  const isRo = locale === "ro";

  const aboutParagraphs = isRo
    ? [
        "Școala de Valori este un centru educațional și de dezvoltare personală constituit în cadrul Fundației \"Donează pentru copii\". Fundația \"Donează pentru copii\" este o organizație non-profit cu o activitate de peste 11 ani, dedicată sprijinirii copiilor și tinerilor, inclusiv a celor cu cerințe educaționale speciale (CES). Scopul nostru principal este de a facilita integrarea socială și educațională a copiilor și tinerilor cu CES, oferind asistență psihologică atât acestora, cât și persoanelor care îi îngrijesc.",
        "Fundația noastră se concentrează pe sprijinirea familiilor copiilor cu CES prin programe educative și informative pentru copii, tineri, părinți și specialiști. Organizăm traininguri profesionale, cursuri de pregătire pentru cadre didactice, părinți și specialiști care lucrează cu copii diagnosticați cu tulburări de spectru autist, precum și activități de analiză aplicată a comportamentului pentru dezvoltarea abilităților sociale și emoționale.",
        "Unul dintre obiectivele noastre principale este crearea unui centru multifuncțional care să ofere servicii de psihoterapie, psihopedagogie, terapie ocupațională și alte forme de terapie pentru copii cu CES, autism, boli genetice rare, sindrom Down sau probleme comportamentale. De asemenea, organizăm ateliere practice precum olărit, arte plastice, catering și meșteșugărit, atât pentru copiii cu nevoi speciale, cât și pentru părinții lor."
      ]
    : [
        "Școala de Valori - это образовательный центр и пространство личностного развития, созданное в рамках Фонда \"Donează pentru copii\". Фонд является некоммерческой организацией с более чем 11-летним опытом поддержки детей и молодежи, в том числе детей с особыми образовательными потребностями.",
        "Наша цель - содействовать социальной и образовательной интеграции детей и молодежи с особыми образовательными потребностями, предоставляя психологическую поддержку как им, так и людям, которые о них заботятся. Мы развиваем образовательные и информационные программы для детей, молодых людей, родителей и специалистов, а также проводим профессиональные тренинги и курсы подготовки для тех, кто работает с детьми с расстройствами аутистического спектра.",
        "Одной из наших ключевых задач является создание многофункционального центра, который будет предоставлять услуги психотерапии, психопедагогики, трудотерапии и других форм терапии для детей с особыми образовательными потребностями, аутизмом, редкими генетическими заболеваниями, синдромом Дауна или поведенческими трудностями. Мы также организуем практические мастерские по керамике, изобразительному искусству, кейтерингу и ремеслам для детей с особыми потребностями и их родителей."
      ];

  const aboutHighlights = isRo
    ? [
        "Integrare socială și educațională pentru copii și tineri cu CES",
        "Asistență psihologică pentru beneficiari și îngrijitori",
        "Traininguri și cursuri pentru părinți, specialiști și cadre didactice",
        "Ateliere practice și intervenții terapeutice multidisciplinare"
      ]
    : [
        "Социальная и образовательная интеграция детей и молодежи с особыми потребностями",
        "Психологическая поддержка для бенефициаров и их опекунов",
        "Тренинги и курсы для родителей, специалистов и педагогов",
        "Практические мастерские и мультидисциплинарные терапевтические услуги"
      ];

  const aboutTitle = isRo ? "Despre noi" : "О нас";
  const aboutDocsNote = isRo
    ? "Actele de înregistrare de stat pot fi fi publicate aici imediat ce sunt încărcate în site."
    : "Документы о государственной регистрации могут быть опубликованы здесь сразу после загрузки на сайт.";

  const services = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: t("service_therapy"),
      desc: t("service_therapy_desc"),
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: t("service_education"),
      desc: t("service_education_desc"),
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("service_support"),
      desc: t("service_support_desc"),
      color: "bg-green-50 text-green-600",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t("service_integration"),
      desc: t("service_integration_desc"),
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        {/* Puzzle piece pattern background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="puzzle" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M20 0 L40 0 L40 10 Q50 10 50 20 Q50 30 40 30 L40 40 L20 40 L20 30 Q10 30 10 20 Q10 10 20 10 Z" fill="white" />
                <path d="M60 40 L80 40 L80 50 Q90 50 90 60 Q90 70 80 70 L80 80 L60 80 L60 70 Q50 70 50 60 Q50 50 60 50 Z" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#puzzle)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-blue-100 text-sm">
              <Heart className="w-4 h-4" fill="currentColor" />
              ABA Moldova
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("hero_title")}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
              {t("hero_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/history`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-800 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                {t("hero_cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-gray-900 font-semibold rounded-xl hover:bg-amber-300 transition-colors"
              >
                <Heart className="w-4 h-4" />
                {t("hero_donate")}
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 0C1200 40 900 55 720 55C540 55 240 40 0 0L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: stats.children, label: t("stats_children"), color: "text-blue-600" },
              { value: stats.families, label: t("stats_families"), color: "text-amber-600" },
              { value: stats.years, label: t("stats_years"), color: "text-green-600" },
              { value: stats.specialists, label: t("stats_specialists"), color: "text-purple-600" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t("mission_title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t("mission_text")}
              </p>
              <ul className="space-y-3">
                {[t("service_therapy"), t("service_education"), t("service_support"), t("service_integration")].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  )
                )}
              </ul>
              <Link
                href={`/${locale}/history`}
                className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                {t("hero_cta")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-12 h-12 text-white" fill="white" />
                  </div>
                  <p className="text-blue-800 font-semibold text-lg">ABA Moldova</p>
                  <p className="text-blue-600 text-sm mt-1">
                    {locale === "ro" ? "Împreună facem diferența" : "Вместе мы делаем разницу"}
                  </p>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-100 rounded-full -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 bg-[#fafbf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eef3e2] px-4 py-2 text-sm font-medium text-[#73893b] mb-5">
                <Heart className="w-4 h-4" fill="currentColor" />
                {aboutTitle}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {isRo ? "Școala de Valori și Fundația \"Donează pentru copii\"" : "Școala de Valori и Фонд \"Donează pentru copii\""}
              </h2>
              <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[#e6edd5] bg-white px-5 py-4 text-sm text-slate-600">
                {aboutDocsNote}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#e6edd5] shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-5">
                {isRo ? "Direcții principale de activitate" : "Основные направления деятельности"}
              </h3>
              <ul className="space-y-4">
                {aboutHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-[#73893b]" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("services_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {te("title")}
          </h2>
          <p className="text-gray-600 mb-8">{te("subtitle")}</p>
          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {te("title")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta_title")}</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">{t("cta_text")}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors text-lg"
          >
            <Heart className="w-5 h-5" />
            {t("cta_button")}
          </Link>
        </div>
      </section>
    </>
  );
}
