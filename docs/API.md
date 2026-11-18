# API interna v1

## Propósito

La interfaz y cualquier cliente futuro deben operar mediante una API versionada.
Prisma permanece encapsulado en infraestructura y no constituye un contrato para
la interfaz. La autorización se decide en el servidor mediante una matriz única
de capacidades; ocultar un control visual no sustituye esa validación.

Base: `/api/v1`.

## Contrato común

- Sesión: cookie firmada `HttpOnly`; no se aceptan identificadores de usuario o
  estudio enviados por el cliente.
- Éxito: `{ "data": ... }`.
- Error: `{ "error": { "code": "...", "message": "...", "fields": {} } }`.
- `401`: sesión ausente, inválida o expirada.
- `403`: la sesión existe, pero el rol carece de la capacidad.
- `404`: el recurso no existe o está fuera del estudio/alcance. Esta equivalencia
  evita confirmar la existencia de información ajena.
- `409`: conflicto de unicidad o de estado.
- `422`: datos semánticamente inválidos.

## Endpoints implementados

| Método | Ruta | Capacidad |
|---|---|---|
| GET | `/session` | Sesión vigente |
| GET, POST | `/clientes` | `client:read`, `client:write` |
| PUT | `/clientes/:id` | `client:write` |
| PATCH | `/clientes/:id/estado` | `client:lifecycle` |
| GET, POST | `/casos` | `case:read`, `case:write` |
| GET, PUT | `/casos/:id` | `case:read`, `case:write` |
| GET | `/casos/opciones` | `case:write` |
| PATCH | `/casos/:id/ciclo` | `case:lifecycle` |
| PATCH | `/casos/:id/etapa` | `case:stage` |
| POST | `/casos/:id/fechas` | `case:date` |
| GET | `/reportes` | `report:read` |
| GET, POST | `/usuarios` | `user:manage` |
| PATCH | `/usuarios/:id/estado` | `user:manage` |

La exportación CSV existente se migrará conservando `report:export`. El acceso y
el cierre de sesión se incorporarán al contrato después de definir la protección
CSRF de las mutaciones basadas en cookie.

## Matriz aplicada

La fuente ejecutable se encuentra en
`src/modules/auth/domain/authorization.ts`. Los cuatro perfiles comparten lectura
y operación cotidiana. Solo `Socio` posee ciclo de vida, distribución,
exportación y administración de usuarios. El alcance especial de `Abogado` se
aplica además en las consultas: únicamente obtiene casos donde mantiene una
participación activa.

## Estado de migración

La API y su política central están disponibles. Las páginas y formularios aún
mantienen adaptadores anteriores mientras se migra la interfaz; por ello el
issue #118 no puede cerrarse hasta retirar los accesos directos a repositorios
desde `src/app`, ejecutar pruebas negativas HTTP y completar la regresión E2E.

