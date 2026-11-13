# Reportes y exportaciones autorizadas de la versión 1

**Fecha:** 2026-11-12  
**Issue:** #87  
**Estado:** implementado para preproducción con datos ficticios

## Finalidad y alcance

La versión 1 incorpora una consulta interna de carga de trabajo para apoyar la
distribución y el seguimiento ya definidos en el alcance general del proyecto.
La pantalla presenta totales de casos, carga por responsable y distribuciones
por etapa y estado. Todas las consultas se limitan al `studyId` de la sesión.

Esta capacidad no cambia el denominador del MVP ni crea un dashboard analítico.
Tampoco incorpora inteligencia artificial, Calendar, OneDrive, OJV ni cálculo de
plazos. Su finalidad deriva de la consulta de carga y reportes contemplada en el
alcance acordado; el formato mínimo se adopta como decisión de diseño sujeta a
ratificación durante la aceptación de la versión 1.

## Exportación mínima

Solo el perfil `Socio` puede generar el CSV. El archivo incluye exclusivamente:

- código interno del caso;
- materia;
- etapa;
- estado operativo;
- ciclo activo o archivado;
- responsable principal;
- próxima fecha relevante registrada, cuando existe.

Se excluyen nombre y datos de contacto del cliente, RUT, RIT, ROL, tribunal,
empleador, fechas laborales, cuantías, observaciones e historial. Las celdas se
escapan como CSV y se neutralizan valores que una hoja de cálculo podría
interpretar como fórmula.

## Autorización y auditoría

- Los cuatro perfiles pueden consultar agregados del mismo estudio porque ya
  poseen permiso de consulta de sus casos internos.
- Solo `Socio` visualiza y ejecuta la exportación.
- El servidor vuelve a comprobar sesión, rol activo y `studyId`; ocultar el botón
  no constituye la autorización.
- Cada exportación registra actor, momento, formato y cantidad de filas. El
  historial no almacena el contenido exportado.
- La respuesta usa `Cache-Control: no-store` y no expone datos al rechazar una
  solicitud.

## Escenarios verificables

```gherkin
Escenario: Consultar carga autorizada
  Dado un usuario interno con sesión y perfil vigentes
  Cuando consulta los reportes
  Entonces obtiene solamente agregados de casos de su estudio

Escenario: Exportar un reporte mínimo como Socio
  Dado un Socio autenticado
  Cuando solicita la exportación de casos
  Entonces recibe un CSV con campos operativos minimizados
  Y el sistema registra la exportación sin guardar su contenido

Escenario: Rechazar una exportación no autorizada
  Dado un Abogado, Asistente o Procurador autenticado
  Cuando solicita directamente la exportación
  Entonces el servidor responde con rechazo
  Y no incluye información de casos en la respuesta
```

## Evidencia técnica

La verificación comprende pruebas unitarias del agregado, aislamiento de la
consulta, auditoría, minimización y neutralización de fórmulas; pruebas de
navegador para Socio y los tres perfiles sin permiso; PostgreSQL, lint, tipos,
build, CI y GitGuardian.
