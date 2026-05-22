import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

const COOKIE_NAME = "admin_session";

async function verifyToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only process admin routes
  if (!path.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLoginPage = path === "/admin/login";
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifyToken(cookie);

  // Redirect to login if not authenticated and trying to access protected route
  if (!isLoginPage && !session) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }

  // Redirect to dashboard if already authenticated and trying to access login
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
