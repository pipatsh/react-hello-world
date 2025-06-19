import React from 'react';
import { Link } from 'react-router-dom';
import { useCustomNavigation, useGlassEffect } from '../hooks';
import { GlassButton, GlassCard, FeatureHighlight } from './shared';

const Home: React.FC = () => {
  const { handleNavigateToHello } = useCustomNavigation();
  const { handleMouseEnter, handleMouseLeave } = useGlassEffect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-web-green-50 to-web-green-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-web-green-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-32 h-32 bg-web-green-500/10 rounded-full animate-float delay-1000 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-web-green-300/10 rounded-full animate-float delay-2000 blur-xl"></div>
      </div>

      {/* Main content */}
      <GlassCard className="max-w-2xl w-full mx-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-neutral-900 mb-4 animate-glow">
            Welcome Home
            <span className="block text-2xl mt-4 bg-gradient-to-r from-web-green-500 via-web-green-400 to-web-green-300 bg-clip-text text-transparent">
              🏠 Your Digital Space
            </span>
          </h1>
          
          <p className="text-neutral-600 text-xl mb-12 leading-relaxed">
            Experience the perfect blend of modern design and liquid glass aesthetics. 
            Navigate through our beautiful interface with smooth transitions.
          </p>
          
          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link to="/hello" className="liquid-glass rounded-2xl py-4 px-8 text-neutral-800 font-semibold hover:scale-105 transform transition-all duration-300 hover:animate-glow text-decoration-none">
              👋 Visit Hello World
            </Link>
            
            <Link to="/paywise" className="liquid-glass rounded-2xl py-4 px-8 text-neutral-800 font-semibold hover:scale-105 transform transition-all duration-300 hover:animate-glow text-decoration-none">
              💳 PayWise App
            </Link>
            
            <GlassButton 
              onClick={handleNavigateToHello}
              variant="glass"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              🚀 Explore More
            </GlassButton>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <FeatureHighlight 
              icon="✨"
              title="Liquid Glass"
              description="Modern glassmorphism design"
            />
            <FeatureHighlight 
              icon="💳"
              title="PayWise P2P"
              description="Fast & secure transfers"
            />
            <FeatureHighlight 
              icon="⚡"
              title="React Router"
              description="Smooth page transitions"
            />
          </div>
        </div>
      </GlassCard>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-24 h-24 liquid-glass liquid-shape animate-liquid opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 liquid-glass liquid-shape animate-liquid delay-1000 opacity-30"></div>
    </div>
  );
};

export default Home;