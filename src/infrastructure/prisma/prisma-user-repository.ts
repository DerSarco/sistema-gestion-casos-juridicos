import type { PrismaClient } from "@/generated/prisma/client";
import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";
import type { InternalRole, InternalUser } from "@/modules/users/domain/internal-user";

type Database = Pick<PrismaClient, "user" | "role" | "auditEvent" | "$transaction">;

export class PrismaUserRepository {
  constructor(private readonly database: Database, private readonly studyId: string) {}

  async list(): Promise<InternalUser[]> {
    return this.database.user.findMany({
      where: { studyId: this.studyId },
      select: { id: true, displayName: true, accessIdentifier: true, status: true, role: { select: { name: true } } },
      orderBy: [{ status: "asc" }, { displayName: "asc" }],
    }).then((users) => users.map((user) => ({ ...user, role: user.role.name })));
  }

  async roles(): Promise<InternalRole[]> {
    return this.database.role.findMany({
      where: { studyId: this.studyId, active: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  }

  async create(input: { displayName: string; accessIdentifier: string; roleId: string }, actorId: string): Promise<InternalUser> {
    const role = await this.database.role.findFirst({ where: { id: input.roleId, studyId: this.studyId, active: true } });
    if (!role) throw new Error("El rol no está disponible para este estudio.");
    const existing = await this.database.user.findFirst({ where: { studyId: this.studyId, accessIdentifier: input.accessIdentifier } });
    if (existing) throw new Error("Ya existe un usuario con ese identificador.");
    const user = await this.database.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: { studyId: this.studyId, roleId: role.id, displayName: input.displayName, accessIdentifier: input.accessIdentifier },
        select: { id: true, displayName: true, accessIdentifier: true, status: true, role: { select: { name: true } } },
      });
      await tx.auditEvent.create({ data: { studyId: this.studyId, actorId, entityType: "USER", entityId: created.id, action: "USER_CREATED", protectedValue: { role: role.name } } });
      return created;
    });
    return { ...user, role: user.role.name };
  }

  async changeStatus(userId: string, status: "ACTIVE" | "INACTIVE", actorId: string): Promise<boolean> {
    if (userId === actorId) throw new Error("No puedes desactivar tu propia cuenta.");
    const current = await this.database.user.findFirst({ where: { id: userId, studyId: this.studyId } });
    if (!current) return false;
    await this.database.$transaction(async (tx) => {
      await tx.user.update({ where: { id_studyId: { id: userId, studyId: this.studyId } }, data: { status } });
      await tx.auditEvent.create({ data: { studyId: this.studyId, actorId, entityType: "USER", entityId: userId, action: status === "ACTIVE" ? "USER_REACTIVATED" : "USER_DEACTIVATED", protectedValue: { from: current.status, to: status } } });
    });
    return true;
  }
}

export function createPrismaUserRepository(studyId: string) {
  return new PrismaUserRepository(getPrismaClient(), studyId);
}
