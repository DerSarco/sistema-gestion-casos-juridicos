# Product Backlog priorizado

**Línea base:** MVP AINC422 del 2026-10-22

## Escala

Se usa estimación relativa Fibonacci. Los puntos comparan tamaño, incertidumbre y
esfuerzo; no equivalen a horas. El estado `Parcial` indica evidencia existente en
v0.2.0, pero no aceptación de la historia completa.

| Orden | ID | Resultado | Trazabilidad | Prioridad | Puntos | Dependencias | Estado al 2026-10-22 |
|---:|---|---|---|---|---:|---|---|
| 1 | PB-01 | Mantener línea base de objetivos, alcance, SRS y trazabilidad | OE-01; 10 RF; 10 RNF | Must | 3 | Ninguna | Terminado documentalmente |
| 2 | PB-02 | Consolidar ocho vistas y evidencia limpia del prototipo | OE-02; MVP-01 a MVP-08 | Must | 5 | PB-01 | Parcial; capturas disponibles, validación responsive pendiente |
| 3 | PB-03 | Conectar persistencia PostgreSQL mediante adaptadores Prisma | RD-001 a RD-003 | Must | 8 | PB-01 | Esquema y migración existentes; conexión pendiente |
| 4 | PB-04 | Registrar o editar clientes | HU-08; RF-004 | Must | 5 | PB-03 | Registro temporal parcial; edición y persistencia pendientes |
| 5 | PB-05 | Buscar clientes autorizados | HU-07; RF-005 | Must | 3 | PB-03, PB-04 | Búsqueda temporal parcial; autorización pendiente |
| 6 | PB-06 | Registrar o editar casos con cliente y responsable | HU-03; RF-008, RF-009, RF-013 | Must | 8 | PB-03, PB-04 | Registro temporal parcial; edición y asignación pendientes |
| 7 | PB-07 | Buscar y filtrar casos autorizados | HU-02; RF-019 | Must | 3 | PB-06 | Filtro temporal parcial; autorización pendiente |
| 8 | PB-08 | Consultar ficha e historial básico | HU-04; RF-010, RF-017 | Must | 5 | PB-06 | Consulta básica parcial; historial pendiente |
| 9 | PB-09 | Cambiar estado o etapa con historial | HU-05; RF-009, RF-017 | Must | 5 | PB-08 | Preparado |
| 10 | PB-10 | Registrar manualmente una fecha relevante | HU-06; RF-015, RF-017, RF-030 | Must | 5 | PB-08 | Preparado |
| 11 | PB-11 | Implementar acceso interno y autorización | HU-01; RF-001; RNF-001 | Must | 8 | PB-04 a PB-10 | Planificado para el último incremento funcional |
| 12 | PB-12 | Adaptar interfaz a escritorio, tableta y móvil | RNF-018, RNF-019 | Must | 5 | PB-02, PB-04 a PB-11 | Preparado |
| 13 | PB-13 | Automatizar escenarios Gherkin y puertas de CI | OE-04; RNF-005, RNF-011, RNF-022 | Must | 8 | PB-04 a PB-12 | CI existe; cobertura funcional pendiente |
| 14 | PB-14 | Ejecutar aceptación y preparar release trazable | OE-04; RNF-007, RNF-008, RNF-028 | Must | 5 | PB-13 | Preparado |

**Tamaño relativo total:** 84 puntos. No se usa este total para afirmar avance
porcentual porque los elementos parciales todavía no cumplen su Definition of Done.

## Definition of Ready

Un elemento puede entrar a construcción cuando posee historia o requisito,
criterios Gherkin, datos ficticios, dependencia resuelta, pantalla de referencia
y prueba prevista.

## Definition of Done

Un elemento se considera terminado cuando el cambio está integrado en `develop`
mediante PR vinculado, cumple todos sus escenarios, aprueba CI, actualiza la
trazabilidad y no deja defectos críticos abiertos. Una captura o maqueta por sí
sola no demuestra implementación.
