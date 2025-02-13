import { pool } from "../../server/postgres";
export async function POST(req: Request) {
  const formData = await req.formData();
  const userId = formData.get("username" as string);
  const password = formData.get("password" as string);
  const query = `
 INSERT INTO users VALUES ('${userId}','${password}') 
`;
  try {
    const result = await pool.query(query);
    return new Response(JSON.stringify({ result }), {
      status: 201,
    });
  } catch (e) {
    return new Response(JSON.stringify({ e }), {
      status: 409,
    });
  }
}
