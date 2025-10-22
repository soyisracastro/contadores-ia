import { defineCollection, z } from 'astro:content';

// Definición de la colección de blog posts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Contadores IA'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Para contenido premium que requiere autenticación
    premium: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};
