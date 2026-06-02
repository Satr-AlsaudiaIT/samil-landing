import { NextResponse, type NextRequest } from "next/server";

// Lightweight cookie presence check. Full session validation happens in the
// admin pages (via getCurrentAdmin), so middleware just bounces unauthenticated
// users away from /admin/* and authenticated users away from /admin/login.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = !!req.cookies.get("samel_session")?.value;

  if (pathname === "/admin/login" && hasSession) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !hasSession) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
