import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache';
import { getAllRepos, getLatestReleaseSafe, isReleased } from '@/lib/github';

const owner = process.env.GH_USER || 'melihzafer';

const getCachedAllRepos = unstable_cache(
  async () => {
    try {
      const repos = await getAllRepos(owner);
      
      // Filter out forks and archived repos, but don't apply portfolio topic filtering
      const publicRepos = repos.filter(repo => !repo.fork && !repo.archived);
      
      // For rate safety, enrich only a small recent subset with release info
      const recent = [...publicRepos]
        .sort((a: any, b: any) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
        .slice(0, 15);

      const releaseMap = new Map<string, any>();
      for (const r of recent as any[]) {
        try {
          const rel = await getLatestReleaseSafe(owner, r.name);
          if (rel) {
            releaseMap.set(r.name, {
              has_releases: isReleased(rel),
              latest_release: {
                tag_name: rel.tag_name,
                name: rel.name ?? rel.tag_name,
                published_at: rel.published_at ?? null,
              },
            });
          } else {
            releaseMap.set(r.name, { has_releases: false, latest_release: null });
          }
        } catch (_) {
          releaseMap.set(r.name, { has_releases: false, latest_release: null });
        }
      }

      // Map to client shape
      const mappedRepos = publicRepos.map((repo: any) => {
        const relInfo = releaseMap.get(repo.name) || { has_releases: false, latest_release: null };
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          fork: repo.fork,
          topics: repo.topics || [],
          updated_at: repo.updated_at,
          created_at: repo.created_at,
          pushed_at: repo.pushed_at,
          has_releases: relInfo.has_releases,
          latest_release: relInfo.latest_release,
          portfolio_topics: []
        };
      });

      return {
        works: mappedRepos,
        total: mappedRepos.length,
        debug: {
          total_fetched: repos.length,
          total_filtered: mappedRepos.length,
          filtered_out_forks: repos.filter(r => r.fork).length,
          filtered_out_archived: repos.filter(r => r.archived).length
        }
      };
    } catch (error) {
      console.error('Error in getCachedAllRepos:', error);
      throw error;
    }
  },
  ['github-all-repos'],
  {
    revalidate: 3600, // 1 hour
    tags: ['github']
  }
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('revalidate') === '1') {
      // Bust cached GitHub responses
      revalidateTag('github');
    }
    const result = await getCachedAllRepos();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching all repositories:', error);
    
    // Return static fallback for all repos
    const fallbackRepos = [
      {
        id: 999991,
        name: 'portfolio-website',
        description: 'Personal portfolio website built with Next.js and TypeScript',
        html_url: 'https://github.com/melihzaferhyusein/portfolio',
        homepage: 'https://portfolio.example.com',
        language: 'TypeScript',
        stargazers_count: 5,
        forks_count: 2,
        fork: false,
        topics: ['portfolio', 'nextjs', 'typescript'],
        updated_at: '2024-01-15T10:00:00Z',
        created_at: '2023-12-01T10:00:00Z',
        pushed_at: '2024-01-15T10:00:00Z',
        has_releases: false,
        latest_release: null,
        portfolio_topics: []
      },
      {
        id: 999992,
        name: 'react-components',
        description: 'Reusable React components library',
        html_url: 'https://github.com/melihzaferhyusein/react-components',
        homepage: null,
        language: 'JavaScript',
        stargazers_count: 3,
        forks_count: 1,
        fork: false,
        topics: ['react', 'components', 'javascript'],
        updated_at: '2024-01-10T10:00:00Z',
        created_at: '2023-11-15T10:00:00Z',
        pushed_at: '2024-01-10T10:00:00Z',
        has_releases: false,
        latest_release: null,
        portfolio_topics: []
      }
    ];

    return NextResponse.json({
      works: fallbackRepos,
      total: fallbackRepos.length,
      error: 'Failed to fetch live repositories. Showing sample data.',
      debug: { fallback: true, error: String(error) }
    }, { status: 200 });
  }
}
