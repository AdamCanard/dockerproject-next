import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieInstance = await cookies();
  const body = await req.json();
  cookieInstance.set("userId", body.userId, { sameSite: "strict" });
  return new Response(JSON.stringify({}), { status: 200 });
}

export async function GET() {
  const cookieInstance = await cookies();
  const userId = cookieInstance.get("userId");
  return new Response(JSON.stringify({ userId: userId }), { status: 200 });
}
