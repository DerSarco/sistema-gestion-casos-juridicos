import type { PrismaClient } from "@/generated/prisma/client";
import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";
import type { ClientRepository } from "@/modules/clients/application/client-repository";
import type { Client } from "@/modules/clients/domain/client";

type Database = Pick<PrismaClient, "client">;

export class PrismaClientRepository implements ClientRepository {
  constructor(
    private readonly database: Database,
    private readonly studyId: string,
  ) {}

  async list(): Promise<Client[]> {
    const clients = await this.database.client.findMany({
      where: { studyId: this.studyId },
      orderBy: [{ displayName: "asc" }, { id: "asc" }],
      select: {
        id: true,
        displayName: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
      },
    });

    return clients.map((client) => ({
      ...client,
      createdAt: client.createdAt.toISOString(),
    }));
  }

  async save(client: Client): Promise<void> {
    await this.database.client.create({
      data: {
        id: client.id,
        studyId: this.studyId,
        displayName: client.displayName,
        email: client.email,
        phone: client.phone,
        status: client.status,
        createdAt: new Date(client.createdAt),
      },
    });
  }
}

export function createPrismaClientRepository(
  studyId: string,
): PrismaClientRepository {
  return new PrismaClientRepository(getPrismaClient(), studyId);
}
