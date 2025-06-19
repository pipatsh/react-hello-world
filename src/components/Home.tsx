import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate('/hello');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-emerald-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-32 h-32 bg-cyan-400/10 rounded-full animate-float delay-1000 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-teal-400/10 rounded-full animate-float delay-2000 blur-xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 liquid-glass rounded-3xl p-12 max-w-2xl w-full mx-4 animate-float">
        {/* Liquid morphing background */}
        <div className="absolute inset-0 bg-liquid-gradient animate-liquid rounded-3xl opacity-30"></div>
        
        {/* Content */}
        <div className="relative z-20 text-center">
          <h1 className="text-6xl font-bold text-white mb-4 animate-glow">
            Welcome Home
            <span className="block text-2xl mt-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              🏠 Your Digital Space
            </span>
          </h1>
          
          <p className="text-white/80 text-xl mb-12 leading-relaxed">
            Experience the perfect blend of modern design and liquid glass aesthetics. 
            Navigate through our beautiful interface with smooth transitions.
          </p>
          
          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/hello" className="liquid-glass rounded-2xl py-4 px-8 text-white font-semibold hover:scale-105 transform transition-all duration-300 hover:animate-glow text-decoration-none">
              👋 Visit Hello World
            </Link>
            
            <button 
              onClick={handleExploreMore}
              className="glass-effect rounded-2xl py-4 px-8 text-white/90 font-medium hover:scale-105 transform transition-all duration-300 border border-white/30"
            >
              🚀 Explore More
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="glass-effect rounded-xl p-4">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="text-white font-semibold mb-2">Liquid Glass</h3>
              <p className="text-white/70 text-sm">Modern glassmorphism design</p>
            </div>
            
            <div className="glass-effect rounded-xl p-4">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="text-white font-semibold mb-2">Tailwind CSS</h3>
              <p className="text-white/70 text-sm">Beautiful utility-first CSS</p>
            </div>
            
            <div className="glass-effect rounded-xl p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-white font-semibold mb-2">React Router</h3>
              <p className="text-white/70 text-sm">Smooth page transitions</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-24 h-24 liquid-glass liquid-shape animate-liquid opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 liquid-glass liquid-shape animate-liquid delay-1000 opacity-30"></div>
    </div>
  );
};

export default Home;