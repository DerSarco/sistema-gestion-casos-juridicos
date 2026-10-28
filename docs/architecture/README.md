# Arquitectura de la versión 1

## Propósito

La solución se organiza como una aplicación web modular. La interfaz y las
acciones HTTP dependen de casos de uso de aplicación; estos aplican reglas de
dominio y acceden a puertos de repositorio o servicios externos. Los adaptadores
implementan esos puertos sin introducir decisiones de infraestructura en el
dominio.

```text
Navegador
   │ HTTPS
Next.js App Router (interfaz)
   │
Casos de uso (aplicación)
   │
Dominio ─── puertos de repositorio y servicios
                  │
       adaptadores PostgreSQL / Calendar / OneDrive / Gemini
```

## Módulos previstos

| Módulo | Responsabilidad inicial | Trazabilidad principal |
|---|---|---|
| `clients` | Registro, consulta y búsqueda de clientes. | RF-002, RF-003; RD-001, RD-002, RD-007 |
| `cases` | Registro, consulta, filtros, estado, etapa y vínculo con cliente. | RF-004 a RF-006, RF-010; RD-002 a RD-004 |
| `assignments` | Responsabilidad principal vigente. | RF-007; RD-003 |
| `timeline` | Fechas relevantes e historial aditivo. | RF-008, RF-009; RD-005, RD-006 |
| `reporting` | Búsqueda y filtros autorizados. | RF-010 |
| `access` | Cuentas internas y autorización en servidor. | RF-001, RNF-001; implementación diferida al último incremento funcional |

Los módulos de autorizaciones documentales e integraciones externas de la
especificación amplia no forman parte del catálogo normativo del MVP. Su eventual
incorporación exige una nueva decisión de alcance.

La OJV no es un adaptador ni una interfaz del sistema. Los antecedentes que una
persona obtenga fuera de la plataforma solo pueden ingresarse manualmente.

## Capas y dependencias

- `src/app`: rutas, páginas y componentes de presentación.
- `src/modules/*/domain`: entidades, tipos y reglas sin dependencias de Next.js o
  de persistencia.
- `src/modules/*/application`: casos de uso y contratos de repositorio.
- `src/infrastructure`: implementaciones de persistencia y servicios externos.
- `prisma`: contrato y migraciones PostgreSQL.
- `tests`: pruebas de dominio, integración y navegador.

Las dependencias apuntan hacia el dominio. La interfaz no consulta directamente
el ORM y los adaptadores externos no pueden modificar fichas sin pasar por un
caso de uso.

## Entornos y datos

El milestone v0.2 utiliza un repositorio temporal en memoria y fixtures
ficticios para ejecutar el flujo sin credenciales. El adaptador PostgreSQL y su
migración se preparan en paralelo. La sustitución del repositorio no debe cambiar
los casos de uso ni las reglas de dominio.

Hasta implementar y verificar autenticación, autorización y la puerta de datos
reales, la aplicación:

- solo se ejecuta localmente o en un Preview controlado;
- muestra de forma visible que contiene datos ficticios;
- no es apta para uso productivo;
- no recibe antecedentes identificables del estudio.

## Decisiones registradas

- [ADR-001: aplicación modular con Next.js](adr/001-nextjs-modular.md)
- [ADR-002: PostgreSQL y Prisma](adr/002-postgresql-prisma.md)
- [ADR-003: repositorio temporal para el primer incremento](adr/003-repositorio-temporal.md)
- [ADR-004: autenticación diferida sin seguridad simulada](adr/004-autenticacion-diferida.md)
- [Modelo físico inicial y migración PostgreSQL](data-model.md)

## Modelos

Las fuentes PlantUML y sus SVG se mantienen en [`../diagrams`](../diagrams/README.md).
Un cambio estructural debe actualizar la fuente, el renderizado y la
trazabilidad relacionada en el mismo pull request.
