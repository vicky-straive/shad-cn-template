import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // First, check if the request is for Next-Auth API routes
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/auth/signout",
    "/auth/error",
    "/auth/verify-request",
    "/auth/forgot-password",
  ];

  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Protected routes check
  if (!token && !isPublicPath) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Admin routes check
  if (
    token &&
    token.role !== "admin" &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude Next-Auth API routes
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
