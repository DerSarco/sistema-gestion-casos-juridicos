# Seguimiento semanal del plan

Este registro operacionaliza el control del Gantt. No reemplaza GitHub Issues:
cada fila debe enlazar el issue de cierre semanal y su evidencia antes de cambiar
el estado a `Cerrada`.

## Estado de semanas

| Semana | Fechas | Horas planificadas | Horas reales | Desviación | Estado | Evidencia de cierre |
|---|---|---:|---:|---:|---|---|
| W1 | 5–11 oct. | 12 | No consolidadas | No calculable | Periodo transcurrido | Pendiente de respaldo horario; primera clase efectiva 10 oct. |
| W2 | 12–18 oct. | 12 | No consolidadas | No calculable | Periodo transcurrido | Pendiente de respaldo horario |
| W3 | 19–25 oct. | 12 | No consolidadas | No calculable | Periodo transcurrido | Artefactos integrados; pendiente de respaldo horario |
| W4 | 26 oct.–1 nov. | 12 | — | — | En curso | Issue de cierre por completar |
| W5 | 2–8 nov. | 12 | — | — | Planificada | — |
| W6 | 9–15 nov. | 12 | — | — | Planificada | — |
| W7 | 16–22 nov. | 12 | — | — | Planificada | — |
| W8 | 23–29 nov. | 12 | — | — | Planificada | — |
| W9 | 30 nov.–6 dic. | 12 | — | — | Planificada | — |
| W10 | 7–13 dic. | 12 | — | — | Planificada | — |

`No consolidadas` significa que no existe todavía un registro suficiente para
afirmar horas reales. No debe sustituirse por 12 solo para completar la tabla.

## Plantilla para el issue de cierre

```markdown
## Cierre W<número>: <fechas>

- Horas planificadas: 12
- Horas reales respaldadas:
- Desviación: `(reales - 12) / 12 × 100`
- ¿Supera ±20 %?: Sí / No
- Decisión de replanificación:

### Compromiso y resultado
- Elementos comprometidos:
- Terminados según Definition of Done:
- Trasladados y causa:

### Evidencia
- Issues:
- PR integrados:
- CI:
- RF/RNF/HU y trazabilidad actualizada:

### Control de alcance
- Funciones diferidas incorporadas: Ninguna / issue de cambio aprobado #...
- Riesgos o bloqueos:
```

## Regla de cierre

La semana solo se marca `Cerrada` cuando existe evidencia verificable en Issues,
PR, CI y trazabilidad. Si la desviación absoluta supera 20 %, el issue debe
registrar la replanificación antes de seleccionar trabajo adicional.
