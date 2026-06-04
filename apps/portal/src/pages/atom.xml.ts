import type { APIRoute } from 'astro';
import { RECENT_ITEMS } from '../lib/recent';
import { buildAtomXml } from '../lib/feed';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(buildAtomXml(RECENT_ITEMS), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
