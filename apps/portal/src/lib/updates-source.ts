import { getCollection } from 'astro:content';

/** updates コレクションを publishedAt 降順で読み込む（astro ランタイム依存）。 */
export async function loadUpdates() {
  const entries = await getCollection('updates');
  return entries
    .map((e) => e.data)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
