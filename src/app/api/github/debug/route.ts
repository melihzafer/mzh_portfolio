import { NextRequest, NextResponse } from 'next/server';
import { getAllRepos, filterWorks } from '@/lib/github';

export async function GET(req: NextRequest) {
  const owner = process.env.GH_USER || 'melihzafer';
  const tokenPresent = Boolean(process.env.GITHUB_TOKEN);
  try {
    const all = await getAllRepos(owner);
    const filtered = await filterWorks(owner, all);
    const withTopics = all.filter(r => Array.isArray((r as any).topics) && (r as any).topics.length > 0).length;
    return NextResponse.json({
      owner,
      tokenPresent,
      total_all: all.length,
      total_filtered: filtered.length,
      topics_coverage: `${withTopics}/${all.length}`,
      sample_all: all.slice(0,3).map(r => ({ name: r.name, topics: r.topics || [] })),
      sample_filtered: filtered.slice(0,3).map(r => ({ name: r.name, topics: r.topics || [] })),
    });
  } catch (e) {
    const msg = String(e);
    const rateLimited = /rate limit/i.test(msg);
    return NextResponse.json({
      owner,
      tokenPresent,
      rateLimited,
      error: msg,
      hint: rateLimited
        ? 'GitHub API rate limit hit. Add GITHUB_TOKEN to .env.local and restart dev.'
        : 'Unexpected error. Check server logs.'
    });
  }
}
