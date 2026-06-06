import { defineCollection, z } from 'astro:content';

// ネットワーク横断の更新情報。RECENT_ITEMS の手書き配列から移行。
const updates = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    src: z.string(),
    srcJp: z.string(),
    jp: z.string(),
    en: z.string(),
    kind: z.enum(['post', 'release']),
    url: z.string().url(),
    /** 一覧表示用の短いラベル（'new' など）。 */
    date: z.string().default('new'),
    publishedAt: z.string().date(),
  }),
});

export const collections = { updates };
