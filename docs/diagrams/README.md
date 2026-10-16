# Diagramas del sistema

Los diagramas se mantienen como fuentes PlantUML (`.puml`) y SVG generado. Son
modelos de la versión 1 y no evidencia de que una función ya esté implementada.

| Diagrama | Fuente | Renderizado | Trazabilidad |
|---|---|---|---|
| Casos de uso | [`use-cases.puml`](src/use-cases.puml) | [`use-cases.svg`](rendered/use-cases.svg) | CU-001 a CU-013 |
| Clases del dominio | [`class-domain.puml`](src/class-domain.puml) | [`class-domain.svg`](rendered/class-domain.svg) | ED-01 a ED-14; RD-001 a RD-015 |
| Despliegue | [`deployment.puml`](src/deployment.puml) | [`deployment.svg`](rendered/deployment.svg) | RNF-003, RNF-004, RNF-007, RNF-013 |
| Registro de cliente | [`sequence-client-registration.puml`](src/sequence-client-registration.puml) | [`sequence-client-registration.svg`](rendered/sequence-client-registration.svg) | CU-003; RF-004, RF-007 |
| Registro de caso | [`sequence-case-registration.puml`](src/sequence-case-registration.puml) | [`sequence-case-registration.svg`](rendered/sequence-case-registration.svg) | CU-004; RF-008, RF-009 |
| Reasignación | [`sequence-reassignment.puml`](src/sequence-reassignment.puml) | [`sequence-reassignment.svg`](rendered/sequence-reassignment.svg) | CU-005; RF-014 |
| Evento Calendar | [`sequence-calendar.puml`](src/sequence-calendar.puml) | [`sequence-calendar.svg`](rendered/sequence-calendar.svg) | CU-010; RF-025, RF-029 |
| Asistencia Gemini | [`sequence-gemini.puml`](src/sequence-gemini.puml) | [`sequence-gemini.svg`](rendered/sequence-gemini.svg) | CU-012; RF-027 a RF-029 |

Para regenerar los SVG se puede utilizar PlantUML local o su imagen oficial de
contenedor. La fuente y el renderizado deben actualizarse juntos.

## Reglas de elaboración

1. Crear y asignar un issue antes de elaborar un diagrama.
2. Usar la misma terminología e identificadores definidos en el SRS.
3. Revisar el modelo contra los criterios de aceptación del issue.
4. Versionar conjuntamente la fuente editable y la exportación.
5. Agregar título y fuente al reutilizarlo en el informe académico.
