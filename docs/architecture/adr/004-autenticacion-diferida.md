# ADR-004: Autenticación diferida sin seguridad simulada

- **Estado:** completada en el milestone v0.5
- **Fecha:** 2026-10-16
- **Decisores:** equipo del proyecto

## Contexto

RF-001 es un requisito de alta prioridad, pero se decidió construir
primero los flujos funcionales de clientes y casos. Una pantalla ficticia de
inicio de sesión produciría una falsa expectativa de protección.

## Decisión

El milestone v0.2 no incluirá sign in, sign up ni selección de rol simulada. La
aplicación se identificará como entorno no productivo con datos ficticios. El
acceso interno y la autorización completa en servidor se implementarán en el
milestone v0.5 mediante el issue #85. Los incrementos anteriores conservarán el
límite de autorización en servidor con actores internos ficticios. No existirá
registro público de usuarios.

## Consecuencias

El incremento permite validar interacción y dominio, pero no puede exponerse a
usuarios no controlados ni procesar datos reales. Las pruebas funcionales no se
interpretarán como pruebas de autorización.

## Resultado del issue #85

El milestone v0.5 sustituyó los actores ficticios implícitos por cuentas internas
activas para Socio, Abogado, Asistente y Procurador. La aplicación usa una sesión
firmada, `HttpOnly`, con duración limitada y valida en cada solicitud que usuario,
estudio y perfil continúen activos. No existe registro público ni selector de rol.

Las credenciales del entorno de demostración y la clave de firma se inyectan como
variables de entorno; no se almacenan en el repositorio. Las operaciones elevadas
de distribución y ciclo de vida se verifican en servidor, además de ocultarse en
la interfaz cuando no corresponden. Esta implementación sigue siendo de
preproducción: no autoriza el uso de datos reales ni reemplaza la puerta jurídica,
técnica y organizacional de la versión 1.
