import { useQuery } from '@tanstack/react-query';
import { githubService } from '@/services/github/githubApi';

export const useGitHubUser = (username?: string) => {
  return useQuery({
    queryKey: ['github', 'user', username],
    queryFn: () => githubService.getUser(username),
    enabled: !!username,
  });
};

export const useGitHubRepos = (username?: string) => {
  return useQuery({
    queryKey: ['github', 'repos', username],
    queryFn: () => githubService.getUserRepos(username),
    enabled: !!username,
  });
};