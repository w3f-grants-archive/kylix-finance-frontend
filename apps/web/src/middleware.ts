import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("token");
  if (process.env!.NEXT_PUBLIC_ENV !== "production") {
    return NextResponse.next();
  }
  if (!authCookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(
      process.env!.NEXT_PUBLIC_JWT_SECRET
    );
    await jwtVerify(authCookie.value, secret);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)",
};
