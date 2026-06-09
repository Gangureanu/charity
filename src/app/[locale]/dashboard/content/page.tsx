"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Save, CheckCircle } from "lucide-react";

interface SiteContent {
  site: {
    name: string;
    tagline_ro: string;
    tagline_ru: string;
    phone: string;
    phone_secondary: string;
    email: string;
    address_ro: string;
    address_ru: string;
    facebook: string;
    instagram: string;
    map_embed: string;
  };
  stats: {
    children: string;
    families: string;
    years: string;
    specialists: string;
  };
  milestones: Array<{
    year: string;
    title_ro: string;
    title_ru: string;
    text_ro: string;
    text_ru: string;
  }>;
}

export default function DashboardContentPage() {
  const locale = useLocale();
  const isRu = locale === "ru";
  const isEn = locale === "en";
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/content").then((r) => r.json()).then(setContent);
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    await fetch("/api/dashboard/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!content) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isRu ? "Управление контентом" : isEn ? "Manage content" : "Gestionare conținut"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isRu ? "Редактируйте контактную информацию и статистику" : isEn ? "Edit contact details and statistics" : "Editați informațiile de contact și statisticile"}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? (isRu ? "Сохранено!" : isEn ? "Saved!" : "Salvat!") : (isRu ? "Сохранить" : isEn ? "Save" : "Salvează")}
        </button>
      </div>

      <div className="space-y-8">
        {/* Site Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isRu ? "Контактная информация" : isEn ? "Contact information" : "Informații de contact"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "phone", label: isRu ? "Телефон" : isEn ? "Phone" : "Telefon" },
              { key: "email", label: "Email" },
              { key: "address_ro", label: isRu ? "Адрес (RO)" : isEn ? "Address (RO)" : "Adresă (RO)" },
              { key: "address_ru", label: isRu ? "Адрес (RU)" : isEn ? "Address (RU)" : "Adresă (RU)" },
              { key: "facebook", label: "Facebook URL" },
              { key: "instagram", label: "Instagram URL" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  value={content.site[key as keyof typeof content.site]}
                  onChange={(e) =>
                    setContent({ ...content, site: { ...content.site, [key]: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isRu ? "Статистика" : isEn ? "Statistics" : "Statistici"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "children", label: isRu ? "Детей помогли" : isEn ? "Children supported" : "Copii ajutați" },
              { key: "families", label: isRu ? "Семей" : isEn ? "Families" : "Familii" },
              { key: "years", label: isRu ? "Лет работы" : isEn ? "Years active" : "Ani activitate" },
              { key: "specialists", label: isRu ? "Специалистов" : isEn ? "Specialists" : "Specialiști" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  value={content.stats[key as keyof typeof content.stats]}
                  onChange={(e) =>
                    setContent({ ...content, stats: { ...content.stats, [key]: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isRu ? "Исторические этапы" : isEn ? "Historical milestones" : "Etape istorice"}
          </h2>
          <div className="space-y-6">
            {content.milestones.map((milestone, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {isRu ? "Год" : isEn ? "Year" : "An"}
                    </label>
                    <input type="text" value={milestone.year}
                      onChange={(e) => {
                        const ms = [...content.milestones];
                        ms[index] = { ...ms[index], year: e.target.value };
                        setContent({ ...content, milestones: ms });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Titlu RO</label>
                    <input type="text" value={milestone.title_ro}
                      onChange={(e) => {
                        const ms = [...content.milestones];
                        ms[index] = { ...ms[index], title_ro: e.target.value };
                        setContent({ ...content, milestones: ms });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Titlu RU</label>
                    <input type="text" value={milestone.title_ru}
                      onChange={(e) => {
                        const ms = [...content.milestones];
                        ms[index] = { ...ms[index], title_ru: e.target.value };
                        setContent({ ...content, milestones: ms });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Text RO</label>
                    <textarea rows={2} value={milestone.text_ro}
                      onChange={(e) => {
                        const ms = [...content.milestones];
                        ms[index] = { ...ms[index], text_ro: e.target.value };
                        setContent({ ...content, milestones: ms });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Text RU</label>
                    <textarea rows={2} value={milestone.text_ru}
                      onChange={(e) => {
                        const ms = [...content.milestones];
                        ms[index] = { ...ms[index], text_ru: e.target.value };
                        setContent({ ...content, milestones: ms });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
