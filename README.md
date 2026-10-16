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
- [Matriz de trazabilidad](docs/TRACEABILITY.md)
- [Arquitectura y decisiones técnicas](docs/architecture/README.md)
- [Reglas de contribución](CONTRIBUTING.md)
- [Diagramas UML](docs/diagrams/README.md)

## Desarrollo local

Requisitos: Node.js 24 y pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000`. El incremento v0.2
usa únicamente fixtures ficticios y todavía no implementa autenticación ni
autorización. Por ello no debe exponerse públicamente ni utilizarse con datos
reales.

Antes de abrir un pull request se deben ejecutar:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

GitHub Actions ejecuta las mismas comprobaciones para cambios dirigidos a
`develop` y `main`.

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

Especificación v0.1 publicada. El milestone v0.2 se encuentra en construcción y
ya posee arquitectura, diagramas, esquema PostgreSQL y un flujo funcional de
clientes sobre memoria temporal con datos ficticios.
