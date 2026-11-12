# Validación operativa del MVP

**Fecha de consolidación:** 2026-11-11  
**Issue:** #78  
**Estado:** decisiones incorporadas al SRS 1.6

## Propósito y protección de la evidencia

Esta minuta registra únicamente decisiones funcionales anonimizadas obtenidas de
un documento respondido por el interlocutor del estudio y de la observación
estructural de una planilla operativa. Los originales permanecen fuera del
repositorio porque pueden contener información confidencial.

No se copiaron filas, nombres, RUT, teléfonos, correos, empresas, RIT, cuantías,
credenciales ni antecedentes de casos. La planilla se utilizó exclusivamente
para comprender el flujo, los campos y los controles actuales. No se utilizará
como semilla, fixture, prueba, mockup ni fuente de datos del producto.

## Decisiones consolidadas

- Los perfiles internos son Socio, Abogado, Asistente y Procurador.
- Los cuatro perfiles pueden consultar, registrar y editar clientes y casos,
  cambiar estado o etapa y registrar fechas dentro del estudio.
- Solo Socio puede distribuir o reasignar, desactivar o reactivar clientes y
  archivar o reabrir casos. Estas acciones requieren motivo y auditoría.
- El cliente requiere nombre completo, teléfono, origen o materia y RUT. El
  correo es opcional y la fecha de despido se exige cuando corresponda.
- Una coincidencia por nombre y origen genera advertencia, pero no bloquea ni
  fusiona fichas porque una persona puede tener más de una gestión.
- En una causa laboral se exigen empresa, fecha de ingreso y fecha de despido.
  Tienda, finiquito y cuantía son accesorios.
- El responsable principal es un socio o abogado. El procurador puede participar
  en entrevistas, recolección de documentos y otras gestiones de apoyo.
- El flujo comprende ingreso, clasificación, comparendo, distribución,
  redacción, seguimiento judicial, audiencia preparatoria, juicio o conciliación
  y cierre. El procedimiento monitorio puede utilizar audiencia única.
- Un caso puede cerrarse anticipadamente en comparendo, audiencia o juicio
  cuando existe acuerdo o sentencia y pago.
- El sistema registra fechas laborales, de comparendo, presentación y audiencias.
  La caducidad es una referencia manual; no existe cálculo jurídico automático.
- El orden operativo utiliza la etapa y la próxima fecha. El MVP no incorpora un
  catálogo manual de prioridad ni alertas automáticas.
- El historial incluye ingreso, asignación, presentación y cambios críticos de
  ciclo de vida, responsable, etapa, estado y fechas.
- La información debe permanecer disponible operativamente durante seis meses
  después del cierre. No se elimina automáticamente al terminar ese periodo.

## Decisiones que permanecen fuera de esta validación

- autorización jurídica, técnica y organizacional para utilizar datos reales;
- política definitiva de bloqueo, respaldo, anonimización o eliminación después
  de los seis meses de disponibilidad operativa;
- aceptación funcional final del producto;
- reportes, exportaciones y demás capacidades diferidas.

Una diferencia posterior expresada por los socios debe registrarse mediante un
issue de control de cambios. No corresponde alterar silenciosamente estas reglas.
