# v0.5.0 — Pre-release académico

Este corte consolida el MVP funcional y una extensión mínima de reportes para
revisión académica y aceptación con datos ficticios.

## Incluye

- acceso interno con sesión identificable y cuatro perfiles;
- registro, edición, búsqueda y ciclo reversible de clientes;
- registro, edición, distribución, consulta y archivo reversible de casos;
- campos condicionales para materias laborales;
- nueve etapas controladas e historial cronológico;
- fechas relevantes y referencias manuales de caducidad;
- carga por responsable y casos por etapa y estado;
- exportación CSV minimizada, exclusiva de Socio y auditada;
- aislamiento por estudio, pruebas negativas y CI.

## Verificación

- 37 pruebas unitarias o estructurales;
- 7 pruebas PostgreSQL;
- 16 pruebas Playwright en escritorio, tableta y móvil;
- lint, tipos, build, Quality y GitGuardian.

## Restricciones

- solo datos ficticios o anonimizados;
- no apto para uso productivo;
- sin integración ni credenciales OJV/PJUD;
- sin cálculo automático definitivo de plazos;
- aceptación de los socios y habilitación de datos reales pendientes.

Consulte `docs/ACCEPTANCE_v0.5.0.md` para la trazabilidad y las puertas del corte.
