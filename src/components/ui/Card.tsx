import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { classNames } from '@/utils/helpers';

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white dark:bg-dark-card',
    bordered: 'bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-dark-card shadow-lg',
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <motion.div
      className={classNames(
        baseStyles,
        variants[variant],
        paddings[padding],
        hoverable && 'card-hover cursor-pointer',
        className
      )}
      whileHover={hoverable ? { y: -4 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};