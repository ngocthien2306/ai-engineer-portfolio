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
    description: 'Deep Learning, Computer Vision, NLP with TensorFlow, PyTorch, and Keras',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Event-based camera technology, eye gaze tracking, and real-time video processing',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'ASP.NET, Angular, Python, C#, with expertise in both frontend and backend',
    color: 'from-green-500 to-blue-600'
  },
  {
    icon: Cpu,
    title: 'Research & Innovation',
    description: 'Leading AI research projects and contributing to cutting-edge solutions',
    color: 'from-orange-500 to-red-600'
  },
];

const achievements = [
  {
    icon: GraduationCap,
    title: 'MS Computer Science',
    subtitle: 'National Central University (Taiwan)',
    description: 'GPA: 3.9/4.0 • Deep Learning & Media System Laboratory',
    timeline: '2024 - Present'
  },
  {
    icon: Award,
    title: 'Research Excellence',
    subtitle: 'AI Research Projects',
    description: 'Led multiple AI projects using event-based camera technology',
    timeline: '2024 - Present'
  },
  {
    icon: Target,
    title: 'Industry Recognition',
    subtitle: 'Unilever Certification',
    description: 'Achieved globally recognized certification for AI implementation',
    timeline: '2024'
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
                    Having accumulated <span className="font-semibold text-blue-600 dark:text-blue-400">3 years of software development experience</span>, 
                    with a dedicated year in Artificial Intelligence, my aspiration is to enhance expertise in AI and emerge as 
                    a prominent professional in the field.
                  </p>
                  
                  <p>
                    Currently pursuing my <span className="font-semibold text-purple-600 dark:text-purple-400">Master's in Computer Science</span> at 
                    National Central University in Taiwan, where I'm actively involved in the Deep Learning & Media System Laboratory, 
                    focusing on cutting-edge research in computer vision and AI.
                  </p>
                  
                  <p>
                    My overarching goal involves participation in <span className="font-semibold text-green-600 dark:text-green-400">cutting-edge projects</span>, 
                    applying acquired knowledge and skills to tackle intricate challenges while contributing to the AI community 
                    through knowledge sharing and collaborative development of advanced solutions.
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
                    Leading AI research projects using event-based camera technology
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Developing deep learning models for eye gaze tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Implementing real-time AI solutions for industrial applications
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
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="p-6 h-full text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${highlight.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <highlight.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </Card>
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