import { cookies } from "next/headers";
import { pool } from "../../server/postgres";
export async function POST(req: Request) {
  const formData = await req.formData();
  const userId = formData.get("username" as string);
  const password = formData.get("password" as string);
  const query = `
  SELECT password FROM USERS
  WHERE userid = ${userId}
`;
  const result = await pool.query(query);
  if (result.rows.length === 1) {
    if (result.rows[0].password === password) {
      const cookieInstance = await cookies();
      cookieInstance.set("userId", userId as string, { sameSite: "strict" });
      return new Response(JSON.stringify({}), {
        status: 200,
      });
    }
  }
  return new Response(JSON.stringify({}), {
    status: 404,
  });
}
