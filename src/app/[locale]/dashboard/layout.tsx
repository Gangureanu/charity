"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Heart, Calendar, FileText, Users, LogOut, Home, LayoutDashboard } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${locale}/login`);
  };

  const navItems = [
    { href: `/${locale}/dashboard`, icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { href: `/${locale}/dashboard/events`, icon: <Calendar className="w-5 h-5" />, label: "Evenimente" },
    { href: `/${locale}/dashboard/team`, icon: <Users className="w-5 h-5" />, label: "Echipă" },
    { href: `/${locale}/dashboard/content`, icon: <FileText className="w-5 h-5" />, label: "Conținut" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5" fill="white" />
            </div>
            <div>
              <p className="font-bold">ABA Moldova</p>
              <p className="text-blue-300 text-xs">Manager Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-white/20 text-white"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-2">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            {locale === "ro" ? "Înapoi la site" : "На сайт"}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-200 hover:bg-red-600/30 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {locale === "ro" ? "Deconectare" : "Выход"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
