# Cobertura de la pauta AINC422 — Sumativa 1

| Punto exigido | Evidencia preparada | Estado honesto | Uso previsto en la presentación |
|---|---|---|---|
| Integrante y título | Identificación académica y README | Listo | Portada |
| Contextualización | Antecedentes AINC410 y proceso/contexto MVP | Listo | Síntesis del Estudio Jurídico X |
| Problema | Formulación estable y evidencia primaria anonimizada | Listo | Gestión manual y fragmentada |
| Objetivos | `OBJECTIVES.md` | Listo | Objetivo general y cuatro específicos |
| Solución | `MVP_SCOPE.md` y SRS | Listo en diseño; construcción parcial | Separar propuesta de implementación real |
| Proceso abordado | `mvp-process-context.svg` | Listo | Mostrar flujo interno y OJV externa |
| Requisitos UML o HU | `mvp-use-cases.svg` y `USER_STORIES.md` | Listo | 8 HU, 10 RF, 10 RNF |
| Alcance del MVP | `MVP_SCOPE.md` y `STORY_MAP.md` | Listo | Incluido, diferido y fuera de alcance |
| Herramientas de desarrollo | Next.js, Prisma, PostgreSQL previsto, Vitest, GitHub | Parcialmente implementado | Distinguir selección de uso efectivo |
| Metodología de gestión | `METHODOLOGIES.md` | Lista como planificación | Gestión híbrida ligera |
| Metodología de desarrollo | `METHODOLOGIES.md` | Lista como planificación | Iterativa e incremental |
| Gestión de configuración | `CONFIGURATION_MANAGEMENT.md` | Aplicada en Issues, ramas, PR y CI | Mostrar flujo y evidencia GitHub |
| Backlog | `PRODUCT_BACKLOG.md` | Listo | Prioridad, puntos, estado y dependencias |
| Visual Story Mapping | `STORY_MAP.md` | Listo | Corte entre MVP y evolución |
| Product Roadmap | `ROADMAP.md` | Listo | Hitos v0.3 a v1.0 |
| Gantt | `GANTT.md` | Rebaselinado como estimación | W1 5–11 oct.; W10 7–13 dic.; 120 h estimadas y control semanal |
| 80 % de mockups | `docs/mockups/stitch/` | 8 de 8 capturas; navegación configurada en Stitch | Cobertura visual 100 %; responsive, accesibilidad y validación formal pendientes |
| Modelo de datos | `mvp-data-model.svg` | Listo como modelo reducido | No confundir con persistencia conectada |
| Construcción del MVP | Código v0.2.0 y 11 pruebas | Parcial | Demostrar solo clientes/casos temporales y CI |
| Conclusiones | Alcance, valor y próximos pasos | Pendiente de redactar en PPT | No afirmar beneficios aún no medidos |

## Evidencia técnica que puede declararse

- rutas Next.js `/`, `/clientes` y `/casos`;
- repositorios temporales en memoria para clientes y casos;
- modelo Prisma y migración inicial sin adaptador operativo conectado;
- once pruebas automatizadas;
- CI con lint, tipos, pruebas, build y GitGuardian;
- GitFlow, Issues, milestones, PR y tags `v0.1.0` y `v0.2.0`.

No están liberados autenticación, autorización, persistencia operativa, edición
completa, fechas, historial completo ni la interfaz reconstruida desde Stitch.
