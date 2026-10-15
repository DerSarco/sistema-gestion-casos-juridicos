# Especificación de requisitos de software (SRS)

**Proyecto:** Sistema de gestión de casos jurídicos

**Versión del documento:** 0.2

**Estado:** En elaboración

**Estructura de referencia:** IEEE 830

## Control de versiones

| Versión | Fecha | Descripción | Responsable |
|---|---|---|---|
| 0.1 | 2026-10-14 | Creación de la estructura inicial | Equipo del proyecto |
| 0.2 | 2026-10-14 | Definición inicial de actores, servicios externos y responsabilidades | Equipo del proyecto |

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

### 2.2 Funciones del producto

- Registrar clientes y casos.
- Asignar responsables y conservar las reasignaciones.
- Administrar estados y etapas estandarizadas.
- Registrar fechas relevantes y responsables.
- Mantener historial y trazabilidad de cambios críticos.
- Consultar carga de trabajo y reportes autorizados.

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
del contexto operativo, pero no como integración de software de la versión 1. El
sistema no ingresará demandas, no efectuará scraping permanente y no almacenará
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

### 2.4 Restricciones

- El sistema no almacenará credenciales judiciales.
- El sistema no realizará ingreso automático de demandas a la OJV.
- Las pruebas utilizarán datos ficticios o anonimizados.
- El tratamiento de datos reales requerirá una aprobación previa jurídica,
  técnica y organizacional.

### 2.5 Supuestos y dependencias

Los supuestos y dependencias se registrarán como elementos verificables, con un
responsable y una acción asociada cuando puedan afectar el alcance.

### 2.6 Distribución futura de requisitos

Las funciones excluidas se conservarán en el backlog como posibilidades para
versiones futuras y no se implementarán de manera implícita.

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
