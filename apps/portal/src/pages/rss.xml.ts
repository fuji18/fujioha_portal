import type { APIRoute } from 'astro';
import { RECENT_ITEMS } from '../lib/recent';
import { buildRssXml } from '../lib/feed';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(buildRssXml(RECENT_ITEMS), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
