// src/components/sections/Projects.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink, Calendar, Building2, CheckCircle2, Filter, PlayCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { projects, Project, VideoItem } from '@/data/mock/projects';

declare global {
  interface Window {
    FB?: { XFBML: { parse: (element?: HTMLElement | null) => void } };
  }
}

const statusColors: Record<Project['status'], string> = {
  Production: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Research: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Commercialized: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Personal: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const statusBorder: Record<Project['status'], string> = {
  Production: 'border-l-green-500',
  Research: 'border-l-blue-500',
  Commercialized: 'border-l-purple-500',
  Personal: 'border-l-orange-400',
};

const filterOptions: Array<'all' | Project['status']> = ['all', 'Production', 'Commercialized', 'Research', 'Personal'];

const FacebookVideoPlayer: React.FC<{ href: string; rounded: string }> = ({ href, rounded }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure fb-root exists
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.prepend(fbRoot);
    }

    const initFB = () => {
      if (window.FB) {
        window.FB.XFBML.parse(containerRef.current ?? undefined);
      }
    };

    if (window.FB) {
      initFB();
    } else if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2';
      script.async = true;
      script.defer = true;
      script.onload = initFB;
      document.body.appendChild(script);
    } else {
      // Script tag exists but FB not ready yet — wait for it
      const interval = setInterval(() => {
        if (window.FB) {
          clearInterval(interval);
          initFB();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [href]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${rounded}`}>
      <div
        className="fb-video"
        data-href={href}
        data-width="auto"
        data-allowfullscreen="true"
        data-show-text="false"
      />
    </div>
  );
};

const VideoEmbed: React.FC<{ video: VideoItem; rounded: string }> = ({ video, rounded }) => {
  if (video.type === 'youtube') {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={video.embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className={`absolute inset-0 w-full h-full ${rounded}`}
        />
      </div>
    );
  }
  if (video.type === 'facebook') {
    return <FacebookVideoPlayer href={video.embedUrl} rounded={rounded} />;
  }
  // gdrive
  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={video.embedUrl}
        title={video.title}
        allow="autoplay"
        allowFullScreen
        className={`absolute inset-0 w-full h-full ${rounded}`}
        style={{ border: 'none' }}
      />
    </div>
  );
};

export const Projects: React.FC = () => {
  const { ref, controls } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState<'all' | Project['status']>('all');
  const [activeVideos, setActiveVideos] = useState<{ title: string; items: VideoItem[] } | null>(null);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  const openVideos = (title: string, items: VideoItem[]) => {
    setActiveVideoIdx(0);
    setActiveVideos({ title, items });
  };

  const getYoutubeId = (embedUrl: string) =>
    embedUrl.replace('https://www.youtube.com/embed/', '').split('?')[0];

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.status === activeFilter);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
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
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Production AI systems, commercialized products, and cutting-edge research
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filterOptions.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                }`}
              >
                {filter === 'all' && <Filter className="w-4 h-4" />}
                <span>{filter === 'all' ? 'All Projects' : filter}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === filter
                    ? 'bg-white/20 text-white'
                    : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {filter === 'all' ? projects.length : projects.filter(p => p.status === filter).length}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Card className={`p-6 h-full hover:shadow-xl transition-all duration-300 border-l-4 ${statusBorder[project.status]}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[project.status]}`}>
                          {project.status}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {project.startDate} – {project.endDate}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.videos && project.videos.length > 0 && (
                        <button
                          onClick={() => openVideos(project.title, project.videos!)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-semibold transition-colors"
                          title="Watch Demo"
                        >
                          <PlayCircle className="w-4 h-4" />
                          Demo{project.videos.length > 1 ? ` (${project.videos.length})` : ''}
                        </button>
                      )}
                      {project.links && project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                          title={link.label}
                        >
                          <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-blue-600 dark:text-blue-400 font-medium">
                    <Building2 className="w-4 h-4" />
                    {project.organization}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-5">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={!!activeVideos}
        onClose={() => setActiveVideos(null)}
        title={activeVideos?.title}
        size="xl"
      >
        {activeVideos && (
          <div className="-mx-6 -mb-6">
            {activeVideos.items.length === 1 ? (
              <VideoEmbed video={activeVideos.items[0]} rounded="rounded-b-xl" />
            ) : (
              <div className="flex flex-col">
                {/* Main player — key forces iframe remount on switch */}
                <VideoEmbed
                  key={activeVideoIdx}
                  video={activeVideos.items[activeVideoIdx]}
                  rounded=""
                />

                {/* Thumbnail strip */}
                <div className="flex gap-2 p-3 overflow-x-auto bg-gray-50 dark:bg-gray-800/60 rounded-b-xl">
                  {activeVideos.items.map((v, i) => {
                    const isActive = i === activeVideoIdx;
                    const ytId = v.type === 'youtube' ? getYoutubeId(v.embedUrl) : null;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveVideoIdx(i)}
                        className={`flex-shrink-0 w-32 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          isActive
                            ? 'border-blue-500 shadow-lg shadow-blue-200 dark:shadow-blue-900/40'
                            : 'border-transparent opacity-50 hover:opacity-90 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        {ytId ? (
                          <img
                            src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                            alt={v.title}
                            className="w-full aspect-video object-cover"
                          />
                        ) : (
                          <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <PlayCircle className="w-7 h-7 text-gray-400" />
                          </div>
                        )}
                        <p className={`text-xs px-1.5 py-1 text-center truncate bg-white dark:bg-gray-900 ${
                          isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {v.title}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};
