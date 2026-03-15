// src/components/sections/Education.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { GraduationCap, Calendar, Star, BookOpen, ImageOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { educations } from '@/data/static/experience';

const schoolColors = [
  'from-blue-500 to-purple-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-red-500',
];

const SLIDE_INTERVAL = 3000;

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const validImages = images.filter((_, i) => !failedImages.has(i));

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next, images.length]);

  // Reset to 0 when images change (different card)
  useEffect(() => { setCurrent(0); }, [images]);

  const handleError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const allFailed = validImages.length === 0;

  return (
    <div
      className="relative w-full h-full min-h-[220px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image area */}
      <div className="relative flex-1 overflow-hidden">
        {allFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-600">
            <ImageOff className="w-10 h-10" />
            <span className="text-xs">No images yet</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`slide-${current + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onError={() => handleError(current)}
            />
          </AnimatePresence>
        )}

        {/* Pause indicator */}
        {paused && !allFailed && images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
            paused
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {!allFailed && images.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-4 h-2 bg-blue-500'
                  : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-blue-300'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Education: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Education</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Academic background that built my foundation in computer science and AI
            </p>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-8">
            {educations.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <div className="grid md:grid-cols-2 gap-0">

                    {/* Left — Info */}
                    <div className="p-6 md:p-8 flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* School + GPA */}
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${schoolColors[index]} flex items-center justify-center flex-shrink-0`}>
                            <GraduationCap className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                              {edu.school}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mt-0.5">
                              {edu.degree} · {edu.field}
                            </p>
                          </div>
                        </div>

                        {/* GPA Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-full">
                          <Star className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" />
                          <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                            GPA {edu.gpa}/{edu.gpaScale}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.startDate} – {edu.endDate}</span>
                        </div>

                        {/* Description */}
                        {edu.description && (
                          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                            <p>{edu.description}</p>
                          </div>
                        )}
                      </div>

                      {/* Activities */}
                      {edu.activities && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                          {edu.activities.split(', ').map((activity, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right — Image Slider */}
                    <div className="p-4 md:p-6 flex items-stretch bg-gray-50 dark:bg-gray-800/50">
                      {edu.images && edu.images.length > 0 ? (
                        <ImageSlider images={edu.images} />
                      ) : (
                        <div className="w-full min-h-[220px] rounded-xl bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-600">
                          <ImageOff className="w-10 h-10" />
                          <span className="text-xs">No images yet</span>
                        </div>
                      )}
                    </div>

                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
