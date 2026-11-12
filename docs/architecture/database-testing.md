# Migraciones y pruebas PostgreSQL

## Propósito

Este procedimiento verifica que una base PostgreSQL vacía pueda reconstruirse
exclusivamente desde los archivos versionados del repositorio. Solo utiliza
datos ficticios y no debe ejecutarse contra una base productiva ni contra una
instancia que contenga información real o identificable.

## Requisitos

- Node.js 24 o posterior y pnpm 11.
- PostgreSQL 17 accesible mediante una URL de prueba.
- Una base nueva y vacía, creada específicamente para la ejecución.

La URL se mantiene fuera del repositorio:

```bash
export DATABASE_URL='postgresql://usuario:clave@localhost:5432/sistema_test?schema=public'
```

Antes de continuar se debe comprobar que el nombre, host y usuario corresponden
al entorno de prueba. `pnpm test:db` no elimina ni reinicia la base: aplica las
migraciones pendientes mediante `prisma migrate deploy`.

## Verificación reproducible

Con la base vacía:

```bash
pnpm install --frozen-lockfile
pnpm test:db
```

El comando realiza estas operaciones:

1. Aplica en orden las migraciones versionadas.
2. Ejecuta dos veces el seed para demostrar que es idempotente.
3. Comprueba que solo existen registros reconocibles como ficticios.
4. Verifica aislamiento por estudio mediante claves foráneas compuestas.
5. Rechaza un segundo responsable principal vigente.
6. Rechaza montos negativos y periodos laborales incoherentes.
7. Verifica metadatos completos y reversibilidad de los ciclos de vida.
8. Confirma que tribunal, RIT y ROL pueden permanecer vacíos.
9. Impide eliminar físicamente un cliente relacionado con un caso.

GitHub Actions reproduce el mismo procedimiento sobre un contenedor temporal de
PostgreSQL 17 en cada pull request hacia `develop` o `main`.

## Seed ficticio

`prisma/seed.ts` contiene identificadores deterministas, nombres marcados como
`Ficticio`, correos bajo `example.test`, teléfonos no operativos y referencias
sin validez jurídica. Está prohibido sustituirlos por copias de planillas,
clientes, causas, RUT, RIT, cuantías o contactos reales.

## Recuperación y reversión

Las migraciones ya aplicadas no se editan ni se revierten manualmente en
entornos compartidos. Se utiliza una de estas estrategias:

- **Prueba local desechable:** detener la instancia temporal, crear una base
  vacía nueva y repetir `pnpm test:db`.
- **Preproducción sin datos reales:** reemplazar la base desechable por otra
  reconstruida desde migraciones y seed ficticio.
- **Entorno compartido con información autorizada:** crear una migración
  correctiva hacia adelante. Si el cambio exige restauración, usar un respaldo
  verificado y un procedimiento aprobado antes de actuar.

No se versionan comandos automáticos de borrado ni migraciones descendentes que
puedan destruir información por error. La migración
`20261111233000_data_model_v2` además aborta si detecta registros operativos del
esquema inicial.
