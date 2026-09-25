import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// Prisma database client.
// This single instance is reused across the app so we do not open a new DB connection for every query.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "dev" ? ["error", "query", "warn"] : ["error"],
});

export default prisma;
