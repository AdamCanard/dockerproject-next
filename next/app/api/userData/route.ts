import { client } from "@/app/server/postgres";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  const cookieInstance = await cookies();
  const body = await req.json();
  const userId = cookieInstance.get("userId");
  const query = `
  UPDATE USERS
  SET userdata = '${body.userData}'
  WHERE userid = ${userId?.value}
`;
  const result = await client.query(query);
  console.log(result.command);
  return new Response(JSON.stringify({ userData: body.userData }), {
    status: 200,
  });
}
