import type { APIRoute } from 'astro';
import { buildRssXml } from '@fujioha/ui/feed';
import { loadHokkaidoFeedItems } from '../lib/feed-source';
import { HOK_FEED_META } from '../lib/feed';

export const prerender = true;

export const GET: APIRoute = async () => {
  const items = await loadHokkaidoFeedItems();
  return new Response(buildRssXml(items, HOK_FEED_META), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
