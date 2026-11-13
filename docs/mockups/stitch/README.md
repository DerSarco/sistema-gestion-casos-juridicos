# Capturas del prototipo Stitch

**Proyecto privado:** `7788816451428984764`

**Fecha de exportación:** 2026-10-22

## Inventario

| Vista | Historia | Screen ID | Archivo | Verificación visual |
|---|---|---|---|---|
| MVP-01 Inicio de sesión | HU-01 | `ceb77762a9b64ccfb637651f232c9d1c` | [`mvp-01-inicio-sesion.png`](mvp-01-inicio-sesion.png) | Acceso interno sin registro ni recuperación |
| MVP-02 Casos | HU-02 | `7eec0a2216d343c3b2ceafb1a0a5975a` | [`mvp-02-casos.png`](mvp-02-casos.png) | Búsqueda y filtros; título fuente correcto, sin “Generating Screen...” |
| MVP-03 Formulario de caso | HU-03 | `4f1a0fb4c9fb4f54bf22f717030633f6` | [`mvp-03-formulario-caso.png`](mvp-03-formulario-caso.png) | Cliente, responsable, estado, etapa y antecedentes manuales opcionales |
| MVP-04 Ficha del caso | HU-04 | `7bc7920aeb8a4c10a7a4db49b9c2c0f1` | [`mvp-04-ficha-caso.png`](mvp-04-ficha-caso.png) | Resumen, fechas e historial básico |
| MVP-05 Estado o etapa | HU-05 | `ea23a7d6478b4e4b9df495af9a618212` | [`mvp-05-cambio-estado-etapa.png`](mvp-05-cambio-estado-etapa.png) | Confirmación o cancelación manual |
| MVP-06 Fecha relevante | HU-06 | `dd81011cfd5f4c03b598abddb55513c8` | [`mvp-06-fecha-relevante.png`](mvp-06-fecha-relevante.png) | Fecha manual sin recordatorios ni cálculo jurídico |
| MVP-07 Clientes | HU-07 | `450aa6f6970b4b2aa6a33b6509660087` | [`mvp-07-clientes.png`](mvp-07-clientes.png) | Búsqueda y casos asociados |
| MVP-08 Formulario de cliente | HU-08 | `a981f00b5552448db7a83facaf7912dd` | [`mvp-08-formulario-cliente.png`](mvp-08-formulario-cliente.png) | Alta/edición reutilizable y aviso preventivo |

El documento interno `eb68299d9eb14dba94f970a375ee66f4` no se incluye ni
se contabiliza como pantalla.

## Procedimiento de exportación

Los endpoints de captura de Stitch entregaron miniaturas de 512×410, insuficientes
para una PPT. Se descargó el HTML oficial de cada pantalla y se renderizó en
Chrome headless a 2560×2048. En MVP-03 y MVP-06, la operación de edición de Stitch
informó éxito, pero el HTML descargable continuó sirviendo el contenido anterior.
En esas dos exportaciones se eliminaron únicamente los bloques identificados
como `Próxima fecha relevante` y `Recordatorio interno`, respectivamente,
conforme al alcance aprobado. El retrato generado de MVP-03 se sustituyó por las
iniciales neutrales `AA` para evitar una imagen personal identificable. No se
añadieron funciones ni datos. En MVP-07 y MVP-08, los correos ilustrativos se
normalizaron al dominio reservado `example.test` y los teléfonos se enmascararon;
ningún dato de las capturas corresponde a una persona real.

## Contraste con #41 a #48

Verificado en las capturas:

- ocho elementos inequívocos, incluidos dos modales y dos formularios reutilizables;
- navegación limitada a Casos, Clientes y Cerrar sesión;
- ausencia de dashboard, reportes, integraciones, OJV y automatización jurídica;
- tribunal y RIT/ROL manuales y opcionales;
- nombres neutrales `Cliente 01`, `Abogado A` y `CASO-001`;
- fecha declarada como manual y sujeta a verificación humana.

Permanece pendiente, por lo que #41 a #48 no se cierran:

- demostrar navegación enlazada entre las ocho vistas;
- documentar y validar adaptación a tableta y móvil;
- probar teclado, foco y contraste WCAG AA;
- representar y verificar estados de error y acceso rechazado;
- obtener validación formal con usuarios autorizados.

Estas imágenes acreditan cobertura visual, no implementación, persistencia,
autenticación real ni aceptación del prototipo.
