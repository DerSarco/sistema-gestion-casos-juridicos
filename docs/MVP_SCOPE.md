# Línea base del MVP priorizado

**Versión:** 1.0

**Fecha:** 2026-10-21

**Issue de origen:** #50 y #52

## Propósito

Este documento fija el compromiso verificable de la iteración. Conserva los
identificadores históricos del SRS, pero distingue entre lo que se construirá y
validará ahora, lo que se evaluará en una iteración posterior y las
restricciones que no admiten excepción.

`MVP priorizado` no es una edición comercial denominada *Essential*. En este
repositorio significa exclusivamente el subconjunto de requisitos comprometido
para el prototipo funcional académico actual.

## Resultado comprometido

El MVP permitirá que personal interno autorizado registre y consulte clientes y
casos, asigne un abogado responsable, controle estado y etapa, registre fechas
relevantes manualmente y consulte un historial básico. El acceso interno se
representa en el prototipo y su implementación técnica se realiza al final del
incremento funcional, sin habilitar registro público.

La interfaz comprometida contiene ocho vistas:

1. `MVP-01` Inicio de sesión.
2. `MVP-02` Casos.
3. `MVP-03` Formulario reutilizable de caso.
4. `MVP-04` Ficha del caso.
5. `MVP-05` Cambio de estado o etapa.
6. `MVP-06` Registro manual de fecha relevante.
7. `MVP-07` Clientes.
8. `MVP-08` Formulario reutilizable de cliente.

No se requieren pantallas independientes de detalle de cliente, edición,
administración de catálogos, recuperación de contraseña, reportes ni servicios
externos.

## Clasificación funcional

| Clasificación | Requisitos | Compromiso |
|---|---|---|
| MVP priorizado | RF-001, RF-003 a RF-011, RF-013, RF-015, RF-017 y RF-019 | Implementar y verificar mediante las ocho vistas e historias priorizadas. RF-001 y RF-003 se implementan al final del incremento. |
| Diferido | RF-002, RF-012, RF-014, RF-016, RF-018 y RF-020 a RF-029 | Mantener especificados para análisis futuro, sin pantallas ni criterio de término en esta iteración. |
| Restricción obligatoria | RF-030 | La solución no se comunica técnicamente con la OJV ni solicita credenciales judiciales. |

El MVP comprende catorce requisitos funcionales implementables, quince
requisitos diferidos y una restricción obligatoria. Un requisito diferido no se
considera incumplido ni puede bloquear la aceptación de esta iteración.

## Clasificación no funcional

| Clasificación | Requisitos | Compromiso |
|---|---|---|
| MVP priorizado | RNF-001, RNF-003 a RNF-007, RNF-009, RNF-011, RNF-015, RNF-018 a RNF-020, RNF-022, RNF-023, RNF-027 y RNF-028 | Aplicar seguridad básica, privacidad, integridad, rendimiento de búsqueda, responsividad, accesibilidad, calidad técnica, manejo temporal y trazabilidad. |
| Diferido | RNF-002, RNF-010, RNF-012 a RNF-014, RNF-016, RNF-017, RNF-021 y RNF-024 a RNF-026 | Evaluar junto con administración de cuentas, integraciones, mayor capacidad, compatibilidad ampliada y preparación de una release posterior. |
| Restricción obligatoria | RNF-008 | Mantener bloqueado el uso de datos reales hasta aprobar la puerta jurídica, técnica y organizacional. |

El MVP comprende dieciséis requisitos no funcionales implementables, once
requisitos diferidos y una restricción obligatoria.

## Funciones expresamente diferidas

- ficha independiente de cliente;
- administración de usuarios, roles y catálogos;
- recuperación de contraseña y registro público;
- reasignaciones avanzadas y correcciones administrativas;
- alertas automáticas, calendario global y cálculo de plazos;
- dashboard, carga de trabajo, reportes y exportaciones;
- anexo imprimible de información y autorización;
- Google Calendar, OneDrive y Gemini;
- compatibilidad exhaustiva entre navegadores, pruebas de carga y restauración.

## Fuera de alcance

- integración, consulta automatizada, envío o sincronización con OJV/PJUD;
- almacenamiento de credenciales judiciales;
- cálculo automático definitivo de plazos judiciales;
- decisiones jurídicas automatizadas;
- uso de datos reales durante construcción, demostración o aceptación.

## Regla de control de cambios

Incorporar una función diferida requiere un issue de cambio de alcance, análisis
de impacto y actualización conjunta de este documento, el SRS, la trazabilidad,
las historias, los mockups y las pruebas. La mera existencia histórica de un RF
o RNF no autoriza su implementación en el MVP.
