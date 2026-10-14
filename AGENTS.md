# Reglas permanentes del repositorio

Estas instrucciones se aplican a todo el repositorio. Deben revisarse antes de
crear o modificar requisitos, código, pruebas, diagramas o documentación.

## Fuente de trabajo y trazabilidad

- GitHub Issues es la fuente de seguimiento del trabajo.
- Todo cambio sustantivo debe estar asociado con un issue.
- Cada requisito del SRS debe poseer un identificador estable y criterios de
  verificación.
- Los issues, commits, pruebas y diagramas deben referenciar los identificadores
  de requisito afectados cuando corresponda.
- No cambiar el alcance de la versión 1 de manera implícita. Registrar y aprobar
  toda modificación de alcance antes de implementarla.

## Flujo de trabajo

- Crear un issue antes de iniciar una unidad de trabajo.
- Mantener cada issue acotado, verificable y con criterios de aceptación.
- Seguir GitFlow como estrategia de ramas.
- Mantener `main` como rama estable y utilizarla solamente para versiones
  revisadas y publicables.
- Mantener `develop` como rama de integración del trabajo aprobado para la
  siguiente versión.
- Crear cada rama `feature/*` desde `develop` e integrarla nuevamente en
  `develop` mediante pull request.
- Usar nombres como `feature/123-descripcion`, `docs/123-descripcion` o
  `diagram/123-descripcion`, siempre incluyendo el número del issue.
- Crear ramas `release/<version>` desde `develop` cuando una versión esté lista
  para estabilización. Integrarlas en `main` y `develop` una vez aprobadas.
- Crear ramas `hotfix/<version-o-issue>` desde `main` solamente para corregir
  defectos urgentes de una versión publicada. Integrarlas en `main` y `develop`.
- No desarrollar funcionalidades directamente en `main` ni en `develop`.
- Vincular el pull request con el issue mediante `Closes #123` cuando el cambio
  lo resuelva completamente.
- Dirigir los pull requests de features, documentación y diagramas hacia
  `develop`; reservar los pull requests hacia `main` para releases y hotfixes.
- No integrar cambios sin verificar sus criterios de aceptación.

## Especificación de requisitos

- Mantener el SRS en `docs/SRS.md` con estructura basada en IEEE 830.
- Identificar requisitos funcionales como `RF-###` y no funcionales como
  `RNF-###`.
- Redactar requisitos necesarios, inequívocos, verificables y trazables.
- Separar hechos confirmados, reglas del negocio, supuestos y decisiones de
  diseño.
- No presentar estimaciones o beneficios esperados como resultados obtenidos.

## Diagramas

- Gestionar cada diagrama mediante un issue propio o una subtarea claramente
  vinculada con un issue de documentación.
- Conservar la fuente editable y una versión exportada apta para GitHub y para el
  informe académico.
- Guardar fuentes en `docs/diagrams/src/` y exportaciones en
  `docs/diagrams/rendered/`.
- Incluir título, versión, fecha, fuente y requisitos relacionados.
- Mantener coherencia entre SRS, diagramas, implementación y pruebas.
- Los diagramas obligatorios son casos de uso, clases, secuencia y despliegue.

## Privacidad y seguridad

- Usar solamente datos ficticios o anonimizados.
- No publicar nombres de clientes o del estudio, RUT, RIT reales, teléfonos,
  correos, cuantías, documentos jurídicos, firmas, credenciales ni secretos.
- No versionar archivos `.env`, tokens, claves API ni respaldos de bases de datos.
- Utilizar `Estudio Jurídico X`, `Cliente 01`, `Abogado A` u otros códigos
  neutrales en ejemplos.
- La aplicación debe permanecer en preproducción con datos ficticios o
  anonimizados hasta que exista una aprobación jurídica, técnica y organizacional
  para tratar datos reales.

## Alcance estable de la versión 1

La solución centraliza clientes, casos, responsables, estados, fechas relevantes,
historial, trazabilidad, consultas y reportes autorizados.

Quedan fuera del alcance inicial:

- ingreso automático de demandas al Poder Judicial;
- almacenamiento de credenciales judiciales;
- scraping permanente de la Oficina Judicial Virtual;
- cálculo automático definitivo de plazos judiciales;
- automatización integral de materias judiciales;
- inteligencia artificial como núcleo obligatorio de la solución.

## Calidad

- Incorporar pruebas proporcionales al cambio realizado.
- No declarar una funcionalidad terminada sin evidencia verificable.
- Actualizar la documentación y los diagramas cuando cambie el comportamiento.
- Evitar archivos generados, temporales o sensibles en el historial Git.
