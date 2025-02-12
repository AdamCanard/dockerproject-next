export async function GET() {
  console.log("here ");

  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
