# Revisión de calidad del SRS

**Documento revisado:** `docs/SRS.md`, versión 1.0

**Fecha:** 2026-10-21

**Referencia:** IEEE Std 830-1998

**Alcance:** revisión interna; no constituye aprobación de los socios ni de la docente.

## Resultado

El SRS mantiene los identificadores y antecedentes de la versión amplia, pero ya
no presenta todos los requisitos históricos como compromiso de la iteración. La
línea base distingue el MVP priorizado, las funciones diferidas y las
restricciones obligatorias.

El MVP queda apto para validación de diseño y posterior construcción con datos
ficticios o anonimizados. Comprende ocho historias Gherkin y ocho vistas, sin
dashboard, reportes, exportaciones, administración avanzada, anexo imprimible ni
integraciones externas. El acceso interno continúa dentro del MVP, pero su
implementación técnica se realizará al final del incremento funcional.

## Lista de revisión

| Propiedad | Comprobación | Evidencia | Resultado |
|---|---|---|---|
| Corrección | El alcance responde al problema de registro y seguimiento inicial, sin automatización judicial. | `MVP_SCOPE.md`; `RF-030`; exclusiones. | Cumple internamente. |
| Ausencia de ambigüedad | Cada requisito conserva identificador y cada historia posee escenarios Gherkin observables. | `USER_STORIES.md`; secciones 3.2 y 3.3. | Cumple. |
| Completitud del MVP | Las ocho vistas tienen historia, RF y RNF asociados. | Línea base de `TRACEABILITY.md`. | Cumple. |
| Consistencia | SRS, alcance, historias y trazabilidad usan la misma clasificación. | Versiones 1.0/0.3 de los documentos. | Cumple. |
| Priorización | Se separa importancia histórica de compromiso de la iteración. | Tablas de clasificación RF/RNF. | Cumple. |
| Verificabilidad | Cada historia declara escenarios y cada requisito conserva método previsto. | Códigos `DF`, `DNF`, `DD` y Gherkin. | Cumple en diseño; ejecución pendiente. |
| Modificabilidad | Los identificadores históricos no se renumeraron y la clasificación está centralizada. | `MVP_SCOPE.md`. | Cumple. |
| Trazabilidad | Vista, historia, requisito e issue están relacionados. | `TRACEABILITY.md`. | Cobertura del MVP completa. |

## Comprobaciones de cobertura

- 14 requisitos funcionales priorizados, 15 diferidos y una restricción
  funcional obligatoria (`RF-030`).
- 16 requisitos no funcionales priorizados, 11 diferidos y una restricción no
  funcional obligatoria (`RNF-008`).
- 8 historias de usuario con criterios Gherkin.
- 8 vistas del prototipo funcional.
- 15 requisitos de datos conservados para la evolución del modelo.

## Incongruencias corregidas

- Se eliminó la afirmación de que `ALC-01` a `ALC-14` integran el compromiso actual.
- Calendar, OneDrive y Gemini dejaron de presentarse como interfaces operativas del MVP.
- Dashboard, reportes, exportación, anexo, alertas y administración avanzada se clasificaron como diferidos.
- Se descartó una pantalla separada de detalle de cliente y se definieron formularios reutilizables para alta y edición.
- La OJV se mantiene únicamente como contexto operativo externo, sin integración de software ni credenciales.

## Decisiones externas pendientes

Los asuntos `AR-01` a `AR-07` y `AD-01` a `AD-07` continúan requiriendo
validación. Solo bloquean una historia priorizada cuando afectan directamente su
criterio de aceptación; no autorizan incorporar funciones diferidas.

Mientras permanezcan abiertos:

- se pueden construir prototipos reversibles con datos ficticios;
- no se deben fijar silenciosamente permisos, conservación o tratamientos;
- no se deben utilizar datos reales;
- los supuestos adoptados deben quedar visibles en issues y pruebas.

## Criterio de cambio

Todo cambio de alcance debe actualizar en el mismo pull request
`MVP_SCOPE.md`, el SRS, las historias, la trazabilidad, el mockup afectado y la
prueba prevista. Incorporar un requisito diferido exige un issue específico y
análisis de impacto; su existencia histórica no basta para añadirlo al MVP.
