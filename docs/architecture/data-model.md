# Diseño de datos del MVP

**Versión de diseño:** 2.0

**Fecha:** 2026-11-11

**Issue:** #79

## Estado y propósito

Este documento define el modelo objetivo implementado en `prisma/schema.prisma`.
La migración incremental `20261111233000_data_model_v2` alinea una base de
preproducción vacía con este diseño, pero todavía no acredita su aplicación en
un entorno PostgreSQL ni incluye el seed ficticio. Esas evidencias se completan
en iteraciones posteriores del mismo issue.

El modelo representa casos laborales generales. El despido es una materia
posible, no la entidad raíz. La planilla operativa sensible se utilizó únicamente
para reconocer estructura y diversidad del flujo; ningún nombre, RUT, empresa,
rol judicial, cuantía o antecedente identificable se copia al repositorio, seed,
prueba o diagrama.

## Principios

- Toda entidad operativa conserva `studyId` para aplicar aislamiento por estudio.
- Cliente y caso poseen ciclos de vida reversibles; no existe eliminación física
  desde los flujos del MVP.
- La materia, naturaleza, estado, etapa, procedimiento y tipos operativos se
  resuelven mediante catálogos vigentes, no mediante texto libre ni prioridad.
- Los datos comunes del cliente no contienen fecha de despido ni otros
  antecedentes laborales.
- Los datos específicos del caso se muestran y validan según materia y etapa.
- Tribunal, RIT y ROL admiten ausencia hasta que una persona los registre
  manualmente.
- El historial es aditivo para usuarios comunes y registra actor, momento,
  acción, motivo cuando corresponde y valores relevantes protegidos.
- Las migraciones, seeds y pruebas utilizan exclusivamente datos ficticios.

## Entidades objetivo

| Entidad | Responsabilidad | Decisiones principales |
|---|---|---|
| `Study` | Delimitar la organización propietaria de los registros. | Raíz del aislamiento lógico. |
| `Role` y `User` | Identificar los cuatro perfiles y actores de las operaciones. | Socio, Abogado, Asistente y Procurador; usuarios desactivables. |
| `Client` | Mantener identificación, contacto y ciclo de vida. | Persona u organización; sin datos propios de un caso. |
| `CatalogValue` | Normalizar decisiones variables. | Materia, naturaleza, estado, etapa, procedimiento, tipo de fecha y rol operativo. No incluye prioridad. |
| `LegalCase` | Representar cualquier asunto laboral del MVP. | Conserva cliente, materia, naturaleza, flujo, archivo reversible y referencias judiciales opcionales. |
| `LaborCaseData` | Mantener antecedentes condicionales del caso. | Relación opcional uno a uno; fecha de despido solo para materias que la requieren. |
| `CaseParticipation` | Conservar responsable principal y apoyos actuales e históricos. | Una participación vigente puede ser principal; la reasignación cierra la anterior. |
| `RelevantDate` | Registrar fechas manuales de seguimiento. | Tipo, responsable, fuente y observación; no calcula plazos jurídicos. |
| `AuditEvent` | Reconstruir acciones críticas. | Registro aditivo con detalle protegido y sin secretos. |

## Bloques del formulario y persistencia

### Bloque común

Se utiliza en todos los casos: cliente, materia, naturaleza, estado, etapa,
procedimiento cuando corresponda, responsable principal y observación.

### Bloque laboral condicional

- **Despido:** empresa o contraparte, fecha de ingreso laboral y fecha de despido
  son obligatorias; causal, tienda, finiquito y cuantía son opcionales según el
  alcance vigente.
- **Gestión colectiva:** organización relacionada y tipo de gestión son
  obligatorios; las fechas de despido no se exigen por defecto.
- **Tutela, práctica antisindical u otra materia:** se aplican solamente sus
  campos configurados y los antecedentes comunes; no heredan automáticamente
  los mínimos de un despido.

La interfaz puede ocultar campos no aplicables, pero el servidor aplica la misma
regla antes de persistir. Cambiar la materia no elimina datos automáticamente:
si existen antecedentes que dejarán de mostrarse, la interfaz debe advertirlo y
solicitar confirmación. La eliminación o corrección explícita genera historial.

### Bloque judicial condicional

Tribunal, RIT, ROL y procedimiento judicial se habilitan cuando la etapa y la
información disponible lo justifican. Su ausencia no bloquea el ingreso,
clasificación, comparendo, distribución ni redacción.

## Reglas de integridad

1. Las relaciones deben impedir referencias entre estudios distintos.
2. El código interno del caso es único dentro del estudio.
3. El RUT normalizado se indexa para búsqueda y advertencia, pero el diseño no
   impone todavía una fusión ni una unicidad bloqueante.
4. Un cliente inactivo permanece en casos históricos y no puede asociarse con un
   caso nuevo.
5. Todo caso activo conserva cliente, materia, estado, etapa y responsable
   principal vigentes.
6. Solo existe una participación principal vigente por caso.
7. Desactivar, reactivar, archivar o reabrir registra actor, momento y motivo.
8. Una materia de despido requiere sus mínimos laborales; otras materias pueden
   persistirse sin fecha de despido.
9. Una referencia de caducidad es un dato manual y no un cálculo definitivo.
10. Ninguna tabla contiene contraseñas, credenciales judiciales, secretos de
    proveedores ni documentos jurídicos.

## Catálogos iniciales

| Tipo | Valores mínimos de seed ficticio |
|---|---|
| `MATTER` | Despido, tutela laboral, práctica antisindical, gestión colectiva, cobranza laboral, otra materia laboral. |
| `CASE_NATURE` | Individual, colectiva, otra. |
| `CASE_STATUS` | Ingresado, pendiente de comparendo, pendiente de distribución, en redacción, presentado, judicializado, cerrado. |
| `STAGE` | Ingreso, clasificación, comparendo, distribución, redacción, seguimiento judicial, audiencia preparatoria, juicio o conciliación, cierre. |
| `PROCEDURE` | Aplicable según definición jurídica configurada; admite ausencia inicial. |
| `DATE_TYPE` | Ingreso laboral, despido, solicitud de comparendo, comparendo, presentación de demanda, audiencia única, audiencia preparatoria, juicio, referencia manual de caducidad. |
| `PARTICIPATION_ROLE` | Responsable principal, apoyo operativo. |

Los valores permiten construir el seed de pruebas, pero su redacción final y las
transiciones admitidas deben conservarse como configuración versionada.

## Estado de implementación

1. [x] Alinear `prisma/schema.prisma` con este diseño sin reescribir
   silenciosamente la migración histórica.
2. [x] Crear una migración incremental versionada para PostgreSQL.
3. [ ] Aplicar la migración en una base PostgreSQL vacía de prueba y documentar
   su resultado.
4. [ ] Incorporar un seed exclusivamente ficticio y reconocible como tal.
5. [ ] Probar aislamiento por estudio, referencias, campos condicionales, único
   responsable principal vigente y ciclos reversibles.
6. [ ] Documentar aplicación y reversión en un entorno de prueba autorizado.

Hasta completar los pasos pendientes, el esquema constituye un contrato técnico
versionado, no una capacidad funcional aceptada ni persistencia operativa.
