import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { type LocalBlogPost } from '@/data/static/blog';
import 'highlight.js/styles/github-dark.css';

interface BlogReaderProps {
  post: LocalBlogPost | null;
  onClose: () => void;
}

export const BlogReader: React.FC<BlogReaderProps> = ({ post, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Reader panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
            onClick={onClose}
          >
            <div
              className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl mb-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover image */}
              {post.coverImage && (
                <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Tags on cover */}
                  <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* If no cover, floating close button */}
              {!post.coverImage && (
                <div className="flex justify-end p-4 pb-0">
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="px-6 md:px-10 py-8">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{post.author.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>

                {/* Markdown body */}
                <div className="prose prose-gray dark:prose-invert max-w-none
                  prose-headings:font-bold
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:dark:border-gray-700 prose-h2:pb-2
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:leading-relaxed prose-p:text-gray-700 prose-p:dark:text-gray-300
                  prose-a:text-blue-600 prose-a:dark:text-blue-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:dark:text-white
                  prose-code:text-blue-600 prose-code:dark:text-blue-400 prose-code:bg-blue-50 prose-code:dark:bg-blue-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-gray-900 prose-pre:dark:bg-gray-950 prose-pre:rounded-xl prose-pre:p-0 prose-pre:overflow-hidden
                  prose-pre:code:bg-transparent prose-pre:code:text-inherit prose-pre:code:p-0
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:dark:bg-blue-900/10 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
                  prose-table:text-sm
                  prose-th:bg-gray-100 prose-th:dark:bg-gray-800
                  prose-li:text-gray-700 prose-li:dark:text-gray-300
                  prose-hr:border-gray-200 prose-hr:dark:border-gray-700
                ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
