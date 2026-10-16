# Modelo físico inicial de datos

## Alcance

El esquema PostgreSQL inicial materializa las entidades necesarias para el
primer flujo de clientes y casos y prepara asignaciones, catálogos, hitos e
historial. La fuente se encuentra en [`../../prisma/schema.prisma`](../../prisma/schema.prisma)
y la migración revisable en
[`../../prisma/migrations/20261016193000_initial/migration.sql`](../../prisma/migrations/20261016193000_initial/migration.sql).

## Decisiones de integridad

- Todos los registros operativos poseen UUID interno y pertenencia directa o
  indirecta a un estudio.
- Un código de caso es único dentro del estudio.
- Los catálogos son únicos por estudio, tipo y código.
- Tribunal y RIT/ROL admiten ausencia; el sistema no crea valores ficticios para
  completar una ficha.
- Las asignaciones son periodos: una reasignación cierra la anterior y crea otra.
- Un índice parcial de PostgreSQL impide dos asignaciones principales vigentes
  para el mismo caso.
- El historial es aditivo y sus valores se conservan como JSON protegido solo
  cuando el caso de uso lo requiera.
- No existen columnas para contraseñas, credenciales judiciales, secretos de
  proveedores ni archivos jurídicos.

## Límites del modelo

La versión actual no resuelve los asuntos `AD-01` a `AD-07`. En particular, los
campos definitivos de contacto, las personas múltiples por caso y los periodos
de conservación requieren validación externa. El esquema puede evolucionar por
migraciones antes de usar datos reales.

El adaptador en memoria del milestone v0.2 no acredita la migración en una base
compartida. Antes de conectar Neon deben ejecutarse la migración, pruebas de
integridad, respaldo y restauración con datos ficticios.

## Comandos

```bash
pnpm db:validate
pnpm db:generate
```

Para aplicar la migración se requiere una `DATABASE_URL` de un entorno de prueba
autorizado. El repositorio solo contiene `.env.example`; los secretos nunca se
versionan.
