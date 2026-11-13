# Despliegue académico en Vercel

Este repositorio se encuentra conectado a Vercel mediante GitHub. La rama
`main` genera el entorno publicado y las demás ramas pueden generar previews.
El despliegue mantiene la condición de pre-release académico: solo admite datos
ficticios o anonimizados y no autoriza operación productiva.

## Recursos

- Aplicación Next.js importada desde el repositorio de GitHub.
- PostgreSQL administrado de plan gratuito, conectado como secreto.
- Migraciones Prisma aplicadas antes del build.
- Seed idempotente compuesto exclusivamente por estudios, usuarios, clientes y
  casos ficticios.

## Variables obligatorias

Las variables deben almacenarse como secretos del proyecto y nunca incorporarse
al repositorio:

- `DATABASE_URL`: conexión PostgreSQL administrada;
- `SESSION_SECRET`: secreto aleatorio de al menos 32 caracteres;
- `DEMO_LOGIN_PASSWORD`: contraseña compartida del entorno de demostración.

## Build de demostración

El comando configurado en Vercel es:

```sh
pnpm prisma migrate deploy && pnpm prisma db seed && pnpm build
```

El seed es idempotente y solo habilita datos ficticios. Antes de cualquier uso
distinto de una demostración académica deben retirarse el seed automático y la
contraseña compartida, además de aprobarse las puertas jurídicas, técnicas y
organizacionales de RNF-005.

## Publicación

1. Integrar el trabajo en `develop` mediante un PR con CI y GitGuardian verdes.
2. Crear un PR de release desde `develop` hacia `main`.
3. Integrar el PR únicamente con las verificaciones aprobadas.
4. Esperar el deployment automático de Vercel.
5. Verificar portada, acceso, consulta, permisos y cierre de sesión usando solo
   las identidades ficticias del seed.

La publicación no reemplaza la aceptación formal de los socios ni habilita datos
reales.
