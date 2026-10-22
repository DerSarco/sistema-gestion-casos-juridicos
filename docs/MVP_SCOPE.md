# Línea base del MVP priorizado

**Versión:** 1.1

**Fecha:** 2026-10-22

**Issues de origen:** #50, #52 y #61

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

## Línea base funcional

| Clasificación | Requisitos | Compromiso |
|---|---|---|
| MVP | RF-001, RF-004, RF-005, RF-008 a RF-010, RF-013, RF-015, RF-017 y RF-019 | Implementar y verificar mediante las ocho historias priorizadas. RF-001 se implementa al final del incremento funcional. |
| Catálogo histórico para evolución | RF-002, RF-003, RF-006, RF-007, RF-011, RF-012, RF-014, RF-016, RF-018 y RF-020 a RF-029 | No son requisitos del MVP ni criterios de aceptación; requieren una nueva decisión de alcance. |
| Restricción obligatoria | RF-030 | La solución no se comunica técnicamente con la OJV ni solicita credenciales judiciales. |

El MVP comprende diez requisitos funcionales y una restricción obligatoria. Los
identificadores históricos restantes se conservan únicamente para evitar perder
decisiones previas; no forman parte de la especificación normativa vigente.

## Línea base no funcional

| Clasificación | Requisitos | Compromiso |
|---|---|---|
| MVP | RNF-001, RNF-003, RNF-005, RNF-007, RNF-008, RNF-011, RNF-018, RNF-019, RNF-022 y RNF-028 | Aplicar autorización, seguridad de secretos, trazabilidad, privacidad, integridad, responsividad, accesibilidad y calidad técnica. |
| Catálogo histórico para evolución | RNF-002, RNF-004, RNF-006, RNF-009, RNF-010, RNF-012 a RNF-017, RNF-020, RNF-021 y RNF-023 a RNF-027 | No son requisitos del MVP; podrán evaluarse en una iteración posterior según riesgo y valor. |

El MVP comprende diez requisitos no funcionales. `RNF-008` forma parte de esos
diez requisitos y funciona además como puerta obligatoria para impedir el uso de
datos reales.

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

Incorporar una función del catálogo histórico requiere un issue de cambio de
alcance, análisis de impacto y actualización conjunta de este documento, el SRS,
la trazabilidad, las historias, los mockups y las pruebas. La mera existencia
histórica de un RF o RNF no autoriza su implementación en el MVP.
