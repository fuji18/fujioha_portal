import { defineCollection, z } from 'astro:content';

const companions = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    jp: z.string(),
    en: z.string(),
    lead: z.string(),
    leadEn: z.string(),
    area: z.enum(['sapporo', 'chitose', 'asahikawa', 'hakodate', 'kushiro', 'shiretoko', 'furano', 'other']),
    url: z.string().url(),
    hue: z.string().default('#7fb0d6'),
    thumbnail: z.string().optional(),
    status: z.enum(['published', 'draft', 'archived']).default('draft'),
    publishedAt: z.string().date().optional(),
  }),
});

export const collections = { companions };
