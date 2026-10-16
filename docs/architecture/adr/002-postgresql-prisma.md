# ADR-002: PostgreSQL y Prisma

- **Estado:** aceptada
- **Fecha:** 2026-10-16
- **Decisores:** equipo del proyecto

## Contexto

Clientes, casos, asignaciones e historial requieren relaciones, restricciones y
operaciones consistentes. El informe final selecciona PostgreSQL y permite un ORM
compatible.

## Decisión

PostgreSQL será la base objetivo y Prisma implementará el adaptador de
persistencia. El esquema declarará integridad referencial e índices; las reglas
que no puedan expresarse con una restricción permanecerán en casos de uso y
pruebas. Las versiones se fijarán en `pnpm-lock.yaml`.

## Alternativas consideradas

- SQL manual con `pg`: máximo control, con mayor trabajo repetitivo y menor
  seguridad de tipos.
- Drizzle ORM: alternativa liviana y cercana a SQL, aún no escogida para evitar
  mantener dos convenciones durante el proyecto.

## Consecuencias

Se obtiene un esquema revisable y migraciones versionadas. El dominio no importa
tipos de Prisma, por lo que el adaptador puede reemplazarse. Toda migración debe
probarse con datos ficticios antes de aplicarse en un entorno compartido.
