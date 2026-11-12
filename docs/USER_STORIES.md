# Historias de usuario priorizadas del MVP

**Versión:** 1.2

**Fecha:** 2026-11-11

**Issue de origen:** #51

Las historias siguientes son el backlog funcional comprometido. Sus criterios
de aceptación utilizan Gherkin y datos ficticios o anonimizados.

## HU-01 — Acceder al sistema interno

**Como** integrante autorizado del estudio

**quiero** iniciar sesión en la plataforma interna

**para** acceder únicamente a las funciones permitidas.

```gherkin
Escenario: Acceso con credenciales válidas
  Dado que existe una cuenta interna activa
  Cuando la persona ingresa credenciales válidas
  Entonces el sistema inicia una sesión identificable
  Y muestra la lista de casos autorizados

Escenario: Rechazo de credenciales inválidas
  Dado que una persona se encuentra en el inicio de sesión
  Cuando ingresa credenciales inválidas
  Entonces el sistema rechaza el acceso
  Y no revela si una cuenta específica existe
```

Trazabilidad: `MVP-01`, RF-001, RNF-001, RNF-002, RNF-004.

## HU-02 — Buscar casos

**Como** integrante autorizado

**quiero** buscar y filtrar casos

**para** localizar rápidamente el registro que debo gestionar.

```gherkin
Escenario: Filtrar casos autorizados
  Dado que existen casos ficticios dentro del alcance del usuario
  Cuando busca por identificador, cliente, responsable, estado, etapa, procedimiento, próxima fecha o condición de archivo
  Entonces el sistema muestra únicamente las coincidencias autorizadas
  Y permite limpiar los filtros

Escenario: Ordenar el trabajo sin prioridad subjetiva
  Dado que existen varios casos autorizados
  Cuando el usuario consulta el listado operativo
  Entonces puede ordenarlo por etapa y próxima fecha relevante
  Y el sistema no exige un nivel manual de prioridad

Escenario: Búsqueda sin coincidencias
  Dado que no existe un caso autorizado que coincida
  Cuando el usuario ejecuta la búsqueda
  Entonces el sistema muestra un estado sin resultados
```

Trazabilidad: `MVP-02`, RF-010, RNF-001, RNF-007.

## HU-03 — Registrar o editar un caso

**Como** integrante habilitado

**quiero** registrar o editar un caso mediante un mismo formulario

**para** mantener una ficha única vinculada con su cliente y responsable.

```gherkin
Escenario: Registrar un caso válido
  Dado que existe un cliente ficticio activo y un responsable activo
  Cuando el usuario completa cliente, estado, etapa y responsable y guarda el formulario
  Entonces el sistema crea una ficha única vinculada con el cliente
  Y no exige tribunal, RIT o ROL antes de que estén disponibles

Escenario: Validar antecedentes mínimos de una causa laboral
  Dado que el usuario seleccionó una materia laboral
  Cuando intenta activar el caso sin empresa, fecha de ingreso o fecha de despido
  Entonces el sistema rechaza la activación
  Y no exige tienda, finiquito o cuantía como datos mínimos

Escenario: Rechazar un caso activo incompleto
  Dado que el formulario no tiene cliente, estado, etapa o responsable
  Cuando el usuario intenta guardar el caso como activo
  Entonces el sistema no activa el caso
  Y muestra los campos que requieren corrección

Escenario: Impedir un caso nuevo para un cliente inactivo
  Dado que el cliente seleccionado se encuentra inactivo
  Cuando el usuario intenta registrar un caso nuevo
  Entonces el sistema rechaza la operación
  Y conserva disponibles los casos históricos del cliente
```

Trazabilidad: `MVP-03`, RF-004, RF-005, RF-007, RNF-006, RNF-008.

## HU-04 — Consultar la ficha de un caso

**Como** integrante autorizado

**quiero** consultar la ficha consolidada de un caso

**para** conocer sus antecedentes y acciones registradas.

```gherkin
Escenario: Consultar una ficha autorizada
  Dado que existe un caso dentro del alcance del usuario
  Cuando abre su ficha
  Entonces visualiza cliente, responsable, participantes, estado, etapa, procedimiento y fechas registradas
  Y puede acceder al historial básico del caso

Escenario: Impedir una consulta no autorizada
  Dado que el caso está fuera del alcance del usuario
  Cuando intenta abrir su ficha
  Entonces el sistema rechaza la solicitud sin revelar sus datos

Escenario: Archivar y reactivar un caso como Socio
  Dado que existe un caso autorizado y el usuario posee el perfil Socio
  Cuando confirma el archivo o la reactivación e indica un motivo
  Entonces el sistema cambia reversiblemente la condición del caso
  Y registra actor, momento, motivo y valores relevantes en el historial

Escenario: Rechazar el archivo para otros perfiles
  Dado que el usuario posee perfil Abogado, Asistente o Procurador
  Cuando intenta archivar o reactivar un caso
  Entonces el sistema rechaza la operación sin modificar la ficha
```

Trazabilidad: `MVP-04`, RF-004, RF-006, RF-009, RNF-001, RNF-003.

## HU-05 — Cambiar estado o etapa

**Como** integrante habilitado

**quiero** cambiar el estado o etapa de un caso

**para** reflejar su avance con valores controlados.

```gherkin
Escenario: Registrar un cambio válido
  Dado que existe un caso y una transición permitida entre las etapas validadas
  Cuando el usuario selecciona el nuevo estado o etapa y confirma
  Entonces el sistema actualiza el caso
  Y agrega el cambio al historial con usuario y fecha

Escenario: Registrar el recorrido según procedimiento
  Dado que el caso se encuentra judicializado
  Cuando corresponde un procedimiento de aplicación general
  Entonces el flujo permite audiencia preparatoria y juicio o conciliación
  Pero cuando corresponde un procedimiento monitorio permite audiencia única

Escenario: Cerrar anticipadamente un caso
  Dado que existe acuerdo o sentencia y el pago fue registrado
  Cuando un Socio confirma el cierre desde comparendo, audiencia o juicio e indica el motivo
  Entonces el caso queda archivado de forma reversible
  Y el historial conserva actor, momento y motivo

Escenario: Cancelar el cambio
  Dado que el modal de cambio se encuentra abierto
  Cuando el usuario cancela la operación
  Entonces el caso conserva su estado y etapa anteriores
```

Trazabilidad: `MVP-05`, RF-005, RF-006, RF-009, RNF-003.

## HU-06 — Registrar una fecha relevante

**Como** integrante habilitado

**quiero** registrar manualmente una fecha relevante

**para** conservarla como referencia de seguimiento interno.

```gherkin
Escenario: Registrar una fecha válida
  Dado que existe un caso autorizado
  Cuando el usuario indica tipo, fecha, responsable y fuente u observación opcional
  Entonces el sistema incorpora la fecha a la ficha
  Y registra la acción en el historial

Escenario: Registrar un tipo de fecha validado
  Dado que el usuario registra una fecha laboral, de comparendo, de presentación o de audiencia
  Cuando guarda un valor válido y su responsable
  Entonces la fecha queda disponible para ordenar y apoyar el seguimiento interno

Escenario: Evitar interpretación automática
  Dado que el usuario registra manualmente una referencia de caducidad
  Cuando guarda la información
  Entonces el sistema conserva el valor ingresado
  Y no calcula ni declara un plazo judicial definitivo
```

Trazabilidad: `MVP-06`, RF-008, RF-009, RF-011, RNF-003.

## HU-07 — Buscar clientes

**Como** integrante autorizado

**quiero** buscar clientes desde un listado

**para** consultar sus datos básicos y continuar hacia sus casos.

```gherkin
Escenario: Buscar un cliente autorizado
  Dado que existen clientes ficticios registrados
  Cuando el usuario busca por nombre, dato de contacto autorizado o estado de actividad
  Entonces el sistema muestra las coincidencias con información mínima y estado visible
  Y permite acceder a sus casos relacionados

Escenario: Proteger resultados
  Dado que un cliente está fuera del alcance del usuario
  Cuando ejecuta una búsqueda
  Entonces el cliente no aparece en los resultados
```

Trazabilidad: `MVP-07`, RF-003, RNF-001, RNF-007.

## HU-08 — Registrar, editar o cambiar el estado de un cliente

**Como** integrante habilitado

**quiero** registrar o editar un cliente mediante un mismo formulario

**para** mantener sus datos de contacto vinculados con sus casos.

```gherkin
Escenario: Registrar un cliente válido
  Dado que el usuario dispone de datos ficticios o anonimizados
  Cuando completa nombre, teléfono, origen o materia y RUT y guarda el formulario
  Entonces el sistema asigna un identificador interno al cliente
  Y permite omitir el correo electrónico

Escenario: Advertir una posible coincidencia
  Dado que existe un cliente con el mismo nombre y origen
  Cuando el usuario intenta registrar otro cliente
  Entonces el sistema advierte la posible duplicidad
  Y permite continuar sin fusionar las fichas automáticamente porque puede existir otra gestión

Escenario: Desactivar y reactivar un cliente como Socio
  Dado que existe un cliente y el usuario posee el perfil Socio
  Cuando confirma la desactivación o reactivación e indica un motivo
  Entonces el sistema cambia reversiblemente el estado del cliente
  Y registra actor, momento, motivo y valores relevantes en el historial

Escenario: Rechazar la desactivación para otros perfiles
  Dado que el usuario posee perfil Abogado, Asistente o Procurador
  Cuando intenta desactivar o reactivar un cliente
  Entonces el sistema rechaza la operación sin modificar la ficha
```

Trazabilidad: `MVP-08`, RF-002, RF-009, RNF-001, RNF-003, RNF-004, RNF-008.

## Criterio de término

Una historia se considera aceptada cuando todos sus escenarios son demostrables
en el prototipo o producto según corresponda, existe evidencia de prueba y la
trazabilidad enlaza requisito, issue, cambio y resultado. Las funciones diferidas
de `MVP_SCOPE.md` no forman parte de este criterio.
