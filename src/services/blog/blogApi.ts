import { blogApi } from '@/services/api/client';
import { BlogPost } from '@/types/api/blog';
import { env } from '@/config/environment';

export const blogService = {
  async getPosts(page = 1, perPage = 10): Promise<BlogPost[]> {
    return blogApi.get<BlogPost[]>('/articles', {
      params: {
        username: env.blog.username,
        page,
        per_page: perPage,
      },
    });
  },

  async getPost(id: string): Promise<BlogPost> {
    return blogApi.get<BlogPost>(`/articles/${id}`);
  },

  async getPostBySlug(slug: string): Promise<BlogPost> {
    return blogApi.get<BlogPost>(`/articles/${env.blog.username}/${slug}`);
  },
};