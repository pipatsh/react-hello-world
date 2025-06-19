// Navigation utility functions
export const navigateToPage = (navigate: (path: string) => void, path: string) => {
  navigate(path);
};

// Animation utility functions
export const handleButtonHover = (element: HTMLElement) => {
  element.style.transform = 'scale(1.05)';
};

export const handleButtonLeave = (element: HTMLElement) => {
  element.style.transform = 'scale(1)';
};

// Theme utility functions
export const getGradientBackground = (theme: 'home' | 'hello' | 'custom') => {
  const gradients = {
    home: 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900',
    hello: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
    custom: 'bg-gradient-to-br from-blue-500 to-purple-600'
  };
  return gradients[theme];
};

// Glass effect utility functions
export const getLiquidGlassClasses = () => {
  return 'liquid-glass rounded-3xl hover:scale-105 transform transition-all duration-300 hover:animate-glow';
};

export const getGlassEffectClasses = () => {
  return 'glass-effect rounded-2xl hover:scale-105 transform transition-all duration-300 border border-white/30';
};

// Animation delay utility
export const getAnimationDelay = (index: number) => {
  const delays = ['', 'delay-1000', 'delay-2000', 'delay-[3000ms]', 'delay-[4000ms]'];
  return delays[index] || '';
};