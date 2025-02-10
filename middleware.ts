import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId");
  const authToken = req.cookies.get("authToken");

  console.log(userId, authToken);

  if (authToken === undefined || userId === undefined) {
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }
}
