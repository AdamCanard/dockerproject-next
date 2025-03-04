import { cookies } from "next/headers";
import { client } from "../../server/postgres";
export async function POST(req: Request) {
  const body = await req.json();
  const query = `
  SELECT password FROM USERS
  WHERE userid = ${body.userId}
`;
  const result = await client.query(query);
  if (result.rows.length === 1) {
    if (result.rows[0].password === body.password) {
      const cookieInstance = await cookies();
      cookieInstance.set("userId", body.userId as string, {
        sameSite: "strict",
      });
      return new Response(JSON.stringify({}), {
        status: 200,
      });
    }
  }
  return new Response(JSON.stringify({}), {
    status: 404,
  });
}
