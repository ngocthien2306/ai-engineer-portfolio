import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Brain,
  Code,
  Cpu,
  Cloud,
  MessageSquare,
  CheckCircle,
  Filter
} from 'lucide-react';
import { Card } from '../ui/Card';
import { skills, Skill } from '@/data/static/skills';

const categoryIcons = {
  ai_ml: Brain,
  multimodal_llm: MessageSquare,
  edge_ai: Cpu,
  fullstack: Code,
  devops_cloud: Cloud,
};

const categoryColors = {
  ai_ml: 'from-purple-500 to-pink-600',
  multimodal_llm: 'from-violet-500 to-purple-700',
  edge_ai: 'from-orange-500 to-red-600',
  fullstack: 'from-blue-500 to-cyan-600',
  devops_cloud: 'from-green-500 to-emerald-600',
};

const categoryNames = {
  ai_ml: 'AI / ML',
  multimodal_llm: 'Multimodal / LLM',
  edge_ai: 'Edge AI & Hardware',
  fullstack: 'Full-Stack',
  devops_cloud: 'DevOps / Cloud',
};

export const Skills: React.FC = () => {
  const { ref, controls } = useScrollAnimation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'ai_ml', 'multimodal_llm', 'edge_ai', 'fullstack', 'devops_cloud'] as const;
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const SkillTag: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
    const IconComponent = categoryIcons[skill.category];

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`bg-gradient-to-r ${categoryColors[skill.category]} p-3 rounded-xl text-white hover:shadow-lg transition-shadow duration-300`}>
          <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-sm">{skill.name}</span>
            {skill.verified && (
              <CheckCircle className="w-4 h-4 text-white/80 flex-shrink-0" />
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const CategoryCard: React.FC<{ category: keyof typeof categoryIcons; skills: Skill[] }> = ({ category, skills: categorySkills }) => {
    const IconComponent = categoryIcons[category];
    const verifiedSkills = categorySkills.filter(skill => skill.verified).length;
    
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${categoryColors[category]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {categoryNames[category]}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {categorySkills.length} skills
              </p>
            </div>
          </div>
          
          {/* {verifiedSkills > 0 && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">LinkedIn Verified</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-white">{verifiedSkills}</span>
            </div>
          )} */}
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
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
              Technical <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My expertise across AI, programming, and web development
            </p>
          </motion.div>

          {/* Skills Overview Cards */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
          >
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <CategoryCard
                key={category}
                category={category as keyof typeof categoryIcons}
                skills={categorySkills}
              />
            ))}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => {
              const IconComponent = category === 'all' ? Filter : categoryIcons[category as keyof typeof categoryIcons];
              const isActive = selectedCategory === category;
              
              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  <span className="capitalize">
                    {category === 'all' ? 'All Skills' : categoryNames[category as keyof typeof categoryNames]}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category === 'all' ? skills.length : skillsByCategory[category]?.length || 0}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills Tags Grid */}
          <div className="flex flex-wrap gap-3 justify-center">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <SkillTag key={`${skill.name}-${skill.category}`} skill={skill} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* Simple Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold mb-2">{skills.length}</div>
                  <p className="text-blue-100">Total Skills</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">
                    {skills.filter(skill => skill.verified).length}
                  </div>
                  <p className="text-blue-100">LinkedIn Verified</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{Object.keys(skillsByCategory).length}</div>
                  <p className="text-blue-100">Categories</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};