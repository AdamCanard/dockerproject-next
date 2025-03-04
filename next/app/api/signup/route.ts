import { client } from "@/app/server/postgres";

export async function POST(req: Request) {
  const formData = await req.formData();
  const password = formData.get("password" as string);
  const createQuery = `
 INSERT INTO users (password) VALUES ('${password}') RETURNING userid 
`;

  try {
    const createResult = await client.query(createQuery);

    return new Response(
      JSON.stringify({ userId: createResult.rows[0].userid }),
      {
        status: 201,
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ e }), {
      status: 409,
    });
  }
}
