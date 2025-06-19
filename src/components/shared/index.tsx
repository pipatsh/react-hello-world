import React from 'react';

// Glass Button Component (matches your existing button style)
interface GlassButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'liquid' | 'glass';
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'liquid',
  className = '',
  onMouseEnter,
  onMouseLeave,
  disabled = false
}) => {
  const baseClasses = variant === 'liquid' 
    ? 'liquid-glass rounded-2xl py-3 px-6 text-white font-semibold hover:scale-105 transform transition-all duration-300 hover:animate-glow'
    : 'glass-effect rounded-2xl py-3 px-6 text-white/90 font-medium hover:scale-105 transform transition-all duration-300 border border-white/30';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : '';

  return (
    <button 
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? undefined : onMouseEnter}
      onMouseLeave={disabled ? undefined : onMouseLeave}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

// Glass Card Component (matches your existing card style)
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  animated = true 
}) => {
  const animationClass = animated ? 'animate-float' : '';
  
  return (
    <div className={`relative liquid-glass rounded-3xl p-8 ${animationClass} ${className}`}>
      <div className="absolute inset-0 bg-liquid-gradient animate-liquid rounded-3xl opacity-50"></div>
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

// Feature Highlight Component (matches your existing feature grid)
interface FeatureHighlightProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="glass-effect rounded-xl p-4">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
};