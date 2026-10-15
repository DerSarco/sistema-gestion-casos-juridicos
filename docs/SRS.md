# Especificación de requisitos de software (SRS)

**Proyecto:** Sistema de gestión de casos jurídicos

**Versión del documento:** 0.3

**Estado:** En elaboración

**Estructura de referencia:** IEEE 830

## Control de versiones

| Versión | Fecha | Descripción | Responsable |
|---|---|---|---|
| 0.1 | 2026-10-14 | Creación de la estructura inicial | Equipo del proyecto |
| 0.2 | 2026-10-14 | Definición inicial de actores, servicios externos y responsabilidades | Equipo del proyecto |
| 0.3 | 2026-10-14 | Consolidación del alcance, exclusiones, supuestos y dependencias | Equipo del proyecto |

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

Las reglas del negocio tendrán identificadores `RN-###` y se vincularán con los
requisitos funcionales que las implementen.

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
