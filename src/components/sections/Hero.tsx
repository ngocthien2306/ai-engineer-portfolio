// src/components/sections/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900" />
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Currently pursuing MS at National Central University, Taiwan
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Nguyen Ngoc Thien
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-semibold">
                AI | ML Engineer
              </h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl"
            >
              Having accumulated <span className="font-semibold text-blue-600 dark:text-blue-400">3 years of software development experience</span>, 
              with a dedicated year in <span className="font-semibold text-purple-600 dark:text-purple-400">Artificial Intelligence</span>. 
              Specializing in Deep Learning, Computer Vision, and Full Stack Development.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Taoyuan City, Taiwan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-500" />
                <span>ngocthien.dev23@gmail.com</span>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
                onClick={() => window.open('/CV_Nguyen_Ngoc_Thien.pdf', '_blank')}
              >
                Download CV
              </Button>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex gap-4"
            >
              <Button
                onClick={() => window.open('https://github.com/ngocthien2306', '_blank')}
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
                className="!p-3 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-colors"
              >
                <Github className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => window.open('https://www.linkedin.com/in/nguyen-ngocthien-331ab425b', '_blank')}
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
                className="!p-3 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => window.open('tel:+886965135477', '_blank')}
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
                className="!p-3 hover:bg-green-600 hover:text-white transition-colors"
              >
                <Phone className="w-6 h-6" />
              </Button>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Year in AI/ML</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">3.9</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current GPA</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="relative lg:justify-self-end"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-2xl blur-3xl opacity-30 animate-pulse-slow" />
              
              {/* Profile image */}
              <div className="relative z-10 p-2">
                <div className="aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={`${import.meta.env.BASE_URL || './'}profile_image.jpg`}
                    alt="Nguyen Ngoc Thien - AI/ML Engineer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face';
                    }}
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              {/* <motion.div
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">AI/ML</div>
                <div className="text-xs text-gray-500">Engineer</div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="text-xs font-semibold text-purple-600 dark:text-purple-400">Taiwan</div>
                <div className="text-xs text-gray-500">Based</div>
              </motion.div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};