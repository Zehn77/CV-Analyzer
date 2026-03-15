import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTE_PERMISSIONS } from "@/constants/route-permissions";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const isPublicPage = pathname === "/login" || pathname === "/register";

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token) {
    const role = token.role as string;
    const matchedItem = ROUTE_PERMISSIONS.find(
      (item) => pathname === item.href || pathname.startsWith(item.href + "/"),
    );

    if (matchedItem && !matchedItem.roles.includes(role as never)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
