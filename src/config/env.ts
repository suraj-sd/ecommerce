import "dotenv/config";
import process from "process";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  API_BASE_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
