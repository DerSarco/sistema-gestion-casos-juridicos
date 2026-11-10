# Línea base del MVP priorizado

**Versión:** 1.2

**Fecha:** 2026-11-09

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
casos, gestione su ciclo de vida reversible, asigne responsable y participantes,
controle estado, etapa, subetapa y prioridad, registre fechas relevantes
manualmente y consulte un historial básico. Reconoce cuatro perfiles —socio,
abogado, asistente y procurador— y siete etapas —ingreso, clasificación,
comparendo, distribución, redacción, seguimiento judicial y cierre— sin fijar
todavía las transiciones, excepciones ni permisos que deben validar los socios.
El acceso interno se representa en el prototipo y su implementación técnica se
realiza al final del incremento funcional, sin habilitar registro público.

La interfaz comprometida contiene ocho vistas:

1. `MVP-01` Inicio de sesión.
2. `MVP-02` Casos.
3. `MVP-03` Formulario reutilizable de caso.
4. `MVP-04` Ficha del caso.
5. `MVP-05` Cambio de estado o etapa.
6. `MVP-06` Registro manual de fecha relevante.
7. `MVP-07` Clientes.
8. `MVP-08` Formulario reutilizable de cliente.

La desactivación de clientes y el archivo de casos se ejecutan desde listados o
fichas existentes; no agregan pantallas. Son operaciones reversibles, auditables,
sin eliminación física y restringidas a permisos elevados que deben validarse.
No se requieren pantallas independientes de detalle de cliente, edición,
administración de catálogos, recuperación de contraseña, reportes ni servicios
externos.

## Línea base funcional

| Clasificación | Requisitos | Compromiso |
|---|---|---|
| MVP | RF-001 a RF-010 | Implementar y verificar mediante las ocho historias priorizadas. RF-001 se implementa al final del incremento funcional. |
| Restricción obligatoria | RF-011 | La solución no se comunica técnicamente con la OJV ni solicita credenciales judiciales. |

El MVP comprende once requisitos funcionales, incluido `RF-011` como restricción
obligatoria. La numeración vigente es continua y no reserva identificadores para
capacidades diferidas.

## Línea base no funcional

| Clasificación | Requisitos | Compromiso |
|---|---|---|
| MVP | RNF-001 a RNF-010 | Aplicar autorización, seguridad de secretos, trazabilidad, privacidad, integridad, responsividad, accesibilidad y calidad técnica. |

El MVP comprende diez requisitos no funcionales. `RNF-005` forma parte de esos
diez requisitos y funciona además como puerta obligatoria para impedir el uso de
datos reales.

## Compromisos de la versión 1 posteriores al MVP

La versión 1 final del proyecto podrá incorporar, mediante issues y validación
específica, consulta de carga de trabajo, reportes básicos y exportaciones
autorizadas. Estas capacidades pertenecen al alcance general del producto, pero
no forman parte de la aceptación ni del porcentaje funcional del MVP actual.

## Decisiones pendientes de validación

- matriz exacta de permisos para los cuatro perfiles;
- responsable formal de la distribución y roles participantes;
- catálogos de estados, subetapas, prioridades y tipos de fecha;
- transiciones, excepciones y reglas de cierre;
- obligatoriedad de empresa, tienda, despido, finiquito y cuantía;
- perfiles autorizados para desactivar o reactivar clientes y archivar o
  reactivar casos;
- anticipación de alertas y reglas de conservación, anonimización y restauración.

Estas decisiones no pueden convertirse en reglas rígidas antes de ser validadas.

## Funciones expresamente diferidas a evoluciones futuras

- ficha independiente de cliente;
- administración de usuarios, roles y catálogos;
- recuperación de contraseña y registro público;
- reasignaciones avanzadas y correcciones administrativas fuera del flujo básico;
- alertas automáticas, calendario global y cálculo de plazos;
- dashboard analítico y reportes o exportaciones avanzadas;
- anexo imprimible de información y autorización;
- Google Calendar, OneDrive y Gemini;
- compatibilidad exhaustiva entre navegadores, pruebas de carga y restauración.

## Fuera de alcance

- integración, consulta automatizada, envío o sincronización con OJV/PJUD;
- almacenamiento de credenciales judiciales;
- cálculo automático definitivo de plazos judiciales;
- decisiones jurídicas automatizadas;
- uso de datos reales durante construcción, demostración o aceptación.
- eliminación física de clientes o casos desde los flujos del MVP.

## Regla de control de cambios

Incorporar una función del catálogo histórico requiere un issue de cambio de
alcance, análisis de impacto y actualización conjunta de este documento, el SRS,
la trazabilidad, las historias, los mockups y las pruebas. La mera existencia
histórica de un RF o RNF no autoriza su implementación en el MVP.
