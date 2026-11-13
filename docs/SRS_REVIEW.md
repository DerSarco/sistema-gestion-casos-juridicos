# Revisión de calidad del SRS

**Documento revisado:** `docs/SRS.md`, versión 1.6

**Fecha:** 2026-11-11

**Referencia:** IEEE Std 830-1998

**Alcance:** revisión posterior a la validación operativa del issue #78; no
constituye autorización para usar datos reales ni aceptación final del producto.

## Resultado

El SRS especifica el MVP que será diseñado, construido y aceptado en esta
iteración: ocho historias, once RF —incluida la restricción `RF-011`—, diez RNF y
siete requisitos conceptuales de datos. La validación incorpora cuatro perfiles,
nueve etapas operativas, una alternativa de audiencia única, campos mínimos y
ciclos de vida reversibles sin aumentar el catálogo normativo ni crear pantallas.

## Lista de revisión

| Propiedad IEEE 830 | Evidencia | Resultado |
|---|---|---|
| Corrección | El alcance responde al registro y seguimiento inicial sin automatización judicial. | Cumple internamente. |
| Ausencia de ambigüedad | Cada RF/RNF vigente posee criterio observable; permisos, campos, flujo, fechas y cierre incorporan las decisiones de #78. | Cumple. |
| Completitud | Las ocho historias y vistas están cubiertas por al menos un RF y un RNF. | Cumple. |
| Consistencia | SRS, alcance, Gherkin, diagramas, trazabilidad y planificación incorporan la validación #78 sin cambiar el denominador. | Cumple. |
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
- 4 perfiles internos y 9 etapas operativas, con permisos, responsables,
  alternativa monitoria y cierres anticipados definidos.

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
