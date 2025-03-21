import { client } from "@/app/server/postgres";

export async function DELETE(req: Request) {
  const data = await req.json();
  console.log(data);
  const userId = data.userId;
  const query = `
 DELETE FROM USERS
 WHERE userId = '${userId}'
`;
  try {
    const result = await client.query(query);
    if ((result.rowCount as number) > 0) {
      return new Response(
        JSON.stringify({ message: "User deleted successfully " }),
        {
          status: 200,
        },
      );
    } else {
      return new Response(JSON.stringify({ message: "User does not exist" }), {
        status: 404,
      });
    }
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e, message: "User does not exist" }),
      {
        status: 404,
      },
    );
  }
}
