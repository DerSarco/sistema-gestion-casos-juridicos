# Especificación de requisitos de software (SRS)

**Proyecto:** Sistema de gestión de casos jurídicos

**Versión del documento:** 1.3

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
| 1.1 | 2026-10-22 | Incorporación de objetivos medibles alineados con el MVP priorizado | Equipo del proyecto |
| 1.2 | 2026-10-22 | Selección de modelos reducidos del MVP y separación de la visión futura | Equipo del proyecto |
| 1.3 | 2026-10-22 | Reducción de la línea base normativa a diez RF, diez RNF y siete requisitos de datos del MVP | Equipo del proyecto |

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

#### 1.2.1 Objetivos vigentes

El proyecto posee un objetivo general y exactamente cuatro objetivos específicos
con un único verbo rector cada uno. Sus indicadores, metas, evidencias y momentos
de verificación se definen en
[`OBJECTIVES.md`](OBJECTIVES.md). Los objetivos se limitan al MVP priorizado y no
dependen de requisitos diferidos.

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

- consultar, registrar y actualizar clientes y casos según sus permisos;
- asignar el abogado responsable al registrar o actualizar un caso;
- actualizar estados y etapas mediante los valores predefinidos;
- registrar fechas relevantes y consultar el historial básico;
- validar los flujos prioritarios durante la aceptación.

Este perfil no puede eliminar o alterar silenciosamente el historial de acciones
críticas. Las operaciones administrativas también deben quedar trazadas.

##### ACT-02: Abogado

Usuario interno responsable de consultar y gestionar los casos que le hayan sido
asignados o para los cuales posea autorización.

Responsabilidades previstas:

- consultar sus casos, responsables, estados y fechas relevantes;
- actualizar información operativa dentro de los permisos definidos;
- registrar observaciones, cambios de estado y fechas autorizadas;
- consultar el historial básico de los casos permitidos.

El abogado no obtiene por este rol facultades para administrar usuarios o
consultar información ajena a su autorización.

##### ACT-03: Secretaria o asistente

Usuario interno que apoya el ingreso y mantenimiento de información operativa
bajo las reglas y permisos definidos por el estudio.

Responsabilidades previstas:

- registrar clientes y casos con los datos mínimos autorizados;
- actualizar datos de contacto y antecedentes operativos permitidos;
- asignar al abogado responsable cuando posea autorización;
- registrar estados, etapas y fechas relevantes dentro de sus atribuciones;
- consultar clientes, casos e historial básico según su alcance.

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
| Registrar clientes y casos | Previsto | Según autorización | Previsto |
| Actualizar información operativa | Previsto | Casos autorizados | Campos autorizados |
| Asignar responsable | Previsto | No previsto | Según autorización |
| Consultar historial de cambios | Previsto | Casos autorizados | Según autorización |
| Eliminar o alterar historial crítico | No permitido | No permitido | No permitido |

La matriz expresa responsabilidades previstas y no sustituye la matriz detallada
de permisos. Las celdas marcadas como `Según autorización` deben resolverse antes
de implementar el control de acceso.

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

La línea base normativa contiene diez requisitos funcionales. Cada uno aporta una
capacidad visible en las ocho historias Gherkin. Los identificadores omitidos se
conservan únicamente en el catálogo histórico de `MVP_SCOPE.md`; no son
requisitos del MVP ni criterios de aceptación.

| ID | Requisito del MVP | Criterio verificable | Historias |
|---|---|---|---|
| RF-001 | Permitir el inicio de sesión de cuentas internas activas, sin registro público. | Una cuenta válida accede; credenciales inválidas son rechazadas sin revelar si la cuenta existe. | HU-01 |
| RF-004 | Registrar y editar clientes mediante un formulario reutilizable con datos mínimos validados. | Un registro válido se guarda; datos obligatorios o formatos inválidos impiden guardar y muestran la corrección necesaria. | HU-08 |
| RF-005 | Buscar clientes por nombre o dato de contacto autorizado. | Solo se muestran coincidencias dentro del alcance del usuario y un estado vacío cuando no existen resultados. | HU-07 |
| RF-008 | Registrar y editar una ficha de caso vinculada con un cliente. | El caso se guarda con identificador interno; tribunal, RIT o ROL pueden quedar vacíos mientras no estén disponibles. | HU-03 |
| RF-009 | Mantener estado y etapa mediante valores predefinidos. | Un cambio confirmado actualiza el caso y se incorpora al historial; cancelar no altera los valores anteriores. | HU-03, HU-05 |
| RF-010 | Consultar la ficha consolidada de un caso autorizado. | La ficha presenta cliente, responsable, estado, etapa, fechas e historial básico sin revelar casos no autorizados. | HU-04 |
| RF-013 | Asignar un abogado responsable principal al caso. | Todo caso activo posee un responsable y la asignación registra ejecutor y fecha. | HU-03 |
| RF-015 | Registrar manualmente una fecha relevante con tipo, responsable y observación opcional. | La fecha queda visible en la ficha y el sistema no calcula ni declara plazos judiciales definitivos. | HU-06 |
| RF-017 | Consultar el historial básico cronológico del caso. | Los cambios de estado, etapa, responsable y fechas muestran acción, usuario y momento; un usuario común no los edita. | HU-04 a HU-06 |
| RF-019 | Buscar y filtrar casos por identificador, cliente, responsable, estado o etapa. | Los filtros pueden combinarse y limpiarse sin mostrar casos fuera del alcance autorizado. | HU-02 |

#### 3.2.1 Restricción funcional obligatoria

`RF-030` no agrega una pantalla: impide que el MVP consulte, obtenga, envíe o
sincronice información con la OJV y prohíbe solicitar o almacenar credenciales
judiciales. Se verifica mediante revisión de arquitectura, código, configuración
y tráfico de la aplicación.

### 3.3 Requisitos no funcionales

El MVP contiene diez requisitos no funcionales verificables. Esta selección cubre
los riesgos esenciales sin convertir controles de futuras integraciones,
capacidad o explotación productiva en obligaciones de la iteración académica.

| ID | Requisito del MVP | Medida o criterio | Verificación |
|---|---|---|---|
| RNF-001 | Toda lectura o modificación protegida debe autorizarse en el servidor. | El 100 % de los escenarios negativos definidos por rol es rechazado sin revelar el recurso. | Pruebas de integración y navegador. |
| RNF-003 | Los secretos no deben almacenarse en código, Git, respuestas ni registros de aplicación. | Cero secretos detectados; las variables se documentan solo por nombre. | GitGuardian y revisión de configuración. |
| RNF-005 | Las acciones críticas deben generar historial no editable por usuarios comunes. | El 100 % de cambios de estado, etapa, responsable y fecha registra usuario, momento y acción. | Pruebas de integración y revisión del historial. |
| RNF-007 | Construcción, pruebas, demostración y aceptación deben usar datos ficticios o anonimizados. | Cero datos reales identificables en base, capturas, fixtures, logs y repositorio. | Revisión previa a cada demostración. |
| RNF-008 | El uso de datos reales debe permanecer bloqueado hasta una aprobación jurídica, técnica y organizacional. | Sin la lista y acta aprobadas, el entorno continúa en preproducción con datos ficticios o anonimizados. | Revisión documental de la puerta de datos reales. |
| RNF-011 | Un caso activo debe conservar cliente, estado, etapa y responsable. | Todos los intentos incompletos son rechazados sin dejar un caso activo parcial. | Pruebas unitarias y de integración. |
| RNF-018 | Los ocho flujos deben ser utilizables en escritorio, tableta y móvil. | Se completan sin pérdida de controles ni desplazamiento horizontal de página. | Revisión visual y pruebas en tres viewports. |
| RNF-019 | Los campos y errores deben ser comprensibles y estar asociados al control correspondiente. | El 100 % de controles críticos posee nombre accesible y sus errores indican corrección. | Pruebas de componentes y revisión manual. |
| RNF-022 | Toda rama integrable debe aprobar build, tipos, lint y pruebas aplicables. | Cero errores y 100 % de pruebas obligatorias del cambio aprobadas. | Pipeline de integración continua. |
| RNF-028 | Cada cambio debe ser trazable desde requisito e issue hasta PR y prueba. | Los PR poseen issue, etiqueta, milestone y evidencia; la matriz no contiene requisitos aprobados sin verificación. | Auditoría de GitHub y trazabilidad. |

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

#### 3.4.4 Fechas, seguimiento e historial

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-015 | Tipo de fecha | Toda fecha de seguimiento debe indicar si corresponde a una referencia judicial o a un control interno. | ALC-06; exclusión EXC-03 | Vigente | Los tipos exactos y campos obligatorios deben validarse. |
| RN-016 | Responsabilidad sobre la fecha | Toda fecha que requiera seguimiento debe asociarse con un responsable definido. | ALC-06 | Propuesta | Debe acordarse si el responsable corresponde al caso, a la fecha o a ambos. |
| RN-017 | Sin determinación jurídica automática | El sistema puede registrar y mostrar fechas, pero no determina de forma definitiva plazos judiciales ni reemplaza la revisión profesional. | EXC-03 | Vigente | No admite excepciones dentro de la versión 1. |
| RN-018 | Registro de cambios críticos | Toda acción definida como crítica debe conservar usuario, fecha, tipo de acción y valores relevantes del cambio. | ALC-07 | Vigente | El catálogo de acciones críticas debe completarse en #4. |
| RN-019 | Protección del historial | Los usuarios comunes no pueden eliminar ni alterar silenciosamente las entradas del historial. | ACT-01, ACT-02, ACT-03; restricciones generales | Vigente | Las correcciones administrativas deben generar una nueva evidencia trazable. |

#### 3.4.5 Restricción respecto de la OJV

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-030 | Independencia absoluta de la OJV | La plataforma no consulta, obtiene, envía ni sincroniza información con la OJV y no almacena credenciales judiciales. | EXC-01, EXC-02 | Vigente | No admite excepciones dentro de la versión 1. |

#### 3.4.6 Asuntos abiertos de las reglas

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
| Secreta | Credenciales, tokens y claves que permiten acceso a sistemas o datos. | Secretos de base de datos y del proveedor de autenticación. | Fuera del repositorio y del contenido funcional; acceso técnico restringido y rotación ante exposición. |

Las credenciales judiciales quedan completamente fuera del sistema. Ningún nivel
de clasificación autoriza almacenarlas.

#### 3.5.2 Entidades y relaciones conceptuales

| ID | Entidad | Propósito | Datos conceptuales mínimos | Relaciones principales | Sensibilidad |
|---|---|---|---|---|---|
| ED-01 | Estudio | Delimitar la organización responsable de los registros. | Identificador interno, nombre anonimizado o de prueba, estado, fechas de control. | Posee usuarios, clientes, casos y catálogos. | Interna; confidencial si identifica a la organización real. |
| ED-02 | Usuario | Identificar a quien ejecuta acciones internas. | Identificador, nombre de prueba, identificador de acceso, estado y rol vigente. | Pertenece a un estudio; participa en asignaciones, cambios y revisiones. | Confidencial. |
| ED-03 | Rol y permiso | Definir capacidades autorizadas. | Identificador, nombre, descripción, permisos y vigencia. | Se asigna a usuarios; controla operaciones. | Interna. |
| ED-04 | Cliente | Mantener la ficha y contacto autorizado. | Identificador interno, nombre o denominación, datos mínimos de contacto, estado de completitud y fechas de control. | Pertenece a un estudio; se relaciona con uno o más casos. | Confidencial. |
| ED-05 | Caso | Mantener la ficha operativa única. | Identificador interno, cliente, materia, tribunal y RIT/ROL cuando correspondan, estado, etapa, prioridad, observaciones y fechas de control. | Pertenece a un estudio y cliente; posee asignación, fechas e historial. | Confidencial. |
| ED-06 | Asignación | Conservar responsabilidad actual e histórica. | Caso, responsable, inicio, término, ejecutor y motivo cuando se defina. | Pertenece a un caso y referencia usuarios. | Confidencial. |
| ED-07 | Catálogo | Normalizar materias, estados, etapas, prioridades y tipos de fecha. | Tipo de catálogo, código, nombre, descripción, orden y vigencia. | Sus valores son utilizados por casos y fechas. | Interna. |
| ED-08 | Fecha o hito | Registrar seguimiento sin determinar automáticamente plazos jurídicos. | Caso, tipo, fecha, responsable y observación. | Pertenece a un caso. | Confidencial. |
| ED-09 | Evento de historial | Registrar acciones críticas y correcciones. | Estudio, caso o entidad afectada, actor, fecha, acción y valores relevantes protegidos. | Referencia usuario y registro afectado. | Confidencial. |

Los datos de identificación oficial del cliente, campos de contacto obligatorios,
materias, transiciones y valores de catálogo deben validarse con los socios antes
de declararlos obligatorios. El SRS no exige almacenar un RUT u otro identificador
oficial mientras su necesidad, finalidad y tratamiento no hayan sido aprobados.

#### 3.5.3 Requisitos conceptuales de datos

| ID | Requisito | Criterio verificable | Trazabilidad |
|---|---|---|---|
| RD-001 | Toda entidad operativa debe poseer identificador interno estable y pertenencia al estudio cuando corresponda. | No se persisten clientes, casos, catálogos o eventos sin identificador y estudio válidos. | RN-001, RN-005, RN-009 |
| RD-002 | Las relaciones cliente–caso, caso–asignación y caso–fecha deben preservar integridad referencial. | No existen registros dependientes asociados con una referencia inexistente. | RN-006, RN-013, RN-015 |
| RD-003 | Un caso activo debe conservar cliente, estado, etapa y responsable principal vigentes. | La aplicación y la persistencia rechazan estados activos incompletos. | RN-010, RNF-011 |
| RD-006 | RIT, ROL, tribunal y otros antecedentes judiciales deben admitir ausencia hasta que estén disponibles. | El caso se registra sin valores ficticios y luego admite una actualización manual. | RF-008, RF-030 |
| RD-007 | Las fechas deben conservar tipo, valor y responsable. | La información registrada se muestra sin transformarla en un cálculo jurídico automático. | RF-015 |
| RD-008 | El historial debe ser aditivo para usuarios comunes. | Los eventos existentes no se editan ni eliminan desde los flujos del MVP. | RF-017, RNF-005 |
| RD-013 | Los datos de prueba deben ser ficticios o estar anonimizados antes de ingresar al entorno. | La revisión previa no detecta identificadores, contactos, causas o antecedentes reales. | RNF-007, RNF-008 |

#### 3.5.4 Inventario de tratamiento para la puerta de datos reales

Antes de utilizar datos reales se debe completar y aprobar un inventario por
grupo de datos. En esta versión del SRS los plazos de conservación y la base
aplicable permanecen sin definir; no deben suponerse.

| Grupo | Finalidad propuesta | Acceso mínimo | Conservación | Estado previo a datos reales |
|---|---|---|---|---|
| Identidad y contacto de clientes | Vincular al cliente con sus casos y permitir contacto operativo autorizado. | Perfiles autorizados por función. | Periodo y evento de inicio pendientes de revisión jurídica y organizacional. | Pendiente de finalidad, campos mínimos, habilitación y procedimiento de derechos. |
| Información operativa y jurídica del caso | Coordinar registro, asignación y seguimiento interno. | Usuario con caso o alcance autorizado. | Pendiente de matriz de conservación por estado y materia. | Pendiente de revisión jurídica, permisos y minimización. |
| Historial y asignaciones | Acreditar responsabilidad y trazabilidad de cambios críticos. | Lectura autorizada; modificación directa prohibida a usuarios comunes. | Pendiente de regla de archivo, bloqueo y eliminación. | Pendiente de catálogo de acciones y periodo aprobado. |
| Fechas relevantes | Apoyar seguimiento interno definido por profesionales. | Perfiles autorizados sobre el caso. | Pendiente de cierre, archivo y eliminación. | Pendiente de tipos, responsables y revisión de riesgo. |

#### 3.5.5 Ciclo de vida y controles organizacionales

| Etapa | Control requerido | Evidencia antes de datos reales |
|---|---|---|
| Recolección | Finalidad definida, campos minimizados, información al titular y habilitación revisada. | Inventario aprobado y plantilla vigente. |
| Creación y actualización | Validaciones, exactitud, responsable y trazabilidad de cambios críticos. | Pruebas de integridad y procedimiento de rectificación. |
| Consulta y uso | Matriz de permisos, mínimo privilegio y registros de acceso o acciones críticas definidos. | Pruebas negativas y matriz aprobada. |
| Transferencia a proveedor | Evaluación de finalidad, datos enviados, permisos, términos, ubicación, fallas y eliminación. | Ficha de alojamiento, base de datos y autenticación. |
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

### 3.6 Atributos del sistema

Las diez propiedades transversales de la sección 3.3 constituyen los únicos RNF
verificables del MVP. Los identificadores históricos no incluidos permanecen en
`MVP_SCOPE.md` y no amplían el compromiso actual.
En particular, acceso y autorización permanecen en el MVP, pero su implementación
se completa después del primer incremento funcional.
Mientras esos controles no existan, cualquier ejecución será exclusivamente de
desarrollo, con datos ficticios, sin acceso público y sin aptitud productiva.

## 4. Matriz de trazabilidad

La matriz detallada y mantenible se encuentra en
[`TRACEABILITY.md`](TRACEABILITY.md). Esta relaciona cada RF, RNF y RD vigente
con su fuente, historia, modelo previsto, verificación,
issue y estado. La tabla siguiente resume los grupos cubiertos.

| Requisito | Fuente | Issue | Caso de uso | Diseño/diagrama | Prueba | Estado |
|---|---|---|---|---|---|---|
| Línea base del MVP | Objetivos, historias y alcance priorizado | #53, #61 | Ocho historias | Tres modelos `mvp-*` | Revisión documental y visual | Modelado; implementación no inferida |
| 10 RF y RF-030 | Problema, alcance e historias Gherkin | #61 | HU-01 a HU-08 | Casos de uso y datos reducidos | Criterios definidos; ejecución pendiente | Especificado |
| 10 RNF | Riesgos esenciales y plan de calidad | #61 | Transversal | Proceso y modelo reducido | Métodos definidos; ejecución pendiente | Especificado |
| 7 RD | Privacidad, integridad y modelo reducido | #61 | HU-03, HU-04, HU-06, HU-08 | Modelo de datos del MVP | Criterios definidos; ejecución pendiente | Especificado |
| Revisión IEEE 830-1998 | SRS 1.3 | #61 | Todo el MVP | Modelos seleccionados | Lista de revisión documental | Revisado internamente |

## Anexos

### A. Modelos y diagramas

La selección vigente del MVP y del video se encuentra en
[`diagrams/README.md`](diagrams/README.md). Los modelos extensos de casos de uso,
dominio y despliegue se conservan como visión futura y no amplían el criterio de
aceptación actual.

### B. Registro de asuntos abiertos

Los asuntos abiertos se administrarán mediante GitHub Issues y se vincularán
desde esta sección cuando afecten la interpretación del SRS.

### C. Revisión de calidad

El resultado de la revisión interna basada en IEEE 830-1998, sus comprobaciones
y las decisiones que aún requieren una fuente autorizada se documentan en
[`SRS_REVIEW.md`](SRS_REVIEW.md). La revisión interna no reemplaza la validación
con los socios propietarios ni la revisión académica.
