import mysql from "mysql2/promise";

import { env } from "./env";

const db = mysql.createPool({
  host: env.dbHost,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
});

export default db;
