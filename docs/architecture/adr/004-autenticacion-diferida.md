# ADR-004: Autenticación diferida sin seguridad simulada

- **Estado:** aceptada para la secuencia de desarrollo
- **Fecha:** 2026-10-16
- **Decisores:** equipo del proyecto

## Contexto

RF-001 es un requisito de alta prioridad, pero se decidió construir
primero los flujos funcionales de clientes y casos. Una pantalla ficticia de
inicio de sesión produciría una falsa expectativa de protección.

## Decisión

El milestone v0.2 no incluirá sign in, sign up ni selección de rol simulada. La
aplicación se identificará como entorno no productivo con datos ficticios. El
acceso interno y la autorización en servidor se implementarán en el milestone
v0.3 mediante el issue #29. No existirá registro público de usuarios.

## Consecuencias

El incremento permite validar interacción y dominio, pero no puede exponerse a
usuarios no controlados ni procesar datos reales. Las pruebas funcionales no se
interpretarán como pruebas de autorización.
