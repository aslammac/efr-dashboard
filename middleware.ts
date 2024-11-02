import { NextResponse, NextRequest } from "next/server";
import { RequestCookies } from "@edge-runtime/cookies";
import { decodeToken } from "./lib/auth"; // You'll need to implement this function
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookies = new RequestCookies(request.headers);
  let token = cookies.get(
    (process.env.NEXT_PUBLIC_SESSION_NAME as string) || "gsouq/user_session"
  )?.value;

  const isPublicPath = path === "/auth";
  const isHomePath = path === "/home";
  const isRootPath = path === "/";

  // Decode token and check expiration
  let isAuthenticated = false;
  if (token) {
    const decodedToken = decodeToken(token);
    if (
      decodedToken &&
      decodedToken.exp &&
      decodedToken.exp > Date.now() / 1000
    ) {
      isAuthenticated = true;
    } else {
      // Token is expired or invalid
      const response = NextResponse.redirect(new URL("/auth", request.nextUrl));
      response.cookies.delete(
        (process.env.NEXT_PUBLIC_SESSION_NAME as string) || "gsouq/user_session"
      );
      return response;
    }
  }

  // Redirect authenticated users from public paths to home
  if (isAuthenticated && (isPublicPath || isRootPath)) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  // Redirect unauthenticated users to auth page
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }

  // Allow the request to proceed for all other cases
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/home/:path*", "/auth/:path*"],
};
