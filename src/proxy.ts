import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.includes("/dashboard")) {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      const locale = pathname.split("/")[1] || routing.defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).)*"],
};