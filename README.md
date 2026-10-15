# Sistema de gestión de casos jurídicos

Proyecto de título orientado al diseño y desarrollo de una plataforma web para
centralizar el registro, la asignación y el seguimiento inicial de casos en un
estudio jurídico pequeño.

## Problema abordado

El proceso actual combina planillas, correo, calendarios y consultas a una
plataforma judicial externa. Esta fragmentación dificulta mantener información
consistente y trazable, aumenta el trabajo administrativo y genera riesgo de
errores u omisiones.

## Objetivo del repositorio

Este repositorio concentra:

- el código fuente de la versión 1 del sistema;
- la especificación de requisitos de software (SRS);
- los diagramas de casos de uso, clases, secuencia y despliegue;
- las pruebas y evidencias técnicas;
- el seguimiento del trabajo mediante GitHub Issues.

## Documentación

- [Especificación de requisitos de software](docs/SRS.md)
- [Reglas de contribución](CONTRIBUTING.md)
- [Criterios para los diagramas](docs/diagrams/README.md)

## Flujo de desarrollo

El proyecto utiliza GitFlow. Las funcionalidades se desarrollan en ramas
`feature/*` creadas desde `develop` y se integran mediante pull requests. La rama
`main` conserva exclusivamente versiones estables; las entregas se preparan en
ramas `release/*` y las correcciones urgentes en `hotfix/*`.

## Alcance y privacidad

El repositorio es público y utiliza exclusivamente datos ficticios o
anonimizados. No se deben incorporar nombres de clientes, RUT, RIT reales,
antecedentes jurídicos identificables, credenciales, secretos ni documentos
originales del caso de estudio.

La versión 1 centraliza la gestión interna. No se conecta con la Oficina Judicial
Virtual para consultar, obtener, enviar o sincronizar información; tampoco
almacena credenciales judiciales ni calcula plazos jurídicos de forma definitiva.

## Estado

Proyecto en etapa de especificación y preparación del desarrollo.
