# Product Backlog priorizado

**Línea base de alcance:** SRS 1.6 del 2026-11-11

**Última actualización de estado:** 2026-11-11, issue #78

## Escala

Se usa estimación relativa Fibonacci. Los puntos comparan tamaño, incertidumbre y
esfuerzo; no equivalen a horas. El estado `Parcial` indica evidencia existente en
v0.2.0, pero no aceptación de la historia completa.

| Orden | ID | Resultado | Trazabilidad | Prioridad | Puntos | Dependencias | Estado al 2026-10-27 |
|---:|---|---|---|---|---:|---|---|
| 1 | PB-01 | Mantener línea base de objetivos, alcance, SRS y trazabilidad | OE-01; 11 RF; 10 RNF; 7 RD | Must | 3 | Ninguna | SRS refinado en #61; congelación integral en #68 |
| 2 | PB-02 | Consolidar ocho vistas y evidencia limpia del prototipo | OE-02; MVP-01 a MVP-08 | Must | 5 | PB-01 | Interfaz y navegación implementadas; #74 agrega verificación temporal, responsive y accesible; aceptación funcional persistente pendiente |
| 3 | PB-03 | Conectar persistencia PostgreSQL mediante adaptadores Prisma | RD-001 a RD-003 | Must | 8 | PB-01 | Adaptador de clientes implementado en #70; conexión del flujo y adaptador de casos pendientes |
| 4 | PB-04 | Registrar, editar, desactivar o reactivar clientes | HU-08; RF-002, RF-009 | Must | 5 | PB-03 | Registro y edición temporales; ciclo reversible, conexión real y aceptación pendientes |
| 5 | PB-05 | Buscar clientes autorizados y distinguir su actividad | HU-07; RF-003 | Must | 3 | PB-03, PB-04 | Búsqueda temporal; actividad, persistencia y autorización pendientes |
| 6 | PB-06 | Registrar o editar casos con responsable, participantes y flujo validado | HU-03; RF-004, RF-005, RF-007 | Must | 8 | PB-03, PB-04 | Reglas validadas; modelo definitivo, persistencia y autorización pendientes |
| 7 | PB-07 | Buscar y filtrar casos autorizados | HU-02; RF-010 | Must | 3 | PB-06 | Filtros temporales verificables; autorización pendiente |
| 8 | PB-08 | Consultar ficha, historial y ciclo de archivo reversible | HU-04; RF-004, RF-006, RF-009 | Must | 5 | PB-06 | Consulta e historial temporales; archivo, persistencia y autorización pendientes |
| 9 | PB-09 | Cambiar estado o etapa y cerrar anticipadamente con historial | HU-05; RF-005, RF-009 | Must | 5 | PB-08 | Flujo validado en #78; implementación persistente pendiente |
| 10 | PB-10 | Registrar manualmente una fecha relevante | HU-06; RF-008, RF-009, RF-011 | Must | 5 | PB-08 | Flujo temporal verificable sin cálculo jurídico; persistencia pendiente |
| 11 | PB-11 | Implementar acceso interno y autorización | HU-01; RF-001; RNF-001 | Must | 8 | PB-04 a PB-10 | Planificado para el último incremento funcional |
| 12 | PB-12 | Adaptar interfaz a escritorio, tableta y móvil | RNF-007, RNF-008 | Must | 5 | PB-02, PB-04 a PB-11 | Verificado para el estado temporal de #74; debe repetirse con los incrementos persistentes |
| 13 | PB-13 | Automatizar escenarios Gherkin y puertas de CI | OE-04; RNF-003, RNF-006, RNF-009 | Must | 8 | PB-04 a PB-12 | CI y Playwright incorporados; cobertura persistente y por permisos pendiente |
| 14 | PB-14 | Ejecutar aceptación y preparar release trazable | OE-04; RNF-004, RNF-005, RNF-010 | Must | 5 | PB-13 | Preparado |

**Tamaño relativo total:** 84 puntos. No se usa este total para afirmar avance
porcentual porque los elementos parciales todavía no cumplen su Definition of Done.
El porcentaje del Hito 2 se calcula exclusivamente con los paquetes ponderados
definidos en [`HITO2_BASELINE.md`](HITO2_BASELINE.md).

## Ventana prevista después de la rebaselinación

| Ventana | Elementos previstos | Regla de entrada o salida |
|---|---|---|
| W4, 26 oct.–1 nov. | PB-01, PB-02 | Cerrar definición y diseño solo con evidencia; no confundir configuración de Stitch con aceptación |
| W5, 2–8 nov. | PB-03, PB-04, PB-05 | Construcción comienza después de la puerta W4 |
| W6, 9–15 nov. | Congelar #61 y #68; preparar PB-06, PB-07 | Línea base integral coherente y persistencia de clientes pendiente |
| W7, 16–22 nov. | PB-08, PB-09 | Casos registrables y pruebas del incremento anterior aprobadas |
| W8, 23–29 nov. | PB-10 y continuidad de PB-08/PB-09 | Historial verificable y sin automatización jurídica |
| W9, 30 nov.–6 dic. | PB-11, PB-12, continuidad de PB-13 | Acceso al final del incremento funcional; calidad ejecutada durante toda la construcción |
| W10, 7–13 dic. | Cierre PB-13, PB-14 | No admite recuperar alcance nuevo; solo verificación, corrección crítica, aceptación y release |

## Definition of Ready

Un elemento puede entrar a construcción cuando posee historia o requisito,
criterios Gherkin, datos ficticios, dependencia resuelta, pantalla de referencia
y prueba prevista.

## Definition of Done

Un elemento se considera terminado cuando el cambio está integrado en `develop`
mediante PR vinculado, cumple todos sus escenarios, aprueba CI, actualiza la
trazabilidad y no deja defectos críticos abiertos. Una captura o maqueta por sí
sola no demuestra implementación.
