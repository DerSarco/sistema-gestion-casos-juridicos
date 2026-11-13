# Diagramas del sistema

Los diagramas se mantienen como fuentes PlantUML (`.puml`) y SVG generado. Son
modelos de análisis y diseño; no acreditan por sí solos que una función esté
implementada.

## Línea base del MVP y selección para el video

Estos son los únicos modelos que representan el compromiso actual completo. Los
tres se utilizarán en el video de hasta quince minutos:

| Orden | Diagrama | Propósito en el video | Tiempo objetivo | Fuente | SVG | Trazabilidad |
|---|---|---|---:|---|---|---|
| 1 | Proceso y contexto del MVP | Explicar el flujo interno y separar la OJV del sistema. | 50 s | [`mvp-process-context.puml`](src/mvp-process-context.puml) | [`mvp-process-context.svg`](rendered/mvp-process-context.svg) | Objetivo general; RF-011; HU-02 a HU-08 |
| 2 | Casos de uso reducidos | Mostrar cuatro perfiles y capacidades realmente comprometidas. | 60 s | [`mvp-use-cases.puml`](src/mvp-use-cases.puml) | [`mvp-use-cases.svg`](rendered/mvp-use-cases.svg) | CU-001, CU-003 a CU-008 y CU-013 |
| 3 | Modelo de datos del MVP | Explicar el caso laboral general, sus campos condicionales y la separación respecto del cliente. | 60 s | [`mvp-data-model.puml`](src/mvp-data-model.puml) | [`mvp-data-model.svg`](rendered/mvp-data-model.svg) | ED-01 a ED-10 según relaciones mostradas |

El bloque completo ocupa aproximadamente 2 minutos y 50 segundos. En la
presentación debe indicarse que el acceso está diseñado pero todavía no
implementado, que la persistencia actual es temporal, que #74 mantiene 0 %
funcional aceptado y que la OJV no es una integración. Los modelos reflejan
cuatro perfiles, nueve etapas, la alternativa de audiencia única, casos
individuales o colectivos, campos condicionales y ciclos de vida reversibles con
los permisos operativos validados en #78 y el diseño #79.

## Diagramas de apoyo del MVP

| Diagrama | Fuente | Renderizado | Trazabilidad |
|---|---|---|---|
| Registro de cliente | [`sequence-client-registration.puml`](src/sequence-client-registration.puml) | [`sequence-client-registration.svg`](rendered/sequence-client-registration.svg) | CU-003; RF-002 |
| Registro de caso | [`sequence-case-registration.puml`](src/sequence-case-registration.puml) | [`sequence-case-registration.svg`](rendered/sequence-case-registration.svg) | CU-004; RF-004, RF-005 |

Estos diagramas pueden respaldar preguntas técnicas, pero no necesitan ocupar
tiempo propio en el video principal.

## Visión futura conservada

Los siguientes modelos pertenecen a la especificación extensa anterior. Se
conservan como antecedente de evolución y no integran el criterio de aceptación
del MVP:

| Diagrama amplio | Fuente | Renderizado | Elementos diferidos |
|---|---|---|---|
| Casos de uso versión amplia | [`use-cases.puml`](src/use-cases.puml) | [`use-cases.svg`](rendered/use-cases.svg) | Administración, alertas, dashboard, exportación, anexo e integraciones. |
| Dominio versión amplia | [`class-domain.puml`](src/class-domain.puml) | [`class-domain.svg`](rendered/class-domain.svg) | Referencias externas, Calendar, anexo y asistencia. |
| Despliegue previsto ampliado | [`deployment.puml`](src/deployment.puml) | [`deployment.svg`](rendered/deployment.svg) | Calendar, OneDrive, Gemini y persistencia administrada. |
| Reasignación avanzada | [`sequence-reassignment.puml`](src/sequence-reassignment.puml) | [`sequence-reassignment.svg`](rendered/sequence-reassignment.svg) | Capacidad diferida, sin RF vigente. |
| Evento Calendar | [`sequence-calendar.puml`](src/sequence-calendar.puml) | [`sequence-calendar.svg`](rendered/sequence-calendar.svg) | Capacidad diferida, sin RF vigente. |
| Asistencia Gemini | [`sequence-gemini.puml`](src/sequence-gemini.puml) | [`sequence-gemini.svg`](rendered/sequence-gemini.svg) | Capacidad diferida, sin RF vigente. |

La conservación de estos archivos no autoriza su implementación. Cualquier
traslado al alcance requiere el control de cambios definido en
[`../MVP_SCOPE.md`](../MVP_SCOPE.md).

## Reglas de elaboración

1. Crear y asignar un issue antes de elaborar un diagrama.
2. Usar la misma terminología e identificadores definidos en el SRS.
3. Revisar el modelo contra los criterios de aceptación del issue.
4. Versionar conjuntamente la fuente editable y la exportación.
5. Agregar título, versión, fecha y fuente al reutilizarlo en el informe.
6. Identificar explícitamente si el diagrama representa el MVP o una visión
   futura.
