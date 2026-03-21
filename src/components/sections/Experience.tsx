// src/components/sections/Experience.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Calendar, 
  MapPin, 
  ChevronRight,
  Brain,
  Code,
  Database,
  Cpu,
  ExternalLink,
  Award,
  Star
} from 'lucide-react';
import { Card } from '../ui/Card';
import { experiences, certifications } from '@/data/static/experience';

const typeIcons = {
  research: Brain,
  ai: Cpu,
  fullstack: Code,
  software: Database
};

const typeColors = {
  research: 'from-purple-500 to-pink-600',
  ai: 'from-blue-500 to-cyan-600', 
  fullstack: 'from-green-500 to-emerald-600',
  software: 'from-orange-500 to-red-600'
};

export const Experience: React.FC = () => {
  const { ref, controls } = useScrollAnimation();
  const [selectedExp, setSelectedExp] = useState<number>(1);

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
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
              Work <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My professional journey spanning research, AI development, and full-stack engineering
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* Left Panel - Experience List */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              className="lg:col-span-1"
            >
              <div className="space-y-4">
                {experiences.map((exp, index) => {
                  const IconComponent = typeIcons[exp.type];
                  const isSelected = selectedExp === exp.id;
                  
                  return (
                    <motion.div
                      key={exp.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ scale: 1.02 }}
                      className={`cursor-pointer transition-all duration-300 ${
                        isSelected ? 'transform translate-x-2' : ''
                      }`}
                      onClick={() => setSelectedExp(exp.id)}
                    >
                      <Card className={`p-4 border-l-4 ${
                        isSelected 
                          ? `border-l-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg` 
                          : 'border-l-gray-300 dark:border-l-gray-600 hover:border-l-blue-400'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${typeColors[exp.type]} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-sm ${
                              isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                            }`}>
                              {exp.title}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {exp.company}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {exp.startDate} - {exp.endDate}
                            </p>
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            isSelected ? 'rotate-90 text-blue-500' : 'text-gray-400'
                          }`} />
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Panel - Experience Details */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
              className="lg:col-span-2"
            >
              {experiences.map((exp) => {
                const IconComponent = typeIcons[exp.type];
                
                if (exp.id !== selectedExp) return null;
                
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-8 h-full">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${typeColors[exp.type]} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                            {exp.company}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.startDate} - {exp.endDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      {exp.highlights && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            Key Achievements
                          </h4>
                          <div className="space-y-2">
                            {exp.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                <p className="text-gray-700 dark:text-gray-300 font-medium">
                                  {highlight}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Responsibilities & Achievements
                        </h4>
                        <div className="space-y-3">
                          {exp.description.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Technologies & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Certifications Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Award className="w-8 h-8 text-yellow-500" />
                Certifications & Achievements
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Professional certifications and learning achievements that validate my expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover="hover"
                  className="group cursor-default"
                >
                  {/* Lift wrapper */}
                  <motion.div
                    variants={{
                      hover: { y: -10, transition: { duration: 0.25, ease: 'easeOut' } },
                    }}
                    className="h-full"
                  >
                    {/* Glow halo */}
                    <motion.div
                      variants={{
                        hover: { opacity: 1, scale: 1.05 },
                      }}
                      initial={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/25 to-orange-500/25 blur-xl pointer-events-none"
                    />

                    <Card className="relative p-4 h-full overflow-hidden border-2 border-transparent group-hover:border-yellow-300 dark:group-hover:border-yellow-600 transition-colors duration-300 group-hover:shadow-[0_12px_32px_rgba(234,179,8,0.25)]">

                      {/* Shimmer sweep */}
                      <motion.div
                        variants={{
                          hover: {
                            x: ['−100%', '200%'],
                            transition: { duration: 0.55, ease: 'easeInOut' },
                          },
                        }}
                        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-0"
                        style={{ x: '-100%' }}
                      />

                      <div className="relative z-10 flex items-start gap-3">
                        {/* Icon badge */}
                        <motion.div
                          variants={{
                            hover: {
                              scale: 1.25,
                              rotate: 12,
                              transition: { type: 'spring', stiffness: 400, damping: 12 },
                            },
                          }}
                          className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
                        >
                          <Award className="w-5 h-5 text-white" />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <motion.h4
                            variants={{
                              hover: { color: '#b45309' },
                            }}
                            className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2 transition-colors"
                          >
                            {cert.name}
                          </motion.h4>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                            {cert.issuer}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {cert.date}
                            </p>
                            {cert.verifyUrl ? (
                              <motion.a
                                href={cert.verifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                variants={{
                                  hover: { scale: 1.1 },
                                }}
                                className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:text-green-700 font-medium"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Verify
                              </motion.a>
                            ) : (
                              <span className="text-xs text-gray-400 dark:text-gray-500 italic">—</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, innovative projects, and ways to contribute to meaningful AI solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <span>Get In Touch</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('/CV_Nguyen_Ngoc_Thien.pdf', '_blank')}
                  className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Download Resume
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};