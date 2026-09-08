import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  let isProtectedRoute = false;

  if (pathname.startsWith("/dashboard")) {
    isProtectedRoute = true;
  }

  if (pathname.startsWith("/ebooks/") && pathname !== "/ebooks") {
    isProtectedRoute = true;
  }

  const privatePaths = [
    "/wishlist",
    "/profile",
    "/add-ebook",
    "/manage-ebooks",
    "/purchase-history",
    "/my-ebooks",
    "/checkout",
  ];
  if (privatePaths.some((route) => pathname.startsWith(route))) {
    isProtectedRoute = true;
  }

  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/wishlist/:path*",
    "/profile/:path*",
    "/add-ebook/:path*",
    "/manage-ebooks/:path*",
    "/purchase-history/:path*",
    "/my-ebooks/:path*",
    "/checkout/:path*",
    "/ebooks/:path*",
  ],
};