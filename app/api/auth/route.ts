import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieInstance = await cookies();
  const body = await req.json();
  cookieInstance.set("authToken", body.authToken, { sameSite: "strict" });
  cookieInstance.set("userId", body.userId, { sameSite: "strict" });
  return new Response(JSON.stringify({}), { status: 200 });
}

export async function GET() {
  const cookieInstance = await cookies();
  const authToken = cookieInstance.get("authToken");
  const userId = cookieInstance.get("authToken");
  return new Response(
    JSON.stringify({ authToken: authToken, userId: userId }),
    { status: 200 },
  );
}
