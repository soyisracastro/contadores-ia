# Contadores IA - Documentación del Proyecto

## Descripción General
Plataforma de blog educativo sobre Inteligencia Artificial para contadores públicos en México. Sistema con contenido público y premium protegido por autenticación OTP (sin contraseñas) y membresías de pago.

## Modelo de Negocio
- **Usuarios Actuales**: 25 usuarios de taller con acceso premium incluido
  - 3 membresías anuales (2,500 MXN - 12 meses)
  - 18 membresías semestrales (850 MXN - 6 meses)
  - 3 membresías vitalicias (incluye admin)
  - Beneficio extra: Mentoría 1:1
- **Nuevas Membresías** (en desarrollo): Sistema de pago recurrente con Stripe
  - Mensual: Por definir (~99-149 MXN/mes)
  - Anual: Por definir (~999-1,499 MXN/año)
  - Sin mentoría, solo acceso al contenido premium

## Stack Tecnológico
- **Framework**: Astro.js 5.14.8 (SSR mode con Node.js adapter)
- **Backend**: Supabase (Autenticación + Base de datos)
- **Pagos**: Stripe (en desarrollo)
- **Estilos**: Tailwind CSS 4.1.15
- **Lenguaje**: TypeScript
- **Despliegue**: SSR compatible con Vercel/Netlify

## Variables de Entorno (.env)
```env
# Supabase
PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
PUBLIC_SITE_URL=http://localhost:4321 (dev) | https://domain.com (prod)

# Stripe (en desarrollo)
STRIPE_SECRET_KEY=sk_test_...
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_ANNUAL=price_...
```

## Estructura del Proyecto

### Componentes (src/components/)
- **Header.astro**: Navegación principal con estado de autenticación condicional
- **Footer.astro**: Footer con 3 columnas (branding, links, recursos)
- **BlogCard.astro**: Card reutilizable para posts (muestra badge "Premium" si aplica)

### Páginas (src/pages/)
- **index.astro**: Homepage con hero, features y últimos 3 posts
- **login.astro**: Página de autenticación OTP en dos pasos
- **blog/index.astro**: Listado de todos los posts (grid 3 columnas)
- **blog/[slug].astro**: Vista individual de post con protección de contenido premium

### API Endpoints (src/pages/api/auth/)
- **POST /api/auth/login**: Envía código OTP al email del usuario
- **POST /api/auth/verify**: Verifica código OTP y crea sesión (cookies httpOnly)
- **POST /api/auth/logout**: Destruye sesión y elimina cookies

### Utilidades (src/lib/)
- **supabase.ts**: Cliente de Supabase inicializado con env vars
- **auth.ts**:
  - `getUser(cookies)`: Obtiene usuario actual desde cookies
  - `isAuthenticated(cookies)`: Verifica si hay sesión activa

### Contenido (src/content/)
- **config.ts**: Schema de Content Collection para blog posts
  - Fields: title, description, pubDate, author, image?, tags[], premium (boolean)
- **blog/*.md**: Posts en Markdown con frontmatter

### Layouts (src/layouts/)
- **Layout.astro**: Layout maestro (Header + slot + Footer)

## Sistema de Autenticación

### Flujo Completo
1. Usuario ingresa email en `/login`
2. POST a `/api/auth/login` → Supabase envía OTP (6 dígitos)
3. Usuario ingresa código OTP
4. POST a `/api/auth/verify` → Verifica y crea sesión
5. Server establece cookies seguras:
   - `sb-access-token` (7 días, httpOnly, secure)
   - `sb-refresh-token` (30 días, httpOnly, secure)
6. Header muestra email + botón logout
7. Usuario puede acceder a contenido premium

### Seguridad
- Cookies httpOnly (protección XSS)
- Secure flag en producción (HTTPS only)
- SameSite: lax (protección CSRF)
- Sin contraseñas, solo códigos temporales

## Sistema de Contenido

### Posts Públicos
- `premium: false` en frontmatter
- Accesibles para todos los visitantes
- Ejemplo: `bienvenida.md`

### Posts Premium
- `premium: true` en frontmatter
- **Requieren membresía activa** (no solo login)
- Sin membresía activa: muestra pantalla de bloqueo con CTA a pricing
- Con membresía activa: muestra contenido completo
- Ejemplo: `chatgpt-para-sat.md`
- **En desarrollo**: Actualmente solo verifica login, falta integrar verificación de membresía

### Crear Nuevo Post
```markdown
---
title: "Título del Post"
description: "Descripción breve"
pubDate: 2025-10-22
author: "Contadores IA"
tags: ["ia", "contabilidad"]
premium: false  # true para contenido premium
---

# Tu contenido aquí...
```

## Posts Existentes
1. **bienvenida.md** (público): Introducción a la plataforma
2. **chatgpt-para-sat.md** (premium): 3 prompts para declaraciones del SAT

## Comandos de Desarrollo
```bash
npm install          # Instalar dependencias
npm run dev          # Servidor desarrollo (localhost:4321)
npm run build        # Build para producción
npm run preview      # Preview del build
```

## Configuración Supabase
1. Crear proyecto en Supabase
2. Habilitar proveedor "Email" en Authentication > Providers
3. Copiar URL y anon key a .env
4. (Opcional) Configurar SMTP personalizado para envío de OTPs

## Diseño Visual
- **Colores primarios**: Blue (#2563eb), Yellow (badges premium)
- **Backgrounds**: Gray-50 (light), Gray-900 (dark)
- **Responsive**: Mobile-first, grid adaptable (1/2/3 cols)
- **Idioma**: Español (es-MX) en todo el sitio

## Estado Actual del Proyecto

### Funcionalidades Completadas ✅
- Autenticación OTP funcional
- Sistema de blog con Markdown
- Protección de contenido premium (solo verifica login)
- 2 posts de ejemplo (1 público, 1 premium)
- Componentes reutilizables (Header, Footer, BlogCard)
- Layout responsivo con Tailwind
- SSR configurado con Node.js adapter

### Sistema de Membresías (En Desarrollo) 🚧
Ver **PLAN_MEMBRESIAS.md** para roadmap completo.

**Fase 1 - EN PROGRESO**: Base de datos y usuarios existentes
- [ ] Crear tabla `memberships` en Supabase
- [ ] Actualizar `auth.ts` para verificar membresía activa
- [ ] Importar 25 usuarios del taller
- [ ] Modificar protección de contenido premium

**Fase 2 - PENDIENTE**: Página de pricing y dashboard
- [ ] Crear `/pricing` con planes
- [ ] Crear `/mi-cuenta` para ver estado de membresía
- [ ] Componente MembershipBadge

**Fase 3 - PENDIENTE**: Integración con Stripe
- [ ] Configurar productos en Stripe
- [ ] Implementar Stripe Checkout
- [ ] Crear webhooks para sincronizar pagos
- [ ] Permitir nuevas suscripciones

**Fase 4 - PENDIENTE**: Portal de billing y notificaciones
- [ ] Customer Portal de Stripe
- [ ] Notificaciones de vencimiento
- [ ] Panel de admin básico

## Próximos Pasos Inmediatos
1. Completar Fase 1 del sistema de membresías
2. Definir precios finales para membresías (mensual/anual)
3. Preparar lista de emails de usuarios del taller para importación
4. Luego continuar con contenido y features adicionales:
   - [ ] Agregar más posts de blog
   - [ ] Configurar dominio personalizado
   - [ ] Integrar analytics
   - [ ] Newsletter subscription
   - [ ] Sección de podcasts
   - [ ] Sección de videos
   - [ ] Sistema de comentarios
   - [ ] Búsqueda de contenido

## Notas de Implementación

### Archivos Críticos para Entender
- `src/lib/auth.ts`: Lógica de autenticación
- `src/pages/api/auth/verify.ts`: Manejo de sesiones y cookies
- `src/pages/blog/[slug].astro`: Protección de contenido premium
- `src/content/config.ts`: Schema de posts

### Consideraciones de Performance
- SSR reduce JavaScript en cliente
- Content Collections pre-procesadas en build time
- Imágenes optimizables (campo image en schema preparado)

### Audiencia Objetivo
Contadores públicos en México interesados en aplicar IA a su práctica profesional (SAT, CFDI, fiscales, contabilidad).

## Sistema de Membresías

### Tipos de Membresía
1. **Lifetime (Vitalicia)**: Acceso permanente sin fecha de vencimiento (3 usuarios)
2. **Annual (Anual)**: 12 meses de acceso (3 usuarios del taller)
3. **Semester (Semestral)**: 6 meses de acceso (18 usuarios del taller)
4. **Monthly (Mensual)**: Pago recurrente mensual (nuevos usuarios, en desarrollo)

### Verificación de Acceso
Para acceder a contenido premium se requiere:
1. ✅ Usuario autenticado (login con OTP)
2. 🚧 Membresía activa en base de datos (en desarrollo)
3. 🚧 Fecha actual dentro del periodo de membresía (en desarrollo)

### Archivos Relacionados
- `PLAN_MEMBRESIAS.md`: Roadmap completo de implementación
- `src/lib/auth.ts`: Funciones de autenticación y membresía
- Tabla `memberships` en Supabase (próximamente)

## Contacto y Recursos
- [Docs de Astro](https://docs.astro.build)
- [Docs de Supabase](https://supabase.com/docs)
- [Docs de Tailwind](https://tailwindcss.com/docs)
- [Docs de Stripe](https://stripe.com/docs) (para Fase 3)

---

**Última actualización**: 2025-10-22
**Versión del proyecto**: 1.0.0 + Sistema de Membresías (Fase 1 en desarrollo)
