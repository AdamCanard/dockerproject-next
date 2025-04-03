import { client } from "@/app/server/postgres";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  const cookieInstance = await cookies();
  const body = await req.json();
  const userId = cookieInstance.get("userId");
  const cleanedData = (body.userData as string).replaceAll("'", "''");
  const query = `
  UPDATE USERS
  SET userdata = '${cleanedData}'
  WHERE userid = ${userId?.value}
`;
  try {
    const result = await client.query(query);
    console.log(result.command);
    return new Response(JSON.stringify({ userData: body.userData }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 404,
    });
  }
}
