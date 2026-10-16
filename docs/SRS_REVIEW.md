# Revisión de calidad del SRS

**Documento revisado:** `docs/SRS.md`, versión 0.9  
**Fecha:** 2026-10-16  
**Referencia:** IEEE Std 830-1998  
**Alcance:** revisión interna; no constituye aprobación de los socios ni de la
docente.

## Resultado

El SRS posee una estructura identificable de introducción, descripción general,
requisitos específicos y trazabilidad. Los requisitos funcionales, no
funcionales y de datos tienen identificadores únicos, criterios verificables y
relación con su fuente o regla. Los asuntos que dependen de una decisión externa
se mantienen explícitos y no se presentan como hechos aprobados.

El documento queda apto para iniciar diseño y construcción incremental con datos
ficticios. No queda autorizado el uso de datos reales ni un despliegue
productivo. La autenticación y la autorización siguen siendo requisitos de alta
prioridad de la versión 1, aunque por decisión de planificación se implementarán
después del primer incremento funcional.

## Lista de revisión

| Propiedad | Comprobación | Evidencia | Resultado |
|---|---|---|---|
| Corrección | Cada requisito proviene del alcance, del informe, de evidencia primaria o de una decisión explícita. | Columnas `Fuente` y `Trazabilidad`; `TRACEABILITY.md`. | Cumple internamente; validación externa pendiente. |
| Ausencia de ambigüedad | Los requisitos utilizan identificadores, actor, precondición, resultado, excepciones y criterio de aceptación. | `RF-001` a `RF-030`; glosario. | Cumple con decisiones abiertas identificadas. |
| Completitud | Se cubren capacidades, exclusiones, interfaces, funciones, calidad, datos, reglas y asuntos abiertos. | Secciones 2 y 3; `ALC`, `EXC`, `RF`, `RNF`, `RN`, `RD`. | Cumple para la especificación interna de versión 1. |
| Consistencia | OJV no es una interfaz técnica; la IA no modifica fichas; datos reales permanecen bloqueados; autenticación está diferida pero no excluida. | `EXC-01`, `RN-027` a `RN-030`, `RNF-007` a `RNF-010`, sección 3.6. | Cumple. |
| Priorización | Cada RF y RNF declara prioridad; la prioridad no se confunde con el orden de desarrollo. | Secciones 3.2, 3.3 y 3.6. | Cumple. |
| Verificabilidad | Cada requisito posee un criterio observable o cuantificable y un método o caso previsto. | Criterios de aceptación; códigos `DF`, `DNF` y `DD`. | Cumple en diseño; ejecución pendiente. |
| Modificabilidad | Los requisitos están agrupados por tema y usan identificadores estables sin duplicar su definición en la matriz. | Estructura del SRS y enlaces a `TRACEABILITY.md`. | Cumple. |
| Trazabilidad | Cada RF, RNF y RD se relaciona con fuente, reglas, caso de uso o ámbito y prueba prevista. | `TRACEABILITY.md`. | Cobertura documental completa. |

## Comprobaciones de cobertura

- 30 requisitos funcionales: `RF-001` a `RF-030`.
- 28 requisitos no funcionales: `RNF-001` a `RNF-028`.
- 30 reglas del negocio: `RN-001` a `RN-030`.
- 15 requisitos de datos: `RD-001` a `RD-015`.
- 14 entidades conceptuales: `ED-01` a `ED-14`.
- 13 casos de uso reservados: `CU-001` a `CU-013`.
- 10 exclusiones explícitas: `EXC-01` a `EXC-10`.

## Decisiones externas pendientes

Los asuntos `AR-01` a `AR-07` y `AD-01` a `AD-07` requieren validación con los
socios, revisión jurídica u otra fuente autorizada. Mientras permanezcan
abiertos:

- se pueden construir prototipos y flujos reversibles con datos ficticios;
- no se deben fijar silenciosamente campos, permisos, plazos de conservación o
  tratamientos como decisiones definitivas;
- no se deben utilizar datos reales;
- los diagramas y el modelo físico deben señalar los supuestos que adopten.

## Criterio de cambio

Todo cambio que altere alcance, comportamiento o datos debe actualizar en el
mismo pull request el requisito afectado, la matriz de trazabilidad, el caso de
uso o modelo correspondiente y la prueba prevista. Una validación externa debe
registrar fecha, fuente y decisión sin publicar información confidencial.
