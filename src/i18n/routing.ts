import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "ru", "en"],
  defaultLocale: "ro",
  pathnames: {
    "/": "/",
    "/history": "/history",
    "/events": "/events",
    "/events/[id]": "/events/[id]",
    "/location": "/location",
    "/contact": "/contact",
    "/team": "/team",
    "/dashboard": "/dashboard",
    "/dashboard/events": "/dashboard/events",
    "/dashboard/content": "/dashboard/content",
    "/dashboard/team": "/dashboard/team",
    "/login": "/login",
  },
});
