# Evidencia de validación del corte v0.5.0

**Fecha:** 2026-11-12  
**Issue:** #86  
**Tipo de corte:** pre-release académico con datos ficticios  
**Estado:** validación técnica completa; aceptación de los socios pendiente

## Resultado del corte

Los seis paquetes ponderados del MVP se encuentran integrados en `develop` y
suman 100 % de implementación funcional según el denominador aprobado. La
extensión de reportes de la versión 1 fue implementada después del MVP y no
modifica ese porcentaje.

Este resultado no significa autorización de uso productivo ni habilita datos
reales. La puerta jurídica, técnica y organizacional de RNF-005 continúa cerrada.

## Matriz de aceptación

| Paquete | Peso | Historias y requisitos | Escenarios automatizados | PR | Resultado |
|---|---:|---|---|---|---|
| P1 Clientes persistentes | 15 % | HU-07, HU-08; RF-002, RF-003, RF-009 | Alta, edición, búsqueda, ciclo reversible, permisos, aislamiento | #95 | Aprobado |
| P2 Casos y distribución | 25 % | HU-03, HU-04; RF-004 a RF-007, RF-009 | Alta, edición, campos condicionales, responsable, participantes, archivo | #98 | Aprobado |
| P3 Consulta autorizada | 15 % | HU-02; RF-006, RF-010 | Búsqueda, filtros combinados, limpieza, recurso inexistente o ajeno | #99 | Aprobado |
| P4 Etapas e historial | 20 % | HU-04, HU-05; RF-005, RF-009 | Cambio, cancelación sin mutación, historial cronológico inmutable | #101 | Aprobado |
| P5 Fechas relevantes | 10 % | HU-06; RF-008, RF-009, RF-011 | Fecha manual, responsable, fuente, caducidad sin cálculo jurídico | #100 | Aprobado |
| P6 Acceso y permisos | 15 % | HU-01; RF-001; RNF-001, RNF-002 | Acceso, cierre, rutas protegidas, cuatro perfiles, matriz negativa | #102 | Aprobado |
| Extensión V1 Reportes | Sin peso MVP | HU-V1-01 | Carga por responsable, agregados, CSV mínimo, auditoría y rechazo | #103 | Aprobado técnicamente |

## Puertas transversales

| Puerta | Evidencia | Resultado |
|---|---|---|
| Datos ficticios | Seed idempotente, dominios `example.test`, revisión de fixtures y E2E | Aprobado |
| Aislamiento | Relaciones compuestas PostgreSQL, repositorios por `studyId` y escenarios negativos | Aprobado |
| Autorización | Sesión firmada, actor vigente y permisos de servidor por rol | Aprobado |
| Integridad | Migraciones, restricciones PostgreSQL y validaciones de servidor | Aprobado |
| Auditoría | Ciclo de vida, asignación, etapa, fecha y exportación registran actor | Aprobado |
| Responsividad | Flujos recorridos en 1440 × 900, 820 × 1180 y 390 × 844 | Aprobado |
| Calidad | Lint, tipos, pruebas, build, Quality y GitGuardian | Aprobado |
| RF-011 | Búsqueda estática de clientes HTTP y referencias OJV; solo existen textos que declaran su exclusión | Aprobado |
| Datos reales | No existe acta jurídica, técnica y organizacional de habilitación | Bloqueado correctamente |

## Regresión final

La regresión final se ejecuta sobre una base PostgreSQL nueva creada para este
corte. Debe aprobar:

- 37 pruebas unitarias o estructurales;
- 7 pruebas PostgreSQL;
- 16 pruebas Playwright;
- lint;
- comprobación de tipos;
- build de producción;
- GitGuardian y Quality en el PR final.

## Revisión funcional registrada

El responsable del proyecto ejecutó localmente el sistema el 12 de noviembre de
2026, recorrió autenticación, clientes, casos, fechas, etapas, historial y
permisos, y confirmó que la aplicación se visualiza y opera correctamente para
continuar al cierre técnico.

Esta revisión no se atribuye a los socios propietarios. La aceptación del
producto por el usuario clave del estudio y la ratificación del formato mínimo de
reportes permanecen como actividad externa pendiente. Hasta registrarla, el
artefacto se publica únicamente como pre-release académico.

## Evidencia visual anonimizada

Las capturas siguientes fueron generadas contra el build de producción y una
base PostgreSQL nueva, utilizando exclusivamente usuarios y casos ficticios:

- [`01-login.png`](evidence/v0.5.0/01-login.png): acceso interno sin registro
  público;
- [`02-casos.png`](evidence/v0.5.0/02-casos.png): consulta y gestión de casos;
- [`03-reportes.png`](evidence/v0.5.0/03-reportes.png): agregados operativos y
  exportación restringida al perfil Socio.

Estas imágenes acreditan el corte técnico; no reemplazan la revisión ni la
aceptación formal de los socios propietarios.

## Defectos y limitaciones

- No existen defectos críticos abiertos en GitHub al preparar el corte.
- El sistema no es apto para datos reales ni para operación productiva.
- No existe conexión, consulta, envío, scraping ni almacenamiento de credenciales
  de la OJV.
- No se calculan ni certifican plazos judiciales.
- La contraseña compartida del entorno de demostración debe sustituirse por un
  mecanismo de identidad productivo antes de cualquier despliegue real.

## Decisión de release

Se autoriza etiquetar `v0.5.0` como **pre-release académico** después de integrar
el PR final con todas las verificaciones verdes. `v1.0.0` queda reservado para la
aceptación externa documentada y el cumplimiento de las puertas de entrega que
correspondan; no implica por sí mismo autorización para datos reales.
