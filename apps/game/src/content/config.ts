import { defineCollection, z } from 'astro:content';

const games = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    jp: z.string(),
    en: z.string(),
    genre: z.string(),
    genreEn: z.string(),
    time: z.string(),
    tag: z.enum(['new', 'wip']).nullable().default(null),
    icon: z.enum(['kanji', 'clock', 'map', 'rhythm', 'palette']),
    hue: z.string(),
    url: z.string().url().nullable().default(null),
    status: z.enum(['published', 'draft', 'archived']).default('draft'),
    featured: z.boolean().default(false),
    publishedAt: z.string().date().optional(),
  }),
});

export const collections = { games };
