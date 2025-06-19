import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HelloWorld: React.FC = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background bubbles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full animate-float delay-1000 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-pink-400/20 rounded-full animate-float delay-2000 blur-xl"></div>
      </div>

      {/* Main liquid glass container */}
      <div className="relative z-10 liquid-glass rounded-3xl p-8 max-w-md w-full mx-4 animate-float">
        {/* Liquid morphing background */}
        <div className="absolute inset-0 bg-liquid-gradient animate-liquid rounded-3xl opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-20">
          <h1 className="text-5xl font-bold text-center text-white mb-6 animate-glow">
            Hello World! 
            <span className="block text-3xl mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ✨ Liquid Glass ✨
            </span>
          </h1>
          
          <p className="text-white/80 text-center mb-8 text-lg">
            Welcome to the future of web design with beautiful liquid glass morphism
          </p>
          
          {/* Interactive buttons */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="liquid-glass rounded-2xl py-3 px-6 text-white font-semibold hover:scale-105 transform transition-all duration-300 hover:animate-glow text-center text-decoration-none">
              🏠 Back to Home
            </Link>
            
            <button 
              onClick={handleLearnMore}
              className="glass-effect rounded-2xl py-3 px-6 text-white/90 font-medium hover:scale-105 transform transition-all duration-300 border border-white/30"
            >
              Learn More
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center mt-8 space-x-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping delay-100"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping delay-200"></div>
          </div>
        </div>
      </div>
      
      {/* Floating liquid shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 liquid-glass liquid-shape animate-liquid opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 liquid-glass liquid-shape animate-liquid delay-1000 opacity-40"></div>
    </div>
  );
};

export default HelloWorld;