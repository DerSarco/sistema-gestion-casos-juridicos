# Historias de usuario priorizadas del MVP

**Versión:** 1.0

**Fecha:** 2026-10-21

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

Trazabilidad: `MVP-01`, RF-001, RNF-001, RNF-003, RNF-007.

## HU-02 — Buscar casos

**Como** integrante autorizado

**quiero** buscar y filtrar casos

**para** localizar rápidamente el registro que debo gestionar.

```gherkin
Escenario: Filtrar casos autorizados
  Dado que existen casos ficticios dentro del alcance del usuario
  Cuando busca por identificador, cliente, responsable, estado o etapa
  Entonces el sistema muestra únicamente las coincidencias autorizadas
  Y permite limpiar los filtros

Escenario: Búsqueda sin coincidencias
  Dado que no existe un caso autorizado que coincida
  Cuando el usuario ejecuta la búsqueda
  Entonces el sistema muestra un estado sin resultados
```

Trazabilidad: `MVP-02`, RF-019, RNF-001, RNF-018.

## HU-03 — Registrar o editar un caso

**Como** integrante habilitado

**quiero** registrar o editar un caso mediante un mismo formulario

**para** mantener una ficha única vinculada con su cliente y responsable.

```gherkin
Escenario: Registrar un caso válido
  Dado que existe un cliente ficticio y un abogado responsable activo
  Cuando el usuario completa los datos mínimos y guarda el formulario
  Entonces el sistema crea una ficha única vinculada con el cliente
  Y no exige tribunal, RIT o ROL antes de que estén disponibles

Escenario: Rechazar un caso activo incompleto
  Dado que el formulario no tiene cliente, estado, etapa o responsable
  Cuando el usuario intenta guardar el caso como activo
  Entonces el sistema no activa el caso
  Y muestra los campos que requieren corrección
```

Trazabilidad: `MVP-03`, RF-008, RF-009, RF-013, RNF-011, RNF-019.

## HU-04 — Consultar la ficha de un caso

**Como** integrante autorizado

**quiero** consultar la ficha consolidada de un caso

**para** conocer sus antecedentes y acciones registradas.

```gherkin
Escenario: Consultar una ficha autorizada
  Dado que existe un caso dentro del alcance del usuario
  Cuando abre su ficha
  Entonces visualiza cliente, responsable, estado, etapa y fechas registradas
  Y puede acceder al historial básico del caso

Escenario: Impedir una consulta no autorizada
  Dado que el caso está fuera del alcance del usuario
  Cuando intenta abrir su ficha
  Entonces el sistema rechaza la solicitud sin revelar sus datos
```

Trazabilidad: `MVP-04`, RF-010, RF-017, RNF-001, RNF-005.

## HU-05 — Cambiar estado o etapa

**Como** integrante habilitado

**quiero** cambiar el estado o etapa de un caso

**para** reflejar su avance con valores controlados.

```gherkin
Escenario: Registrar un cambio válido
  Dado que existe un caso y una transición permitida
  Cuando el usuario selecciona el nuevo estado o etapa y confirma
  Entonces el sistema actualiza el caso
  Y agrega el cambio al historial con usuario y fecha

Escenario: Cancelar el cambio
  Dado que el modal de cambio se encuentra abierto
  Cuando el usuario cancela la operación
  Entonces el caso conserva su estado y etapa anteriores
```

Trazabilidad: `MVP-05`, RF-009, RF-010, RF-017, RNF-005.

## HU-06 — Registrar una fecha relevante

**Como** integrante habilitado

**quiero** registrar manualmente una fecha relevante

**para** conservarla como referencia de seguimiento interno.

```gherkin
Escenario: Registrar una fecha válida
  Dado que existe un caso autorizado
  Cuando el usuario indica tipo, fecha, responsable y observación opcional
  Entonces el sistema incorpora la fecha a la ficha
  Y registra la acción en el historial

Escenario: Evitar interpretación automática
  Dado que el usuario registra una fecha de referencia judicial
  Cuando guarda la información
  Entonces el sistema conserva el valor ingresado
  Y no calcula ni declara un plazo judicial definitivo
```

Trazabilidad: `MVP-06`, RF-015, RF-017, RF-030, RNF-005.

## HU-07 — Buscar clientes

**Como** integrante autorizado

**quiero** buscar clientes desde un listado

**para** consultar sus datos básicos y continuar hacia sus casos.

```gherkin
Escenario: Buscar un cliente autorizado
  Dado que existen clientes ficticios registrados
  Cuando el usuario busca por nombre o dato de contacto autorizado
  Entonces el sistema muestra las coincidencias con información mínima
  Y permite acceder a sus casos relacionados

Escenario: Proteger resultados
  Dado que un cliente está fuera del alcance del usuario
  Cuando ejecuta una búsqueda
  Entonces el cliente no aparece en los resultados
```

Trazabilidad: `MVP-07`, RF-005, RNF-001, RNF-018.

## HU-08 — Registrar o editar un cliente

**Como** integrante habilitado

**quiero** registrar o editar un cliente mediante un mismo formulario

**para** mantener sus datos de contacto vinculados con sus casos.

```gherkin
Escenario: Registrar un cliente válido
  Dado que el usuario dispone de datos ficticios o anonimizados
  Cuando completa los campos mínimos y guarda el formulario
  Entonces el sistema asigna un identificador interno al cliente
  Y deja sus datos disponibles en el listado

Escenario: Advertir una posible coincidencia
  Dado que existe un cliente con datos coincidentes
  Cuando el usuario intenta registrar otro cliente
  Entonces el sistema advierte la posible duplicidad
  Y no fusiona las fichas automáticamente
```

Trazabilidad: `MVP-08`, RF-004, RNF-007, RNF-019.

## Criterio de término

Una historia se considera aceptada cuando todos sus escenarios son demostrables
en el prototipo o producto según corresponda, existe evidencia de prueba y la
trazabilidad enlaza requisito, issue, cambio y resultado. Las funciones diferidas
de `MVP_SCOPE.md` no forman parte de este criterio.
