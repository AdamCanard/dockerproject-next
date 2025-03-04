import pg from "pg";
const { Client } = pg;
export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "P@ssw0rd",
});
await client.connect();
