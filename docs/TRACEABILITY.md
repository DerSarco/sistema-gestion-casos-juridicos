# Matriz de trazabilidad del MVP

**Versión:** 1.2

**Fecha:** 2026-11-12

**Issues de revisión:** #61, #68, #74, #78 a #85

## Criterio

Esta matriz contiene solo los requisitos normativos del MVP. Los identificadores
históricos excluidos se registran en `MVP_SCOPE.md` como posibles evoluciones y
no constituyen deuda, incumplimiento ni criterio de aceptación de esta iteración.

## Trazabilidad funcional

| Historia | Vista | Resultado verificable | RF | RNF principales | Issue de diseño |
|---|---|---|---|---|---|
| HU-01 | MVP-01 Inicio de sesión | Acceso interno sin registro público | RF-001 | RNF-001, RNF-002, RNF-004 | #85 |
| HU-02 | MVP-02 Casos | Buscar y filtrar por atributos, procedimiento, próxima fecha y archivo; ordenar sin prioridad subjetiva | RF-010 | RNF-001, RNF-007 | #78, #82 |
| HU-03 | MVP-03 Formulario de caso | Registrar o editar caso con bloque común y campos condicionales según materia y etapa | RF-004, RF-005, RF-007 | RNF-006, RNF-008 | #78, #79, #81 |
| HU-04 | MVP-04 Ficha del caso | Consultar ficha e historial; archivar o reactivar exclusivamente como Socio | RF-004, RF-006, RF-009 | RNF-001, RNF-003 | #81, #83 |
| HU-05 | MVP-05 Estado o etapa | Aplicar el flujo validado, sus alternativas y cierre anticipado trazable | RF-005, RF-009 | RNF-003, RNF-008 | #78, #83 |
| HU-06 | MVP-06 Fecha relevante | Registrar tipos validados y referencia manual sin cálculo jurídico automático | RF-008, RF-009, RF-011 | RNF-003, RNF-004 | #78, #84 |
| HU-07 | MVP-07 Clientes | Buscar información mínima autorizada y distinguir actividad | RF-003 | RNF-001, RNF-007 | #80 |
| HU-08 | MVP-08 Formulario de cliente | Aplicar campos mínimos, advertir coincidencia y reservar el ciclo de vida a Socio | RF-002, RF-003, RF-009 | RNF-001, RNF-003, RNF-004, RNF-008 | #78, #80 |

## Requisitos funcionales

| RF | Fuente | Verificación prevista | Estado real al 2026-11-11 |
|---|---|---|---|
| RF-001 | ALC-01; HU-01 | Acceso válido e inválido sin registro público | Implementado y verificado en #85 con cuentas activas, sesión firmada y cierre de sesión |
| RF-002 | ALC-02; HU-08; #78 | Campos mínimos validados y ciclo reversible exclusivo de Socio | Implementado y verificado en #80 y #85 |
| RF-003 | ALC-02; HU-07, HU-08; #78 | Búsqueda, actividad y advertencia no bloqueante por nombre y origen | Implementado y verificado en #80 |
| RF-004 | ALC-03; HU-03, HU-04; #78, #79 | Mínimos comunes y condicionales por materia; archivo reversible exclusivo de Socio | Implementado y verificado en #81 y #85 |
| RF-005 | ALC-05; HU-03, HU-05; #78 | Nueve etapas, alternativa monitoria y cierre anticipado | Implementado y verificado en #81 y #83 |
| RF-006 | ALC-03; HU-04 | Consulta autorizada de ficha activa o archivada | Implementado y verificado en #81, #82 y #85 |
| RF-007 | ALC-04; HU-03; #78 | Responsable socio o abogado, procurador de apoyo y distribución exclusiva de Socio | Implementado y verificado en #81 y #85 |
| RF-008 | ALC-06; HU-06; #78 | Tipos validados y fecha manual sin cálculo de plazo | Implementado y verificado en #84 |
| RF-009 | ALC-07; HU-04 a HU-06, HU-08; #78 | Historial de acciones validadas con motivo y valores relevantes | Implementado y verificado en #80, #81, #83 y #84 |
| RF-010 | ALC-08; HU-02; #78 | Filtros combinables y orden por etapa y próxima fecha | Implementado y verificado en #82 |
| RF-011 | EXC-01, EXC-02 | Auditoría sin clientes, secretos ni tráfico OJV | Restricción aplicada y verificada en los incrementos #80 a #85 |

## Requisitos no funcionales

| RNF | Ámbito | Verificación prevista | Estado |
|---|---|---|---|
| RNF-001 | Autorización | Matriz negativa por rol ejecutada en servidor | Implementado en #85; pruebas unitarias y de navegador cubren los cuatro perfiles |
| RNF-002 | Secretos | Escaneo de repositorio, respuestas y logs | CI con GitGuardian disponible |
| RNF-003 | Historial | Ciclo de vida, asignación, etapa y fecha generan evidencia con motivo cuando corresponde | Implementado y verificado en #80, #81, #83 y #84 |
| RNF-004 | Datos de prueba | Revisión de fixtures, BD, capturas y logs | Aplicado en datos actuales |
| RNF-005 | Puerta de datos reales | Acta aprobada o bloqueo de uso real | Bloqueo vigente |
| RNF-006 | Integridad | Caso activo incompleto rechazado | Implementado mediante validación de servidor e integridad PostgreSQL |
| RNF-007 | Responsividad | Ocho flujos en escritorio, tableta y móvil | Verificado automáticamente en tres viewports sobre los flujos persistentes |
| RNF-008 | Formularios accesibles | Etiquetas y errores asociados | Verificado en los flujos persistentes críticos y modales |
| RNF-009 | Calidad técnica | Build, tipos, lint y pruebas en CI | Pipeline disponible |
| RNF-010 | Trazabilidad | Issue, etiqueta, milestone, PR y evidencia | Aplicado al proceso |

## Modelos y evidencia

| Modelo | Propósito | Alcance |
|---|---|---|
| `mvp-process-context` | Explicar proceso interno y separación de la OJV | MVP |
| `mvp-use-cases` | Mostrar las capacidades de las ocho historias | MVP |
| `mvp-data-model` | Representar clientes, casos, asignación, fechas e historial | MVP |

Los modelos MVP reflejan cuatro perfiles, nueve etapas, la alternativa monitoria,
casos laborales individuales o colectivos y ciclos de vida reversibles. Las
decisiones de permisos, responsables y excepciones incorporadas por #78, junto
con los campos condicionales definidos en #79, constituyen reglas aprobadas para
el diseño.

La presencia de código o diagramas amplios anteriores no acredita una función del
MVP. Un estado solo cambia a implementado o verificado cuando existe evidencia
integrada y ejecutada.

## Evidencia de implementación

| Incremento | Requisitos | Pruebas | PR | Estado para el porcentaje |
|---|---|---|---|---|
| P1 clientes persistentes | RF-002, RF-003, RF-009 | Alta, edición, búsqueda y ciclo reversible aislado por estudio | PR #95; issue #80 | Integrado; 15 % |
| P2 casos y distribución | RF-004 a RF-007, RF-009 | Caso general y condicional, asignaciones, ciclo reversible y auditoría | PR #98; issue #81 | Integrado; 25 % |
| P3 consulta autorizada | RF-006, RF-010 | Búsqueda y filtros combinables sin revelar recursos ajenos | PR #99; issue #82 | Integrado; 15 % |
| P4 etapas e historial | RF-005, RF-009 | Transiciones e historial cronológico aditivo | PR #101; issue #83 | Integrado; 20 % |
| P5 fechas relevantes | RF-008, RF-009, RF-011 | Fechas persistentes y caducidad manual sin cálculo jurídico | PR #100; issue #84 | Integrado; 10 % |
| P6 acceso y permisos | RF-001; RNF-001, RNF-002, RNF-004 | Sesión interna, cuatro perfiles, aislamiento y matriz negativa | Issue #85; 30 unitarias, 7 PostgreSQL y 15 Playwright | Implementado y verificado; 15 % al integrarse |
| Ocho pantallas de Stitch implementadas | HU-01 a HU-08; RNF-004, RNF-007, RNF-008 | Ocho rutas, navegación, revisión visual de escritorio y móvil, build y prueba estructural | #72 | Evidencia visual implementada; no suma porcentaje funcional sin persistencia y aceptación |
| Flujos temporales de las ocho pantallas | HU-01 a HU-08; RNF-007 a RNF-010 | 16 pruebas unitarias y 7 Playwright: validaciones, creación y edición en memoria, filtros, modales accesibles y tres viewports | PR #75, issue #74 | Evidencia temporal integrada; mantiene 0 % funcional aceptado sin persistencia, autorización y aceptación |

## Estado del denominador

Los paquetes P1 a P5 aportan **85 %** ya integrado. P6 completa el 15 % restante
cuando su PR se integra en `develop` con Quality y GitGuardian aprobados. La
aceptación y el release se acreditan separadamente en el issue #86.
