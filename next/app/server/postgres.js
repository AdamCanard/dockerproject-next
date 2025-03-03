import pg from "pg";
const { Pool } = pg;
export const pool = new Pool({
  host: "postgresql",
  port: 5432,
  user: "postgres",
  password: "P@ssw0rd",
});
