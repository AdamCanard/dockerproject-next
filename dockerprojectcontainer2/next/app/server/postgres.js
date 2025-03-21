import pg from "pg";
const { Pool } = pg;
export const client = new Pool({
  host: "postgresql",
  port: 5433,
  user: "postgres",
  password: "P@ssw0rd",
});
