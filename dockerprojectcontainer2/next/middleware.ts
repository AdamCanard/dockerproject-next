import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const userId = req.cookies.get("userId");
  if (req.nextUrl.pathname.startsWith("/auth/")) {
    if (userId !== undefined) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  } else {
    if (userId === undefined) {
      return NextResponse.rewrite(new URL("/auth/login", req.url));
    }
  }
  return NextResponse.next();
}
