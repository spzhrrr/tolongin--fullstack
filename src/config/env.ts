import dotenv from "dotenv";

dotenv.config();

const requiredEnvs = ["PORT", "JWT_SECRET", "DB_HOST", "DB_USER", "DB_NAME"];

requiredEnvs.forEach((envKey) => {
  if (!process.env[envKey]) {
    throw new Error(`Missing environment variable: ${envKey}`);
  }
});

export const env = {
  port: process.env.PORT!,

  jwtSecret: process.env.JWT_SECRET!,

  dbHost: process.env.DB_HOST!,

  dbUser: process.env.DB_USER!,

  dbPassword: process.env.DB_PASSWORD || "",

  dbName: process.env.DB_NAME!,
};
