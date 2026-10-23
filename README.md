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
- [Planificación del MVP](docs/planning/README.md)
- [Capturas verificadas del prototipo Stitch](docs/mockups/stitch/README.md)
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

La versión v0.2 incorpora la especificación revisada, arquitectura, diagramas,
esquema PostgreSQL, verificación automática y flujos funcionales de clientes y
casos sobre memoria temporal con datos ficticios. La autenticación y la
autorización se completarán en el último incremento funcional del MVP; la
versión actual no debe desplegarse como sistema productivo ni utilizar datos
reales.
