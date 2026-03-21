import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  BookOpen,
  Calendar,
  Clock,
  Tag,
  ExternalLink,
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  Filter,
  Search
} from 'lucide-react';
import { Card } from '../ui/Card';
import { BlogReader } from '../ui/BlogReader';
import { localBlogPosts, type LocalBlogPost } from '@/data/static/blog';
import { useBlogPosts } from '@/hooks/api/useBlog';

const BlogCard: React.FC<{ post: LocalBlogPost; index: number; onOpen: (post: LocalBlogPost) => void }> = ({ post, index, onOpen }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group h-full cursor-pointer"
      onClick={() => onOpen(post)}
    >
      <Card className="p-0 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800 overflow-hidden">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-medium">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={post.author.avatar || '/default-avatar.jpg'}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white text-sm">
                {post.author.name}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>1.2k</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>24</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>8</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); onOpen(post); }}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span className="text-sm">Read More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const FeaturedPost: React.FC<{ post: LocalBlogPost; onOpen: (post: LocalBlogPost) => void }> = ({ post, onOpen }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -2 }}
      className="group cursor-pointer"
      onClick={() => onOpen(post)}
    >
      <Card className="p-0 hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800 overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          {post.coverImage && (
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            </div>
          )}
          
          {/* Content */}
          <div className="md:w-1/2 p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium">
                Featured Post
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>2.5k views</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onOpen(post); }}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <span>Read Article</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const Blog: React.FC = () => {
  const { ref, controls } = useScrollAnimation();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<LocalBlogPost | null>(null);
  
  // Use local blog posts (you can also use the API hook)
  const blogPosts = localBlogPosts;
  const featuredPost = blogPosts[0]; // First post as featured
  const regularPosts = blogPosts.slice(1);
  
  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  const tags = ['all', ...allTags];
  
  // Filter posts
  const filteredPosts = regularPosts.filter(post => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-900">
      <div className="container-max section-padding">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Section Header */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Latest <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blog Posts</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Insights into AI, machine learning, and software development from my research and professional experience
            </p>
          </motion.div>

          {/* Featured Post */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mb-16"
          >
            <FeaturedPost post={featuredPost} onOpen={setActivePost} />
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap justify-center gap-3">
              {tags.slice(0, 8).map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag(tag)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {tag === 'all' ? <Filter className="w-4 h-4" /> : <Tag className="w-4 h-4" />}
                    <span className="capitalize">
                      {tag === 'all' ? 'All Posts' : tag}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} onOpen={setActivePost} />
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              <span>View All Posts</span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Blog Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">{blogPosts.length}</div>
                  <p className="text-blue-100">Articles Published</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">12k+</div>
                  <p className="text-blue-100">Total Views</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{allTags.length}</div>
                  <p className="text-blue-100">Topics Covered</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <BlogReader post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
};