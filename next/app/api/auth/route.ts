import { client } from "@/app/server/postgres";
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
  const query = `
  SELECT userdata FROM USERS
  WHERE userid = ${userId?.value}
`;
  const result = await client.query(query);
  const userData = result.rows[0].userdata;

  return new Response(JSON.stringify({ userId: userId, userData: userData }), {
    status: 200,
  });
}
export async function DELETE() {
  const cookieInstance = await cookies();
  const userId = cookieInstance.delete("userId");
  return new Response(JSON.stringify({ userId: userId }), {
    status: 200,
  });
}
