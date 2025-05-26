import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const { ref, controls } = useScrollAnimation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container-max section-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Hi, I'm <span className="gradient-text">Your Name</span>
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300">
                Full Stack Developer
              </h2>
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Passionate about creating exceptional digital experiences with modern web technologies.
              Specializing in React, Node.js, and cloud architecture.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
              >
                Download CV
              </Button>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex gap-4"
            >
              <Button
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
                className="!p-2"
              >
                <Github className="w-6 h-6" />
              </Button>
              <Button
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
                className="!p-2"
              >
                <Linkedin className="w-6 h-6" />
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="relative z-10 w-full rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};