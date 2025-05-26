import { githubApi } from '@/services/api/client';
import { GitHubRepo, GitHubUser } from '@/types/api/github';
import { env } from '@/config/environment';

export const githubService = {
  async getUser(username: string = env.github.username): Promise<GitHubUser> {
    return githubApi.get<GitHubUser>(`/users/${username}`);
  },

  async getUserRepos(username: string = env.github.username): Promise<GitHubRepo[]> {
    const repos = await githubApi.get<GitHubRepo[]>(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100,
      },
    });
    
    // Filter out forked repos and sort by stars
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  },

  async getRepo(owner: string, repo: string): Promise<GitHubRepo> {
    return githubApi.get<GitHubRepo>(`/repos/${owner}/${repo}`);
  },
};