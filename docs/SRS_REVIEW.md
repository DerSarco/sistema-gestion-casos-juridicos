# Revisión de calidad del SRS

**Documento revisado:** `docs/SRS.md`, versión 1.4

**Fecha:** 2026-10-27

**Referencia:** IEEE Std 830-1998

**Alcance:** revisión interna; no constituye aprobación externa.

## Resultado

El SRS especifica únicamente el MVP que será diseñado, construido y aceptado en
esta iteración: ocho historias, once RF —incluida la restricción `RF-011`—, diez
RNF y siete requisitos conceptuales de datos. Los identificadores históricos
fueron sustituidos por secuencias continuas; este cambio editorial no modifica
el alcance ni crea obligaciones nuevas.

## Lista de revisión

| Propiedad IEEE 830 | Evidencia | Resultado |
|---|---|---|
| Corrección | El alcance responde al registro y seguimiento inicial sin automatización judicial. | Cumple internamente. |
| Ausencia de ambigüedad | Cada RF/RNF vigente posee criterio observable. | Cumple. |
| Completitud | Las ocho historias y vistas están cubiertas por al menos un RF y un RNF. | Cumple. |
| Consistencia | Objetivos, SRS, alcance, Gherkin, diagramas y trazabilidad usan la misma línea base. | Cumple. |
| Verificabilidad | Los criterios pueden convertirse en pruebas o revisión documental. | Cumple en diseño; ejecución pendiente. |
| Modificabilidad | La evolución futura está separada del compromiso actual. | Cumple. |
| Trazabilidad | Historia, vista, requisito, issue y evidencia prevista están relacionados. | Cumple para el MVP. |

## Cobertura vigente

- 8 historias de usuario con criterios Gherkin.
- 8 vistas del prototipo.
- 11 requisitos funcionales, incluida la restricción de independencia de la OJV.
- 10 requisitos no funcionales.
- 7 requisitos conceptuales de datos.
- 1 objetivo general y 4 objetivos específicos medibles.

## Límites

No forman parte de la aceptación: administración de cuentas o catálogos,
recuperación de acceso, reasignaciones avanzadas, alertas automáticas, dashboard,
reportes, exportaciones, anexo imprimible, Calendar, OneDrive, Gemini, portal de
clientes, cálculo de plazos ni integración con la OJV.

Todo cambio de alcance debe actualizar conjuntamente `MVP_SCOPE.md`, SRS,
historias, trazabilidad, mockups y pruebas mediante un issue específico.
