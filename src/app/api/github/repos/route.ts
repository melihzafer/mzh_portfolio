import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { getAllRepos, filterWorks, getLatestReleaseSafe, isReleased } from '@/lib/github';

type ClientRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  topics: string[];
  updated_at: string;
  created_at: string;
  pushed_at: string;
  has_releases?: boolean;
  latest_release?: { tag_name: string; name?: string; published_at?: string } | null;
  portfolio_topics?: string[];
};

const getWorksCached = unstable_cache(
  async (owner: string) => {
    const all = await getAllRepos(owner);
    const works = await filterWorks(owner, all);

    // Map to client-friendly shape and enrich with release info
    let mapped: ClientRepo[] = await Promise.all(
      works.map(async (r: any) => {
        const rel = await getLatestReleaseSafe(owner, r.name);
        const hasRel = isReleased(rel);
        const portfolio_topics = (r.topics || []).filter((t: string) => ['ready', 'live', 'work'].includes(t.toLowerCase()));
        return {
          id: r.id,
          name: r.name,
          description: r.description || null,
          html_url: r.html_url,
          homepage: r.homepage || null,
          language: r.language || null,
          stargazers_count: r.stargazers_count || 0,
          fork: !!r.fork,
          topics: r.topics || [],
          updated_at: r.updated_at,
          created_at: r.created_at,
          pushed_at: r.pushed_at,
          has_releases: hasRel,
          latest_release: rel ? { tag_name: rel.tag_name, name: (rel as any).name, published_at: (rel as any).published_at } : null,
          portfolio_topics,
        };
      })
    );

    // Fallback: if strict filter returned nothing (e.g., topics API blocked), try a lighter heuristic
    let debug: any = { owner, total_all: (all as any[]).length, total_filtered: works.length };
    if (mapped.length === 0) {
      const all2 = await getAllRepos(owner);
      const base = all2.filter((r: any) => !r.fork && !r.archived && (r.size ?? 0) > 10);
      const fallback = base.map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description || null,
        html_url: r.html_url,
        homepage: r.homepage || null,
        language: r.language || null,
        stargazers_count: r.stargazers_count || 0,
        fork: !!r.fork,
        topics: r.topics || [],
        updated_at: r.updated_at,
        created_at: r.created_at,
        pushed_at: r.pushed_at,
        has_releases: false,
        latest_release: null,
        portfolio_topics: (r.topics || []).filter((t: string) => ['ready', 'live', 'work'].includes(t.toLowerCase())),
      }));

      debug.fallback_candidates = base.length;
      debug.fallback_returned = fallback.length;
      if (fallback.length > 0) {
        mapped = fallback;
      }
    }

    return { works: mapped, total: mapped.length, debug };
  },
  ['github-works'],
  { revalidate: 60 * 60, tags: ['github'] }
);

export async function GET(req: NextRequest) {
  const owner = process.env.GH_USER || 'melihzafer';
  try {
    const { searchParams } = new URL(req.url);
    if (searchParams.get('revalidate') === '1') {
      revalidateTag('github');
    }
    const result = await getWorksCached(owner);
    return NextResponse.json(result);
  } catch (e: any) {
    const msg = typeof e === 'string' ? e : e?.message || String(e);
    const isRateLimited = /rate limit/i.test(msg) || e?.status === 403;
    console.warn('lib/github fetch error', msg);
    // Static fallback to keep the Works page usable under rate limits
    const now = new Date().toISOString();
    const fallback = [
      {
        id: 100001,
        name: 'ecommerce-redesign',
        description: 'E-commerce redesign case study',
        html_url: `https://github.com/${owner}`,
        homepage: '/works/ecommerce-redesign',
        language: 'TypeScript',
        stargazers_count: 0,
        fork: false,
        topics: ['work'],
        updated_at: now,
        created_at: now,
        pushed_at: now,
        has_releases: false,
        latest_release: null,
        portfolio_topics: ['work'],
      },
      {
        id: 100002,
        name: 'saas-dashboard',
        description: 'SaaS analytics dashboard case study',
        html_url: `https://github.com/${owner}`,
        homepage: '/works/saas-dashboard',
        language: 'TypeScript',
        stargazers_count: 0,
        fork: false,
        topics: ['work'],
        updated_at: now,
        created_at: now,
        pushed_at: now,
        has_releases: false,
        latest_release: null,
        portfolio_topics: ['work'],
      },
    ] as ClientRepo[];

    return NextResponse.json({
      works: fallback,
      total: fallback.length,
      error: isRateLimited
        ? 'GitHub API rate limit hit. Add GITHUB_TOKEN to .env.local to increase limits.'
        : `Upstream error: ${msg}`,
      debug: { fallback: true },
    });
  }
}
