import { defineCollection, z } from 'astro:content';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Removes numeric prefix from filename for clean URLs
 * Example: "001-introduccion-python.md" → "introduccion-python"
 */
export function generateSlug(filename: string): string {
  return filename.replace(/^\d+-/, '');
}

// =============================================================================
// COLLECTION SCHEMAS
// =============================================================================

// Blog Collection - Traditional articles
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Contadores IA'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    premium: z.boolean().default(false),
    updatedDate: z.date().optional(),
  }),
});

// Courses Collection - Structured learning paths
const coursesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Lesson metadata
    title: z.string(),
    description: z.string(),
    order: z.number().optional(), // Extracted from filename if not provided
    duration: z.number().optional(), // Duration in minutes
    videoUrl: z.string().optional(),
    downloadables: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).optional(),
    premium: z.boolean().default(true),
    free_preview: z.boolean().default(false),

    // Email drip campaign metadata
    email: z.object({
      subject: z.string(),
      preview: z.string(),
    }).optional(),

    // Course metadata (for _course.yaml files)
    courseTitle: z.string().optional(),
    courseSlug: z.string().optional(),
    courseDescription: z.string().optional(),
    instructor: z.string().optional(),
    courseDuration: z.string().optional(), // "4 semanas", "10 horas"
    level: z.enum(['principiante', 'intermedio', 'avanzado']).optional(),
    thumbnail: z.string().optional(),
    published: z.boolean().default(true),
    enrollmentOpen: z.boolean().default(true),

    // Email drip configuration
    drip: z.object({
      enabled: z.boolean().default(false),
      frequency: z.enum(['daily', 'weekly', 'biweekly']).default('weekly'),
      startDelay: z.number().default(1), // Days before sending first lesson
      sendTime: z.string().default('09:00'),
    }).optional(),
  }),
});

// Workshops Collection - Live events and timed content
const workshopsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Session metadata
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    sessionDate: z.date().optional(),
    duration: z.number().optional(), // Duration in minutes
    recordingUrl: z.string().optional(),

    // Workshop metadata (for _workshop.yaml files)
    workshopTitle: z.string().optional(),
    workshopSlug: z.string().optional(),
    workshopDescription: z.string().optional(),
    instructor: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    thumbnail: z.string().optional(),
    maxParticipants: z.number().optional(),
  }),
});

// Guides Collection - Quick tutorials and references
const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Contadores IA'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    premium: z.boolean().default(false),
    updatedDate: z.date().optional(),
    estimatedTime: z.number().optional(), // Reading time in minutes
  }),
});

// =============================================================================
// EXPORTS
// =============================================================================

export const collections = {
  'blog': blogCollection,
  'courses': coursesCollection,
  'workshops': workshopsCollection,
  'guides': guidesCollection,
};
