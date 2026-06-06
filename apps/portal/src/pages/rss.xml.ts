import type { APIRoute } from 'astro';
import { buildRssXml } from '@fujioha/ui/feed';
import { loadUpdates } from '../lib/updates-source';
import { updateToFeedItem, PORTAL_FEED_META } from '../lib/updates';

export const prerender = true;

export const GET: APIRoute = async () => {
  const items = (await loadUpdates()).map(updateToFeedItem);
  return new Response(buildRssXml(items, PORTAL_FEED_META), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
