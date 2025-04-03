import { client } from "@/app/server/postgres";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const query = `
  SELECT * FROM USERS
  WHERE userid = ${id}
`;
  const result = await client.query(query);
  console.log(result.rows);
  if (result.rows.length === 0) {
    return new Response(JSON.stringify({}), {
      status: 404,
    });
  } else {
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
    });
  }
}
