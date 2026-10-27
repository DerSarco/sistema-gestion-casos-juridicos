# Gestión de configuración

## Elementos bajo control

- requisitos, objetivos, historias, trazabilidad y planificación;
- fuentes PlantUML y SVG renderizados;
- código, pruebas, migraciones y configuración;
- capturas del prototipo aprobadas para evidencia;
- versiones, tags y notas de release.

## Flujo obligatorio

1. Crear un issue acotado con criterios verificables y milestone.
2. Crear `feature/<issue>-...`, `docs/<issue>-...` o `diagram/<issue>-...` desde `develop`.
3. Implementar una unidad coherente sin mezclar cambios ajenos.
4. Abrir PR hacia `develop` con `Closes #<issue>`, etiqueta y milestone.
5. Ejecutar revisión documental o de código y CI: lint, tipos, pruebas, build y seguridad.
6. Integrar solo con criterios cumplidos y checks verdes.
7. Crear `release/<versión>` desde `develop` cuando el incremento esté estable.
8. Integrar la release en `main` y `develop`; crear tag y evidencia de versión.

`main` representa versiones revisadas; `develop`, integración; los hotfix nacen
desde `main`. Los tags `v0.1.0` y `v0.2.0` existen, pero no se deben llamar
GitHub Releases mientras no exista el objeto publicado correspondiente.

## Control de cambios de alcance

Una función del catálogo histórico necesita:

1. issue de cambio;
2. justificación de valor;
3. análisis de impacto en tiempo, privacidad, riesgo y dependencias;
4. actualización conjunta de `MVP_SCOPE.md`, SRS, Gherkin, trazabilidad,
   mockups, backlog, roadmap, Gantt y pruebas;
5. aprobación antes de construir.

Si el tiempo disminuye, se renegocia fecha o criterio secundario; no se elimina
silenciosamente una historia ni se incorporan dashboard, reportes, alertas,
integraciones o automatización jurídica.

## Control semanal de la línea base

La semana de planificación comienza el lunes y termina el domingo. Antes de
seleccionar trabajo nuevo se contrasta el estado real con `GANTT.md` y se deja un
comentario de cierre en el issue semanal o en el issue principal del incremento.
El registro mínimo contiene:

- 12 horas planificadas, horas reales respaldadas y desviación porcentual;
- compromisos terminados según DoD, no terminados y trasladados;
- Issues atendidos, PR integrados y enlace al CI correspondiente;
- RF, RNF y HU afectados, con actualización de `TRACEABILITY.md`;
- riesgos, bloqueos y decisiones de replanificación;
- confirmación de cero funciones diferidas incorporadas sin control de cambios.

Una desviación absoluta superior a 20 % obliga a replanificar antes de asumir
nuevo trabajo. Una función diferida solo puede entrar mediante issue de cambio,
análisis de impacto, actualización coordinada de artefactos y aprobación previa.
La ausencia de registro de horas no autoriza estimarlas como horas ejecutadas.

## Convenciones de evidencia

- Cada PR menciona RF/RNF o artefacto afectado.
- Los commits incluyen el issue cuando corresponde.
- Una fuente de diagrama y su SVG cambian juntos.
- Las capturas usan datos ficticios y nombres `mvp-01` a `mvp-08`.
- La matriz solo marca `Implementado` o `Verificado` con evidencia integrada y ejecutada.
- Los secretos, `.env`, datos reales y originales confidenciales nunca se versionan.
