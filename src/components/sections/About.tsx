// src/components/sections/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Brain, 
  Code, 
  Eye, 
  Cpu, 
  GraduationCap, 
  Award,
  MapPin,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import { Card } from '../ui/Card';

const highlights = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'YOLO, TensorRT, ONNX, PyTorch, TensorFlow — production AI systems at 99%+ accuracy in real factory environments',
    color: 'from-blue-500 to-purple-600',
    glow: 'rgba(99,102,241,0.35)',
    border: 'group-hover:border-blue-400 dark:group-hover:border-blue-500',
    shadow: '0 16px 40px rgba(99,102,241,0.3)',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Event-based cameras, eye gaze tracking (5-6° → 1-2.5°), real-time inference on Jetson edge devices',
    color: 'from-purple-500 to-pink-600',
    glow: 'rgba(217,70,239,0.35)',
    border: 'group-hover:border-pink-400 dark:group-hover:border-pink-500',
    shadow: '0 16px 40px rgba(217,70,239,0.3)',
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'FastAPI, React, TypeScript, Angular, C#, .NET 8 — end-to-end dashboards and AI-integrated platforms',
    color: 'from-green-500 to-blue-600',
    glow: 'rgba(34,197,94,0.35)',
    border: 'group-hover:border-green-400 dark:group-hover:border-green-500',
    shadow: '0 16px 40px rgba(34,197,94,0.3)',
  },
  {
    icon: Cpu,
    title: 'VLM / LLM & Agentic AI',
    description: 'Researching Qwen2-VL, LLaVA, VILA for multi-camera scene understanding and agentic AI applications',
    color: 'from-orange-500 to-red-600',
    glow: 'rgba(249,115,22,0.35)',
    border: 'group-hover:border-orange-400 dark:group-hover:border-orange-500',
    shadow: '0 16px 40px rgba(249,115,22,0.3)',
  },
];

const achievements = [
  {
    icon: GraduationCap,
    title: 'MS Computer Science',
    subtitle: 'National Central University (Taiwan)',
    description: 'GPA: 93/100 • Deep Learning & Media System Laboratory • Expected Jun 2026',
    timeline: '2024 - Present'
  },
  {
    icon: Award,
    title: 'Research Excellence',
    subtitle: 'NCU Deep Learning Lab',
    description: 'Eye gaze angular error reduced from 5-6° to 1-2.5° (~70% improvement); AVSR pipeline 10× throughput',
    timeline: '2024 - Present'
  },
  {
    icon: Target,
    title: 'Production AI Deployment',
    subtitle: 'Suntech Automation — Global Agri-Commodity Facility',
    description: '100% manual QC replaced across 7+ production lines — 99%+ accuracy, 0.4% FPR at 70-180 products/min',
    timeline: '2025-2026'
  },
];

export const About: React.FC = () => {
  const { ref, controls } = useScrollAnimation();
  
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
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
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate AI/ML Engineer with a dedication to pushing the boundaries of artificial intelligence and creating impactful solutions
            </p>
          </motion.div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Left Column - Story & Journey */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Journey</h3>
                
                <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    With <span className="font-semibold text-blue-600 dark:text-blue-400">over 4 years of software development experience</span> and
                    more than <span className="font-semibold text-blue-600 dark:text-blue-400">2 years specializing in Artificial Intelligence</span>,
                    I have built a solid foundation in both engineering fundamentals and cutting-edge AI technologies.
                  </p>

                  <p>
                    As a <span className="font-semibold text-purple-600 dark:text-purple-400">solo developer</span>, I commercialized{' '}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">i-PPE</span> — an ISO 45001-compliant workplace safety product
                    deployed across multiple factories — and architected an AI QA/QC system at a{' '}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">global agri-commodity processing facility</span> that replaced 100% of manual inspection
                    across 7+ production lines, achieving{' '}
                    <span className="font-semibold text-green-600 dark:text-green-400">99%+ accuracy</span> and{' '}
                    <span className="font-semibold text-green-600 dark:text-green-400">0.4% false positive rate</span>.
                  </p>

                  <p>
                    Currently pursuing my <span className="font-semibold text-green-600 dark:text-green-400">Master's in Computer Science</span> at
                    National Central University in Taiwan, researching VLM/LLM, agentic AI, and multimodal systems at the{' '}
                    Deep Learning & Media System Laboratory — pushing the boundaries of computer vision and building AI that creates real-world impact.
                  </p>
                </div>
              </div>
              
              {/* Current Focus */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Current Focus</h4>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Eye gaze estimation with PROPHESEE EVS camera (5-6° → 1-2.5° error, &lt;50ms latency)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Multi-camera VLM/LLM scene understanding (Qwen2-VL, LLaVA, VILA)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Building agentic AI and multimodal systems for real-world deployment
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Right Column - Achievements Timeline */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Key Achievements</h3>
              
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="relative"
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <achievement.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                              {achievement.timeline}
                            </span>
                          </div>
                          <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                            {achievement.subtitle}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Expertise Highlights */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            className="space-y-12"
          >
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Areas of Expertise</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Specialized skills and technologies I work with to create innovative AI solutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover="hover"
                  className="group"
                >
                  {/* Lift wrapper */}
                  <motion.div
                    variants={{
                      hover: { y: -12, transition: { duration: 0.25, ease: 'easeOut' } },
                    }}
                    className="h-full"
                  >
                    {/* Glow halo */}
                    <motion.div
                      variants={{ hover: { opacity: 1, scale: 1.08 } }}
                      initial={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 rounded-2xl blur-xl pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at center, ${highlight.glow}, transparent 70%)` }}
                    />

                    <Card className={`relative p-6 h-full text-center overflow-hidden border-2 border-transparent ${highlight.border} transition-colors duration-300`}
                      style={{ '--tw-shadow': 'none' } as React.CSSProperties}
                    >
                      {/* Shimmer sweep */}
                      <motion.div
                        variants={{
                          hover: {
                            x: ['−110%', '210%'],
                            transition: { duration: 0.55, ease: 'easeInOut' },
                          },
                        }}
                        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-0"
                        style={{ x: '-110%' }}
                      />

                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          variants={{
                            hover: {
                              scale: 1.2,
                              rotate: -8,
                              transition: { type: 'spring', stiffness: 350, damping: 10 },
                            },
                          }}
                          className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${highlight.color} flex items-center justify-center shadow-lg`}
                        >
                          <highlight.icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <motion.h4
                          variants={{ hover: { scale: 1.04, transition: { duration: 0.2 } } }}
                          className="text-xl font-semibold mb-3 text-gray-900 dark:text-white"
                        >
                          {highlight.title}
                        </motion.h4>

                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {highlight.description}
                        </p>
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
              <h3 className="text-2xl font-bold mb-4">Let's Build the Future Together</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                I'm always excited to collaborate on innovative AI projects and contribute to meaningful technological advancements.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Start a Conversation
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};