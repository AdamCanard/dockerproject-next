import { pool } from "../../server/postgres";
export async function POST() {
  const result = await pool.query("SELECT * FROM USERS");
  console.log(result.rows);

  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
