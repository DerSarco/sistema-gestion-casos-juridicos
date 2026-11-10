# Matriz de trazabilidad del MVP

**Versión:** 0.8

**Fecha:** 2026-11-09

**Issues de revisión:** #61, #68, #70, #74

## Criterio

Esta matriz contiene solo los requisitos normativos del MVP. Los identificadores
históricos excluidos se registran en `MVP_SCOPE.md` como posibles evoluciones y
no constituyen deuda, incumplimiento ni criterio de aceptación de esta iteración.

## Trazabilidad funcional

| Historia | Vista | Resultado verificable | RF | RNF principales | Issue de diseño |
|---|---|---|---|---|---|
| HU-01 | MVP-01 Inicio de sesión | Acceso interno sin registro público | RF-001 | RNF-001, RNF-002, RNF-004 | #43 |
| HU-02 | MVP-02 Casos | Buscar y filtrar casos autorizados | RF-010 | RNF-001, RNF-007 | #45 |
| HU-03 | MVP-03 Formulario de caso | Registrar o editar caso con cliente, estado, etapa y responsable | RF-004, RF-005, RF-007 | RNF-006, RNF-008 | #45 |
| HU-04 | MVP-04 Ficha del caso | Consultar ficha e historial básico | RF-006, RF-009 | RNF-001, RNF-003 | #45 |
| HU-05 | MVP-05 Estado o etapa | Confirmar o cancelar un cambio trazable | RF-005, RF-009 | RNF-003, RNF-008 | #42, #45 |
| HU-06 | MVP-06 Fecha relevante | Registrar una fecha sin cálculo jurídico automático | RF-008, RF-009, RF-011 | RNF-003, RNF-004 | #46 |
| HU-07 | MVP-07 Clientes | Buscar información mínima autorizada | RF-003 | RNF-001, RNF-007 | #44 |
| HU-08 | MVP-08 Formulario de cliente | Registrar o editar datos mínimos | RF-002 | RNF-004, RNF-008 | #44 |

## Requisitos funcionales

| RF | Fuente | Verificación prevista | Estado real al 2026-10-22 |
|---|---|---|---|
| RF-001 | ALC-01; HU-01 | Acceso válido e inválido sin registro público | Simulado en interfaz para demostración; autenticación y autorización reales pendientes |
| RF-002 | ALC-02; HU-08 | Registro y edición válidos e inválidos | Flujo temporal en memoria y adaptador Prisma separados; conexión persistente pendiente |
| RF-003 | ALC-02; HU-07 | Búsqueda autorizada y estado sin resultados | Búsqueda temporal y listado Prisma separados; autorización y conexión persistente pendientes |
| RF-004 | ALC-03; HU-03 | Alta y edición sin exigir antecedentes judiciales ausentes | Alta y edición temporales verificadas; persistencia pendiente |
| RF-005 | ALC-05; HU-03, HU-05 | Valores controlados y cancelación sin cambios | Flujo temporal verificable con catálogos ficticios no definitivos |
| RF-006 | ALC-03; HU-04 | Consulta autorizada y actualización válida | Consulta temporal verificable; autorización y persistencia pendientes |
| RF-007 | ALC-04; HU-03 | Asignación de un responsable vigente | Especificado; implementación pendiente |
| RF-008 | ALC-06; HU-06 | Fecha manual válida sin cálculo de plazo | Flujo temporal verificable; persistencia pendiente |
| RF-009 | ALC-07; HU-04 a HU-06 | Historial cronológico no editable por usuarios comunes | Historial temporal verificable; auditoría persistente pendiente |
| RF-010 | ALC-08; HU-02 | Filtros combinables dentro del alcance autorizado | Filtros temporales combinables; autorización persistente pendiente |
| RF-011 | EXC-01, EXC-02 | Auditoría sin clientes, secretos ni tráfico OJV | Restricción especificada |

## Requisitos no funcionales

| RNF | Ámbito | Verificación prevista | Estado |
|---|---|---|---|
| RNF-001 | Autorización | Matriz negativa por rol ejecutada en servidor | Especificado; implementación pendiente |
| RNF-002 | Secretos | Escaneo de repositorio, respuestas y logs | CI con GitGuardian disponible |
| RNF-003 | Historial | Acciones críticas generan evidencia | Especificado |
| RNF-004 | Datos de prueba | Revisión de fixtures, BD, capturas y logs | Aplicado en datos actuales |
| RNF-005 | Puerta de datos reales | Acta aprobada o bloqueo de uso real | Bloqueo vigente |
| RNF-006 | Integridad | Caso activo incompleto rechazado | Implementado parcialmente |
| RNF-007 | Responsividad | Ocho flujos en escritorio, tableta y móvil | Verificado automáticamente en tres viewports para la interfaz temporal de #74 |
| RNF-008 | Formularios accesibles | Etiquetas y errores asociados | Verificado en flujos críticos temporales; revisión posterior requerida al conectar persistencia |
| RNF-009 | Calidad técnica | Build, tipos, lint y pruebas en CI | Pipeline disponible |
| RNF-010 | Trazabilidad | Issue, etiqueta, milestone, PR y evidencia | Aplicado al proceso |

## Modelos y evidencia

| Modelo | Propósito | Alcance |
|---|---|---|
| `mvp-process-context` | Explicar proceso interno y separación de la OJV | MVP |
| `mvp-use-cases` | Mostrar las capacidades de las ocho historias | MVP |
| `mvp-data-model` | Representar clientes, casos, asignación, fechas e historial | MVP |

La presencia de código o diagramas amplios anteriores no acredita una función del
MVP. Un estado solo cambia a implementado o verificado cuando existe evidencia
integrada y ejecutada.

## Evidencia de implementación

| Incremento | Requisitos | Pruebas | PR | Estado para el porcentaje |
|---|---|---|---|---|
| Adaptador Prisma de clientes | RF-002, RF-003; RD-001, RD-002 | Contrato asíncrono, aislamiento por estudio y mapeo de persistencia | #70 | Parcial; P1 conserva 0 % hasta completar su DoD |
| Ocho pantallas de Stitch implementadas | HU-01 a HU-08; RNF-004, RNF-007, RNF-008 | Ocho rutas, navegación, revisión visual de escritorio y móvil, build y prueba estructural | #72 | Evidencia visual implementada; no suma porcentaje funcional sin persistencia y aceptación |
| Flujos temporales de las ocho pantallas | HU-01 a HU-08; RNF-007 a RNF-010 | Validaciones positivas y negativas, creación y edición en memoria, filtros, modales accesibles y Playwright en tres viewports | PR #75, issue #74 | Evidencia de interacción y calidad; no suma porcentaje funcional sin persistencia, autorización y aceptación |
