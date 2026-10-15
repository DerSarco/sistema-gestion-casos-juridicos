# Guía de contribución

## Antes de comenzar

1. Revisar `AGENTS.md`, el SRS y los issues abiertos.
2. Confirmar que el trabajo esté representado por un issue.
3. Acordar los criterios de aceptación y requisitos relacionados.
4. Actualizar `develop` y crear desde ella la rama de trabajo correspondiente.

## Estrategia de ramas: GitFlow

| Rama | Origen | Destino | Uso |
|---|---|---|---|
| `main` | No aplica | No aplica | Versiones estables, revisadas y publicables. |
| `develop` | `main` al iniciar el proyecto | `release/*` | Integración de la siguiente versión. |
| `feature/<issue>-<descripcion>` | `develop` | `develop` | Funcionalidades, pruebas y cambios técnicos. |
| `docs/<issue>-<descripcion>` | `develop` | `develop` | SRS y documentación. |
| `diagram/<issue>-<descripcion>` | `develop` | `develop` | Diagramas y sus exportaciones. |
| `release/<version>` | `develop` | `main` y `develop` | Estabilización y preparación de una versión. |
| `hotfix/<version-o-issue>` | `main` | `main` y `develop` | Correcciones urgentes de una versión publicada. |

No se deben realizar commits funcionales directamente en `main` o `develop`.
Cada integración se realizará mediante un pull request asociado con su issue.
Al integrar una release en `main`, se creará una etiqueta de versión siguiendo
versionado semántico cuando corresponda.

## Issues

Cada issue debe contener, como mínimo:

- contexto y objetivo;
- alcance incluido y excluido;
- criterios de aceptación verificables;
- requisitos relacionados;
- dependencias y riesgos conocidos;
- evidencia esperada para cerrarlo.

Las decisiones o dudas que cambien el alcance deben quedar registradas en el
issue, no solamente en conversaciones externas.

## Commits y pull requests

- Realizar commits pequeños y coherentes.
- Escribir mensajes de commit en modo imperativo y explicar el propósito.
- Referenciar el issue cuando sea útil, por ejemplo: `docs: define RF-001 (#12)`.
- Completar la plantilla del pull request.
- Asignar al pull request al menos una etiqueta descriptiva y el milestone de la
  entrega. Por defecto, deben coincidir con los del issue principal asociado.
- Adjuntar capturas o evidencia de pruebas cuando el cambio tenga resultado
  visual o funcional.
- Solicitar revisión antes de integrar a `main`.
- Enviar features, documentación y diagramas hacia `develop`.
- Enviar a `main` solamente ramas `release/*` y `hotfix/*`.

## Definición de terminado

Un issue puede cerrarse cuando:

- cumple todos sus criterios de aceptación;
- se ejecutaron y documentaron las verificaciones aplicables;
- el SRS y los diagramas permanecen coherentes con el cambio;
- no contiene datos sensibles ni secretos;
- el pull request fue revisado e integrado.
