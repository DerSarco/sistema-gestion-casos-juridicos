# ADR-003: Repositorio temporal para el primer incremento

- **Estado:** aceptada y temporal
- **Fecha:** 2026-10-16
- **Decisores:** equipo del proyecto

## Contexto

El segundo milestone debe entregar un flujo demostrable sin depender de
credenciales, una base administrada o datos reales. A la vez, el producto final
debe persistir en PostgreSQL.

## Decisión

Los casos de uso dependerán de interfaces de repositorio. El incremento v0.2
utilizará una implementación en memoria con fixtures ficticios y reinicio al
recargar el proceso. En paralelo se publicarán el esquema y la migración de
PostgreSQL.

## Consecuencias

La demostración es repetible y no expone información. No acredita persistencia,
concurrencia, respaldo ni recuperación. El README y la interfaz deben indicarlo;
el adaptador temporal no puede usarse en producción.
