import { Octokit } from '@octokit/rest';
import { cache } from 'react';

export type Repo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  has_pages: boolean;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  owner: { login: string };
  topics?: string[];
};

export type Release = {
  draft: boolean;
  prerelease: boolean;
  tag_name: string;
  html_url: string;
  name?: string | null;
  published_at?: string | null;
};

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

export async function getAllRepos(owner: string): Promise<Repo[]> {
  let repos: Repo[] = [];
  let page = 1;
  let done = false;
  while (!done) {
    const res = await octokit.repos.listForUser({
      username: owner,
      per_page: 100,
      page,
      sort: 'pushed',
      mediaType: { previews: ['mercy'] },
    });
    repos = repos.concat(res.data as Repo[]);
    if (res.data.length < 100) done = true;
    page++;
  }
  return repos;
}

export async function getAllTopics(owner: string, repo: string): Promise<string[]> {
  try {
    const res = await octokit.repos.getAllTopics({ owner, repo });
    return res.data.names || [];
  } catch (e) {
    return [];
  }
}

export async function getLatestReleaseSafe(owner: string, repo: string): Promise<Release|null> {
  try {
    // Use /releases endpoint to get all releases, then filter
    // This is more robust than /releases/latest which ignores pre-releases
    const res = await octokit.repos.listReleases({ 
      owner, 
      repo,
      per_page: 5 // Only need the most recent few
    });
    
    if (!res.data || res.data.length === 0) {
      return null;
    }
    
    // Find the latest non-draft release (include pre-releases)
  const latestRelease = res.data.find(release => !release.draft);
    
    return latestRelease ? (latestRelease as Release) : null;
  } catch (e) {
    // Fallback to the old endpoint for backwards compatibility
    try {
      const res = await octokit.repos.getLatestRelease({ owner, repo });
      return res.data as Release;
    } catch (fallbackError) {
      return null;
    }
  }
}

export function isReleased(rel: Release|null): boolean {
  if (!rel) return false;
  // Consider both stable releases and pre-releases as "released"
  // Only exclude drafts
  return !rel.draft;
}

export function isLive(repo: Repo): boolean {
  return (repo.homepage && repo.homepage.startsWith('http')) || repo.has_pages;
}

export function hasPortfolioTopic(repoTopics: string[], allow = ["ready","live","work"]): boolean {
  return repoTopics.some(t => allow.some(a => t.toLowerCase() === a.toLowerCase()));
}

export async function filterWorks(owner: string, repos: Repo[]): Promise<Repo[]> {
  const tokenPresent = Boolean(process.env.GITHUB_TOKEN);
  // Base filter: exclude forks/archived
  const base = repos.filter(r => !r.fork && !r.archived);

  // If topics missing on most repos and token is present, fetch topics for a limited subset to avoid rate limits
  const missingTopicsCount = base.filter(r => !r.topics || r.topics.length === 0).length;
  if (tokenPresent && missingTopicsCount > 0) {
    const subset = [...base]
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 20); // cap topics enrichment
    for (const r of subset) {
      try {
        const t = await getAllTopics(owner, r.name);
        (r as any).topics = t;
      } catch (e: any) {
        // On rate limit, stop enrichment
        if (String(e).includes('rate limit')) break;
      }
    }
  }

  // Prefer repos explicitly tagged with portfolio topics (uses topics from listForUser response)
  const tagged = base.filter(r => hasPortfolioTopic(r.topics || []));

  // Remaining candidates
  const remaining = base.filter(r => !tagged.includes(r));

  let fallback: Repo[] = [];
  if (tokenPresent) {
    // Token present: follow spec "released & live" but cap API calls to avoid rate limits
    const liveCandidates = remaining.filter(isLive).slice(0, 20); // cap to 20 latest
    for (const r of liveCandidates) {
      const rel = await getLatestReleaseSafe(owner, r.name);
      if (isReleased(rel)) fallback.push(r);
    }
  } else {
    // No token: avoid extra API calls; fall back to live projects only
    fallback = remaining.filter(isLive);
  }

  const merged = [...tagged, ...fallback];
  // Sort by most recently pushed
  return merged.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
}
