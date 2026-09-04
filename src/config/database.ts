import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env.js";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
});

export const connectDatabase = async (): Promise<void> => {
  await prisma.$connect();
  console.log("PostgreSQL connected successfully");
};
