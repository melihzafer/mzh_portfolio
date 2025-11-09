import { NextRequest, NextResponse } from 'next/server';
import { getAllRepos, filterWorks } from '@/lib/github';

export async function GET(req: NextRequest) {
  const owner = process.env.GH_USER || (process.env.NODE_ENV !== 'production' ? 'melihzafer' : '');
  const tokenPresent = Boolean(process.env.GH_API_TOKEN || process.env.GITHUB_TOKEN);
  try {
    if (!owner) {
      return NextResponse.json({ error: 'Missing GH_USER environment variable' }, { status: 500 });
    }
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
        ? 'GitHub API rate limit hit. Add GH_API_TOKEN to your environment and restart dev.'
        : 'Unexpected error. Check server logs.'
    });
  }
}
