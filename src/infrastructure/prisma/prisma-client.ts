import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prismaClient?: PrismaClient;
};

export function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prismaClient) return globalForPrisma.prismaClient;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL es obligatoria para utilizar persistencia PostgreSQL.",
    );
  }

  const adapter = new PrismaPg({ connectionString });
  const client = new PrismaClient({ adapter });

  globalForPrisma.prismaClient = client;

  return client;
}
