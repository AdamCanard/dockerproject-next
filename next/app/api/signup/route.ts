import { pool } from "../../server/postgres";
export async function POST(req: Request) {
  const formData = await req.formData();
  const password = formData.get("password" as string);
  const query = `
 INSERT INTO users (password) VALUES ('${password}') 
`;
  const result = await pool.query(query);
  try {
    return new Response(JSON.stringify({ result }), {
      status: 201,
    });
  } catch (e) {
    return new Response(JSON.stringify({ e }), {
      status: 409,
    });
  }
}
