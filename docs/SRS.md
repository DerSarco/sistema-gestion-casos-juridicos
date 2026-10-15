# Especificación de requisitos de software (SRS)

**Proyecto:** Sistema de gestión de casos jurídicos

**Versión del documento:** 0.4

**Estado:** En elaboración

**Estructura de referencia:** IEEE 830

## Control de versiones

| Versión | Fecha | Descripción | Responsable |
|---|---|---|---|
| 0.1 | 2026-10-14 | Creación de la estructura inicial | Equipo del proyecto |
| 0.2 | 2026-10-14 | Definición inicial de actores, servicios externos y responsabilidades | Equipo del proyecto |
| 0.3 | 2026-10-14 | Consolidación del alcance, exclusiones, supuestos y dependencias | Equipo del proyecto |
| 0.4 | 2026-10-14 | Definición inicial de reglas del negocio y asuntos abiertos | Equipo del proyecto |

## 1. Introducción

### 1.1 Propósito

Este documento especifica los requisitos de la versión 1 de una plataforma web
para centralizar el registro, la asignación y el seguimiento inicial de casos en
un estudio jurídico pequeño.

### 1.2 Alcance del producto

La plataforma centralizará información de clientes y casos, responsables,
estados, fechas relevantes e historial de cambios. Facilitará la consulta de
carga de trabajo y la generación de reportes autorizados.

No reemplazará la Oficina Judicial Virtual ni automatizará la estrategia
jurídica. El alcance detallado se completará y validará mediante requisitos
trazables.

### 1.3 Definiciones, siglas y abreviaturas

| Término | Definición |
|---|---|
| OJV | Oficina Judicial Virtual del Poder Judicial de Chile. |
| SRS | Especificación de requisitos de software. |
| Versión 1 | Primera entrega funcional, documentada y sometida a aceptación. |

### 1.4 Referencias

Las referencias normativas, técnicas y académicas se incorporarán con su
identificación, versión y fecha de consulta antes de utilizarlas como respaldo.

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

#### 2.2.1 Capacidades incluidas en la versión 1

| ID | Capacidad incluida | Resultado esperado |
|---|---|---|
| ALC-01 | Administrar usuarios internos y roles autorizados. | Cada usuario opera con un perfil identificable y permisos acordes con sus funciones. |
| ALC-02 | Registrar y mantener clientes con sus datos de contacto autorizados. | La información mínima del cliente se encuentra vinculada de forma trazable con sus casos. |
| ALC-03 | Registrar y mantener casos con un identificador interno, estado, etapa y responsable. | Cada caso activo posee los datos obligatorios definidos por las reglas del negocio. |
| ALC-04 | Asignar y reasignar responsables. | El sistema conserva la responsabilidad actual y el historial de reasignaciones. |
| ALC-05 | Administrar catálogos de estados, etapas y tipos autorizados. | Los usuarios seleccionan valores normalizados en lugar de crear variantes de texto libre. |
| ALC-06 | Registrar fechas relevantes, responsables y observaciones operativas. | La información queda disponible para consulta y control interno sin calcular plazos jurídicos definitivos. |
| ALC-07 | Mantener historial de cambios críticos. | Las acciones definidas como críticas conservan usuario, fecha y cambio realizado. |
| ALC-08 | Buscar y consultar información autorizada. | El usuario localiza clientes o casos sin acceder a registros fuera de sus permisos. |
| ALC-09 | Consultar carga de trabajo, pendientes y reportes autorizados. | Cada perfil obtiene una vista coherente con su responsabilidad y nivel de acceso. |
| ALC-10 | Generar el anexo imprimible de información y autorización desde una plantilla aprobada. | El personal registra folio, versión, entrega, firma manuscrita, estado y referencia al respaldo archivado. |
| ALC-11 | Crear de forma controlada eventos autorizados en Google Calendar. | Una falla externa no elimina ni modifica los datos internos del caso. |
| ALC-12 | Mantener una referencia autorizada a recursos conservados en OneDrive. | La plataforma no duplica documentos ni reemplaza los permisos del repositorio externo. |
| ALC-13 | Ejecutar una prueba de concepto de asistencia con Gemini sobre antecedentes anonimizados. | El servicio propone un resumen o clasificación que requiere revisión humana y nunca modifica registros automáticamente. |
| ALC-14 | Exportar información cuando el perfil y el propósito lo permitan. | La exportación respeta los permisos y controles que se definan en los requisitos específicos. |

Estas capacidades describen el límite funcional general. Los requisitos
`RF-###`, las reglas `RN-###` y sus criterios de aceptación precisarán el
comportamiento verificable de cada una.

#### 2.2.2 Exclusiones de la versión 1

| ID | Exclusión | Tratamiento |
|---|---|---|
| EXC-01 | Cualquier comunicación técnica con la OJV. | La plataforma no consulta, obtiene, envía ni sincroniza información con la OJV. |
| EXC-02 | Almacenamiento de credenciales judiciales. | Las credenciales permanecen completamente fuera del sistema. |
| EXC-03 | Cálculo automático definitivo de plazos judiciales. | Las fechas se registran para control interno y requieren interpretación profesional. |
| EXC-04 | Automatización de la estrategia jurídica o toma autónoma de decisiones. | Las decisiones permanecen bajo responsabilidad humana. |
| EXC-05 | Inteligencia artificial como núcleo o requisito para operar. | La prueba de concepto es opcional y posee un flujo manual alternativo. |
| EXC-06 | Reemplazo de OneDrive como repositorio documental. | La plataforma conserva referencias autorizadas, no los documentos jurídicos. |
| EXC-07 | Sincronización bidireccional completa con Google Calendar. | La integración se limita a la creación controlada de eventos autorizados. |
| EXC-08 | Portal para clientes y aplicación móvil nativa. | Los clientes no operan la plataforma y la interfaz prevista es web responsiva. |
| EXC-09 | Facturación, contabilidad y firma electrónica. | Estas funciones no forman parte del problema ni de los objetivos de la versión 1. |
| EXC-10 | Migración histórica completa o uso cotidiano con casos reales durante el proyecto académico. | La construcción y aceptación utilizan datos ficticios o anonimizados. |

Una exclusión solo puede pasar al alcance mediante una decisión registrada,
análisis de impacto y actualización del SRS, backlog, riesgos y plan del
proyecto.

### 2.3 Características de los usuarios y actores externos

La versión 1 considera tres perfiles humanos internos y servicios externos
acotados. Los permisos descritos en esta sección constituyen una base funcional
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

Servicio externo previsto para crear eventos autorizados a partir de una fecha
registrada, evitando una redigitación innecesaria. La integración será acotada y
una falla del servicio no podrá provocar la pérdida de los datos internos del
caso.

##### EXT-02: OneDrive

Repositorio documental externo. La plataforma conservará solamente una
referencia autorizada al recurso o carpeta correspondiente y deberá respetar los
permisos definidos en OneDrive. La versión 1 no reemplaza este repositorio.

##### EXT-03: Gemini API

Servicio externo utilizado exclusivamente en una prueba de concepto para resumir
y sugerir una clasificación de antecedentes anonimizados. Toda respuesta requiere
revisión humana y no puede modificar fichas ni tomar decisiones automáticamente.
Su indisponibilidad no debe impedir el registro manual.

##### EXT-04: Oficina Judicial Virtual

Plataforma externa de tramitación y consulta judicial. Se incluye como elemento
del contexto operativo porque los profesionales la utilizan de forma manual e
independiente. La versión 1 no tendrá ninguna comunicación técnica con la OJV: no
consultará, obtendrá, enviará ni sincronizará información con ella y no almacenará
credenciales judiciales.

#### 2.3.3 Personas relacionadas que no operan la plataforma

El cliente del estudio es la persona a quien se refiere parte de la información
registrada, pero no es usuario ni actor operativo de la versión 1. Revisa y firma
fuera de la plataforma el anexo de información y autorización cuando corresponda.
El personal autorizado registra posteriormente los datos de control del
documento. La versión 1 no incorpora un portal de clientes.

#### 2.3.4 Matriz inicial de responsabilidades

| Capacidad | ACT-01 Administrador | ACT-02 Abogado | ACT-03 Asistente |
|---|---|---|---|
| Consultar visión global del estudio | Previsto | Según autorización | Según autorización |
| Administrar usuarios, roles y catálogos | Previsto | No previsto | No previsto |
| Registrar clientes y casos | Previsto | Según autorización | Previsto |
| Actualizar información operativa | Previsto | Casos autorizados | Campos autorizados |
| Asignar o reasignar responsables | Previsto | Participación por definir | Participación por definir |
| Consultar historial de cambios | Previsto | Casos autorizados | Según autorización |
| Eliminar o alterar historial crítico | No permitido | No permitido | No permitido |
| Preparar anexo imprimible | Previsto | Según autorización | Previsto |
| Aprobar contenido de la plantilla | Previsto | No previsto | No previsto |
| Revisar sugerencias de Gemini | Previsto | Según autorización | Según autorización |

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
- Las integraciones externas no podrán provocar pérdida de datos internos ni
  impedir la continuidad de los flujos manuales esenciales.
- La versión 1 terminará con pruebas y aceptación con los socios; esta aceptación
  no equivale a una autorización automática para uso productivo con datos reales.

### 2.5 Supuestos

| ID | Supuesto | Estado | Condición de validación | Efecto si no se cumple |
|---|---|---|---|---|
| SUP-01 | Los perfiles iniciales administrador, abogado y asistente cubren las funciones internas prioritarias. | Pendiente de validación detallada | Revisión de la matriz de permisos con los socios. | Ajustar actores, permisos, requisitos y casos de uso antes de implementar autorización. |
| SUP-02 | Los usuarios de prueba dispondrán de navegador actualizado y conexión a internet durante la aceptación. | Supuesto de trabajo | Confirmación previa a la sesión de prueba. | Preparar alternativa local o reprogramar las pruebas dependientes de servicios remotos. |
| SUP-03 | Los socios podrán validar catálogos, campos mínimos, permisos y flujos prioritarios. | Confirmado como compromiso del proceso, fechas por coordinar | Registro de revisiones y decisiones en issues o minutas anonimizadas. | Mantener los elementos afectados en estado propuesto y no tratarlos como aceptados. |
| SUP-04 | Existirán cuentas de prueba y autorizaciones suficientes para evaluar Calendar y OneDrive. | Pendiente | Prueba técnica con cuentas sin información real. | Aplicar el flujo manual y conservar la integración como no verificada. |
| SUP-05 | La prueba de Gemini podrá realizarse con antecedentes ficticios o anonimizados. | Pendiente de validación técnica | Verificación del conjunto de prueba y revisión de privacidad antes del envío. | No ejecutar la prueba externa y mantener el registro manual. |
| SUP-06 | El volumen y concurrencia requeridos serán compatibles con un estudio pequeño. | No medido | Levantamiento de usuarios simultáneos, volumen de casos y crecimiento esperado. | Ajustar requisitos de rendimiento, arquitectura y pruebas de carga. |

Los supuestos pendientes no pueden presentarse como hechos confirmados. Cada uno
debe resolverse o transformarse en una restricción, requisito o riesgo antes de
que afecte una decisión irreversible.

### 2.6 Dependencias externas

| ID | Dependencia | Uso previsto | Comportamiento ante indisponibilidad |
|---|---|---|---|
| DEP-01 | Participación de los socios propietarios | Validar requisitos, reglas operativas, prototipos y aceptación. | Registrar la validación como pendiente y no asumir aprobación. |
| DEP-02 | Google Calendar | Crear eventos autorizados desde una fecha registrada. | Conservar los datos internos, informar el error y permitir continuar sin crear el evento. |
| DEP-03 | OneDrive | Acceder mediante una referencia autorizada al recurso externo. | Conservar la referencia, informar la indisponibilidad y no modificar permisos externos. |
| DEP-04 | Gemini API | Ejecutar la prueba opcional de resumen y clasificación sobre datos anonimizados. | Omitir la sugerencia y permitir completar todo el registro manualmente. |
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

Por especificar mediante prototipos, criterios de accesibilidad y pruebas de
aceptación.

#### 3.1.2 Interfaces de software

Por especificar después de validar las integraciones y sus restricciones.

#### 3.1.3 Interfaces de comunicaciones

Por especificar junto con los requisitos de seguridad y disponibilidad.

### 3.2 Requisitos funcionales

Cada requisito funcional utilizará la siguiente ficha:

| Campo | Contenido |
|---|---|
| ID | RF-### |
| Nombre | Nombre breve y único |
| Descripción | Comportamiento requerido |
| Actor o fuente | Origen del requisito |
| Precondiciones | Estado necesario antes de ejecutarlo |
| Flujo y reglas | Comportamiento y reglas del negocio |
| Resultado | Estado observable al finalizar |
| Excepciones | Errores y flujos alternativos |
| Prioridad | Alta, media o baja |
| Criterios de aceptación | Condiciones verificables |
| Trazabilidad | Issue, caso de uso y prueba relacionados |

### 3.3 Requisitos no funcionales

Los requisitos no funcionales se agruparán, al menos, en seguridad y privacidad,
rendimiento, disponibilidad, usabilidad, accesibilidad, mantenibilidad,
compatibilidad y respaldo o recuperación.

Cada requisito no funcional deberá contener una medida y un método de
verificación.

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

Se documentarán entidades, campos mínimos, relaciones, validaciones, clasificación
de sensibilidad, conservación y eliminación.

### 3.6 Atributos del sistema

Las propiedades transversales se expresarán como requisitos verificables y no
como declaraciones generales de calidad o cumplimiento.

## 4. Matriz de trazabilidad

| Requisito | Fuente | Issue | Caso de uso | Diseño/diagrama | Prueba | Estado |
|---|---|---|---|---|---|---|
| Actores y responsabilidades iniciales | Levantamiento e informe del proyecto | #1 | Pendiente | Diagrama de casos de uso pendiente | Revisión con socios | Propuesto |
| Alcance, exclusiones, supuestos y dependencias | Informe y decisiones consolidadas del proyecto | #2 | Pendiente | Diagramas pendientes | Revisión documental y con socios | Propuesto |
| RN-001 a RN-030 | Alcance, levantamiento y decisiones consolidadas del proyecto | #3 | Pendiente | Diagramas pendientes | Revisión documental y con socios | Vigentes y propuestas según cada regla |
| Por completar | Por completar | Por completar | Por completar | Por completar | Por completar | Propuesto |

## Anexos

### A. Modelos y diagramas

- Diagrama de casos de uso.
- Diagrama de clases.
- Diagramas de secuencia.
- Diagrama de despliegue.

### B. Registro de asuntos abiertos

Los asuntos abiertos se administrarán mediante GitHub Issues y se vincularán
desde esta sección cuando afecten la interpretación del SRS.
