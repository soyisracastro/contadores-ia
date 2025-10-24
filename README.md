# Contadores IA - Blog y Plataforma de Contenido

Plataforma de contenido educativo sobre Inteligencia Artificial para contadores públicos en México, construida con Astro.js y Supabase.

## Características

- **Blog dinámico** con soporte para Markdown
- **Autenticación OTP** por email (sin contraseñas)
- **Contenido Premium** protegido con login
- **SSR Híbrido** - páginas estáticas + funcionalidad dinámica
- **Diseño responsivo** con Tailwind CSS
- **Rendimiento optimizado** gracias a Astro.js

## Tecnologías

- **Astro.js** - Framework web moderno
- **Supabase** - Backend (autenticación + base de datos)
- **Tailwind CSS** - Estilos
- **TypeScript** - Tipado estático

## Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **Project Settings** > **API**
4. Copia la **URL** y la **anon/public key**

### 3. Configurar variables de entorno

Edita el archivo `.env` y agrega tus credenciales de Supabase:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
PUBLIC_SITE_URL=http://localhost:4321
```

### 4. Configurar autenticación por email en Supabase

1. Ve a **Authentication** > **Providers** en tu proyecto de Supabase
2. Habilita el proveedor de **Email**
3. En **Email Templates**, puedes personalizar el email del código OTP
4. (Opcional) Configura un servicio SMTP personalizado en **Settings** > **Auth** > **SMTP Settings**

Por defecto, Supabase envía códigos de 6 dígitos al email del usuario.

## Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Visita [http://localhost:4321](http://localhost:4321)

## Estructura del Proyecto

```
/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── BlogCard.astro
│   ├── content/          # Contenido del blog (Markdown)
│   │   ├── blog/
│   │   │   ├── bienvenida.md
│   │   │   └── chatgpt-para-sat.md
│   │   └── config.ts
│   ├── layouts/          # Layouts de página
│   │   └── Layout.astro
│   ├── lib/              # Utilidades
│   │   ├── supabase.ts   # Cliente de Supabase
│   │   └── auth.ts       # Helpers de autenticación
│   ├── pages/            # Rutas de la aplicación
│   │   ├── index.astro   # Página de inicio
│   │   ├── login.astro   # Página de login
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── api/
│   │       └── auth/
│   │           ├── login.ts
│   │           ├── verify.ts
│   │           └── logout.ts
│   └── styles/
│       └── global.css
└── astro.config.mjs
```

## Crear Nuevo Contenido

### Crear un nuevo post de blog

Crea un archivo `.md` en `src/content/blog/`:

```markdown
---
title: "Título del post"
description: "Descripción breve"
pubDate: 2025-10-22
author: "Tu Nombre"
tags: ["ia", "contabilidad"]
premium: false  # true para contenido premium
---

# Tu contenido aquí

Escribe tu contenido en Markdown...
```

### Contenido Premium

Para crear contenido que requiera autenticación, establece `premium: true` en el frontmatter:

```markdown
---
title: "Contenido Exclusivo"
premium: true
---
```

Los usuarios no autenticados verán un mensaje pidiendo iniciar sesión.

## Despliegue

### Build para producción

```bash
npm run build
```

### Preview del build

```bash
npm run preview
```

### 🚀 Desplegar en Vercel (Recomendado)

Este proyecto está optimizado para Vercel. **Consulta la [Guía de Deploy en Vercel](./VERCEL_SETUP.md)** para instrucciones detalladas.

**Pasos rápidos:**

1. **Push a GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. Ve a [vercel.com](https://vercel.com) y conecta tu repositorio

3. **(Opcional)** Configura las variables de entorno si quieres autenticación:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`

4. ¡Vercel detecta todo automáticamente y hace el deploy!

**Nota:** El sitio funciona sin configurar variables de entorno (modo lectura). Solo necesitas configurarlas si quieres habilitar autenticación.

## Flujo de Autenticación

1. Usuario ingresa su email en `/login`
2. Supabase envía un código OTP de 6 dígitos al email
3. Usuario ingresa el código
4. Sistema verifica el código y crea una sesión
5. Usuario puede acceder a contenido premium

## Próximos Pasos

- [ ] Agregar más posts de blog
- [ ] Configurar dominio personalizado
- [ ] Integrar analytics
- [ ] Agregar newsletter
- [ ] Crear sección de podcasts
- [ ] Agregar sección de videos
- [ ] Implementar comentarios
- [ ] Agregar búsqueda de contenido

## Comandos

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Instala dependencias                         |
| `npm run dev`     | Inicia servidor de desarrollo                |
| `npm run build`   | Construye el sitio para producción          |
| `npm run preview` | Vista previa del build localmente           |

## Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

## Licencia

MIT
