"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Plus, Pencil, Trash2, X, Save, User } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role_ro: string;
  role_ru: string;
  bio_ro: string;
  bio_ru: string;
  image: string;
}

const empty: Omit<TeamMember, "id"> = {
  name: "",
  role_ro: "",
  role_ru: "",
  bio_ro: "",
  bio_ru: "",
  image: "",
};

export default function DashboardTeamPage() {
  const locale = useLocale();
  const isRu = locale === "ru";
  const isEn = locale === "en";
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<TeamMember, "id">>(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/team").then((r) => r.json()).then(setTeam);
  }, []);

  const openCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const openEdit = (m: TeamMember) => { setForm({ ...m }); setEditing(m); setCreating(false); };
  const closeModal = () => { setCreating(false); setEditing(null); };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (creating) {
        const res = await fetch("/api/dashboard/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        const newMember = await res.json();
        setTeam([...team, newMember]);
      } else if (editing) {
        const updated = { ...form, id: editing.id };
        await fetch("/api/dashboard/team", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
        setTeam(team.map((m) => (m.id === editing.id ? updated : m)));
      }
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isRu ? "Вы уверены, что хотите удалить?" : isEn ? "Are you sure you want to delete?" : "Sigur doriți să ștergeți?")) return;
    await fetch(`/api/dashboard/team?id=${id}`, { method: "DELETE" });
    setTeam(team.filter((m) => m.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{isRu ? "Управление командой" : isEn ? "Manage team" : "Gestionare echipă"}</h1>
          <p className="text-gray-600 mt-1">{team.length} {isRu ? "участников" : isEn ? "members" : "membri"}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          {isRu ? "Добавить участника" : isEn ? "Add member" : "Adaugă membru"}
        </button>
      </div>

      <div className="grid gap-4">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 mt-0.5">{isRu ? member.role_ru : member.role_ro}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{isRu ? member.bio_ru : member.bio_ro}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(member)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {creating ? (isRu ? "Добавить участника" : isEn ? "Add member" : "Adaugă membru") : (isRu ? "Редактировать участника" : isEn ? "Edit member" : "Editează membru")}
              </h2>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{isRu ? "Имя" : isEn ? "Name" : "Nume"}</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol (RO)</label>
                  <input type="text" value={form.role_ro} onChange={(e) => setForm({ ...form, role_ro: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol (RU)</label>
                  <input type="text" value={form.role_ru} onChange={(e) => setForm({ ...form, role_ru: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio (RO)</label>
                <textarea rows={3} value={form.bio_ro} onChange={(e) => setForm({ ...form, bio_ro: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio (RU)</label>
                <textarea rows={3} value={form.bio_ru} onChange={(e) => setForm({ ...form, bio_ru: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={closeModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                {isRu ? "Отмена" : isEn ? "Cancel" : "Anulează"}
              </button>
              <button onClick={handleSave} disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60">
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
