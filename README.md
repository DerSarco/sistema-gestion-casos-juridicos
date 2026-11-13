# Sistema de gestión de casos jurídicos

Proyecto de título orientado al diseño y desarrollo de una plataforma web para
centralizar el registro, la asignación y el seguimiento inicial de casos en un
estudio jurídico pequeño.

## Problema abordado

El proceso actual combina planillas, correo, calendarios y consultas a una
plataforma judicial externa. Esta fragmentación dificulta mantener información
consistente y trazable, aumenta el trabajo administrativo y genera riesgo de
errores u omisiones.

## Objetivo del repositorio

Este repositorio concentra:

- el código fuente de la versión 1 del sistema;
- la especificación de requisitos de software (SRS);
- los diagramas de casos de uso, clases, secuencia y despliegue;
- las pruebas y evidencias técnicas;
- el seguimiento del trabajo mediante GitHub Issues.

## Documentación

- [Especificación de requisitos de software](docs/SRS.md)
- [Objetivos y medición del proyecto](docs/OBJECTIVES.md)
- [Línea base del MVP priorizado](docs/MVP_SCOPE.md)
- [Historias de usuario y criterios Gherkin](docs/USER_STORIES.md)
- [Matriz de trazabilidad](docs/TRACEABILITY.md)
- [Reportes y exportaciones autorizadas de la versión 1](docs/V1_REPORTS.md)
- [Evidencia de validación v0.5.0](docs/ACCEPTANCE_v0.5.0.md)
- [Notas del pre-release v0.5.0](docs/RELEASE_NOTES_v0.5.0.md)
- [Despliegue académico en Vercel](docs/VERCEL_DEPLOYMENT.md)
- [Planificación del MVP](docs/planning/README.md)
- [Capturas verificadas del prototipo Stitch](docs/mockups/stitch/README.md)
- [Arquitectura y decisiones técnicas](docs/architecture/README.md)
- [Migraciones y pruebas PostgreSQL](docs/architecture/database-testing.md)
- [Reglas de contribución](CONTRIBUTING.md)
- [Diagramas UML](docs/diagrams/README.md)

## Desarrollo local

Requisitos: Node.js 24 y pnpm 11.

```bash
pnpm install --frozen-lockfile
export DATABASE_URL='postgresql://usuario:clave@localhost:5432/sistema?schema=public'
export SESSION_SECRET="$(openssl rand -hex 32)"
export DEMO_LOGIN_PASSWORD="$(openssl rand -hex 24)"
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000`. Las cuentas internas
ficticias se crean con el seed y utilizan la contraseña temporal definida fuera
del repositorio en `DEMO_LOGIN_PASSWORD`. `SESSION_SECRET` debe contener al menos
32 caracteres. Ninguna de estas variables debe versionarse ni compartirse en
issues, capturas o registros. El entorno sigue siendo de preproducción y no debe
utilizar datos reales.

Antes de abrir un pull request se deben ejecutar:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Los cambios de base de datos requieren además una instancia PostgreSQL de prueba
vacía y el procedimiento documentado en
[`docs/architecture/database-testing.md`](docs/architecture/database-testing.md).

El workflow `Quality` de GitHub Actions ejecuta las mismas comprobaciones para
todo pull request dirigido a `develop` o `main`. Instala las dependencias desde
el lockfile y no utiliza secretos ni una base de datos real.

## Flujo de desarrollo

El proyecto utiliza GitFlow. Las funcionalidades se desarrollan en ramas
`feature/*` creadas desde `develop` y se integran mediante pull requests. La rama
`main` conserva exclusivamente versiones estables; las entregas se preparan en
ramas `release/*` y las correcciones urgentes en `hotfix/*`.

## Alcance y privacidad

El repositorio es público y utiliza exclusivamente datos ficticios o
anonimizados. No se deben incorporar nombres de clientes, RUT, RIT reales,
antecedentes jurídicos identificables, credenciales, secretos ni documentos
originales del caso de estudio.

La versión 1 centraliza la gestión interna. No se conecta con la Oficina Judicial
Virtual para consultar, obtener, enviar o sincronizar información; tampoco
almacena credenciales judiciales ni calcula plazos jurídicos de forma definitiva.

## Estado

El pre-release académico `v0.5.0` incorpora persistencia PostgreSQL, clientes, casos, distribución, etapas,
fechas, historial y acceso interno con los perfiles Socio, Abogado, Asistente y
Procurador, además de reportes internos mínimos. La autorización se verifica en
servidor y las operaciones de ciclo de vida y exportación quedan restringidas al
perfil Socio. El sistema no debe desplegarse como producto ni utilizar datos
reales hasta completar la aceptación externa y la validación jurídica, técnica y
organizacional definida para la versión 1.
