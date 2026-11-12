# Especificación de requisitos de software (SRS)

**Proyecto:** Sistema de gestión de casos jurídicos

**Versión del documento:** 1.6

**Estado:** Reglas operativas validadas; aceptación final pendiente

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
| 1.4 | 2026-10-27 | Normalización continua de identificadores: once RF, diez RNF y siete requisitos de datos, sin cambio de alcance | Equipo del proyecto |
| 1.5 | 2026-11-09 | Refinamiento con cuatro perfiles, siete etapas y ciclos de vida reversibles, sin aumentar la línea base normativa | Equipo del proyecto |
| 1.6 | 2026-11-11 | Consolidación anonimizada de permisos, campos, flujo, fechas, cierre y conservación validados con el estudio | Equipo del proyecto |

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
mediante requisitos trazables. Las decisiones operativas validadas se incorporan
en esta versión; las puertas jurídicas, técnicas y organizacionales para usar
datos reales permanecen abiertas.

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
| ALC-02 | Registrar, mantener, desactivar y reactivar clientes con sus datos de contacto autorizados. | La información mínima permanece vinculada con sus casos; la desactivación es reversible, requiere permiso elevado y no elimina físicamente el registro. |
| ALC-03 | Registrar, mantener, archivar y reactivar casos con un identificador interno, estado, etapa y responsable. | Cada caso activo posee los datos obligatorios; el archivo es reversible y conserva relaciones e historial. |
| ALC-04 | Asignar un responsable principal y participantes. | El responsable principal es un socio o abogado; el procurador puede participar en gestiones de apoyo. Distribuir o reasignar corresponde exclusivamente al perfil Socio y cada acción queda trazada. |
| ALC-05 | Usar etapas y estados controlados. | El flujo reconoce ingreso, clasificación, comparendo, distribución, redacción, seguimiento judicial, audiencia preparatoria, juicio o conciliación y cierre. El procedimiento monitorio puede utilizar audiencia única y el caso puede cerrarse anticipadamente en los hitos validados. |
| ALC-06 | Registrar fechas relevantes, responsables y observaciones operativas. | Se admiten fechas laborales, solicitud y realización de comparendo, presentación, audiencia única o preparatoria y juicio, además de referencias manuales de caducidad, sin calcular plazos jurídicos definitivos. |
| ALC-07 | Mantener historial de cambios críticos. | Cambios de ciclo de vida, asignación, etapa, estado y fecha conservan usuario, momento, motivo cuando corresponda y valores relevantes. |
| ALC-08 | Buscar y consultar información autorizada. | El usuario localiza clientes o casos por sus atributos operativos sin acceder a registros fuera de sus permisos. |

Las capacidades históricas `ALC-09` a `ALC-14` quedan fuera del MVP. La consulta
de carga, los reportes básicos y las exportaciones autorizadas se evalúan para la
versión 1 final; dashboard analítico, anexo imprimible, Calendar, OneDrive y
Gemini permanecen como evoluciones futuras. La clasificación completa y
vinculante se mantiene en
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

El MVP considera cuatro perfiles humanos internos. Los servicios externos se
documentan solo como contexto o evolución futura. Los permisos descritos
constituyen una base funcional
para elaborar los requisitos y casos de uso. La matriz de esta versión incorpora
las decisiones operativas validadas con el estudio.

#### 2.3.1 Actores humanos internos

##### ACT-01: Socio propietario o administrador

Usuario interno con responsabilidad de supervisión global y administración
operativa. Uno de los socios propietarios actúa como usuario clave principal
durante el levantamiento y la aceptación.

Responsabilidades previstas:

- consultar, registrar y actualizar clientes y casos según sus permisos;
- distribuir, asignar o reasignar al responsable principal;
- actualizar estados y etapas mediante los valores predefinidos;
- registrar fechas relevantes y consultar el historial básico;
- desactivar o reactivar clientes y archivar o reabrir casos con motivo;
- validar los flujos prioritarios durante la aceptación.

Este perfil no puede eliminar o alterar silenciosamente el historial de acciones
críticas. Las operaciones administrativas también deben quedar trazadas.

##### ACT-02: Abogado

Usuario interno responsable de consultar y gestionar la operación cotidiana de
clientes y casos dentro del estudio.

Responsabilidades previstas:

- consultar clientes y casos, responsables, estados y fechas relevantes;
- registrar y editar clientes y casos;
- actualizar información operativa dentro de los permisos definidos;
- registrar observaciones, cambios de estado y fechas autorizadas;
- consultar el historial básico de los casos permitidos.

El abogado no obtiene por este rol facultades para administrar usuarios ni para
ejecutar acciones elevadas reservadas al Socio.

##### ACT-03: Secretaria o asistente

Usuario interno que apoya el ingreso y mantenimiento de información operativa
bajo las reglas y permisos definidos por el estudio.

Responsabilidades previstas:

- registrar clientes y casos con los datos mínimos autorizados;
- actualizar datos de contacto y antecedentes operativos permitidos;
- registrar estados, etapas y fechas relevantes dentro de sus atribuciones;
- consultar clientes, casos e historial básico dentro del estudio.

Este perfil no aprueba el contenido jurídico de documentos ni adquiere acceso
general por el solo hecho de registrar información.

##### ACT-04: Procurador

Usuario interno que apoya las gestiones operativas y el seguimiento cotidiano de
clientes y casos.

Responsabilidades previstas:

- registrar y editar clientes y casos;
- consultar clientes, casos y fechas dentro del estudio;
- registrar actuaciones, observaciones y fechas autorizadas;
- participar en entrevistas, recolección de documentos, comparendos, seguimiento
  judicial u otras gestiones de apoyo;
- consultar el historial básico necesario para ejecutar sus tareas.

El procurador no administra usuarios o catálogos ni ejecuta acciones elevadas
reservadas al Socio.

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

| Capacidad | ACT-01 Administrador | ACT-02 Abogado | ACT-03 Asistente | ACT-04 Procurador |
|---|---|---|---|---|
| Consultar clientes y casos del estudio | Permitido | Permitido | Permitido | Permitido |
| Registrar y editar clientes y casos | Permitido | Permitido | Permitido | Permitido |
| Cambiar etapa o estado | Permitido | Permitido | Permitido | Permitido |
| Registrar fechas relevantes | Permitido | Permitido | Permitido | Permitido |
| Distribuir o reasignar responsable | Permitido; exige motivo | No permitido | No permitido | No permitido |
| Desactivar o reactivar clientes | Permitido; exige motivo | No permitido | No permitido | No permitido |
| Archivar o reabrir casos | Permitido; exige motivo | No permitido | No permitido | No permitido |
| Consultar historial de cambios | Permitido | Permitido | Permitido | Permitido |
| Eliminar o alterar historial crítico | No permitido | No permitido | No permitido | No permitido |

La matriz constituye la base funcional de autorización del MVP. Todas las
operaciones siguen limitadas al estudio de la sesión y se verifican en el
servidor. El acceso cotidiano de los cuatro perfiles no habilita administración
de usuarios, catálogos ni acciones elevadas.

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
| SUP-01 | Los perfiles iniciales socio, abogado, asistente y procurador cubren las funciones internas prioritarias. | Confirmado | Decisión operativa consolidada el 2026-11-11. | Registrar mediante control de cambios cualquier excepción posterior. |
| SUP-02 | Los usuarios de prueba dispondrán de navegador actualizado y conexión a internet durante la aceptación. | Supuesto de trabajo | Confirmación previa a la sesión de prueba. | Preparar alternativa local o reprogramar las pruebas dependientes de servicios remotos. |
| SUP-03 | Los socios podrán validar catálogos, campos mínimos, permisos y flujos prioritarios. | Cumplido para la línea base operativa | Síntesis anonimizada y trazabilidad del issue #78. | Aplicar control de cambios si aparece una excepción posterior. |
| SUP-04 | Podrían existir cuentas de prueba para evaluar Calendar y OneDrive en una iteración futura. | Diferido | Nuevo issue y evaluación de proveedor. | No afecta el MVP. |
| SUP-05 | Una prueba futura de Gemini utilizaría exclusivamente antecedentes ficticios o anonimizados. | Diferido | Nuevo issue y revisión de privacidad. | No afecta el MVP. |
| SUP-06 | El volumen y concurrencia requeridos serán compatibles con un estudio pequeño. | No medido | Levantamiento de usuarios simultáneos, volumen de casos y crecimiento esperado. | Ajustar requisitos de rendimiento, arquitectura y pruebas de carga. |

Los supuestos pendientes no pueden presentarse como hechos confirmados. Cada uno
debe resolverse o transformarse en una restricción, requisito o riesgo antes de
que afecte una decisión irreversible.

### 2.6 Dependencias externas

| ID | Dependencia | Uso previsto | Comportamiento ante indisponibilidad |
|---|---|---|---|
| DEP-01 | Participación de los socios propietarios | Las reglas operativas fueron validadas; la aceptación funcional final permanece pendiente. | Conservar evidencia anonimizada y no confundir validación de reglas con aceptación del producto. |
| DEP-02 | Google Calendar | Diferido; no se usa en el MVP. | No afecta el funcionamiento del MVP. |
| DEP-03 | OneDrive | Diferido; no se usa en el MVP. | No afecta el funcionamiento del MVP. |
| DEP-04 | Gemini API | Diferido; no se usa en el MVP. | No afecta el funcionamiento del MVP. |
| DEP-05 | Entorno web de preproducción y base de datos de pruebas | Permitir la revisión temporal con datos ficticios o anonimizados. | Aplicar respaldo y restauración; utilizar una alternativa local si la indisponibilidad impide la sesión. |

La OJV no es una dependencia de software de la versión 1. Su utilización manual
por los profesionales ocurre fuera de la plataforma y una indisponibilidad de la
OJV no cambia el funcionamiento interno especificado para este sistema.

### 2.7 Distribución futura de requisitos

Las funciones excluidas del MVP pueden conservarse como compromisos posteriores
de la versión 1 o antecedentes para evoluciones futuras, según
`MVP_SCOPE.md`, pero no se implementarán de manera implícita. Su evaluación
requerirá un issue, análisis de privacidad y seguridad, justificación de valor,
criterios de aceptación y una decisión formal de alcance.

## 3. Requisitos específicos

### 3.1 Requisitos de interfaces externas

#### 3.1.1 Interfaces de usuario

El MVP ofrecerá una interfaz web responsiva para los cuatro perfiles internos.
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

La línea base normativa contiene once requisitos funcionales. Diez aportan una
capacidad visible en las ocho historias Gherkin y el último establece una
restricción obligatoria de independencia respecto de la OJV.

| ID | Requisito del MVP | Criterio verificable | Historias |
|---|---|---|---|
| RF-001 | Permitir el inicio de sesión de cuentas internas activas, sin registro público. | Una cuenta válida accede; credenciales inválidas son rechazadas sin revelar si la cuenta existe. | HU-01 |
| RF-002 | Registrar, editar, desactivar y reactivar clientes mediante el formulario o listado existente. | Nombre completo, teléfono, origen o materia y RUT son obligatorios; correo es opcional y fecha de despido se exige cuando corresponda. Solo Socio cambia reversiblemente el estado activo con actor, momento y motivo, sin eliminación física. | HU-08 |
| RF-003 | Buscar clientes por nombre, origen, dato de contacto autorizado o estado de actividad y advertir posibles coincidencias. | Una coincidencia de nombre y origen genera advertencia sin bloquear ni fusionar, porque un cliente puede poseer varias gestiones; un cliente inactivo se identifica claramente y no puede seleccionarse para un caso nuevo. | HU-07, HU-08 |
| RF-004 | Registrar, editar, archivar y reactivar una ficha de caso vinculada con un cliente activo. | El caso conserva identificador y relaciones; en materia laboral exige empresa, fecha de ingreso y fecha de despido; tribunal, RIT, ROL, tienda, finiquito y cuantía pueden quedar vacíos. Solo Socio archiva o reactiva con motivo y sin eliminación física. | HU-03, HU-04 |
| RF-005 | Mantener estado y etapa mediante valores controlados. | El flujo reconoce las nueve etapas validadas, la alternativa de audiencia única y cierres anticipados en comparendo, audiencia o juicio; un cambio confirmado queda en el historial y cancelar no altera valores. | HU-03, HU-05 |
| RF-006 | Consultar la ficha consolidada de un caso autorizado, incluido su estado activo o archivado. | La ficha presenta cliente, responsable, participantes, estado, etapa, procedimiento, fechas e historial básico dentro del estudio. | HU-04 |
| RF-007 | Asignar un responsable principal y participantes con rol operativo. | Todo caso activo posee como responsable a un socio o abogado; el procurador puede participar en gestiones de apoyo. Solo Socio distribuye o reasigna y la acción registra ejecutor, momento y motivo. | HU-03 |
| RF-008 | Registrar manualmente una fecha relevante con tipo, responsable, fuente u observación opcional. | La ficha distingue fechas laborales, comparendos, audiencias, seguimiento y referencias de caducidad sin calcular ni declarar plazos judiciales definitivos. | HU-06 |
| RF-009 | Consultar el historial básico cronológico del caso y de sus acciones críticas. | Ingreso, asignación, presentación y cambios de ciclo de vida, estado, etapa, responsable, participantes y fechas muestran acción, usuario, momento, motivo y valores relevantes; un usuario común no los edita. | HU-04 a HU-06, HU-08 |
| RF-010 | Buscar y filtrar casos por identificador, cliente, responsable, estado, etapa, procedimiento, próxima fecha o condición de archivo. | Los filtros pueden combinarse y limpiarse; el orden operativo utiliza etapa y próxima fecha, sin catálogo manual de prioridad. | HU-02 |
| RF-011 | Mantener independencia técnica respecto de la OJV y las credenciales judiciales. | La revisión de arquitectura, código, configuración y tráfico confirma que el sistema no consulta, obtiene, envía ni sincroniza información con la OJV y no solicita ni almacena credenciales judiciales. | HU-06; EXC-01, EXC-02 |

#### 3.2.1 Restricción funcional obligatoria

`RF-011` no agrega una pantalla. Su inclusión en el catálogo funcional conserva
explícita y verificable la frontera entre el sistema interno y la plataforma
judicial externa.

### 3.3 Requisitos no funcionales

El MVP contiene diez requisitos no funcionales verificables. Esta selección cubre
los riesgos esenciales sin convertir controles de futuras integraciones,
capacidad o explotación productiva en obligaciones de la iteración académica.

| ID | Requisito del MVP | Medida o criterio | Verificación |
|---|---|---|---|
| RNF-001 | Toda lectura o modificación protegida debe autorizarse en el servidor; desactivar, reactivar, archivar o restaurar exige permiso elevado validado. | El 100 % de los escenarios negativos definidos para los cuatro perfiles es rechazado sin revelar ni modificar el recurso. | Pruebas de integración y navegador. |
| RNF-002 | Los secretos no deben almacenarse en código, Git, respuestas ni registros de aplicación. | Cero secretos detectados; las variables se documentan solo por nombre. | GitGuardian y revisión de configuración. |
| RNF-003 | Las acciones críticas deben generar historial no editable por usuarios comunes. | El 100 % de cambios de ciclo de vida, estado, etapa, responsable, participantes y fecha registra usuario, momento, acción, motivo cuando corresponda y valores relevantes. | Pruebas de integración y revisión del historial. |
| RNF-004 | Construcción, pruebas, demostración y aceptación deben usar datos ficticios o anonimizados. | Cero datos reales identificables en base, capturas, fixtures, logs y repositorio. | Revisión previa a cada demostración. |
| RNF-005 | El uso de datos reales debe permanecer bloqueado hasta una aprobación jurídica, técnica y organizacional. | Sin la lista y acta aprobadas, el entorno continúa en preproducción con datos ficticios o anonimizados. | Revisión documental de la puerta de datos reales. |
| RNF-006 | Un caso activo debe conservar cliente, estado, etapa y responsable. | Todos los intentos incompletos son rechazados sin dejar un caso activo parcial. | Pruebas unitarias y de integración. |
| RNF-007 | Los ocho flujos deben ser utilizables en escritorio, tableta y móvil. | Se completan sin pérdida de controles ni desplazamiento horizontal de página. | Revisión visual y pruebas en tres viewports. |
| RNF-008 | Los campos y errores deben ser comprensibles y estar asociados al control correspondiente. | El 100 % de controles críticos posee nombre accesible y sus errores indican corrección. | Pruebas de componentes y revisión manual. |
| RNF-009 | Toda rama integrable debe aprobar build, tipos, lint y pruebas aplicables. | Cero errores y 100 % de pruebas obligatorias del cambio aprobadas. | Pipeline de integración continua. |
| RNF-010 | Cada cambio debe ser trazable desde requisito e issue hasta PR y prueba. | Los PR poseen issue, etiqueta, milestone y evidencia; la matriz no contiene requisitos aprobados sin verificación. | Auditoría de GitHub y trazabilidad. |

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
| RN-002 | Usuario identificable | Toda acción autenticada debe asociarse con un usuario interno identificable y un rol vigente. | ACT-01, ACT-02, ACT-03, ACT-04 | Vigente | Las acciones automatizadas, si existen, deben identificarse como servicio y no atribuirse a una persona. |
| RN-003 | Autorización validada | Los cuatro perfiles pueden consultar, registrar y editar clientes y casos, cambiar estado o etapa y registrar fechas dentro del estudio. Solo Socio ejecuta acciones elevadas. | Validación operativa #78; matriz de responsabilidades | Vigente | Toda operación se valida en el servidor y permanece limitada al estudio de la sesión. |
| RN-004 | Administración restringida | Solo el perfil autorizado de socio propietario o administrador puede administrar usuarios, roles y catálogos. | ACT-01; matriz inicial de responsabilidades | Propuesta | Debe validarse si existirá más de un administrador y cómo se recuperará el acceso. |

#### 3.4.2 Clientes y datos de contacto

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-005 | Identificador interno del cliente | Cada cliente debe poseer un identificador interno único dentro del estudio. | ALC-02; necesidad de trazabilidad cliente–caso | Vigente | El identificador interno no sustituye documentos oficiales ni debe exponer datos sensibles innecesarios. |
| RN-006 | Relación cliente–caso | Cada caso debe vincularse con un cliente y un cliente puede relacionarse con uno o más casos. | ALC-02, ALC-03 | Vigente | Los casos con múltiples personas relacionadas requieren una regla adicional antes de implementarse. |
| RN-007 | Datos mínimos del cliente | Un cliente requiere nombre completo, teléfono, origen o materia y RUT; el correo es opcional y la fecha de despido se exige cuando corresponda a la materia. | Validación operativa #78; hallazgo sobre campos incompletos | Vigente | El RUT responde a la identificación necesaria para la tramitación judicial y debe protegerse como dato confidencial. |
| RN-008 | Actualización y coincidencia trazables | Los cambios de contacto conservan fecha y usuario; una coincidencia por nombre y origen genera advertencia sin fusionar ni bloquear automáticamente. | Validación operativa #78; ALC-02, ALC-07 | Vigente | Un cliente puede mantener más de una gestión de materias distintas. |
| RN-020 | Ciclo de vida del cliente | La baja operativa se representa mediante desactivación reversible; no existe eliminación física de clientes en el MVP. | ALC-02; RF-002; validación #78 | Vigente | Solo Socio puede desactivar o reactivar y debe registrar actor, momento y motivo. |
| RN-021 | Uso de clientes inactivos | Un cliente inactivo permanece visible en consultas históricas, pero no puede seleccionarse para registrar un caso nuevo. | RF-002, RF-003, RF-004 | Vigente | La continuidad de casos ya existentes no rompe su relación histórica con el cliente. |

#### 3.4.3 Casos, estados y asignaciones

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-009 | Identificador interno del caso | Cada caso debe poseer un identificador interno único dentro del estudio. | ALC-03 | Vigente | El identificador interno es independiente de un eventual RIT o ROL. |
| RN-010 | Datos obligatorios del caso activo | Todo caso activo debe tener cliente, estado, etapa y responsable vigente; una causa laboral exige empresa, fecha de ingreso y fecha de despido. | ALC-03; validación operativa #78 | Vigente | Tienda o sucursal, finiquito y cuantía son accesorios; otros campos dependen de la materia. |
| RN-011 | Flujo y estados controlados | Las etapas son ingreso, clasificación, comparendo, distribución, redacción, seguimiento judicial, audiencia preparatoria, juicio o conciliación y cierre. Los estados son ingresado, pendiente de comparendo, pendiente de distribución, en redacción, presentado, judicializado y cerrado. | ALC-05; validación operativa #78 | Vigente | El procedimiento monitorio usa audiencia única; no se utiliza un catálogo manual de prioridad en el MVP. |
| RN-012 | Identificadores judiciales no inventados | El RIT, ROL, tribunal u otro antecedente judicial se registra solo cuando está disponible; su ausencia inicial no autoriza completar valores ficticios. | Flujo observado; separación respecto de la OJV | Vigente | La obligatoriedad dependerá de la etapa y debe precisarse en los requisitos funcionales. |
| RN-013 | Responsable y participantes | Cada caso activo tiene como responsable principal vigente a un socio o abogado; el procurador puede participar en entrevistas, recolección de documentos y otras gestiones de apoyo. | ALC-04; validación operativa #78 | Vigente | Solo Socio distribuye o reasigna y debe registrar motivo. |
| RN-014 | Ciclo de vida del caso | Cierre y archivo representan la misma condición reversible; se produce por acuerdo o sentencia y pago, y puede ocurrir anticipadamente en comparendo, audiencia o juicio. | ALC-03; RF-004, RF-006; validación #78 | Vigente | Solo Socio archiva o reabre con actor, momento y motivo; no existe eliminación física en el MVP. |

#### 3.4.4 Fechas, seguimiento e historial

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-015 | Tipo de fecha | El sistema admite fecha de ingreso laboral, despido, solicitud y realización de comparendo, presentación de demanda, audiencia única o preparatoria y juicio. | ALC-06; validación operativa #78 | Vigente | Una referencia de caducidad se ingresa manualmente y no constituye cómputo jurídico. |
| RN-016 | Responsabilidad y visibilidad de la fecha | Toda fecha de seguimiento se asocia con un responsable y puede utilizarse para ordenar el trabajo por proximidad. | ALC-06; validación operativa #78 | Vigente | El MVP no envía alertas automáticas ni certifica el vencimiento de un plazo jurídico. |
| RN-017 | Sin determinación jurídica automática | El sistema puede registrar y mostrar fechas, pero no determina de forma definitiva plazos judiciales ni reemplaza la revisión profesional. | EXC-03 | Vigente | No admite excepciones dentro de la versión 1. |
| RN-018 | Registro de cambios críticos | Ingreso, asignación y presentación de demanda, además de cambios de responsable, etapa, estado, fechas, ciclo de vida y participantes, conservan usuario, fecha, acción, motivo cuando corresponda y valores relevantes. | ALC-07; validación operativa #78 | Vigente | La evidencia se protege según su sensibilidad y no se expone íntegramente en listados. |
| RN-019 | Protección del historial | Los usuarios comunes no pueden eliminar ni alterar silenciosamente las entradas del historial. | ACT-01, ACT-02, ACT-03, ACT-04; restricciones generales | Vigente | Las correcciones administrativas deben generar una nueva evidencia trazable. |

#### 3.4.5 Restricción respecto de la OJV

| ID | Nombre | Regla | Fuente | Estado | Condición o excepción |
|---|---|---|---|---|---|
| RN-030 | Independencia absoluta de la OJV | La plataforma no consulta, obtiene, envía ni sincroniza información con la OJV y no almacena credenciales judiciales. | EXC-01, EXC-02 | Vigente | No admite excepciones dentro de la versión 1. |

#### 3.4.6 Estado de las decisiones operativas

El issue #78 consolidó de forma anonimizada los campos mínimos, permisos,
responsables, etapas, estados, fechas, acciones críticas, cierre y conservación
operativa. Estas decisiones están incorporadas en las reglas anteriores.

Permanecen fuera de esta validación operativa la política jurídica completa de
conservación y eliminación, la habilitación para utilizar datos reales y las
funciones diferidas de reportes y exportaciones. Ninguna de ellas puede
implementarse implícitamente desde esta sección.

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
| ED-04 | Cliente | Mantener la ficha, contacto autorizado y ciclo de vida reversible. | Identificador interno, nombre completo, teléfono, origen o materia, RUT, correo opcional, fecha de despido cuando corresponda, estado activo y evidencia del cambio de estado. | Pertenece a un estudio; se relaciona con uno o más casos. | Confidencial. |
| ED-05 | Caso | Mantener la ficha operativa única y su archivo reversible. | Identificador interno, cliente, materia, empresa y fechas laborales cuando correspondan, tribunal y RIT/ROL disponibles, estado, etapa, procedimiento, observaciones, condición de archivo y fechas de control. | Pertenece a un estudio y cliente; posee asignaciones, participantes, fechas e historial. | Confidencial. |
| ED-06 | Asignación o participación | Conservar responsabilidad y participación actual e histórica. | Caso, usuario, rol operativo, indicador de responsable principal, inicio, término, ejecutor y motivo cuando se defina. | Pertenece a un caso y referencia usuarios. | Confidencial. |
| ED-07 | Catálogo | Normalizar materias, estados, etapas, procedimientos y tipos de fecha. | Tipo de catálogo, código, nombre, descripción, orden y vigencia. | Sus valores son utilizados por casos y fechas. | Interna. |
| ED-08 | Fecha o hito | Registrar seguimiento sin determinar automáticamente plazos jurídicos. | Caso, tipo, fecha, responsable, fuente, observación y verificación manual cuando corresponda. | Pertenece a un caso. | Confidencial. |
| ED-09 | Evento de historial | Registrar acciones críticas y correcciones. | Estudio, caso o entidad afectada, actor, fecha, acción y valores relevantes protegidos. | Referencia usuario y registro afectado. | Confidencial. |

La validación operativa confirmó el uso del RUT para identificar al cliente en la
tramitación judicial manual. Esta finalidad no autoriza publicación, uso con
datos reales durante el proyecto académico ni acceso fuera de los permisos
definidos. Las materias y ampliaciones futuras de catálogo requieren control de
cambios.

#### 3.5.3 Requisitos conceptuales de datos

| ID | Requisito | Criterio verificable | Trazabilidad |
|---|---|---|---|
| RD-001 | Toda entidad operativa debe poseer identificador interno estable y pertenencia al estudio cuando corresponda. | No se persisten clientes, casos, catálogos o eventos sin identificador y estudio válidos. | RN-001, RN-005, RN-009 |
| RD-002 | Las relaciones cliente–caso, caso–asignación o participación y caso–fecha deben preservar integridad referencial incluso después de desactivar o archivar. | No existen registros dependientes asociados con una referencia inexistente y las operaciones reversibles conservan sus relaciones. | RN-006, RN-013, RN-014, RN-020 |
| RD-003 | Un caso activo debe conservar un cliente existente y activo al crearse, además de estado, etapa y responsable principal vigentes. | La aplicación y la persistencia rechazan casos activos incompletos o nuevos casos vinculados con clientes inactivos, sin romper relaciones históricas. | RN-010, RN-021, RNF-006 |
| RD-004 | RIT, ROL, tribunal y otros antecedentes judiciales deben admitir ausencia hasta que estén disponibles. | El caso se registra sin valores ficticios y luego admite una actualización manual. | RF-004, RF-011 |
| RD-005 | Las fechas deben conservar tipo, valor, responsable y fuente u observación cuando corresponda. | Las fechas laborales, de comparendo, audiencia, seguimiento o referencia de caducidad se muestran sin transformarse en cálculo jurídico automático. | RF-008 |
| RD-006 | El historial debe ser aditivo para usuarios comunes e incluir las acciones críticas de ciclo de vida. | Los eventos existentes no se editan ni eliminan; desactivación, reactivación, archivo y restauración agregan una nueva entrada. | RF-002, RF-004, RF-009, RNF-003 |
| RD-007 | Los datos de prueba deben ser ficticios o estar anonimizados antes de ingresar al entorno. | La revisión previa no detecta identificadores, contactos, causas o antecedentes reales. | RNF-004, RNF-005 |

#### 3.5.4 Inventario de tratamiento para la puerta de datos reales

Antes de utilizar datos reales se debe completar y aprobar un inventario por
grupo de datos. Los socios solicitaron disponibilidad operativa durante seis
meses después del cierre, pero este periodo no autoriza eliminación automática:
la política definitiva permanece sujeta a revisión jurídica, técnica y
organizacional.

| Grupo | Finalidad propuesta | Acceso mínimo | Conservación | Estado previo a datos reales |
|---|---|---|---|---|
| Identidad y contacto de clientes | Vincular al cliente con sus casos y permitir contacto operativo autorizado. | Cuatro perfiles para operación cotidiana; acciones de ciclo de vida solo Socio. | Disponible al menos durante seis meses desde el cierre relacionado; destino posterior pendiente de revisión. | Finalidad y campos mínimos validados; habilitación, derechos y política final pendientes. |
| Información operativa y jurídica del caso | Coordinar registro, asignación y seguimiento interno. | Cuatro perfiles dentro del estudio; archivo y reapertura solo Socio. | Disponible durante seis meses después del cierre; sin eliminación automática. | Pendiente de revisión jurídica y minimización previa al uso real. |
| Historial y asignaciones | Acreditar responsabilidad y trazabilidad de cambios críticos. | Lectura interna; modificación directa prohibida a usuarios comunes. | Debe acompañar al caso durante su disponibilidad y preservar evidencia exigible; plazo final pendiente. | Catálogo operativo validado; conservación definitiva pendiente. |
| Fechas relevantes | Apoyar seguimiento interno definido por profesionales. | Cuatro perfiles dentro del estudio. | Disponible con el caso durante seis meses después del cierre; destino posterior pendiente. | Tipos operativos validados; revisión de riesgo pendiente. |

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
| AD-04 | Conservación posterior al periodo operativo | Definir bloqueo, respaldo, anonimización o eliminación después de los seis meses solicitados. | Revisión jurídica, técnica y organizacional. |

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
| 11 RF | Problema, alcance, historias Gherkin y validación operativa | #61, #78 | HU-01 a HU-08 | Casos de uso y datos reducidos | Reglas validadas; ejecución pendiente | Especificado |
| 10 RNF | Riesgos esenciales, plan de calidad y permisos validados | #61, #78 | Transversal | Proceso y modelo reducido | Métodos definidos; ejecución pendiente | Especificado |
| 7 RD | Privacidad, integridad y modelo reducido | #61, #78 | HU-03, HU-04, HU-06, HU-08 | Modelo de datos del MVP | Reglas operativas validadas; ejecución pendiente | Especificado |
| Revisión IEEE 830-1998 | SRS 1.4 | #61, #66 | Todo el MVP | Modelos seleccionados | Lista de revisión documental | Revisado internamente |

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
