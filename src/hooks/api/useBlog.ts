import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blog/blogApi';

export const useBlogPosts = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['blog', 'posts', page, perPage],
    queryFn: () => blogService.getPosts(page, perPage),
  });
};

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ['blog', 'post', id],
    queryFn: () => blogService.getPost(id),
    enabled: !!id,
  });
};
