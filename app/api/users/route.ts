import { pool } from "../../server/postgres";
export async function GET() {
  const result = await pool.query("SELECT * FROM USERS");
  console.log(result.rows);

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
