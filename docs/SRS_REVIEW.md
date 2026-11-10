# Revisión de calidad del SRS

**Documento revisado:** `docs/SRS.md`, versión 1.5

**Fecha:** 2026-11-09

**Referencia:** IEEE Std 830-1998

**Alcance:** revisión interna; no constituye aprobación externa.

## Resultado

El SRS especifica el MVP que será diseñado, construido y aceptado en esta
iteración: ocho historias, once RF —incluida la restricción `RF-011`—, diez RNF y
siete requisitos conceptuales de datos. El refinamiento incorpora cuatro
perfiles, siete etapas operativas y ciclos de vida reversibles para clientes y
casos sin aumentar el catálogo normativo ni crear pantallas adicionales.

## Lista de revisión

| Propiedad IEEE 830 | Evidencia | Resultado |
|---|---|---|
| Corrección | El alcance responde al registro y seguimiento inicial sin automatización judicial. | Cumple internamente. |
| Ausencia de ambigüedad | Cada RF/RNF vigente posee criterio observable y las decisiones aún no validadas están identificadas como tales. | Cumple. |
| Completitud | Las ocho historias y vistas están cubiertas por al menos un RF y un RNF. | Cumple. |
| Consistencia | Objetivos, SRS, alcance y Gherkin usan la línea base refinada; diagramas, trazabilidad y planificación se congelarán en #68. | Cumple para #61; cierre integral pendiente de #68. |
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
- 4 perfiles internos y 7 etapas operativas, con permisos y transiciones
  detalladas pendientes de validación con los socios.

## Límites

No forman parte de la aceptación: administración de cuentas o catálogos,
recuperación de acceso, reasignaciones avanzadas, alertas automáticas, dashboard,
reportes, exportaciones, anexo imprimible, Calendar, OneDrive, Gemini, portal de
clientes, cálculo de plazos, eliminación física ni integración con la OJV. La
desactivación de clientes y el archivo de casos sí pertenecen al MVP como
operaciones reversibles, autorizadas y auditables.

Todo cambio de alcance debe actualizar conjuntamente `MVP_SCOPE.md`, SRS,
historias, trazabilidad, mockups y pruebas mediante un issue específico.
La revisión de #61 no declara cerrada la coherencia global: #68 debe actualizar
la matriz, los diagramas incompatibles y la planificación antes de congelar la
línea base completa.
