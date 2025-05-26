import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';
import { useEffect } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
}: UseScrollAnimationProps = {}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  return { ref, controls, inView };
};