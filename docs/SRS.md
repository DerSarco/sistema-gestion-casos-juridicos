# Especificación de requisitos de software (SRS)

**Proyecto:** Sistema de gestión de casos jurídicos

**Versión del documento:** 1.0

**Estado:** Revisado internamente; pendiente de validación externa

**Estructura de referencia:** IEEE Std 830-1998

## Control de versiones

| Versión | Fecha | Descripción | Responsable |
|---|---|---|---|
| 0.1 | 2026-10-14 | Creación de la estructura inicial | Equipo del proyecto |
| 0.2 | 2026-10-14 | Definición inicial de actores, servicios externos y responsabilidades | Equipo del proyecto |
| 0.3 | 2026-10-14 | Consolidación del alcance, exclusiones, supuestos y dependencias | Equipo del proyecto |
| 0.4 | 2026-10-14 | Definición inicial de reglas del negocio y asuntos abiertos | Equipo del proyecto |
| 0.5 | 2026-10-16 | Especificación de interfaces y requisitos funcionales | Equipo del proyecto |
| 0.6 | 2026-10-16 | Especificación de requisitos no funcionales medibles | Equipo del proyecto |
| 0.7 | 2026-10-16 | Modelo conceptual de datos, privacidad y ciclo de vida | Equipo del proyecto |
| 0.8 | 2026-10-16 | Matriz detallada de trazabilidad de requisitos y pruebas previstas | Equipo del proyecto |
| 0.9 | 2026-10-16 | Revisión integral de calidad conforme a IEEE 830-1998 y consolidación de referencias | Equipo del proyecto |
| 1.0 | 2026-10-21 | Repriorización del MVP, clasificación de requisitos y alineación con historias Gherkin y ocho vistas | Equipo del proyecto |

## 1. Introducción

### 1.1 Propósito

Este documento especifica los requisitos del MVP priorizado de una plataforma web
para centralizar el registro, la asignación y el seguimiento inicial de casos en
un estudio jurídico pequeño.

### 1.2 Alcance del producto

La plataforma centralizará información de clientes y casos, responsables,
estados, etapas, fechas relevantes e historial básico. El compromiso de esta
iteración corresponde a las capacidades `ALC-01` a `ALC-08` con las reducciones
indicadas en la sección 2.2.1. Las capacidades `ALC-09` a `ALC-14` permanecen
documentadas como evolución futura y no forman parte de la aceptación del MVP.
Las exclusiones `EXC-01` a `EXC-10` continúan vigentes.

No reemplazará la Oficina Judicial Virtual, no mantendrá comunicación técnica
con ella ni automatizará la estrategia jurídica. El alcance detallado se define
mediante requisitos trazables y conserva como asuntos abiertos únicamente las
decisiones que requieren validación externa.

### 1.3 Definiciones, siglas y abreviaturas

| Término | Definición |
|---|---|
| OJV | Oficina Judicial Virtual del Poder Judicial de Chile. |
| SRS | Especificación de requisitos de software. |
| MVP priorizado | Subconjunto de requisitos comprometido para el prototipo funcional académico actual; no corresponde a una edición comercial. |
| Diferido | Requisito conservado para una iteración posterior y excluido del criterio de aceptación actual. |
| RF | Requisito funcional. |
| RNF | Requisito no funcional. |
| RN | Regla del negocio. |
| RD | Requisito de datos. |
| CU | Caso de uso. |

### 1.4 Referencias

La especificación utiliza las siguientes fuentes de referencia:

- IEEE Std 830-1998, *IEEE Recommended Practice for Software Requirements
  Specifications*, como estructura y criterio de revisión exigido para este
  entregable. El estándar fue reemplazado posteriormente por ISO/IEC/IEEE 29148,
  sin que ello modifique la referencia solicitada para el proyecto.
- *Informe final AINC410: Sistema de gestión de casos jurídicos*, versión vigente
  del 6 de septiembre de 2026, como fuente consolidada del problema, alcance,
  arquitectura, requisitos esenciales, riesgos y plan de pruebas.
- Entrevista presencial semiestructurada con los dos socios propietarios del
  estudio, realizada el 24 y 28 de abril de 2026, y observación de la planilla
  operativa anonimizada, como evidencia primaria del proceso.
- Ley N.º 19.628 y Ley N.º 21.719, ISO 15489-1:2016, ISO/TS 16175-2:2020 y OWASP
  ASVS 5.0 como referencias legales, documentales y de seguridad. Su uso no
  constituye por sí solo una declaración de cumplimiento o certificación.

La bibliografía completa, la fecha de consulta, la utilidad, las limitaciones y
la relación entre afirmaciones y evidencia se mantienen en el repositorio
académico del proyecto. Este repositorio público conserva solo la especificación
anonimizada y no publica evidencias confidenciales.

### 1.5 Visión general del documento

La sección 2 presenta el contexto general del producto. La sección 3 contiene
los requisitos específicos y sus criterios de verificación. Los anexos mantienen
la trazabilidad y los modelos complementarios.

## 2. Descripción general

### 2.1 Perspectiva del producto

La solución será un sistema interno de gestión. Complementará, sin sustituir,
las plataformas externas utilizadas para la tramitación judicial y el
almacenamiento documental.

### 2.2 Alcance funcional del producto

#### 2.2.1 Capacidades incluidas en el MVP priorizado

| ID | Capacidad incluida | Resultado esperado |
|---|---|---|
| ALC-01 | Permitir acceso interno controlado. | Cada usuario opera con una identidad y permisos; no existe registro público. La implementación técnica se completa al final del incremento funcional. |
| ALC-02 | Registrar y mantener clientes con sus datos de contacto autorizados. | La información mínima del cliente se encuentra vinculada de forma trazable con sus casos. |
| ALC-03 | Registrar y mantener casos con un identificador interno, estado, etapa y responsable. | Cada caso activo posee los datos obligatorios definidos por las reglas del negocio. |
| ALC-04 | Asignar un responsable principal. | El caso identifica al abogado responsable y registra la asignación. La reasignación avanzada queda diferida. |
| ALC-05 | Usar estados y etapas controlados. | Los usuarios seleccionan valores predefinidos. La administración de catálogos queda diferida. |
| ALC-06 | Registrar fechas relevantes, responsables y observaciones operativas. | La información queda disponible para consulta y control interno sin calcular plazos jurídicos definitivos. |
| ALC-07 | Mantener historial de cambios críticos. | Las acciones definidas como críticas conservan usuario, fecha y cambio realizado. |
| ALC-08 | Buscar y consultar información autorizada. | El usuario localiza clientes o casos sin acceder a registros fuera de sus permisos. |

Las capacidades históricas `ALC-09` a `ALC-14` —dashboard y reportes, anexo
imprimible, Calendar, OneDrive, Gemini y exportaciones— quedan diferidas. La
clasificación completa y vinculante se mantiene en
[`MVP_SCOPE.md`](MVP_SCOPE.md); las historias y criterios Gherkin se mantienen
en [`USER_STORIES.md`](USER_STORIES.md).

#### 2.2.2 Exclusiones del MVP

| ID | Exclusión | Tratamiento |
|---|---|---|
| EXC-01 | Cualquier comunicación técnica con la OJV. | La plataforma no consulta, obtiene, envía ni sincroniza información con la OJV. |
| EXC-02 | Almacenamiento de credenciales judiciales. | Las credenciales permanecen completamente fuera del sistema. |
| EXC-03 | Cálculo automático definitivo de plazos judiciales. | Las fechas se registran para control interno y requieren interpretación profesional. |
| EXC-04 | Automatización de la estrategia jurídica o toma autónoma de decisiones. | Las decisiones permanecen bajo responsabilidad humana. |
| EXC-05 | Inteligencia artificial como núcleo o requisito para operar. | El MVP no utiliza inteligencia artificial. |
| EXC-06 | Reemplazo o integración con OneDrive. | El MVP no gestiona documentos ni referencias externas. |
| EXC-07 | Integración con Google Calendar. | El MVP registra fechas únicamente dentro de la plataforma. |
| EXC-08 | Portal para clientes y aplicación móvil nativa. | Los clientes no operan la plataforma y la interfaz prevista es web responsiva. |
| EXC-09 | Facturación, contabilidad y firma electrónica. | Estas funciones no forman parte del problema ni de los objetivos de la versión 1. |
| EXC-10 | Migración histórica completa o uso cotidiano con casos reales durante el proyecto académico. | La construcción y aceptación utilizan datos ficticios o anonimizados. |

Una exclusión solo puede pasar al alcance mediante una decisión registrada,
análisis de impacto y actualización del SRS, backlog, riesgos y plan del
proyecto.

### 2.3 Características de los usuarios y actores externos

El MVP considera tres perfiles humanos internos. Los servicios externos se
documentan solo como contexto o evolución futura. Los permisos descritos
constituyen una base funcional
para elaborar los requisitos y casos de uso; su detalle deberá validarse con los
socios propietarios antes de cerrar la especificación.

#### 2.3.1 Actores humanos internos

##### ACT-01: Socio propietario o administrador

Usuario interno con responsabilidad de supervisión global y administración
operativa. Uno de los socios propietarios actúa como usuario clave principal
durante el levantamiento y la aceptación.

Responsabilidades previstas:

- consultar la situación general y la carga de trabajo del estudio;
- administrar usuarios, roles y catálogos autorizados;
- consultar, registrar y actualizar clientes y casos según sus permisos;
- asignar o reasignar responsables, conservando el historial;
- revisar reportes, alertas e historial de cambios;
- aprobar las reglas operativas y validar los flujos prioritarios;
- aprobar el contenido de la plantilla de información y autorización antes de
  utilizarla.

Este perfil no puede eliminar o alterar silenciosamente el historial de acciones
críticas. Las operaciones administrativas también deben quedar trazadas.

##### ACT-02: Abogado

Usuario interno responsable de consultar y gestionar los casos que le hayan sido
asignados o para los cuales posea autorización.

Responsabilidades previstas:

- consultar sus casos, responsables, estados, fechas y pendientes;
- actualizar información operativa dentro de los permisos definidos;
- registrar observaciones y avances autorizados;
- consultar el historial y las referencias documentales permitidas;
- solicitar o participar en una reasignación, sin reemplazar el registro
  histórico;
- revisar y aceptar o rechazar sugerencias del asistente de registro cuando
  participe en la prueba de concepto.

El abogado no obtiene por este rol facultades para administrar usuarios o
consultar información ajena a su autorización.

##### ACT-03: Secretaria o asistente

Usuario interno que apoya el ingreso y mantenimiento de información operativa
bajo las reglas y permisos definidos por el estudio.

Responsabilidades previstas:

- registrar clientes y casos con los datos mínimos autorizados;
- actualizar datos de contacto y antecedentes administrativos permitidos;
- registrar estados, fechas o tareas operativas dentro de sus atribuciones;
- preparar el anexo imprimible de información y autorización desde la plantilla
  aprobada;
- registrar folio, versión, entrega, firma manuscrita, estado y referencia al
  respaldo archivado;
- consultar los casos y reportes necesarios para sus funciones.

Este perfil no aprueba el contenido jurídico de documentos ni adquiere acceso
general por el solo hecho de registrar información.

#### 2.3.2 Sistemas y servicios externos

##### EXT-01: Google Calendar

Servicio externo evaluado para una iteración posterior. No constituye interfaz
ni dependencia operativa del MVP priorizado.

##### EXT-02: OneDrive

Repositorio documental externo considerado como evolución futura. El MVP no
consulta, copia ni mantiene referencias a sus recursos.

##### EXT-03: Gemini API

Servicio externo considerado para una prueba de concepto futura con antecedentes
anonimizados. El MVP no lo invoca y funciona completamente sin inteligencia
artificial.

##### EXT-04: Oficina Judicial Virtual

Plataforma externa de tramitación y consulta judicial. Se incluye como elemento
del contexto operativo porque los profesionales la utilizan de forma manual e
independiente. La versión 1 no tendrá ninguna comunicación técnica con la OJV: no
consultará, obtendrá, enviará ni sincronizará información con ella y no almacenará
credenciales judiciales.

#### 2.3.3 Personas relacionadas que no operan la plataforma

El cliente del estudio es la persona a quien se refiere parte de la información
registrada, pero no es usuario ni actor operativo del MVP. El MVP no incorpora
un portal de clientes ni la gestión del anexo de información y autorización.

#### 2.3.4 Matriz inicial de responsabilidades

| Capacidad | ACT-01 Administrador | ACT-02 Abogado | ACT-03 Asistente |
|---|---|---|---|
| Consultar clientes y casos autorizados | Previsto | Según autorización | Según autorización |
| Administrar usuarios, roles y catálogos | Diferido | No previsto | No previsto |
| Registrar clientes y casos | Previsto | Según autorización | Previsto |
| Actualizar información operativa | Previsto | Casos autorizados | Campos autorizados |
| Asignar responsable | Previsto | Participación por definir | Participación por definir |
| Consultar historial de cambios | Previsto | Casos autorizados | Según autorización |
| Eliminar o alterar historial crítico | No permitido | No permitido | No permitido |
| Gestionar anexo imprimible | Diferido | Diferido | Diferido |
| Revisar sugerencias de Gemini | Diferido | Diferido | Diferido |

La matriz expresa responsabilidades previstas y no sustituye la futura matriz
detallada de permisos. Las celdas marcadas como `Según autorización` o
`Participación por definir` deben resolverse antes de implementar el control de
acceso.

#### 2.3.5 Características y necesidades comunes

- Los usuarios poseen conocimientos del proceso jurídico u operativo, pero no se
  presume formación técnica en sistemas.
- La interfaz debe utilizar terminología validada con el estudio y evitar que el
  usuario dependa de códigos técnicos.
- El sistema debe funcionar en una interfaz web responsiva y ofrecer mensajes de
  validación comprensibles.
- Las acciones disponibles deben corresponder al rol y a la autorización sobre
  la información, aplicando mínimo privilegio.
- Las necesidades específicas de accesibilidad deben levantarse y transformarse
  en requisitos no funcionales medibles.

### 2.4 Restricciones generales

- La OJV queda fuera de todas las interfaces del sistema.
- El sistema no almacenará credenciales judiciales.
- La construcción, las pruebas y la aceptación académica utilizarán datos
  ficticios o anonimizados.
- El tratamiento de datos reales requerirá una aprobación previa jurídica,
  técnica y organizacional. Sin ella, el sistema permanecerá en preproducción.
- Los permisos se aplicarán por rol y autorización, siguiendo el principio de
  mínimo privilegio.
- Las acciones críticas definidas en los requisitos conservarán trazabilidad y no
  podrán alterarse silenciosamente por usuarios comunes.
- Las integraciones externas permanecen diferidas y no son dependencias del MVP.
- El MVP terminará con pruebas y aceptación con los socios; esta aceptación
  no equivale a una autorización automática para uso productivo con datos reales.

### 2.5 Supuestos

| ID | Supuesto | Estado | Condición de validación | Efecto si no se cumple |
|---|---|---|---|---|
| SUP-01 | Los perfiles iniciales administrador, abogado y asistente cubren las funciones internas prioritarias. | Pendiente de validación detallada | Revisión de la matriz de permisos con los socios. | Ajustar actores, permisos, requisitos y casos de uso antes de implementar autorización. |
| SUP-02 | Los usuarios de prueba dispondrán de navegador actualizado y conexión a internet durante la aceptación. | Supuesto de trabajo | Confirmación previa a la sesión de prueba. | Preparar alternativa local o reprogramar las pruebas dependientes de servicios remotos. |
| SUP-03 | Los socios podrán validar catálogos, campos mínimos, permisos y flujos prioritarios. | Confirmado como compromiso del proceso, fechas por coordinar | Registro de revisiones y decisiones en issues o minutas anonimizadas. | Mantener los elementos afectados en estado propuesto y no tratarlos como aceptados. |
| SUP-04 | Podrían existir cuentas de prueba para evaluar Calendar y OneDrive en una iteración futura. | Diferido | Nuevo issue y evaluación de proveedor. | No afecta el MVP. |
| SUP-05 | Una prueba futura de Gemini utilizaría exclusivamente antecedentes ficticios o anonimizados. | Diferido | Nuevo issue y revisión de privacidad. | No afecta el MVP. |
| SUP-06 | El volumen y concurrencia requeridos serán compatibles con un estudio pequeño. | No medido | Levantamiento de usuarios simultáneos, volumen de casos y crecimiento esperado. | Ajustar requisitos de rendimiento, arquitectura y pruebas de carga. |

Los supuestos pendientes no pueden presentarse como hechos confirmados. Cada uno
debe resolverse o transformarse en una restricción, requisito o riesgo antes de
que afecte una decisión irreversible.

### 2.6 Dependencias externas

| ID | Dependencia | Uso previsto | Comportamiento ante indisponibilidad |
|---|---|---|---|
| DEP-01 | Participación de los socios propietarios | Validar requisitos, reglas operativas, prototipos y aceptación. | Registrar la validación como pendiente y no asumir aprobación. |
| DEP-02 | Google Calendar | Diferido; no se usa en el MVP. | No afecta el funcionamiento del MVP. |
| DEP-03 | OneDrive | Diferido; no se usa en el MVP. | No afecta el funcionamiento del MVP. |
| DEP-04 | Gemini API | Diferido; no se usa en el MVP. | No afecta el funcionamiento del MVP. |
| DEP-05 | Entorno web de preproducción y base de datos de pruebas | Permitir la revisión temporal con datos ficticios o anonimizados. | Aplicar respaldo y restauración; utilizar una alternativa local si la indisponibilidad impide la sesión. |

La OJV no es una dependencia de software de la versión 1. Su utilización manual
por los profesionales ocurre fuera de la plataforma y una indisponibilidad de la
OJV no cambia el funcionamiento interno especificado para este sistema.

### 2.7 Distribución futura de requisitos

Las funciones excluidas pueden conservarse como antecedentes para versiones
futuras, pero no se implementarán de manera implícita. Su eventual evaluación
requerirá un issue, análisis de privacidad y seguridad, justificación de valor,
criterios de aceptación y una decisión formal de alcance.

## 3. Requisitos específicos

### 3.1 Requisitos de interfaces externas

#### 3.1.1 Interfaces de usuario

El MVP ofrecerá una interfaz web responsiva para los tres perfiles internos.
Las vistas y acciones disponibles dependerán del rol y de la autorización sobre
el registro. Los prototipos y requisitos no funcionales precisarán navegación,
mensajes de validación, accesibilidad y tamaños de pantalla.

#### 3.1.2 Interfaces de software

- PostgreSQL conservará los datos relacionales y aplicará restricciones de
  integridad complementarias a las reglas de aplicación.
- Google Calendar, OneDrive y Gemini no constituyen interfaces del MVP; sus
  requisitos históricos permanecen diferidos.
- La OJV no constituye una interfaz de software: no existirá comunicación
  técnica de entrada o salida con ella.

#### 3.1.3 Interfaces de comunicaciones

Las comunicaciones entre navegador, aplicación, base de datos y servicios
autorizados utilizarán canales cifrados en el entorno desplegado. Las
credenciales y secretos se mantendrán fuera del código y del repositorio. Los
tiempos de espera, reintentos y mensajes ante fallas se precisarán en los
requisitos no funcionales y en el diseño técnico.

### 3.2 Requisitos funcionales

Los identificadores se conservan para no romper la trazabilidad histórica. El
compromiso actual se limita a catorce RF priorizados; quince RF quedan diferidos
y `RF-030` opera como restricción obligatoria:

| Clasificación | Requisitos |
|---|---|
| MVP priorizado | RF-001, RF-003 a RF-011, RF-013, RF-015, RF-017 y RF-019 |
| Diferido | RF-002, RF-012, RF-014, RF-016, RF-018 y RF-020 a RF-029 |
| Restricción obligatoria | RF-030 |

La prioridad histórica indicada en las tablas expresa importancia, no pertenencia
al MVP. Ante una diferencia, prevalece esta clasificación y `MVP_SCOPE.md`.

Los requisitos utilizan prioridad alta, media o baja como registro histórico de
su importancia. Solo la clasificación `MVP priorizado` determina el compromiso
de aceptación actual. Por decisión de planificación, la autenticación y la
autorización se implementarán después del primer incremento funcional.

#### 3.2.1 Acceso y administración interna

| ID | Nombre | Actor | Descripción y flujo | Precondición | Resultado | Excepciones | Prioridad | Criterios de aceptación | Reglas |
|---|---|---|---|---|---|---|---|---|---|
| RF-001 | Autenticar usuario interno | ACT-01, ACT-02, ACT-03 | Permitir el acceso solamente a una cuenta interna activa y establecer su estudio, usuario y rol para la sesión. | Cuenta interna registrada y activa. | Sesión identificable o acceso rechazado. | Credenciales inválidas, cuenta inactiva o falla del proveedor. | Alta; implementación diferida | Una cuenta válida accede; cuentas inválidas o inactivas son rechazadas; no existe registro público de usuarios. | RN-001, RN-002, RN-003 |
| RF-002 | Administrar cuentas y roles | ACT-01 | Crear, activar, desactivar y asignar rol a cuentas internas sin exponer credenciales. | Administrador autenticado y autorizado. | Cuenta y rol vigentes con acción trazada. | Correo duplicado, rol inexistente o intento no autorizado. | Alta; implementación diferida | Solo ACT-01 ejecuta las operaciones; una cuenta desactivada no accede; el cambio queda registrado. | RN-002, RN-003, RN-004 |
| RF-003 | Aplicar autorización | Todos | Verificar en el servidor el rol y el alcance sobre el registro antes de consultar o modificar información. | Identidad de sesión disponible. | Operación permitida o rechazada sin revelar datos. | Sesión ausente, permiso insuficiente o recurso de otro alcance. | Alta; implementación diferida | Todos los escenarios negativos de la matriz de permisos son rechazados; ocultar una acción en la interfaz no sustituye la verificación del servidor. | RN-001, RN-002, RN-003 |

#### 3.2.2 Clientes

| ID | Nombre | Actor | Descripción y flujo | Precondición | Resultado | Excepciones | Prioridad | Criterios de aceptación | Reglas |
|---|---|---|---|---|---|---|---|---|---|
| RF-004 | Registrar cliente | ACT-01, ACT-03; ACT-02 si se autoriza | Capturar los datos mínimos definidos, validar formatos y asignar un identificador interno. | Usuario habilitado y catálogos disponibles. | Cliente registrado dentro del estudio. | Datos obligatorios ausentes, formato inválido o coincidencia potencial. | Alta | Con datos válidos se crea un cliente; con datos inválidos no se persiste; la coincidencia se informa antes de confirmar. | RN-001, RN-005, RN-007 |
| RF-005 | Consultar cliente | ACT-01, ACT-02, ACT-03 | Mostrar datos de contacto, casos relacionados y estado de completitud según autorización. | Cliente existente y permiso de lectura. | Ficha autorizada visible. | Cliente inexistente o acceso no autorizado. | Alta | Un usuario autorizado visualiza la ficha; un usuario sin permiso no obtiene datos del cliente. | RN-003, RN-005, RN-006 |
| RF-006 | Actualizar cliente | ACT-01, ACT-03; ACT-02 si se autoriza | Modificar campos permitidos conservando usuario, fecha y cambios relevantes. | Cliente existente y permiso de edición. | Datos actualizados e historial generado. | Validación fallida, conflicto o permiso insuficiente. | Alta | Una actualización válida queda visible y trazada; una inválida no altera la ficha. | RN-003, RN-008, RN-018 |
| RF-007 | Detectar coincidencias de clientes | ACT-01, ACT-03; ACT-02 si se autoriza | Buscar coincidencias básicas en campos autorizados antes de crear un nuevo cliente. | Datos de identificación o contacto ingresados. | Advertencia de posibles coincidencias sin fusión automática. | Datos insuficientes para comparar. | Media | Las coincidencias configuradas se muestran; el sistema nunca fusiona fichas automáticamente. | RN-005, RN-007 |

#### 3.2.3 Casos, estados y asignaciones

| ID | Nombre | Actor | Descripción y flujo | Precondición | Resultado | Excepciones | Prioridad | Criterios de aceptación | Reglas |
|---|---|---|---|---|---|---|---|---|---|
| RF-008 | Registrar caso | ACT-01, ACT-03; ACT-02 si se autoriza | Crear una ficha única vinculada con un cliente e identificador interno. | Cliente existente y usuario habilitado. | Caso en estado inicial permitido. | Cliente inexistente, datos inválidos o coincidencia de identificador. | Alta | Se crea una sola ficha vinculada al cliente; no se exigen RIT, ROL o tribunal antes de estar disponibles. | RN-006, RN-009, RN-012 |
| RF-009 | Activar caso | ACT-01, ACT-03; ACT-02 si se autoriza | Validar datos mínimos, estado, etapa y responsable antes de marcar el caso como activo. | Caso existente en estado previo. | Caso activo y validado. | Faltan datos obligatorios o la transición no está permitida. | Alta | Ningún caso queda activo sin cliente, estado, etapa y responsable; se informan todos los faltantes detectados. | RN-007, RN-010, RN-011, RN-013 |
| RF-010 | Consultar y actualizar caso | ACT-01, ACT-02, ACT-03 | Mostrar la ficha consolidada y permitir modificar campos autorizados. | Caso existente y permiso correspondiente. | Ficha actualizada o solo consultada, con trazabilidad cuando aplica. | Acceso insuficiente, validación fallida o conflicto. | Alta | Los usuarios ven y modifican solo campos permitidos; los cambios críticos generan historial. | RN-003, RN-010, RN-018 |
| RF-011 | Registrar antecedentes judiciales manualmente | ACT-01, ACT-02, ACT-03 según permiso | Permitir ingresar tribunal, RIT, ROL u otros antecedentes cuando el profesional los obtenga fuera del sistema. | Caso existente y dato disponible. | Antecedente asociado al caso y trazado. | Formato inválido o dato aún no disponible. | Alta | La ausencia inicial no bloquea etapas anteriores; no se inventan valores; no existe consulta técnica a la OJV. | RN-012, RN-030 |
| RF-012 | Administrar catálogos y transiciones | ACT-01 | Crear, activar, ordenar o desactivar valores permitidos y definir transiciones del flujo. | Administrador autorizado. | Catálogos vigentes sin alterar registros históricos. | Valor en uso, duplicado o transición incompatible. | Alta | Los usuarios seleccionan valores vigentes; desactivar un valor no modifica el historial; una transición no permitida es rechazada. | RN-004, RN-011 |
| RF-013 | Asignar responsable | ACT-01; otros perfiles si se autoriza | Asociar un responsable principal vigente al caso y registrar quién efectuó la asignación. | Caso y usuario responsable activos. | Asignación vigente e historial. | Responsable inactivo o permiso insuficiente. | Alta | Todo caso activo tiene responsable; la asignación registra usuario y fecha. | RN-013, RN-018 |
| RF-014 | Reasignar responsable | ACT-01; otros perfiles si se autoriza | Cerrar la asignación vigente y crear una nueva sin sobrescribir la anterior. | Caso con responsable vigente. | Nuevo responsable vigente e historial completo. | Mismo responsable, usuario inactivo o permiso insuficiente. | Alta | El responsable anterior, el nuevo, el ejecutor y la fecha pueden reconstruirse desde el historial. | RN-014, RN-018, RN-019 |

#### 3.2.4 Fechas, alertas e historial

| ID | Nombre | Actor | Descripción y flujo | Precondición | Resultado | Excepciones | Prioridad | Criterios de aceptación | Reglas |
|---|---|---|---|---|---|---|---|---|---|
| RF-015 | Registrar fecha o hito | ACT-01, ACT-02, ACT-03 según permiso | Registrar tipo, fecha, responsable, estado y observación en un caso. | Caso existente. | Fecha interna o referencia judicial visible para seguimiento. | Fecha inválida, tipo inexistente o responsable no permitido. | Alta | Se distingue tipo de fecha y responsable; el sistema no interpreta ni calcula definitivamente un plazo judicial. | RN-015, RN-016, RN-017 |
| RF-016 | Gestionar alerta | ACT-01, ACT-02, ACT-03 según permiso | Configurar y mostrar una alerta asociada con una fecha registrada y permitir actualizar su estado. | Fecha válida con responsable. | Alerta visible con estado trazable. | Configuración inválida o fecha cerrada. | Alta | Las alertas pendientes aparecen antes o al alcanzar su condición; cerrarlas no elimina la fecha ni el historial. | RN-015, RN-016, RN-018 |
| RF-017 | Consultar historial del caso | ACT-01, ACT-02, ACT-03 según autorización | Presentar cronológicamente las acciones críticas autorizadas. | Caso existente y permiso de lectura. | Timeline con usuario, fecha, acción y valores relevantes. | Acceso no autorizado. | Alta | Se reconstruyen asignaciones, estados y cambios críticos; usuarios comunes no editan entradas. | RN-018, RN-019 |
| RF-018 | Registrar corrección administrativa | ACT-01 | Corregir un dato crítico mediante una nueva acción que preserve la evidencia anterior. | Administrador autorizado y motivo registrado. | Valor corregido y nueva entrada de historial. | Motivo ausente o permiso insuficiente. | Media | La corrección no elimina la entrada original y permite identificar motivo, ejecutor y fecha. | RN-019 |

#### 3.2.5 Seguimiento, búsqueda y exportación

| ID | Nombre | Actor | Descripción y flujo | Precondición | Resultado | Excepciones | Prioridad | Criterios de aceptación | Reglas |
|---|---|---|---|---|---|---|---|---|---|
| RF-019 | Buscar y filtrar casos | ACT-01, ACT-02, ACT-03 | Buscar dentro del universo autorizado por identificador, cliente, responsable, estado, etapa u otros filtros aprobados. | Usuario con alcance de lectura. | Lista paginada o mensaje sin resultados. | Filtro inválido o acceso insuficiente. | Alta | Ningún resultado fuera del alcance es revelado; los filtros pueden combinarse y limpiarse. | RN-003, RN-009, RN-011 |
| RF-020 | Mostrar dashboard por rol | ACT-01, ACT-02, ACT-03 | Presentar indicadores operativos, pendientes, alertas y casos incompletos según el rol. | Datos disponibles y usuario habilitado. | Vista consolidada autorizada. | Sin datos o consulta parcial. | Alta | El administrador ve información global autorizada; abogado y asistente ven solo su alcance; se identifican casos activos incompletos. | RN-003, RN-010, RN-013, RN-016 |
| RF-021 | Exportar información autorizada | ACT-01 y perfiles expresamente habilitados | Generar una exportación con campos, filtros y finalidad permitidos. | Usuario autorizado y consulta válida. | Archivo o resultado exportable y acción trazada. | Sin resultados, exceso de alcance o formato no permitido. | Media | La exportación no incluye campos fuera del permiso y registra usuario, fecha, filtros y finalidad cuando se defina. | RN-003, RN-018, RN-029 |

#### 3.2.6 Anexo de información y autorización

| ID | Nombre | Actor | Descripción y flujo | Precondición | Resultado | Excepciones | Prioridad | Criterios de aceptación | Reglas |
|---|---|---|---|---|---|---|---|---|---|
| RF-022 | Administrar versión de plantilla | ACT-01 | Registrar una versión aprobada de la plantilla y desactivar versiones reemplazadas. | Aprobación de los socios registrada. | Una versión vigente e historial de versiones. | Versión duplicada o contenido sin aprobación. | Alta | Solo la versión vigente genera anexos nuevos; los anexos existentes conservan su versión original. | RN-020, RN-024 |
| RF-023 | Generar anexo imprimible | ACT-01, ACT-03; ACT-02 si se autoriza | Generar desde la plantilla vigente un documento con folio y versión para revisión y firma fuera de la plataforma. | Cliente y datos autorizados disponibles. | Anexo imprimible identificado y registro de generación. | Datos requeridos ausentes o plantilla no vigente. | Alta | El documento incluye folio y versión; separa finalidades necesarias y opcionales; no incorpora firma electrónica. | RN-020, RN-021, RN-022, RN-024 |
| RF-024 | Registrar control del anexo | ACT-01, ACT-03; ACT-02 si se autoriza | Registrar entrega, firma manuscrita, estado y referencia al respaldo archivado. | Anexo generado. | Estado documental trazable. | Folio inexistente, transición no permitida o referencia inválida. | Alta | Se puede identificar folio, versión, entrega, firma, estado, referencia, usuario y fecha sin almacenar la firma como credencial. | RN-021, RN-022, RN-023 |

#### 3.2.7 Servicios externos autorizados

| ID | Nombre | Actor | Descripción y flujo | Precondición | Resultado | Excepciones | Prioridad | Criterios de aceptación | Reglas |
|---|---|---|---|---|---|---|---|---|---|
| RF-025 | Crear evento en Calendar | Usuario autorizado | Solicitar expresamente la creación de un evento desde una fecha ya registrada. | Fecha interna válida y autorización del servicio. | Identificador o estado del evento asociado con la fecha. | Rechazo, tiempo de espera o servicio no disponible. | Media | Diez intentos controlados crean el evento o informan la falla sin eliminar ni modificar la fecha interna. | RN-025 |
| RF-026 | Mantener referencia OneDrive | Usuario autorizado | Registrar o actualizar una referencia autorizada a una carpeta o recurso existente. | Caso existente y referencia permitida. | Referencia asociada al caso. | Formato inválido o recurso no disponible. | Media | El sistema no copia documentos ni modifica permisos; una referencia inválida genera un mensaje comprensible. | RN-026 |
| RF-027 | Solicitar asistencia Gemini | ACT-01, ACT-02, ACT-03 según autorización | Enviar bajo solicitud expresa antecedentes aprobados como ficticios o anonimizados y solicitar resumen, materia de catálogo y etiquetas sugeridas. | Usuario autorizado, contenido aprobado y servicio habilitado. | Sugerencia estructurada pendiente de decisión humana. | Contenido no apto, respuesta inválida, rechazo o indisponibilidad. | Media | Ninguna solicitud se envía sin confirmación; solo se usan datos ficticios o anonimizados; la respuesta no altera registros. | RN-027, RN-028 |
| RF-028 | Resolver sugerencia Gemini | Usuario que solicitó o revisor autorizado | Aceptar, editar o descartar por separado el resumen y la clasificación sugerida antes de guardar. | Sugerencia disponible. | Decisión humana registrada o sugerencia descartada. | Respuesta expirada o usuario sin permiso. | Media | Cada resultado requiere acción humana; una falla o descarte permite completar todo el registro manualmente. | RN-028 |
| RF-029 | Continuar ante falla externa | Todos | Mantener disponibles los flujos internos esenciales cuando Calendar, OneDrive o Gemini fallen. | Operación externa iniciada. | Datos internos conservados y error comprensible. | Falla interna concurrente. | Alta | La falla no elimina datos ni bloquea el registro manual; queda evidencia técnica suficiente para diagnóstico sin exponer secretos. | RN-025, RN-026, RN-028 |

#### 3.2.8 Restricción funcional de la OJV

| ID | Nombre | Actor | Descripción y flujo | Precondición | Resultado | Excepciones | Prioridad | Criterios de aceptación | Reglas |
|---|---|---|---|---|---|---|---|---|---|
| RF-030 | Mantener independencia de la OJV | Todos | Garantizar que ninguna función consulte, obtenga, envíe o sincronice información con la OJV ni solicite credenciales judiciales. | Cualquier flujo del sistema. | OJV ausente de interfaces, secretos, dependencias y tráfico de aplicación. | No admite excepción en la versión 1. | Alta | La revisión de arquitectura, código, variables y pruebas no detecta clientes, credenciales ni llamadas a la OJV. | RN-030 |

### 3.3 Requisitos no funcionales

La iteración compromete dieciséis RNF transversales. Los demás se conservan
para incrementos posteriores y `RNF-008` permanece como puerta obligatoria:

| Clasificación | Requisitos |
|---|---|
| MVP priorizado | RNF-001, RNF-003 a RNF-007, RNF-009, RNF-011, RNF-015, RNF-018 a RNF-020, RNF-022, RNF-023, RNF-027 y RNF-028 |
| Diferido | RNF-002, RNF-010, RNF-012 a RNF-014, RNF-016, RNF-017, RNF-021 y RNF-024 a RNF-026 |
| Restricción obligatoria | RNF-008 |

La reducción de alcance no autoriza debilitar el control de acceso, publicar
secretos, usar datos reales ni omitir la trazabilidad técnica.

Los requisitos no funcionales expresan metas de aceptación del entorno académico
de pruebas. No constituyen por sí solos una certificación, un SLA comercial ni
una autorización para utilizar datos reales.

#### 3.3.1 Seguridad y control de acceso

| ID | Requisito | Medida o criterio | Verificación | Prioridad | Fuente |
|---|---|---|---|---|---|
| RNF-001 | Las decisiones de autorización deben ejecutarse en el servidor para toda lectura o modificación protegida. | El 100 % de los escenarios negativos de la matriz de permisos es rechazado sin revelar el recurso. | Pruebas de integración y navegador por rol sobre RF-003. | Alta; implementación diferida | R1, R8 del informe; RN-003 |
| RNF-002 | Las cuentas inactivas o sin rol vigente no deben acceder a funciones protegidas. | Todos los intentos definidos para cuentas inactivas, rol ausente y sesión inválida son rechazados. | Pruebas negativas automatizadas sobre RF-001 y RF-002. | Alta; implementación diferida | R1 del informe |
| RNF-003 | Los secretos no deben almacenarse en código, historial Git, respuestas al navegador ni registros de aplicación. | Cero secretos detectados en repositorio y artefactos revisados; variables requeridas documentadas solo por nombre. | GitGuardian, revisión de configuración y prueba de respuestas o logs. | Alta | Arquitectura del informe; `.gitignore` |
| RNF-004 | Las comunicaciones del entorno desplegado deben utilizar cifrado en tránsito. | Todas las URL y conexiones externas del entorno de aceptación usan HTTPS o el canal cifrado administrado correspondiente. | Inspección de despliegue y configuración de proveedores. | Alta | Arquitectura de tres capas |
| RNF-005 | Las acciones críticas y correcciones administrativas deben conservar evidencia no editable por usuarios comunes. | El 100 % del catálogo de acciones críticas genera usuario, fecha, acción y valores relevantes. | Pruebas de integración y revisión de historial. | Alta | R5, R8 del informe; RN-018, RN-019 |
| RNF-006 | La versión aceptada no debe mantener vulnerabilidades críticas conocidas en dependencias de producción sin una respuesta documentada. | Cero hallazgos críticos abiertos o cada excepción posee evaluación, mitigación y responsable. | Auditoría del administrador de paquetes y registro de riesgos antes de release. | Alta | OWASP ASVS como guía acotada; plan de riesgos |

#### 3.3.2 Privacidad y protección de datos

| ID | Requisito | Medida o criterio | Verificación | Prioridad | Fuente |
|---|---|---|---|---|---|
| RNF-007 | La construcción, pruebas, demostraciones y aceptación deben usar exclusivamente datos ficticios o anonimizados. | Cero datos personales reales o antecedentes jurídicos identificables en base de datos, capturas, fixtures, logs y repositorio. | Revisión previa a cada demostración y escaneo del repositorio. | Alta | EXC-10; estrategia de privacidad |
| RNF-008 | El uso de datos reales debe permanecer bloqueado hasta aprobar la puerta jurídica, técnica y organizacional. | Existe evidencia aprobada de inventario y minimización, finalidades, derechos, permisos, conservación, proveedores, incidentes y revisión antes de cambiar el modo de preproducción. | Lista de verificación y acta de aprobación; en su ausencia, el entorno permanece con datos ficticios o anonimizados. | Alta | R11 del informe; A-28 |
| RNF-009 | Los registros y mensajes de error no deben exponer datos sensibles, secretos ni contenido jurídico completo. | Los casos de prueba de error muestran identificadores técnicos mínimos y mensajes comprensibles, sin contenido protegido. | Inspección automatizada y manual de logs y respuestas de error. | Alta | Mínimo privilegio y minimización |
| RNF-010 | La prueba de Gemini debe impedir el envío si el contenido no fue aprobado como ficticio o anonimizado. | El 100 % de los casos sin confirmación es bloqueado antes de invocar el servicio. | Pruebas de RF-027 con confirmación ausente, rechazada y válida. | Alta | R13, R14; RN-027 |

#### 3.3.3 Integridad, confiabilidad y fallas externas

| ID | Requisito | Medida o criterio | Verificación | Prioridad | Fuente |
|---|---|---|---|---|---|
| RNF-011 | Las restricciones del caso activo deben aplicarse tanto en la aplicación como en la persistencia cuando corresponda. | Todos los intentos de activar o persistir un caso sin cliente, estado, etapa o responsable son rechazados sin dejar datos parciales. | Pruebas unitarias, integración y restricciones de PostgreSQL. | Alta | R2, R8; RN-010 |
| RNF-012 | Una operación compuesta debe conservar consistencia si falla antes de completarse. | Asignaciones, reasignaciones y cambios críticos no dejan estado vigente sin su historial asociado. | Pruebas transaccionales con fallas inducidas. | Alta | R3, R5; PostgreSQL |
| RNF-013 | Una falla de Calendar, OneDrive o Gemini no debe eliminar ni modificar datos internos confirmados. | En el 100 % de los escenarios de rechazo, tiempo de espera y respuesta inválida, el dato interno previo permanece sin cambios y el flujo manual sigue disponible. | Pruebas de integración con dobles de prueba y casos de error. | Alta | R7, R10, R14; DEP-02 a DEP-04 |
| RNF-014 | Las respuestas externas deben validarse antes de utilizarlas. | Respuestas incompletas, mal formadas o fuera del contrato son rechazadas y tratadas como falla controlada. | Pruebas de contrato y casos inválidos para cada integración. | Alta | Plan de pruebas del informe |

#### 3.3.4 Rendimiento y capacidad

| ID | Requisito | Medida o criterio | Verificación | Prioridad | Fuente |
|---|---|---|---|---|---|
| RNF-015 | Un usuario debe localizar un caso autorizado en menos de diez segundos durante la prueba de aceptación. | Diez búsquedas representativas completadas individualmente en menos de 10 s, medidos desde el envío hasta la presentación del resultado. | Registro cronometrado en el entorno de aceptación y conjunto de datos acordado. | Alta | R9 y métrica del informe |
| RNF-016 | Las listas de clientes, casos e historial deben utilizar paginación o límites explícitos. | Ninguna vista solicita de forma no acotada la totalidad de registros del estudio. | Revisión de consultas y pruebas con volumen representativo. | Media | SUP-06; mantenibilidad operativa |
| RNF-017 | La capacidad objetivo debe definirse antes de la prueba de carga. | Se registran usuarios simultáneos, volumen de clientes, casos e historial, y crecimiento esperado; las pruebas usan esa línea base. | Acta o issue de validación y reporte de carga. | Alta | SUP-06; no inventar volumen |

#### 3.3.5 Usabilidad, accesibilidad y compatibilidad

| ID | Requisito | Medida o criterio | Verificación | Prioridad | Fuente |
|---|---|---|---|---|---|
| RNF-018 | Los flujos críticos deben funcionar en tres tamaños representativos: escritorio, tableta y móvil. | Registro, consulta y actualización prioritarios se completan sin pérdida de controles ni desplazamiento horizontal de la página. | Pruebas Playwright y revisión visual en tres viewports documentados. | Alta | Interfaz responsiva; plan de pruebas |
| RNF-019 | Todos los campos deben poseer etiqueta, instrucciones o mensajes de error comprensibles y asociados. | El 100 % de los controles de los flujos críticos tiene nombre accesible y los errores identifican el campo y la acción correctiva. | Pruebas de componentes, navegador y revisión manual. | Alta | Características de usuarios; R9 |
| RNF-020 | Los flujos críticos deben poder operarse con teclado. | Es posible completar registro, búsqueda, consulta y actualización sin quedar atrapado y con foco visible. | Recorrido manual y prueba automatizada de teclado donde sea viable. | Alta | Accesibilidad del SRS |
| RNF-021 | La aplicación debe funcionar en los motores de navegador cubiertos por las pruebas de aceptación. | Los flujos críticos pasan en Chromium, Firefox y WebKit mediante la versión de Playwright fijada en el proyecto. | Matriz de pruebas de navegador en CI o ejecución reproducible. | Media | Herramientas de pruebas del informe |

#### 3.3.6 Mantenibilidad, pruebas y recuperación

| ID | Requisito | Medida o criterio | Verificación | Prioridad | Fuente |
|---|---|---|---|---|---|
| RNF-022 | La rama integrable debe compilar y aprobar verificación de tipos, lint y pruebas automatizadas aplicables. | Cero errores en build, typecheck y lint; 100 % de las pruebas obligatorias del cambio aprobadas. | Pipeline de integración continua y comandos documentados. | Alta | Puerta técnica; GitFlow |
| RNF-023 | Las reglas críticas de activación, asignación, autorización e historial deben poseer pruebas automatizadas. | Cada regla crítica identificada tiene al menos un caso válido y uno inválido automatizado. | Matriz regla–prueba y reporte del ejecutor. | Alta | Plan integrado de pruebas |
| RNF-024 | Debe existir un procedimiento reproducible de migración de base de datos. | Una base vacía alcanza el esquema vigente ejecutando migraciones versionadas sin pasos manuales no documentados. | Ejecución en base temporal durante CI o puerta técnica. | Alta | Mitigación PostgreSQL |
| RNF-025 | Debe existir evidencia de respaldo y restauración antes de la aceptación. | Un respaldo del entorno de prueba se restaura en un destino controlado y permite ejecutar consultas y flujos críticos definidos. | Acta y bitácora de restauración con datos ficticios o anonimizados. | Alta | R10; plan de riesgos |
| RNF-026 | Los defectos críticos deben bloquear la aceptación. | Cero defectos críticos abiertos y 100 % de los casos críticos ejecutados antes del acta de aceptación. | Reporte de pruebas, tablero de issues y acta de aceptación. | Alta | Plan integrado de monitoreo y pruebas |

#### 3.3.7 Tiempo y trazabilidad operativa

| ID | Requisito | Medida o criterio | Verificación | Prioridad | Fuente |
|---|---|---|---|---|---|
| RNF-027 | Las fechas y horas almacenadas deben conservar una referencia temporal no ambigua y presentarse en la zona horaria acordada para el estudio. | Casos de cambio de día y horario se muestran consistentemente en `America/Santiago` durante las pruebas, conservando el instante original. | Pruebas unitarias y de navegador con fechas límite. | Alta | Riesgo de fechas del informe |
| RNF-028 | Cada release debe permitir identificar requisitos, issues, cambios y pruebas asociados. | Los PR de la release poseen issue, etiquetas, milestone y evidencia; la matriz de trazabilidad no contiene requisitos aprobados sin fuente ni verificación prevista. | Auditoría de release, GitHub y matriz del SRS. | Alta | GitFlow; issue #7 |

### 3.4 Reglas del negocio

Las reglas del negocio expresan restricciones y decisiones del dominio sin
depender de una tecnología específica. Se utilizan los siguientes estados:

- **Vigente:** deriva de una decisión estable de alcance o control del proyecto.
- **Propuesta:** es necesaria para completar la especificación, pero requiere
  validación detallada con los socios.

Una regla propuesta no debe implementarse como decisión irreversible antes de
resolver su validación. Los requisitos funcionales indicarán qué reglas aplican
a cada comportamiento.

#### 3.4.1 Estudio, usuarios y autorización

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-001 | Pertenencia al estudio | Todo usuario, cliente, caso y registro operativo debe pertenecer al estudio que lo administra. | ALC-01, ALC-02, ALC-03 | Vigente | La versión 1 se valida con un estudio; cualquier aislamiento entre varios estudios debe verificarse técnicamente antes de habilitarse. |
| RN-002 | Usuario identificable | Toda acción autenticada debe asociarse con un usuario interno identificable y un rol vigente. | ACT-01, ACT-02, ACT-03 | Vigente | Las acciones automatizadas, si existen, deben identificarse como servicio y no atribuirse a una persona. |
| RN-003 | Mínimo privilegio | Un usuario solo puede consultar o modificar información autorizada por su rol y por el alcance asignado. | Restricciones generales; matriz inicial de responsabilidades | Vigente | La matriz detallada de permisos permanece pendiente de validación. |
| RN-004 | Administración restringida | Solo el perfil autorizado de socio propietario o administrador puede administrar usuarios, roles y catálogos. | ACT-01; matriz inicial de responsabilidades | Propuesta | Debe validarse si existirá más de un administrador y cómo se recuperará el acceso. |

#### 3.4.2 Clientes y datos de contacto

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-005 | Identificador interno del cliente | Cada cliente debe poseer un identificador interno único dentro del estudio. | ALC-02; necesidad de trazabilidad cliente–caso | Vigente | El identificador interno no sustituye documentos oficiales ni debe exponer datos sensibles innecesarios. |
| RN-006 | Relación cliente–caso | Cada caso debe vincularse con un cliente y un cliente puede relacionarse con uno o más casos. | ALC-02, ALC-03 | Vigente | Los casos con múltiples personas relacionadas requieren una regla adicional antes de implementarse. |
| RN-007 | Datos mínimos de contacto | Un cliente solo puede considerarse habilitado para el flujo operativo cuando posee los datos mínimos definidos por el estudio. | Hallazgo sobre campos incompletos y pérdida histórica de contactos | Propuesta | Los campos obligatorios y las excepciones deben validarse con los socios y documentarse en #6. |
| RN-008 | Actualización trazable de contacto | Los cambios en datos de contacto deben conservar fecha y usuario responsable. | ALC-02, ALC-07 | Propuesta | Debe definirse qué valores anteriores se conservan y durante cuánto tiempo. |

#### 3.4.3 Casos, estados y asignaciones

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-009 | Identificador interno del caso | Cada caso debe poseer un identificador interno único dentro del estudio. | ALC-03 | Vigente | El identificador interno es independiente de un eventual RIT o ROL. |
| RN-010 | Datos obligatorios del caso activo | Todo caso activo debe tener al menos cliente, estado, etapa y responsable vigente. | ALC-03; métrica del proyecto | Vigente | Los campos adicionales y las condiciones para estados no activos deben definirse en #4 y #6. |
| RN-011 | Catálogos controlados | Los estados, etapas y tipos de causa deben seleccionarse desde catálogos autorizados. | ALC-05; hallazgo de estados de texto libre | Vigente | Los valores, transiciones permitidas y responsables de mantenerlos requieren validación. |
| RN-012 | Identificadores judiciales no inventados | El RIT, ROL, tribunal u otro antecedente judicial se registra solo cuando está disponible; su ausencia inicial no autoriza completar valores ficticios. | Flujo observado; separación respecto de la OJV | Vigente | La obligatoriedad dependerá de la etapa y debe precisarse en los requisitos funcionales. |
| RN-013 | Responsable principal vigente | Cada caso activo debe tener un responsable principal vigente. | ALC-04; problema de asignación y trazabilidad | Vigente | La participación de responsables secundarios queda pendiente de validación. |
| RN-014 | Reasignación histórica | Una reasignación debe cerrar la asignación anterior y crear una nueva, sin sobrescribir la responsabilidad histórica. | ALC-04, ALC-07 | Vigente | Debe definirse si la reasignación exige motivo y quiénes pueden ejecutarla. |

#### 3.4.4 Fechas, seguimiento e historial

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-015 | Tipo de fecha | Toda fecha de seguimiento debe indicar si corresponde a una referencia judicial o a un control interno. | ALC-06; exclusión EXC-03 | Vigente | Los tipos exactos y campos obligatorios deben validarse. |
| RN-016 | Responsabilidad sobre la fecha | Toda fecha que requiera seguimiento debe asociarse con un responsable o mecanismo de control definido. | ALC-06, ALC-09 | Propuesta | Debe acordarse si el responsable corresponde al caso, a la fecha o a ambos. |
| RN-017 | Sin determinación jurídica automática | El sistema puede registrar y mostrar fechas, pero no determina de forma definitiva plazos judiciales ni reemplaza la revisión profesional. | EXC-03 | Vigente | No admite excepciones dentro de la versión 1. |
| RN-018 | Registro de cambios críticos | Toda acción definida como crítica debe conservar usuario, fecha, tipo de acción y valores relevantes del cambio. | ALC-07 | Vigente | El catálogo de acciones críticas debe completarse en #4. |
| RN-019 | Protección del historial | Los usuarios comunes no pueden eliminar ni alterar silenciosamente las entradas del historial. | ACT-01, ACT-02, ACT-03; restricciones generales | Vigente | Las correcciones administrativas deben generar una nueva evidencia trazable. |

#### 3.4.5 Anexo de información y autorización

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-020 | Plantilla aprobada | El anexo imprimible se genera únicamente desde una plantilla vigente y aprobada por los socios. | ALC-10; estrategia documental del proyecto | Vigente | La aprobación de contenido no constituye por sí sola validación legal integral. |
| RN-021 | Folio y versión | Todo anexo generado debe poseer folio y versión de plantilla identificables. | ALC-10 | Vigente | El formato del folio y la regla de unicidad deben definirse en #4. |
| RN-022 | Firma fuera de la plataforma | El cliente revisa y firma el anexo fuera de la plataforma; el sistema no incorpora un portal de clientes ni firma electrónica. | EXC-08, EXC-09 | Vigente | No admite excepciones dentro de la versión 1. |
| RN-023 | Control del respaldo | El personal autorizado registra entrega, firma manuscrita, estado y referencia al respaldo archivado. | ALC-10 | Vigente | El sistema conserva la referencia; la ubicación y conservación del respaldo deben validarse en #6. |
| RN-024 | Separación de finalidades | La plantilla debe distinguir tratamientos necesarios de autorizaciones opcionales y no asumir que el consentimiento es la única base aplicable. | Estrategia de privacidad del proyecto | Vigente | Requiere revisión jurídica antes de utilizar datos reales. |

#### 3.4.6 Servicios externos, exportaciones y OJV

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-025 | Creación autorizada en Calendar | Un evento de Google Calendar solo se crea por una acción autorizada del usuario y a partir de datos ya registrados. | ALC-11, DEP-02 | Vigente | Una falla externa no modifica ni elimina la fecha interna. |
| RN-026 | Referencia a OneDrive | La plataforma conserva una referencia autorizada al recurso de OneDrive y no duplica el documento jurídico. | ALC-12, DEP-03 | Vigente | El acceso efectivo depende de los permisos externos y su falla no debe alterar el caso. |
| RN-027 | Datos anonimizados para Gemini | La prueba de Gemini solo puede recibir antecedentes ficticios o anonimizados aprobados para la prueba. | ALC-13, SUP-05 | Vigente | Si no se puede garantizar esta condición, la prueba no se ejecuta. |
| RN-028 | Revisión humana de Gemini | Toda sugerencia de Gemini debe ser revisada, aceptada o rechazada por una persona autorizada y nunca modifica fichas automáticamente. | ALC-13, EXT-03 | Vigente | La indisponibilidad o rechazo mantiene disponible el registro manual completo. |
| RN-029 | Exportación autorizada | Una exportación solo puede incluir información permitida para el perfil y el propósito autorizado. | ALC-14; restricciones de acceso | Vigente | Formatos, campos, justificación y trazabilidad de la exportación deben definirse en #4 y #6. |
| RN-030 | Independencia absoluta de la OJV | La plataforma no consulta, obtiene, envía ni sincroniza información con la OJV y no almacena credenciales judiciales. | EXC-01, EXC-02 | Vigente | No admite excepciones dentro de la versión 1. |

#### 3.4.7 Asuntos abiertos de las reglas

| ID | Asunto | Acción requerida | Issue relacionado |
|---|---|---|---|
| AR-01 | Campos mínimos de clientes y casos. | Validar obligatoriedad, formato y excepciones con los socios. | #4, #6 |
| AR-02 | Matriz detallada de permisos. | Definir acciones por rol, alcance de registros y operaciones administrativas. | #4, #5 |
| AR-03 | Catálogos y transiciones. | Validar estados, etapas, tipos y cambios permitidos. | #4 |
| AR-04 | Acciones críticas. | Acordar el catálogo de eventos que requieren historial detallado. | #4, #5 |
| AR-05 | Conservación y eliminación. | Establecer periodos, responsables, bloqueo y eliminación autorizada. | #6 |
| AR-06 | Exportaciones. | Definir formatos, campos, propósitos y evidencia de autorización. | #4, #6 |
| AR-07 | Responsables secundarios y reasignaciones. | Validar participación, motivo obligatorio y permisos para reasignar. | #4 |

### 3.5 Requisitos de datos

Esta sección define el modelo conceptual. El esquema físico, los tipos exactos,
índices y decisiones del ORM se establecerán durante el diseño técnico sin
cambiar las relaciones o controles aprobados de manera implícita.

#### 3.5.1 Clasificación de información

| Nivel | Descripción | Ejemplos del proyecto | Tratamiento mínimo |
|---|---|---|---|
| Pública | Información aprobada para publicación. | README, documentación técnica sin secretos y datos ficticios expresamente publicables. | Revisión antes de publicar. |
| Interna | Información operativa sin datos personales o jurídicos identificables. | Catálogos, configuración funcional, estados y métricas agregadas. | Acceso según función y trazabilidad cuando corresponda. |
| Confidencial | Datos personales, de contacto, operativos o jurídicos vinculables con una persona o caso. | Clientes, casos, observaciones, fechas, historial, anexos y referencias documentales. | Mínimo privilegio, minimización, cifrado en tránsito, trazabilidad y reglas de ciclo de vida. |
| Secreta | Credenciales, tokens y claves que permiten acceso a sistemas o datos. | Secretos de base de datos, Calendar, OneDrive, Gemini y futuro proveedor de autenticación. | Fuera del repositorio y del contenido funcional; acceso técnico restringido y rotación ante exposición. |

Las credenciales judiciales quedan completamente fuera del sistema. Ningún nivel
de clasificación autoriza almacenarlas.

#### 3.5.2 Entidades y relaciones conceptuales

| ID | Entidad | Propósito | Datos conceptuales mínimos | Relaciones principales | Sensibilidad |
|---|---|---|---|---|---|
| ED-01 | Estudio | Delimitar la organización responsable de los registros. | Identificador interno, nombre anonimizado o de prueba, estado, fechas de control. | Posee usuarios, clientes, casos y catálogos. | Interna; confidencial si identifica a la organización real. |
| ED-02 | Usuario | Identificar a quien ejecuta acciones internas. | Identificador, nombre de prueba, identificador de acceso, estado y rol vigente. | Pertenece a un estudio; participa en asignaciones, cambios y revisiones. | Confidencial. |
| ED-03 | Rol y permiso | Definir capacidades autorizadas. | Identificador, nombre, descripción, permisos y vigencia. | Se asigna a usuarios; controla operaciones. | Interna. |
| ED-04 | Cliente | Mantener la ficha y contacto autorizado. | Identificador interno, nombre o denominación, datos mínimos de contacto, estado de completitud y fechas de control. | Pertenece a un estudio; se relaciona con uno o más casos. | Confidencial. |
| ED-05 | Caso | Mantener la ficha operativa única. | Identificador interno, cliente, materia, tribunal y RIT/ROL cuando correspondan, estado, etapa, prioridad, observaciones y fechas de control. | Pertenece a un estudio y cliente; posee asignaciones, fechas, historial, referencias y anexos. | Confidencial. |
| ED-06 | Asignación | Conservar responsabilidad actual e histórica. | Caso, responsable, inicio, término, ejecutor y motivo cuando se defina. | Pertenece a un caso y referencia usuarios. | Confidencial. |
| ED-07 | Catálogo | Normalizar materias, estados, etapas, prioridades y tipos de fecha. | Tipo de catálogo, código, nombre, descripción, orden y vigencia. | Sus valores son utilizados por casos y fechas. | Interna. |
| ED-08 | Fecha o hito | Registrar seguimiento sin determinar automáticamente plazos jurídicos. | Caso, tipo, instante o fecha, responsable, estado, alerta y observación. | Pertenece a un caso; puede referenciar un evento externo. | Confidencial. |
| ED-09 | Evento de historial | Registrar acciones críticas y correcciones. | Estudio, caso o entidad afectada, actor, fecha, acción y valores relevantes protegidos. | Referencia usuario y registro afectado. | Confidencial. |
| ED-10 | Referencia externa | Mantener referencias autorizadas sin duplicar documentos. | Caso, proveedor, identificador o ruta autorizada, estado, fechas y usuario que la registró. | Pertenece a un caso; apunta a OneDrive u otro proveedor aprobado. | Confidencial. |
| ED-11 | Evento Calendar | Registrar el resultado de una creación seleccionada. | Fecha interna, identificador externo, estado, intento, error sanitizado y fecha de control. | Pertenece a una fecha o hito. | Confidencial. |
| ED-12 | Plantilla de anexo | Versionar el contenido aprobado para generar anexos. | Identificador, versión, vigencia, estado de aprobación y referencia al contenido aprobado. | Genera registros de anexo. | Interna o confidencial según contenido. |
| ED-13 | Registro de anexo | Controlar el documento entregado y firmado fuera de la plataforma. | Folio, versión, cliente o caso, generación, entrega, firma manuscrita registrada como estado, estado general y referencia al respaldo. | Pertenece a cliente o caso y a una plantilla. | Confidencial. |
| ED-14 | Solicitud de asistencia | Evidenciar la prueba opcional de Gemini sin conservar contenido innecesario. | Solicitante, caso ficticio o anonimizado, estado, categoría de resultado, decisión humana y error sanitizado. | Puede vincularse con un caso de prueba y catálogos. | Interna; confidencial si la anonimización es insuficiente, supuesto que debe bloquear el envío. |

Los datos de identificación oficial del cliente, campos de contacto obligatorios,
materias, transiciones y valores de catálogo deben validarse con los socios antes
de declararlos obligatorios. El SRS no exige almacenar un RUT u otro identificador
oficial mientras su necesidad, finalidad y tratamiento no hayan sido aprobados.

#### 3.5.3 Requisitos conceptuales de datos

| ID | Requisito | Criterio verificable | Trazabilidad |
|---|---|---|---|
| RD-001 | Toda entidad operativa debe poseer identificador interno estable y pertenencia al estudio cuando corresponda. | No se persisten clientes, casos, catálogos o eventos sin identificador y estudio válidos. | RN-001, RN-005, RN-009 |
| RD-002 | Las relaciones cliente–caso, caso–asignación y caso–fecha deben preservar integridad referencial. | No existen registros dependientes asociados con una referencia inexistente. | RN-006, RN-014, RN-015 |
| RD-003 | Un caso activo debe conservar cliente, estado, etapa y responsable principal vigentes. | La aplicación y la persistencia rechazan estados activos incompletos. | RN-010, RNF-011 |
| RD-004 | Los valores normalizados deben utilizar catálogos vigentes y conservar el valor histórico aunque luego se desactive. | Crear o transicionar usa valores vigentes; desactivar no reescribe registros existentes. | RN-011, RF-012 |
| RD-005 | Las asignaciones deben conservar periodos no sobrescritos y permitir identificar una sola asignación principal vigente por caso. | Reasignar cierra la anterior y crea la siguiente dentro de una operación consistente. | RN-013, RN-014, RNF-012 |
| RD-006 | RIT, ROL, tribunal y otros antecedentes judiciales deben admitir ausencia hasta que estén disponibles. | El caso se registra sin valores ficticios y luego admite una actualización manual trazada. | RN-012, RF-011 |
| RD-007 | Las fechas deben conservar tipo, referencia temporal no ambigua y zona de presentación acordada. | Casos límite mantienen el instante y se presentan consistentemente en `America/Santiago`. | RN-015, RNF-027 |
| RD-008 | El historial debe ser aditivo para usuarios comunes. | Las correcciones crean un nuevo evento y no eliminan la evidencia original. | RN-018, RN-019, RF-018 |
| RD-009 | Las referencias externas deben almacenar solo los identificadores o rutas autorizados necesarios para abrir el recurso. | No se copian documentos de OneDrive ni permisos externos al almacenamiento del sistema. | RN-026, RF-026 |
| RD-010 | Los errores externos almacenados deben estar sanitizados. | No contienen tokens, secretos, contenido jurídico completo ni datos personales innecesarios. | RNF-003, RNF-009 |
| RD-011 | Cada anexo debe conservar folio, versión de plantilla y estados de control sin sobrescribir la versión histórica. | Un anexo antiguo sigue asociado con la versión que lo generó después de publicar una nueva plantilla. | RN-020 a RN-023 |
| RD-012 | El sistema no debe guardar como hecho aceptado una sugerencia de Gemini sin decisión humana. | Resumen o clasificación solo pasa a la ficha después de aceptar o editar expresamente; descartar no modifica el caso. | RN-027, RN-028, RF-027, RF-028 |
| RD-013 | Los datos de prueba deben ser ficticios o estar anonimizados antes de ingresar al entorno. | La revisión previa no detecta identificadores, contactos, causas o antecedentes reales. | RNF-007, RNF-010 |
| RD-014 | Las exportaciones deben respetar filtros, campos y alcance autorizados. | La exportación no contiene registros o columnas fuera del permiso y genera evidencia de la acción. | RN-029, RF-021 |
| RD-015 | Las credenciales y tokens de servicios no forman parte del modelo funcional. | El esquema y las respuestas funcionales no contienen credenciales judiciales ni secretos de proveedores. | EXC-02, RNF-003, RF-030 |

#### 3.5.4 Inventario de tratamiento para la puerta de datos reales

Antes de utilizar datos reales se debe completar y aprobar un inventario por
grupo de datos. En esta versión del SRS los plazos de conservación y la base
aplicable permanecen sin definir; no deben suponerse.

| Grupo | Finalidad propuesta | Acceso mínimo | Conservación | Estado previo a datos reales |
|---|---|---|---|---|
| Identidad y contacto de clientes | Vincular al cliente con sus casos y permitir contacto operativo autorizado. | Perfiles autorizados por función. | Periodo y evento de inicio pendientes de revisión jurídica y organizacional. | Pendiente de finalidad, campos mínimos, habilitación y procedimiento de derechos. |
| Información operativa y jurídica del caso | Coordinar registro, asignación y seguimiento interno. | Usuario con caso o alcance autorizado. | Pendiente de matriz de conservación por estado y materia. | Pendiente de revisión jurídica, permisos y minimización. |
| Historial y asignaciones | Acreditar responsabilidad y trazabilidad de cambios críticos. | Lectura autorizada; modificación directa prohibida a usuarios comunes. | Pendiente de regla de archivo, bloqueo y eliminación. | Pendiente de catálogo de acciones y periodo aprobado. |
| Fechas, hitos y alertas | Apoyar seguimiento interno definido por profesionales. | Perfiles autorizados sobre el caso. | Pendiente de cierre, archivo y eliminación. | Pendiente de tipos, responsables y revisión de riesgo. |
| Anexos y referencias de respaldo | Evidenciar información, entrega, firma manuscrita y ubicación del respaldo. | Personal autorizado; contenido aprobado por los socios. | Pendiente de regla jurídica y documental. | Pendiente de plantilla, finalidades, base aplicable y conservación. |
| Referencias a OneDrive y Calendar | Abrir recursos o registrar eventos seleccionados. | Usuario autorizado; permisos efectivos permanecen en el proveedor. | Conservar solo mientras la referencia sea necesaria y según regla pendiente. | Pendiente de evaluación de proveedor y prueba de permisos. |
| Prueba Gemini | Evaluar resumen y clasificación sugerida con revisión humana. | Usuarios de prueba autorizados. | No conservar contenido enviado más allá de lo estrictamente necesario para la prueba; periodo exacto pendiente de evaluación. | Solo datos ficticios o anonimizados; evaluación del proveedor antes de cualquier cambio. |

#### 3.5.5 Ciclo de vida y controles organizacionales

| Etapa | Control requerido | Evidencia antes de datos reales |
|---|---|---|
| Recolección | Finalidad definida, campos minimizados, información al titular y habilitación revisada. | Inventario aprobado y plantilla vigente. |
| Creación y actualización | Validaciones, exactitud, responsable y trazabilidad de cambios críticos. | Pruebas de integridad y procedimiento de rectificación. |
| Consulta y uso | Matriz de permisos, mínimo privilegio y registros de acceso o acciones críticas definidos. | Pruebas negativas y matriz aprobada. |
| Transferencia a proveedor | Evaluación de finalidad, datos enviados, permisos, términos, ubicación, fallas y eliminación. | Ficha de Calendar, OneDrive, alojamiento, base de datos, autenticación y Gemini. |
| Conservación | Periodo, evento de inicio, bloqueo, respaldo y responsable definidos por grupo. | Matriz de conservación aprobada. |
| Eliminación o anonimización | Autorización, alcance, dependencias, respaldos y evidencia de ejecución. | Procedimiento probado con datos ficticios. |
| Derechos e incidentes | Canal, responsables, verificación, plazos aplicables, contención y registro. | Procedimientos aprobados y ejercicio de prueba. |

Mientras falte cualquiera de las aprobaciones anteriores, la plataforma debe
permanecer en preproducción con datos ficticios o anonimizados. La existencia de
este diseño no equivale por sí sola a cumplimiento legal.

#### 3.5.6 Asuntos abiertos de datos

| ID | Asunto | Decisión pendiente | Dependencia |
|---|---|---|---|
| AD-01 | Campos mínimos de cliente | Definir contacto obligatorio, identificadores y excepciones justificadas. | Validación con socios y revisión de minimización. |
| AD-02 | Personas múltiples por caso | Determinar si un caso puede poseer más de un cliente o participantes con roles diferentes. | Validación del flujo y posterior modelo físico. |
| AD-03 | Catálogos y transiciones | Aprobar materias, estados, etapas, prioridades, fechas y transiciones. | Prototipos y reglas operativas. |
| AD-04 | Conservación | Definir periodos, eventos de inicio, bloqueo, respaldo y eliminación por grupo. | Revisión jurídica, técnica y organizacional. |
| AD-05 | Historial de valores | Definir qué campos conservan valores anteriores y nivel de detalle permitido. | Privacidad, trazabilidad y capacidad. |
| AD-06 | Exportaciones | Definir formatos, campos, propósitos y evidencia de autorización. | Matriz de permisos y requisitos funcionales. |
| AD-07 | Datos enviados a proveedores | Aprobar el conjunto mínimo por integración y la evidencia de eliminación o conservación. | Evaluación de proveedores. |

### 3.6 Atributos del sistema

Las propiedades transversales se expresan en `RNF-001` a `RNF-028` como
requisitos verificables y no como declaraciones generales de calidad o
cumplimiento. La clasificación de la sección 3.3 define el compromiso actual.
En particular, acceso y autorización permanecen en el MVP, pero su implementación
se completa después del primer incremento funcional.
Mientras esos controles no existan, cualquier ejecución será exclusivamente de
desarrollo, con datos ficticios, sin acceso público y sin aptitud productiva.

## 4. Matriz de trazabilidad

La matriz detallada y mantenible se encuentra en
[`TRACEABILITY.md`](TRACEABILITY.md). Esta relaciona cada `RF-###`, `RNF-###` y
`RD-###` con su fuente, reglas, caso de uso o modelo previsto, verificación,
issue y estado. La tabla siguiente resume los grupos cubiertos.

| Requisito | Fuente | Issue | Caso de uso | Diseño/diagrama | Prueba | Estado |
|---|---|---|---|---|---|---|
| Actores y responsabilidades iniciales | Levantamiento e informe del proyecto | #1 | CU-001 a CU-013 | Diagrama de casos de uso | Revisión externa pendiente | Especificado y diagramado |
| Alcance, exclusiones, supuestos y dependencias | Informe y decisiones consolidadas del proyecto | #2 | CU-001 a CU-013 | Arquitectura y modelos UML | Revisión externa pendiente | Especificado y modelado |
| RN-001 a RN-030 | Alcance, levantamiento y decisiones consolidadas del proyecto | #3 | CU relacionados en matriz detallada | Casos de uso, clases y secuencias | Revisión y pruebas pendientes | Vigentes y propuestas según cada regla |
| RF-001 a RF-030 | Informe final, alcance y reglas del negocio | #4 | CU-001 a CU-013 | Casos de uso y secuencias | Criterios definidos; ejecución pendiente | Especificado y modelado |
| RNF-001 a RNF-028 | Informe final, riesgos y plan integrado de pruebas | #5 | Ámbito indicado en matriz detallada | Arquitectura y despliegue | Métodos definidos; ejecución pendiente | Especificado y modelado |
| ED-01 a ED-14; RD-001 a RD-015 | Informe final, estrategia de privacidad y reglas del negocio | #6 | CU relacionados en matriz detallada | Diagrama de clases | Criterios definidos; validación y pruebas pendientes | Especificado y modelado |
| Matriz detallada de RF, RNF y RD | SRS y backlog de especificación | #7 | CU-001 a CU-013 reservados | Modelos programados | DF, DNF y DD definidos como pruebas previstas | Especificado |
| Revisión IEEE 830-1998 | SRS completo y FO-24 | #8 | Todos | Todos los modelos programados | Lista de revisión documental | Revisado internamente |

## Anexos

### A. Modelos y diagramas

- Diagrama de casos de uso.
- Diagrama de clases.
- Diagramas de secuencia.
- Diagrama de despliegue.

### B. Registro de asuntos abiertos

Los asuntos abiertos se administrarán mediante GitHub Issues y se vincularán
desde esta sección cuando afecten la interpretación del SRS.

### C. Revisión de calidad

El resultado de la revisión interna basada en IEEE 830-1998, sus comprobaciones
y las decisiones que aún requieren una fuente autorizada se documentan en
[`SRS_REVIEW.md`](SRS_REVIEW.md). La revisión interna no reemplaza la validación
con los socios propietarios ni la revisión académica.
