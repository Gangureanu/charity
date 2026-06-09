"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Plus, Pencil, Trash2, X, Save, Calendar } from "lucide-react";

interface Event {
  id: string;
  title_ro: string;
  title_ru: string;
  date: string;
  location_ro: string;
  location_ru: string;
  description_ro: string;
  description_ru: string;
  image: string;
  free: boolean;
}

const empty: Omit<Event, "id"> = {
  title_ro: "",
  title_ru: "",
  date: "",
  location_ro: "",
  location_ru: "",
  description_ro: "",
  description_ru: "",
  image: "",
  free: false,
};

export default function DashboardEventsPage() {
  const locale = useLocale();
  const isRu = locale === "ru";
  const isEn = locale === "en";
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Event, "id">>(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/events")
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  const openCreate = () => {
    setForm(empty);
    setCreating(true);
    setEditing(null);
  };

  const openEdit = (event: Event) => {
    setForm({ ...event });
    setEditing(event);
    setCreating(false);
  };

  const closeModal = () => {
    setCreating(false);
    setEditing(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (creating) {
        const res = await fetch("/api/dashboard/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const newEvent = await res.json();
        setEvents([...events, newEvent]);
      } else if (editing) {
        const updated = { ...form, id: editing.id };
        await fetch("/api/dashboard/events", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        setEvents(events.map((e) => (e.id === editing.id ? updated : e)));
      }
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isRu ? "Вы уверены, что хотите удалить?" : isEn ? "Are you sure you want to delete?" : "Sigur doriți să ștergeți?")) return;
    await fetch(`/api/dashboard/events?id=${id}`, { method: "DELETE" });
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isRu ? "Управление мероприятиями" : isEn ? "Manage events" : "Gestionare evenimente"}
          </h1>
          <p className="text-gray-600 mt-1">{events.length} {isRu ? "мероприятий" : isEn ? "events" : "evenimente"}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {isRu ? "Добавить мероприятие" : isEn ? "Add event" : "Adaugă eveniment"}
        </button>
      </div>

      {/* Events list */}
      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {isRu ? event.title_ru : event.title_ro}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(event.date).toLocaleDateString(isRu ? "ru-RU" : isEn ? "en-GB" : "ro-RO")} •{" "}
                  {isRu ? event.location_ru : event.location_ro}
                </p>
                {event.free && (
                  <span className="mt-1 inline-block text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    {isRu ? "Бесплатно" : isEn ? "Free" : "Gratuit"}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => openEdit(event)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {creating
                    ? (isRu ? "Добавить мероприятие" : isEn ? "Add event" : "Adaugă eveniment")
                    : (isRu ? "Редактировать мероприятие" : isEn ? "Edit event" : "Editează eveniment")}
              </h2>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isRu ? "Название (RO)" : isEn ? "Title (RO)" : "Titlu (RO)"}
                  </label>
                  <input type="text" value={form.title_ro} onChange={(e) => setForm({ ...form, title_ro: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isRu ? "Название (RU)" : isEn ? "Title (RU)" : "Titlu (RU)"}
                  </label>
                  <input type="text" value={form.title_ru} onChange={(e) => setForm({ ...form, title_ru: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isRu ? "Дата" : isEn ? "Date" : "Data"}
                </label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isRu ? "Место (RO)" : isEn ? "Location (RO)" : "Locație (RO)"}
                  </label>
                  <input type="text" value={form.location_ro} onChange={(e) => setForm({ ...form, location_ro: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isRu ? "Место (RU)" : isEn ? "Location (RU)" : "Locație (RU)"}
                  </label>
                  <input type="text" value={form.location_ru} onChange={(e) => setForm({ ...form, location_ru: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isRu ? "Описание (RO)" : isEn ? "Description (RO)" : "Descriere (RO)"}
                </label>
                <textarea rows={3} value={form.description_ro} onChange={(e) => setForm({ ...form, description_ro: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isRu ? "Описание (RU)" : isEn ? "Description (RU)" : "Descriere (RU)"}
                </label>
                <textarea rows={3} value={form.description_ru} onChange={(e) => setForm({ ...form, description_ru: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="free" checked={form.free} onChange={(e) => setForm({ ...form, free: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded" />
                <label htmlFor="free" className="text-sm font-medium text-gray-700">
                  {isRu ? "Бесплатное мероприятие" : isEn ? "Free event" : "Eveniment gratuit"}
                </label>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={closeModal}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                {isRu ? "Отмена" : isEn ? "Cancel" : "Anulează"}
              </button>
              <button onClick={handleSave} disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60">
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {isRu ? "Сохранить" : isEn ? "Save" : "Salvează"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
