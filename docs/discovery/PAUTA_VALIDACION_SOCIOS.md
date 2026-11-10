# Pauta breve de validación con los socios

**Proyecto:** Sistema de gestión de casos jurídicos  
**Caso de estudio:** Estudio Jurídico X  
**Issue relacionado:** #78  
**Versión:** 1.1  
**Fecha de preparación:** 9 de noviembre de 2026

## Propósito

Esta pauta permite confirmar las decisiones indispensables antes de diseñar la
base de datos y continuar el desarrollo. La conversación debería durar entre 30
y 45 minutos.

No se deben registrar nombres de clientes, RUT, RIT, empresas, cuantías,
credenciales ni antecedentes jurídicos identificables. Si se necesita un
ejemplo, se utilizarán códigos ficticios como `Cliente 01` o `Caso 01`.

## Registro de la sesión

| Campo | Respuesta |
|---|---|
| Fecha | |
| Participantes | Socio A / Socio B / ambos |
| Modalidad | Presencial / remota |
| Responsable del registro | Carlos Andrés Muñoz Bustamante |
| Observaciones generales | |

Para cada respuesta se debe indicar si queda **confirmada** o **pendiente**. Una
respuesta dudosa no se implementará como regla definitiva.

---

## 1. Usuarios y permisos

### P-01. Perfiles internos

¿Los perfiles socio, abogado, asistente y procurador representan correctamente a
quienes utilizarán el sistema? ¿Falta alguno?

**Respuesta:**  
**Estado:** Confirmada / pendiente

### P-02. Permisos habituales

Marquen qué perfiles pueden realizar cada acción cotidiana.

| Acción | Socio | Abogado | Asistente | Procurador |
|---|:---:|:---:|:---:|:---:|
| Registrar o editar clientes | [ ] | [ ] | [ ] | [ ] |
| Registrar o editar casos | [ ] | [ ] | [ ] | [ ] |
| Consultar todos los casos | [ ] | [ ] | [ ] | [ ] |
| Cambiar etapa o estado | [ ] | [ ] | [ ] | [ ] |
| Registrar fechas | [ ] | [ ] | [ ] | [ ] |

**Restricciones o excepciones:**  
**Estado:** Confirmada / pendiente

### P-03. Acciones de permiso elevado

¿Quién puede distribuir o reasignar un caso, desactivar o reactivar un cliente y
archivar o reactivar un caso?

| Acción | Perfil autorizado | ¿Exige motivo? |
|---|---|:---:|
| Distribuir un caso | | [ ] |
| Reasignar responsable | | [ ] |
| Desactivar o reactivar cliente | | [ ] |
| Archivar o reactivar caso | | [ ] |

**Estado:** Confirmada / pendiente

---

## 2. Clientes y casos

### P-04. Datos mínimos del cliente

¿Qué información mínima debe existir para registrar un cliente?

- [ ] Nombre o denominación
- [ ] Teléfono
- [ ] Correo electrónico
- [ ] Canal de contacto preferido
- [ ] Otro: ______________________________

¿Se necesita RUT u otro identificador oficial? Si es así, ¿para qué finalidad y
quién puede verlo?

**Respuesta y excepciones:**  
**Estado:** Confirmada / pendiente

### P-05. Clientes duplicados e inactivos

¿Con qué datos se debería advertir una posible duplicidad? ¿Se confirma que un
cliente inactivo no podrá utilizarse en casos nuevos, pero conservará sus casos
históricos?

**Respuesta:**  
**Estado:** Confirmada / pendiente

### P-06. Datos mínimos del caso

Además de cliente, estado, etapa y responsable, ¿qué datos son obligatorios para
activar un caso?

| Dato | Siempre | Según materia | Opcional | No se requiere |
|---|:---:|:---:|:---:|:---:|
| Empresa | [ ] | [ ] | [ ] | [ ] |
| Tienda o sucursal | [ ] | [ ] | [ ] | [ ] |
| Fecha de ingreso laboral | [ ] | [ ] | [ ] | [ ] |
| Fecha de despido | [ ] | [ ] | [ ] | [ ] |
| Finiquito | [ ] | [ ] | [ ] | [ ] |
| Cuantía | [ ] | [ ] | [ ] | [ ] |

**Otros datos obligatorios o excepciones:**  
**Estado:** Confirmada / pendiente

### P-07. Responsable, participantes y prioridad

¿Todo caso tiene un responsable principal? ¿Qué otros participantes pueden
asociarse y qué niveles de prioridad se necesitan?

**Participantes y funciones:**  
**Prioridades y significado:**  
**Estado:** Confirmada / pendiente

---

## 3. Etapas y estados

### P-08. Etapas principales

¿Estas siete etapas representan correctamente el flujo general?

1. Ingreso.
2. Clasificación.
3. Comparendo.
4. Distribución.
5. Redacción.
6. Seguimiento judicial.
7. Cierre.

**Etapas que se deben agregar, eliminar o renombrar:**  
**Estado:** Confirmada / pendiente

### P-09. Orden, excepciones y subetapas

¿Las etapas siempre siguen ese orden? ¿Cuáles pueden omitirse, repetirse o
ejecutarse en paralelo? Indiquen únicamente las subetapas indispensables.

**Respuesta:**  
**Estado:** Confirmada / pendiente

### P-10. Estados controlados

¿Qué estados deberían reemplazar expresiones libres como `ok`, `listo`,
`pendiente` o `para distribuir`? ¿Qué cambios requieren una revisión o un motivo?

| Estado propuesto | Significado | Condición para utilizarlo |
|---|---|---|
| | | |
| | | |
| | | |

**Estado de la decisión:** Confirmada / pendiente

---

## 4. Fechas y seguimiento

### P-11. Fechas necesarias

¿Qué tipos de fecha deben registrarse y quién será responsable de verificarlas?

- [ ] Ingreso laboral
- [ ] Despido
- [ ] Finiquito
- [ ] Comparendo
- [ ] Audiencia
- [ ] Seguimiento interno
- [ ] Referencia de caducidad
- [ ] Otra: ______________________________

**Responsable o regla de verificación:**  
**Estado:** Confirmada / pendiente

### P-12. Alertas y caducidad

¿Con cuánta anticipación se necesitan alertas internas? ¿Se confirma que la
caducidad será ingresada manualmente y que el sistema no calculará ni certificará
plazos jurídicos definitivos?

**Anticipación por tipo de fecha:**  
**Confirmación sobre caducidad:**  
**Estado:** Confirmada / pendiente

---

## 5. Cierre, historial y conservación

### P-13. Cierre y reactivación

¿Qué debe estar completo para cerrar un caso? ¿Cierre y archivo significan lo
mismo? ¿Cuándo podría reactivarse?

**Respuesta:**  
**Quién autoriza la reactivación:**  
**Estado:** Confirmada / pendiente

### P-14. Historial obligatorio

¿Qué acciones deben quedar siempre registradas con usuario, fecha y cambio?

- [ ] Edición de datos críticos
- [ ] Cambio de responsable, participantes o prioridad
- [ ] Cambio de estado, etapa o subetapa
- [ ] Registro o modificación de fecha
- [ ] Desactivación o reactivación de cliente
- [ ] Archivo o reactivación de caso
- [ ] Exportación de información
- [ ] Otra: ______________________________

¿Las correcciones deben conservar el valor anterior?

**Respuesta:**  
**Estado:** Confirmada / pendiente

### P-15. Conservación, reportes y exportaciones

¿Cuánto tiempo necesita el estudio conservar la información por razones
operativas? Después del MVP, ¿qué reportes o exportaciones serían realmente
útiles y quién podría generarlos?

- [ ] Carga de casos por responsable
- [ ] Casos por etapa o estado
- [ ] Fechas próximas
- [ ] Casos cerrados o archivados
- [ ] Exportación autorizada: ______________________________

**Conservación requerida:**  
**Prioridad de reportes o exportaciones:**  
**Perfiles autorizados:**  
**Estado:** Confirmada / pendiente de revisión jurídica y organizacional

---

## Confirmaciones finales de alcance

- [ ] El sistema no se conectará con la Oficina Judicial Virtual.
- [ ] El sistema no almacenará credenciales judiciales.
- [ ] El sistema no calculará plazos jurídicos definitivos.
- [ ] La eliminación física de clientes y casos queda fuera del MVP.
- [ ] Construcción y aceptación utilizarán datos ficticios o anonimizados.

## Tres prioridades del estudio

Si fuera necesario reducir trabajo, ¿qué tres capacidades no podrían faltar para
que el sistema entregue valor?

1.  
2.  
3.  

## Resumen posterior a la conversación

| Decisión | Acuerdo | Estado | Responsable si queda pendiente |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

- [ ] La síntesis no contiene datos reales ni identificables.
- [ ] Las diferencias entre los socios quedaron registradas como pendientes.
- [ ] Solo las decisiones confirmadas se trasladarán al SRS y al modelo.

**Resultado de revisión:** Aprobada / aprobada con observaciones / pendiente
