import { PrismaPg } from "@prisma/adapter-pg";
import {
  CatalogType,
  PrismaClient,
} from "../src/generated/prisma/client.ts";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL es obligatoria para ejecutar el seed ficticio.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const ids = {
  studyA: "10000000-0000-4000-8000-000000000001",
  studyB: "20000000-0000-4000-8000-000000000001",
  rolePartnerA: "10000000-0000-4000-8000-000000000101",
  roleLawyerA: "10000000-0000-4000-8000-000000000102",
  rolePartnerB: "20000000-0000-4000-8000-000000000101",
  partnerA: "10000000-0000-4000-8000-000000000201",
  lawyerA: "10000000-0000-4000-8000-000000000202",
  partnerB: "20000000-0000-4000-8000-000000000201",
  clientA: "10000000-0000-4000-8000-000000000301",
  clientB: "20000000-0000-4000-8000-000000000301",
  caseA: "10000000-0000-4000-8000-000000000401",
  participationA: "10000000-0000-4000-8000-000000000501",
  relevantDateA: "10000000-0000-4000-8000-000000000601",
  laborDataA: "10000000-0000-4000-8000-000000000701",
};

const catalogDefinitions = [
  [CatalogType.MATTER, "DISMISSAL", "Despido ficticio"],
  [CatalogType.MATTER, "COLLECTIVE", "Gestión colectiva ficticia"],
  [CatalogType.CASE_NATURE, "INDIVIDUAL", "Individual"],
  [CatalogType.CASE_NATURE, "COLLECTIVE", "Colectiva"],
  [CatalogType.CASE_STATUS, "ENTERED", "Ingresado"],
  [CatalogType.STAGE, "INTAKE", "Ingreso"],
  [CatalogType.PROCEDURE, "GENERAL", "Procedimiento ficticio"],
  [CatalogType.DATE_TYPE, "MANUAL_REFERENCE", "Referencia manual"],
  [CatalogType.PARTICIPATION_ROLE, "PRIMARY", "Responsable principal"],
  [CatalogType.PARTICIPATION_ROLE, "SUPPORT", "Apoyo operativo"],
  [CatalogType.DISMISSAL_GROUND, "FICTIONAL", "Causal ficticia"],
] as const;

function catalogId(studyPrefix: "10000000" | "20000000", index: number) {
  return `${studyPrefix}-0000-4000-8000-${String(800 + index).padStart(12, "0")}`;
}

async function seedStudy(
  studyId: string,
  studyName: string,
  prefix: "10000000" | "20000000",
) {
  await prisma.study.upsert({
    where: { id: studyId },
    update: { name: studyName, active: true },
    create: { id: studyId, name: studyName },
  });

  for (const [index, [type, code, name]] of catalogDefinitions.entries()) {
    await prisma.catalogValue.upsert({
      where: { studyId_type_code: { studyId, type, code } },
      update: { name, active: true, sortOrder: index + 1 },
      create: {
        id: catalogId(prefix, index + 1),
        studyId,
        type,
        code,
        name,
        sortOrder: index + 1,
      },
    });
  }
}

async function main() {
  await seedStudy(ids.studyA, "Estudio Ficticio A", "10000000");
  await seedStudy(ids.studyB, "Estudio Ficticio B", "20000000");

  await prisma.role.upsert({
    where: { id: ids.rolePartnerA },
    update: { name: "Socio", active: true },
    create: { id: ids.rolePartnerA, studyId: ids.studyA, name: "Socio" },
  });
  await prisma.role.upsert({
    where: { id: ids.roleLawyerA },
    update: { name: "Abogado", active: true },
    create: { id: ids.roleLawyerA, studyId: ids.studyA, name: "Abogado" },
  });
  await prisma.role.upsert({
    where: { id: ids.rolePartnerB },
    update: { name: "Socio", active: true },
    create: { id: ids.rolePartnerB, studyId: ids.studyB, name: "Socio" },
  });

  await prisma.user.upsert({
    where: { id: ids.partnerA },
    update: { displayName: "Socio Ficticio A", status: "ACTIVE" },
    create: {
      id: ids.partnerA,
      studyId: ids.studyA,
      roleId: ids.rolePartnerA,
      displayName: "Socio Ficticio A",
      accessIdentifier: "socio-a@example.test",
    },
  });
  await prisma.user.upsert({
    where: { id: ids.lawyerA },
    update: { displayName: "Abogado Ficticio A", status: "ACTIVE" },
    create: {
      id: ids.lawyerA,
      studyId: ids.studyA,
      roleId: ids.roleLawyerA,
      displayName: "Abogado Ficticio A",
      accessIdentifier: "abogado-a@example.test",
    },
  });
  await prisma.user.upsert({
    where: { id: ids.partnerB },
    update: { displayName: "Socio Ficticio B", status: "ACTIVE" },
    create: {
      id: ids.partnerB,
      studyId: ids.studyB,
      roleId: ids.rolePartnerB,
      displayName: "Socio Ficticio B",
      accessIdentifier: "socio-b@example.test",
    },
  });

  await prisma.client.upsert({
    where: { id: ids.clientA },
    update: { displayName: "Cliente Ficticio 01" },
    create: {
      id: ids.clientA,
      studyId: ids.studyA,
      displayName: "Cliente Ficticio 01",
      rutNormalized: "RUT-FICTICIO-01",
      phone: "+56900000001",
      email: "cliente01@example.test",
      originMatter: "Consulta ficticia",
    },
  });
  await prisma.client.upsert({
    where: { id: ids.clientB },
    update: { displayName: "Cliente Ficticio 02" },
    create: {
      id: ids.clientB,
      studyId: ids.studyB,
      displayName: "Cliente Ficticio 02",
      rutNormalized: "RUT-FICTICIO-02",
      phone: "+56900000002",
      email: "cliente02@example.test",
      originMatter: "Consulta ficticia",
    },
  });

  const catalogsA = await prisma.catalogValue.findMany({
    where: { studyId: ids.studyA },
  });
  const value = (type: CatalogType, code: string) => {
    const result = catalogsA.find((item) => item.type === type && item.code === code);
    if (!result) throw new Error(`Catálogo ficticio ausente: ${type}/${code}`);
    return result.id;
  };

  await prisma.legalCase.upsert({
    where: { id: ids.caseA },
    update: { title: "Caso laboral ficticio 01" },
    create: {
      id: ids.caseA,
      studyId: ids.studyA,
      clientId: ids.clientA,
      matterId: value(CatalogType.MATTER, "DISMISSAL"),
      natureId: value(CatalogType.CASE_NATURE, "INDIVIDUAL"),
      statusId: value(CatalogType.CASE_STATUS, "ENTERED"),
      stageId: value(CatalogType.STAGE, "INTAKE"),
      internalCode: "CASO-FICTICIO-001",
      title: "Caso laboral ficticio 01",
      lifecycleStatus: "ACTIVE",
    },
  });

  await prisma.laborCaseData.upsert({
    where: { caseId_studyId: { caseId: ids.caseA, studyId: ids.studyA } },
    update: { employerOrCounterparty: "Empresa Ficticia 01" },
    create: {
      id: ids.laborDataA,
      studyId: ids.studyA,
      caseId: ids.caseA,
      employerOrCounterparty: "Empresa Ficticia 01",
      employmentStartDate: new Date("2025-01-02T00:00:00.000Z"),
      dismissalDate: new Date("2026-10-01T00:00:00.000Z"),
      dismissalGroundId: value(CatalogType.DISMISSAL_GROUND, "FICTIONAL"),
      amount: "100000.00",
    },
  });

  await prisma.caseParticipation.upsert({
    where: { id: ids.participationA },
    update: { endedAt: null, primary: true },
    create: {
      id: ids.participationA,
      studyId: ids.studyA,
      caseId: ids.caseA,
      participantId: ids.lawyerA,
      roleId: value(CatalogType.PARTICIPATION_ROLE, "PRIMARY"),
      assignedById: ids.partnerA,
      primary: true,
      reason: "Asignación ficticia inicial",
    },
  });

  await prisma.relevantDate.upsert({
    where: { id: ids.relevantDateA },
    update: { title: "Referencia manual ficticia" },
    create: {
      id: ids.relevantDateA,
      studyId: ids.studyA,
      caseId: ids.caseA,
      typeId: value(CatalogType.DATE_TYPE, "MANUAL_REFERENCE"),
      responsibleId: ids.lawyerA,
      title: "Referencia manual ficticia",
      occursAt: new Date("2026-12-01T12:00:00.000Z"),
      source: "Ingreso manual ficticio",
    },
  });
}

main()
  .then(() => {
    console.info("Seed ficticio aplicado correctamente.");
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
