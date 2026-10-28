# Objetivos y medición del proyecto

**Versión:** 1.0

**Fecha:** 2026-10-22

**Issue de origen:** #49

## Criterio de formulación

Los objetivos responden al problema observado en el Estudio Jurídico X y al
alcance comprometido en [`MVP_SCOPE.md`](MVP_SCOPE.md). Cada objetivo posee un
único verbo rector en infinitivo. Los indicadores, metas, evidencias y momentos
de verificación se expresan por separado para no convertir la redacción del
objetivo en una enumeración de actividades.

Las metas representan compromisos del proyecto. No constituyen resultados ya
obtenidos ni demuestran, por sí solas, una disminución del tiempo administrativo
o de los errores del estudio.

## Objetivo general

> **Centralizar** durante el segundo semestre académico de 2026 el registro, la
> asignación y el seguimiento inicial de clientes y casos del Estudio Jurídico X
> mediante un prototipo web funcional limitado al alcance priorizado, como
> respuesta a la fragmentación de la información y a la falta de trazabilidad
> observadas.

| Elemento de medición | Definición |
|---|---|
| Indicador | Porcentaje de historias priorizadas aceptadas y proporción de requisitos priorizados con evidencia de verificación. |
| Meta | 8 de 8 historias aceptadas, 11 de 11 requisitos funcionales y 10 de 10 requisitos no funcionales del MVP con evidencia, manteniendo `RF-011` como restricción obligatoria. |
| Evidencia | Matriz de trazabilidad, resultados de pruebas, demostración del prototipo y registro de aceptación con datos ficticios o anonimizados. |
| Momento de verificación | Cierre del incremento funcional del segundo semestre académico de 2026, antes de la entrega final del proyecto. |

## Objetivos específicos

### OE-01

> **Caracterizar** el proceso actual de registro, asignación y seguimiento
> inicial del Estudio Jurídico X con evidencia primaria anonimizada y fuentes
> documentales trazables.

| Elemento de medición | Definición |
|---|---|
| Indicador | Cobertura de las etapas observadas y de las afirmaciones relevantes mediante evidencia registrada. |
| Meta | Flujo actual documentado desde la recepción del cliente hasta el seguimiento inicial, con cada afirmación relevante vinculada con una fuente o marcada como inferencia. |
| Evidencia | Contexto del problema, fichas de evidencia primaria, matriz académica de trazabilidad y diagrama del proceso o contexto. |
| Momento de verificación | Cierre de la etapa de discovery, antes de aprobar la línea base del diseño. |

### OE-02

> **Diseñar** la experiencia de usuario y el modelo de información del prototipo
> conforme a las ocho historias priorizadas y a las restricciones de privacidad
> del proyecto.

| Elemento de medición | Definición |
|---|---|
| Indicador | Cobertura de historias priorizadas mediante vistas y elementos del modelo de información trazables. |
| Meta | 8 de 8 historias representadas en las ocho vistas aprobadas y 100 % de las entidades necesarias del modelo reducido vinculadas con al menos una historia priorizada. |
| Evidencia | Proyecto Stitch, inventario de vistas `MVP-01` a `MVP-08`, historias Gherkin, modelo de datos reducido y matriz de trazabilidad. |
| Momento de verificación | Cierre del hito de diseño, antes de reconstruir la interfaz en Next.js. |

### OE-03

> **Implementar** las funciones priorizadas de clientes, casos, responsables,
> estados, etapas, fechas relevantes e historial básico en un entorno de
> preproducción con datos ficticios o anonimizados.

| Elemento de medición | Definición |
|---|---|
| Indicador | Porcentaje de requisitos funcionales priorizados con cambio integrado y prueba asociada. |
| Meta | 10 de 10 requisitos funcionales del MVP implementados y vinculados con issue, pull request y prueba; acceso interno completado en el último incremento funcional. |
| Evidencia | Código integrado en `develop`, historial de Issues y pull requests, pipeline de CI y reporte de pruebas. |
| Momento de verificación | Cierre del incremento funcional, antes de la validación de aceptación. |

### OE-04

> **Validar** la consistencia funcional, técnica y documental del prototipo con
> las historias Gherkin, los requisitos priorizados y la revisión de los socios
> propietarios.

| Elemento de medición | Definición |
|---|---|
| Indicador | Porcentaje de escenarios Gherkin ejecutados, defectos críticos abiertos y cobertura documental del MVP. |
| Meta | 100 % de los escenarios de las ocho historias ejecutados, cero defectos críticos abiertos y trazabilidad completa entre historia, requisito, issue, cambio y evidencia. |
| Evidencia | Reporte de pruebas, matriz de trazabilidad actualizada, registro anonimizado de revisión y acta o minuta de aceptación. |
| Momento de verificación | Antes de la entrega final y de cualquier decisión sobre una iteración posterior. |

## Límites de interpretación

- Los objetivos no comprometen dashboard, reportes, exportaciones, alertas
  automáticas, anexo imprimible ni administración avanzada.
- Calendar, OneDrive y Gemini permanecen diferidos.
- La OJV no constituye una interfaz de software y el prototipo no calcula plazos
  judiciales definitivos.
- El cumplimiento se verifica con datos ficticios o anonimizados; no habilita el
  uso productivo con datos reales.
- Una función diferida solo puede incorporarse mediante el control de cambios
  definido en `MVP_SCOPE.md`.
