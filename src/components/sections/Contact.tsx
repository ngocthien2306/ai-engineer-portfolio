// src/components/sections/Contact.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Mail, Phone, MapPin, Github, Linkedin, Download, BadgeCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { CONTACT, AVAILABILITY, CV_URL } from '@/config/constants';

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: 'Fastest way to reach me',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'nguyen-ngoc-thien',
    href: CONTACT.linkedin,
    note: 'Work history and recommendations',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'ngocthien2306',
    href: CONTACT.github,
    note: 'Code behind the personal projects',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    note: 'Taiwan number, UTC+8',
  },
];

export const Contact: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-max section-padding">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Section Header */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Get in{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                touch
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Email is the fastest way to reach me. I read everything and reply within a couple of days.
            </p>
          </motion.div>

          {/* Availability */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/60">
              <BadgeCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{AVAILABILITY.status}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  {AVAILABILITY.detail}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Channels */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
              >
                <Card className="p-5 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                      <channel.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {channel.label}
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium truncate">
                        {channel.value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{channel.note}</p>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </motion.div>

          {/* Location + CV */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{CONTACT.location}</span>
            </div>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
