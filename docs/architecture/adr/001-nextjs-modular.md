# ADR-001: Aplicación modular con Next.js

- **Estado:** aceptada
- **Fecha:** 2026-10-16
- **Decisores:** equipo del proyecto

## Contexto

La versión 1 requiere una interfaz web responsiva, operaciones en servidor,
integraciones acotadas y una separación que permita probar las reglas sin
depender del navegador o de una base real.

## Decisión

Se utilizarán Next.js App Router y TypeScript. El código se organizará por
módulos de negocio con capas de dominio, aplicación, infraestructura e interfaz.
Los componentes de servidor o acciones invocarán casos de uso; no accederán al
ORM directamente.

## Alternativas consideradas

- Aplicación Next.js organizada solo por tipo de archivo: menor costo inicial,
  pero mayor acoplamiento al crecer.
- Frontend y API separados: separación clara, pero despliegue y coordinación
  innecesarios para el tamaño y plazo del proyecto.

## Consecuencias

El primer incremento requiere más contratos explícitos, pero permite probar el
dominio en aislamiento y reemplazar adaptadores. Next.js sigue siendo un detalle
de interfaz y despliegue, no el lugar donde se definen reglas jurídicas.
