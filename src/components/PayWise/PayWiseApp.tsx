import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard } from '../shared';

const PayWiseApp: React.FC = () => {
  const navigate = useNavigate();

  const handleSendMoney = () => {
    navigate('/paywise/transfer');
  };

  const handleViewHistory = () => {
    navigate('/paywise/history');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-web-green-50 to-web-green-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-web-green-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-32 h-32 bg-web-green-500/10 rounded-full animate-float delay-1000 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-web-green-300/10 rounded-full animate-float delay-2000 blur-xl"></div>
      </div>

      {/* Main content */}
      <GlassCard className="max-w-md w-full mx-4">
        <div className="text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-web-green-500 to-web-green-400 rounded-full mx-auto mb-4 flex items-center justify-center animate-glow">
              <span className="text-2xl">💳</span>
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">PayWise</h1>
            <p className="text-neutral-600 text-lg">Fast, Simple & Secure P2P Transfers</p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 mb-8">
            <button 
              onClick={handleSendMoney}
              className="w-full liquid-glass rounded-2xl py-4 px-6 text-neutral-800 font-semibold hover:scale-105 transform transition-all duration-300 hover:animate-glow flex items-center justify-center gap-3"
            >
              <span className="text-xl">📤</span>
              Send Money
            </button>
            
            <button 
              onClick={handleViewHistory}
              className="w-full glass-effect rounded-2xl py-4 px-6 text-neutral-700 font-medium hover:scale-105 transform transition-all duration-300 border border-web-green-200 flex items-center justify-center gap-3"
            >
              <span className="text-xl">📋</span>
              Transaction History
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-effect rounded-xl p-4">
              <div className="text-2xl mb-1 text-neutral-800">12</div>
              <div className="text-neutral-600 text-sm">This Month</div>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <div className="text-2xl mb-1 text-neutral-800">₿2,450</div>
              <div className="text-neutral-600 text-sm">Total Sent</div>
            </div>
          </div>

          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
          >
            <span>←</span>
            Back to Home
          </Link>
        </div>
      </GlassCard>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-24 h-24 liquid-glass liquid-shape animate-liquid opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 liquid-glass liquid-shape animate-liquid delay-1000 opacity-30"></div>
    </div>
  );
};

export default PayWiseApp;