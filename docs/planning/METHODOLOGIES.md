# Metodologías del proyecto

## Metodología de gestión

Se adopta una gestión híbrida y ligera:

- componente predictivo: objetivos, alcance, hitos, roadmap, Gantt, dependencias
  y puertas de salida;
- componente adaptativo: Product Backlog ordenado y tablero GitHub Issues para
  seleccionar, ejecutar y verificar unidades pequeñas de trabajo;
- revisión semanal de capacidad, riesgos, bloqueos y cambios de alcance;
- demostración al cierre de cada incremento y aceptación al final.

No se declara Scrum completo: el proyecto es individual y no posee un Scrum Team
con todos sus roles. Se reutilizan backlog, incrementos y revisión como prácticas
compatibles, sin atribuir ceremonias o roles inexistentes.

## Responsabilidades

| Participante | Responsabilidad en el proyecto |
|---|---|
| Estudiante | Mantener backlog y plan; analizar, diseñar, desarrollar, probar y gestionar la configuración. |
| Socios propietarios | Aportar evidencia primaria, resolver reglas operativas y revisar prototipo y aceptación. |
| Docente | Evaluar los entregables académicos; no sustituye la aceptación operativa de los socios. |

La acumulación de funciones en el estudiante se reconoce como restricción de
capacidad y justifica límites semanales, CI y revisiones explícitas.

## Metodología de desarrollo

Se utiliza desarrollo iterativo e incremental por cortes verticales:

1. seleccionar una historia preparada;
2. confirmar Gherkin, pantalla, RF/RNF y datos ficticios;
3. implementar dominio, persistencia y UI mínima del flujo;
4. ejecutar pruebas válidas, inválidas y de autorización;
5. integrar mediante GitFlow y CI;
6. actualizar trazabilidad y demostrar el incremento.

El orden reduce riesgo: primero clientes y casos reutilizables; después estados,
fechas e historial; al final acceso y autorización. La interfaz aprobada se
reconstruye en Next.js, pero una maqueta no se contabiliza como software liberado.

## Monitoreo

| Dimensión | Indicador | Umbral o meta | Evidencia |
|---|---|---|---|
| Alcance | Historias incorporadas sin control de cambio | 0 | Issues y `MVP_SCOPE.md` |
| Avance | Elementos que cumplen Definition of Done | Seguimiento semanal, sin convertir parciales en terminados | Backlog y PR |
| Capacidad | Horas reales respecto de 12 h/semana | Replanificar si la desviación supera 20 % | Registro semanal |
| Calidad | Build, tipos, lint y pruebas | 100 % aprobados | CI |
| Defectos | Defectos críticos abiertos al aceptar | 0 | Issues y reporte de pruebas |
| Trazabilidad | Historias con RF, issue, PR y prueba | 100 % al cierre | `TRACEABILITY.md` |
| Privacidad | Datos reales detectados | 0 | Revisión de fixtures, capturas y logs |
