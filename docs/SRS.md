# Especificación de requisitos de software (SRS)

**Proyecto:** Sistema de gestión de casos jurídicos

**Versión del documento:** 0.1

**Estado:** En elaboración

**Estructura de referencia:** IEEE 830

## Control de versiones

| Versión | Fecha | Descripción | Responsable |
|---|---|---|---|
| 0.1 | 2026-10-14 | Creación de la estructura inicial | Equipo del proyecto |

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

### 2.3 Características de los usuarios

Los perfiles, responsabilidades, conocimientos esperados y necesidades de
accesibilidad se definirán durante el análisis de requisitos.

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
