import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  message = 'Loading...',
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`${sizes[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
        <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent" />
      </motion.div>
      {message && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }
  
  return content;
};