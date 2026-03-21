// src/components/sections/Projects.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink, Calendar, Building2, CheckCircle2, Filter } from 'lucide-react';
import { Card } from '../ui/Card';
import { projects, Project } from '@/data/mock/projects';

const statusColors: Record<Project['status'], string> = {
  Production: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Research: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Commercialized: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

const statusBorder: Record<Project['status'], string> = {
  Production: 'border-l-green-500',
  Research: 'border-l-blue-500',
  Commercialized: 'border-l-purple-500',
};

const filterOptions: Array<'all' | Project['status']> = ['all', 'Production', 'Research', 'Commercialized'];

export const Projects: React.FC = () => {
  const { ref, controls } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState<'all' | Project['status']>('all');

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
                    {project.links && project.links.length > 0 && (
                      <div className="flex gap-2 flex-shrink-0">
                        {project.links.map((link) => (
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
                    )}
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
    </section>
  );
};
