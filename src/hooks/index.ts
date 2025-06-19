import { useNavigate } from 'react-router';
import { useState } from 'react';

// Custom navigation hook (matches your existing pattern)
export const useCustomNavigation = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleNavigateToHello = () => {
    navigate('/hello');
  };

  const handleNavigateToPage = (path: string) => {
    navigate(path);
  };

  return {
    handleNavigateToHome,
    handleNavigateToHello,
    handleNavigateToPage
  };
};

// Animation state hook (matches your liquid glass theme)
export const useAnimationState = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  const startAnimation = () => {
    setIsAnimating(true);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  const setDelay = (delay: number) => {
    setAnimationDelay(delay);
  };

  return {
    isAnimating,
    animationDelay,
    startAnimation,
    stopAnimation,
    setDelay
  };
};

// Glass effect state hook
export const useGlassEffect = () => {
  const [glassOpacity, setGlassOpacity] = useState(0.1);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setGlassOpacity(0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setGlassOpacity(0.1);
  };

  return {
    glassOpacity,
    isHovered,
    handleMouseEnter,
    handleMouseLeave
  };
};