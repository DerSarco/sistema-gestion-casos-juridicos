# Matriz de trazabilidad de requisitos

**Versión:** 0.1

**Fecha:** 2026-10-16

**SRS relacionado:** [Especificación de requisitos](SRS.md)

## Propósito y mantenimiento

Esta matriz relaciona la necesidad o decisión de origen con la especificación,
los modelos previstos y la evidencia de verificación. Debe actualizarse en el
mismo pull request cuando un requisito cambie de identificador, alcance, estado
o método de prueba.

Estados utilizados:

- **Especificado:** definido en el SRS y pendiente de validación o construcción.
- **Validado:** revisado y aceptado por la fuente autorizada.
- **Implementado:** existe evidencia técnica en la rama de integración.
- **Verificado:** la prueba vinculada fue ejecutada y aprobada.
- **Diferido:** permanece en la versión 1, pero su implementación se programó
  para un incremento posterior.

Los códigos `CU-###`, `DF-###`, `DNF-###` y `DD-###` reservan respectivamente
casos de uso, pruebas funcionales, pruebas no funcionales y pruebas de datos. La
existencia de un código no implica que la evidencia ya haya sido ejecutada.

## Catálogo previsto de casos de uso

| ID | Caso de uso | Actores principales | Estado |
|---|---|---|---|
| CU-001 | Acceder a la plataforma interna | ACT-01, ACT-02, ACT-03 | Pendiente de diagrama; implementación diferida |
| CU-002 | Administrar usuarios, roles y catálogos | ACT-01 | Pendiente de diagrama; acceso diferido |
| CU-003 | Registrar y mantener clientes | ACT-01, ACT-03; ACT-02 si se autoriza | Pendiente de diagrama |
| CU-004 | Registrar y mantener casos | ACT-01, ACT-02, ACT-03 según permiso | Pendiente de diagrama |
| CU-005 | Asignar y reasignar responsables | ACT-01; otros si se autoriza | Pendiente de diagrama |
| CU-006 | Gestionar fechas, hitos y alertas | Usuarios autorizados | Pendiente de diagrama |
| CU-007 | Consultar historial y corregir datos | Usuarios autorizados; ACT-01 para corrección | Pendiente de diagrama |
| CU-008 | Buscar, consultar dashboard y exportar | ACT-01, ACT-02, ACT-03 según alcance | Pendiente de diagrama |
| CU-009 | Gestionar anexo de información y autorización | ACT-01, ACT-03; ACT-02 si se autoriza | Pendiente de diagrama |
| CU-010 | Crear evento seleccionado en Calendar | Usuario autorizado | Pendiente de diagrama |
| CU-011 | Mantener referencia OneDrive | Usuario autorizado | Pendiente de diagrama |
| CU-012 | Solicitar y resolver asistencia Gemini | Usuario autorizado | Pendiente de diagrama |
| CU-013 | Registrar manualmente antecedentes obtenidos fuera del sistema | Usuario autorizado | Pendiente de diagrama; OJV no es interfaz |

## Requisitos funcionales

| Requisito | Fuente y reglas | Caso de uso | Verificación prevista | Issue | Estado |
|---|---|---|---|---|---|
| RF-001 | ALC-01; RN-001 a RN-003 | CU-001 | DF-001: acceso válido, inválido e inactivo | #4 | Especificado; diferido |
| RF-002 | ALC-01; RN-002 a RN-004 | CU-002 | DF-002: alta, cambio de rol y desactivación | #4 | Especificado; diferido |
| RF-003 | ALC-01; RN-001 a RN-003 | Todos los CU protegidos | DF-003: matriz positiva y negativa por rol | #4 | Especificado; diferido |
| RF-004 | ALC-02; RN-001, RN-005, RN-007 | CU-003 | DF-004: registro válido, inválido y coincidencia | #4 | Especificado |
| RF-005 | ALC-02; RN-003, RN-005, RN-006 | CU-003 | DF-005: consulta autorizada y denegada | #4 | Especificado |
| RF-006 | ALC-02, ALC-07; RN-003, RN-008, RN-018 | CU-003, CU-007 | DF-006: actualización e historial | #4 | Especificado |
| RF-007 | ALC-02; RN-005, RN-007 | CU-003 | DF-007: coincidencia sin fusión automática | #4 | Especificado |
| RF-008 | ALC-03; RN-006, RN-009, RN-012 | CU-004 | DF-008: creación con antecedentes judiciales ausentes | #4 | Especificado |
| RF-009 | ALC-03; RN-007, RN-010, RN-011, RN-013 | CU-004 | DF-009: activación válida y faltantes | #4 | Especificado |
| RF-010 | ALC-03, ALC-07; RN-003, RN-010, RN-018 | CU-004, CU-007 | DF-010: lectura y edición por campo autorizado | #4 | Especificado |
| RF-011 | Flujo observado; RN-012, RN-030 | CU-013 | DF-011: ingreso manual sin llamada a OJV | #4 | Especificado |
| RF-012 | ALC-05; RN-004, RN-011 | CU-002 | DF-012: vigencia y transiciones de catálogo | #4 | Especificado |
| RF-013 | ALC-04; RN-013, RN-018 | CU-005 | DF-013: asignación válida e inválida | #4 | Especificado |
| RF-014 | ALC-04, ALC-07; RN-014, RN-018, RN-019 | CU-005, CU-007 | DF-014: reasignación conserva responsable anterior | #4 | Especificado |
| RF-015 | ALC-06; RN-015 a RN-017 | CU-006 | DF-015: fecha interna y judicial sin cálculo automático | #4 | Especificado |
| RF-016 | ALC-06, ALC-09; RN-015, RN-016, RN-018 | CU-006 | DF-016: activación, visualización y cierre de alerta | #4 | Especificado |
| RF-017 | ALC-07; RN-018, RN-019 | CU-007 | DF-017: timeline cronológico no editable | #4 | Especificado |
| RF-018 | ALC-07; RN-019 | CU-007 | DF-018: corrección preserva evidencia anterior | #4 | Especificado |
| RF-019 | ALC-08; RN-003, RN-009, RN-011 | CU-008 | DF-019: filtros combinados y aislamiento de resultados | #4 | Especificado |
| RF-020 | ALC-09; RN-003, RN-010, RN-013, RN-016 | CU-008 | DF-020: dashboard diferenciado por rol | #4 | Especificado |
| RF-021 | ALC-14; RN-003, RN-018, RN-029 | CU-008 | DF-021: exportación limitada y trazada | #4 | Especificado |
| RF-022 | ALC-10; RN-020, RN-024 | CU-009 | DF-022: versión vigente y conservación histórica | #4 | Especificado |
| RF-023 | ALC-10; RN-020 a RN-024 | CU-009 | DF-023: generación con folio y versión | #4 | Especificado |
| RF-024 | ALC-10; RN-021 a RN-023 | CU-009 | DF-024: entrega, firma, estado y referencia | #4 | Especificado |
| RF-025 | ALC-11, DEP-02; RN-025 | CU-010 | DF-025: diez intentos con éxito o error controlado | #4 | Especificado |
| RF-026 | ALC-12, DEP-03; RN-026 | CU-011 | DF-026: referencia válida e inválida sin copiar documento | #4 | Especificado |
| RF-027 | ALC-13, DEP-04; RN-027, RN-028 | CU-012 | DF-027: confirmación, respuesta válida, inválida y falla | #4 | Especificado |
| RF-028 | ALC-13; RN-028 | CU-012 | DF-028: aceptar, editar y descartar por separado | #4 | Especificado |
| RF-029 | DEP-02 a DEP-04; RN-025, RN-026, RN-028 | CU-010 a CU-012 | DF-029: continuidad manual ante fallas externas | #4 | Especificado |
| RF-030 | EXC-01, EXC-02; RN-030 | Todos | DF-030: auditoría sin clientes, secretos ni tráfico OJV | #4 | Especificado |

## Requisitos no funcionales

| Requisito | Fuente | Ámbito | Verificación prevista | Issue | Estado |
|---|---|---|---|---|---|
| RNF-001 | R1, R8 del informe; RN-003 | Autorización | DNF-001: matriz negativa en servidor | #5 | Especificado; diferido |
| RNF-002 | R1 del informe | Cuentas | DNF-002: cuentas inactivas y sesiones inválidas | #5 | Especificado; diferido |
| RNF-003 | Arquitectura y GitGuardian | Secretos | DNF-003: escaneo de repositorio, respuesta y logs | #5 | Especificado |
| RNF-004 | Arquitectura de tres capas | Comunicaciones | DNF-004: inspección de HTTPS y conexión administrada | #5 | Especificado |
| RNF-005 | R5, R8; RN-018, RN-019 | Auditoría | DNF-005: cobertura del catálogo crítico | #5 | Especificado |
| RNF-006 | ASVS y plan de riesgos | Dependencias | DNF-006: auditoría sin críticos sin respuesta | #5 | Especificado |
| RNF-007 | EXC-10 | Datos de prueba | DNF-007: revisión de fixtures, BD, capturas y logs | #5 | Especificado |
| RNF-008 | R11; A-28 | Puerta de datos reales | DNF-008: lista y acta aprobadas o bloqueo | #5 | Especificado |
| RNF-009 | Minimización | Logs y errores | DNF-009: inspección de casos de error | #5 | Especificado |
| RNF-010 | R13, R14; RN-027 | Gemini | DNF-010: bloqueo sin confirmación | #5 | Especificado |
| RNF-011 | R2, R8; RN-010 | Integridad | DNF-011: caso activo incompleto rechazado | #5 | Especificado |
| RNF-012 | R3, R5; PostgreSQL | Transacciones | DNF-012: fallas inducidas sin estado parcial | #5 | Especificado |
| RNF-013 | R7, R10, R14 | Tolerancia a fallas | DNF-013: rechazo, timeout y respuesta inválida | #5 | Especificado |
| RNF-014 | Plan de pruebas | Contratos externos | DNF-014: esquemas válidos e inválidos | #5 | Especificado |
| RNF-015 | R9 y métrica del informe | Rendimiento | DNF-015: diez búsquedas individuales bajo 10 s | #5 | Especificado |
| RNF-016 | SUP-06 | Capacidad | DNF-016: consultas acotadas con datos representativos | #5 | Especificado |
| RNF-017 | SUP-06 | Línea base | DNF-017: acta de volumen y concurrencia | #5 | Especificado |
| RNF-018 | Interfaz responsiva | Responsividad | DNF-018: tres viewports sin pérdida funcional | #5 | Especificado |
| RNF-019 | Características de usuarios | Formularios | DNF-019: nombres accesibles y errores asociados | #5 | Especificado |
| RNF-020 | Accesibilidad | Teclado | DNF-020: recorrido crítico sin bloqueo | #5 | Especificado |
| RNF-021 | Playwright | Compatibilidad | DNF-021: Chromium, Firefox y WebKit | #5 | Especificado |
| RNF-022 | Puerta técnica y GitFlow | Calidad | DNF-022: build, tipos, lint y pruebas | #5 | Especificado |
| RNF-023 | Plan integrado de pruebas | Reglas críticas | DNF-023: caso válido e inválido por regla | #5 | Especificado |
| RNF-024 | Mitigación PostgreSQL | Migraciones | DNF-024: base vacía a esquema vigente | #5 | Especificado |
| RNF-025 | R10 y riesgos | Recuperación | DNF-025: restauración y flujo crítico | #5 | Especificado |
| RNF-026 | Plan de aceptación | Defectos | DNF-026: cero críticos y 100 % casos críticos | #5 | Especificado |
| RNF-027 | Riesgo de fechas | Tiempo | DNF-027: límites en `America/Santiago` | #5 | Especificado |
| RNF-028 | GitFlow e issue #7 | Release | DNF-028: auditoría de PR y matriz | #5 | Especificado |

## Requisitos de datos

| Requisito | Fuente y relaciones | Modelo previsto | Verificación prevista | Issue | Estado |
|---|---|---|---|---|---|
| RD-001 | RN-001, RN-005, RN-009 | ED-01, ED-02, ED-04, ED-05, ED-07 a ED-14 | DD-001: identificador y estudio obligatorios | #6 | Especificado |
| RD-002 | RN-006, RN-014, RN-015 | ED-04 a ED-08 | DD-002: integridad referencial | #6 | Especificado |
| RD-003 | RN-010, RNF-011 | ED-05, ED-06, ED-07 | DD-003: caso activo incompleto rechazado | #6 | Especificado |
| RD-004 | RN-011, RF-012 | ED-07 | DD-004: vigencia sin reescritura histórica | #6 | Especificado |
| RD-005 | RN-013, RN-014, RNF-012 | ED-06 | DD-005: una asignación principal vigente | #6 | Especificado |
| RD-006 | RN-012, RF-011 | ED-05 | DD-006: nulabilidad y actualización manual trazada | #6 | Especificado |
| RD-007 | RN-015, RNF-027 | ED-08 | DD-007: instante y zona horaria | #6 | Especificado |
| RD-008 | RN-018, RN-019, RF-018 | ED-09 | DD-008: historial aditivo | #6 | Especificado |
| RD-009 | RN-026, RF-026 | ED-10 | DD-009: referencia mínima sin documento | #6 | Especificado |
| RD-010 | RNF-003, RNF-009 | ED-11, ED-14 | DD-010: errores sanitizados | #6 | Especificado |
| RD-011 | RN-020 a RN-023 | ED-12, ED-13 | DD-011: versión histórica del anexo | #6 | Especificado |
| RD-012 | RN-027, RN-028 | ED-14, ED-05 | DD-012: decisión humana antes de persistir | #6 | Especificado |
| RD-013 | RNF-007, RNF-010 | Todas en pruebas | DD-013: conjunto ficticio o anonimizado | #6 | Especificado |
| RD-014 | RN-029, RF-021 | ED-04, ED-05, ED-09 | DD-014: exportación por alcance | #6 | Especificado |
| RD-015 | EXC-02, RNF-003, RF-030 | Fuera del modelo funcional | DD-015: esquema sin credenciales judiciales o secretos | #6 | Especificado |

## Cobertura y asuntos abiertos

- Los 30 RF, 28 RNF y 15 RD definidos en el SRS poseen fuente y verificación
  prevista en esta matriz.
- Los casos de uso deben materializarse durante el milestone de diseño y enlazar
  sus archivos fuente y renderizados.
- Los códigos de prueba deben convertirse en archivos o casos ejecutables durante
  construcción; hasta entonces su estado es previsto.
- Los asuntos `AR-###` y `AD-###` del SRS deben resolverse o mantenerse
  explícitamente abiertos antes de la revisión final.
- La matriz no afirma que una función está implementada o verificada sin evidencia
  disponible en el repositorio o en GitHub.
