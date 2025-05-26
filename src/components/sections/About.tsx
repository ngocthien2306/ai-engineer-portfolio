import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Code, Palette, Rocket, Users } from 'lucide-react';
import { Card } from '../ui/Card';

const highlights = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code following best practices',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating beautiful and intuitive user interfaces',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimizing applications for speed and efficiency',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working effectively in agile teams',
  },
];

export const About: React.FC = () => {
  const { ref, controls } = useScrollAnimation();
  
  return (
    <section id="about" className="py-20">
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
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get to know more about my journey and what drives me
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-600 dark:text-gray-400">
                I'm a passionate Full Stack Developer with over 5 years of experience in building 
                web applications. My journey in tech started with a curiosity about how things work 
                on the internet, and it has evolved into a career I truly love.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                I specialize in JavaScript technologies, particularly React and Node.js, but I'm 
                always eager to learn new tools and frameworks. I believe in writing clean, 
                maintainable code and creating user experiences that make a difference.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open source projects, or sharing my knowledge through blog posts and mentoring.
              </p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map((item, index) => (
                <Card
                  key={index}
                  variant="bordered"
                  padding="sm"
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-10 h-10 mx-auto mb-3 text-primary-600" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </Card>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};