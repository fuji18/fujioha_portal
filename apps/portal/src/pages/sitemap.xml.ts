import type { APIRoute } from 'astro';
import { buildSitemapXml } from '@fujioha/ui/sitemap';

export const prerender = true;

const PATHS = [
  '/',
  '/about',
  '/journal',
  '/disclaimer',
  '/privacy',
  '/terms',
  '/contact',
];

export const GET: APIRoute = () =>
  new Response(buildSitemapXml(PATHS, 'https://fujioha.com'), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
