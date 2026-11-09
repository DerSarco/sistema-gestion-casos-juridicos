# Línea base verificable del Hito 2

**Fecha de auditoría:** 2026-11-08

**Issue:** #68

## Decisión de alcance

La línea base normativa para continuar el desarrollo es la que está integrada en
`origin/develop` mediante los PR #62 y #67:

- once requisitos funcionales, `RF-001` a `RF-011`;
- diez requisitos no funcionales, `RNF-001` a `RNF-010`;
- siete requisitos de datos, `RD-001` a `RD-007`;
- ocho historias de usuario, `HU-01` a `HU-08`.

El commit `f076611` redujo el SRS al alcance real del MVP y el commit `67237af`
normalizó sus identificadores. No existe en `origin/develop` un commit posterior
que reactive el catálogo histórico de treinta RF y veintiocho RNF.

## Diferencias encontradas

| Artefacto | Contenido observado | Interpretación y acción |
|---|---|---|
| SRS y trazabilidad en `origin/develop` | Catálogo compacto de 11 RF, 10 RNF y 7 RD. | Fuente normativa de construcción y aceptación. |
| Informe corregido del Hito 1 | Síntesis académica `R1` a `R14`, con requisitos funcionales, de calidad y cumplimiento. | Resume la propuesta completa. No reemplaza por sí sola los identificadores ni reactiva funciones excluidas del SRS. |
| PPT del Hito 2, lámina 11 | Catálogo histórico `RF-001…RF-030`, `RNF-001…RNF-028` y total de 58 requisitos. | Debe sustituirse por 11 RF, 10 RNF y 7 RD, indicando que el catálogo compacto es el vigente. |

Calendar, OneDrive, Gemini, dashboard, exportación y automatizaciones no presentes
en el catálogo compacto quedan fuera del denominador del Hito 2. Solo podrán
reingresar mediante control de cambios y una actualización aprobada del SRS.

## Denominador funcional del 60 por ciento

El porcentaje mide paquetes funcionales aceptados. Los pesos reflejan valor para
el flujo central, riesgo y dependencia funcional; no representan horas, pantallas,
commits ni cantidad de líneas de código.

| Paquete | Peso | Requisitos e historias | Resultado aceptable |
|---|---:|---|---|
| P1. Clientes persistentes | 15 % | RF-002, RF-003; HU-07, HU-08 | Registrar, editar y buscar clientes dentro del estudio autorizado. |
| P2. Casos y responsable | 25 % | RF-004, RF-005, RF-007; HU-03 | Registrar y editar un caso activo con cliente, estado, etapa y responsable. |
| P3. Consulta y búsqueda de casos | 15 % | RF-006, RF-010; HU-02, HU-04 | Consultar ficha y aplicar filtros sin exponer casos no autorizados. |
| P4. Estado e historial | 20 % | RF-005, RF-009; HU-05 | Confirmar cambios de estado o etapa y conservar usuario, fecha y acción. |
| P5. Fechas relevantes | 10 % | RF-008; HU-06 | Registrar una fecha manual sin calcular un plazo judicial definitivo. |
| P6. Acceso y autorización | 15 % | RF-001; HU-01 | Permitir acceso interno y aplicar autorización en servidor sin registro público. |
| **Total** | **100 %** | | |

`RF-011`, los RNF y los RD son puertas transversales. No agregan porcentaje por
separado: un paquete no cuenta si infringe la independencia de la OJV, usa datos
reales, omite integridad, falla sus pruebas o carece de trazabilidad.

## Definition of Done para el porcentaje

Un paquete aporta todo su peso únicamente cuando:

1. su código está integrado en `develop` mediante PR vinculado con issue;
2. todos sus escenarios Gherkin comprometidos están automatizados o poseen una
   evidencia de aceptación ejecutada;
3. lint, tipos, pruebas y build finalizan correctamente en CI;
4. la matriz requisito–historia–prueba–PR está actualizada;
5. no existen defectos críticos abiertos ni datos jurídicos identificables;
6. la evidencia demuestra el resultado completo del paquete.

El trabajo parcial aporta cero al porcentaje, aunque puede registrarse como
avance técnico. El porcentaje se calcula mediante:

`avance = suma de pesos de paquetes terminados según DoD`

## Estado al congelar la línea base

El estado inicial verificable es **0 %**. Existen esquema, migración, repositorios
temporales, pantallas y pruebas unitarias parciales, pero ningún paquete satisface
todavía la Definition of Done completa con persistencia, criterios de aceptación,
CI y evidencia enlazada.

El umbral del Hito 2 se alcanza al acumular al menos 60 % mediante paquetes
completos. No se redondean paquetes parciales ni se sustituye evidencia funcional
por horas trabajadas.
