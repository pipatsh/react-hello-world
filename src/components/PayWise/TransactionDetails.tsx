import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GlassCard, GlassButton } from '../shared';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  recipientName: string;
  senderName: string;
  payTag: string;
  amount: number;
  memo: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock transaction data - in real app, this would come from API
  const mockTransactions: Record<string, Transaction> = {
    'TXN1704123456789': {
      id: 'TXN1704123456789',
      type: 'sent',
      recipientName: 'Alice Johnson',
      senderName: 'You',
      payTag: '@alice456',
      amount: 250.00,
      memo: 'Dinner split',
      date: new Date('2025-06-19T14:30:00'),
      status: 'completed'
    },
    'TXN1704123456788': {
      id: 'TXN1704123456788',
      type: 'received',
      recipientName: 'You',
      senderName: 'John Smith',
      payTag: '@john123',
      amount: 500.00,
      memo: 'Rent payment',
      date: new Date('2025-06-18T09:15:00'),
      status: 'completed'
    }
  };

  const transaction = id ? mockTransactions[id] : null;

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-4">Transaction Not Found</h2>
          <p className="text-white/80 mb-6">The transaction you're looking for doesn't exist.</p>
          <Link 
            to="/paywise/history"
            className="inline-block liquid-glass rounded-xl py-3 px-6 text-white font-semibold hover:scale-105 transition-transform"
          >
            Back to History
          </Link>
        </GlassCard>
      </div>
    );
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSaveReceipt = () => {
    // In a real app, this would generate and download an image of the receipt
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'failed': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTransactionIcon = () => {
    if (transaction.type === 'sent') {
      return { icon: '📤', color: 'from-red-400 to-pink-400' };
    } else {
      return { icon: '📥', color: 'from-green-400 to-blue-400' };
    }
  };

  const iconData = getTransactionIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-web-green-50 to-web-green-100 flex flex-col p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-web-green-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-32 h-32 bg-web-green-500/10 rounded-full animate-float delay-1000 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-web-green-300/10 rounded-full animate-float delay-2000 blur-xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <GlassCard className="max-w-md w-full mx-auto">
          <div className="flex items-center justify-between">
            <Link 
              to="/paywise/history"
              className="text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
            >
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-neutral-900">Transaction Details</h1>
            <div className="w-6"></div>
          </div>
        </GlassCard>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="relative z-20 max-w-md w-full mx-auto mb-4">
          <div className="glass-effect rounded-xl p-4 border border-success/50 bg-success/10">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-success font-semibold">Receipt Saved!</p>
                <p className="text-neutral-700 text-sm">E-Slip saved to your device</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Details Card */}
      <div className="relative z-10 max-w-md w-full mx-auto">
        <GlassCard>
          {/* Status & Amount */}
          <div className="text-center mb-6">
            <div className={`w-20 h-20 bg-gradient-to-r ${iconData.color} rounded-full mx-auto mb-4 flex items-center justify-center animate-glow`}>
              <span className="text-3xl">{iconData.icon}</span>
            </div>
            
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getStatusColor(transaction.status)}`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </div>
            
            <h2 className={`text-3xl font-bold mb-2 ${transaction.type === 'sent' ? 'text-error' : 'text-success'}`}>
              {transaction.type === 'sent' ? '-' : '+'}₿{transaction.amount.toFixed(2)}
            </h2>
            
            <p className="text-neutral-600">
              {transaction.type === 'sent' ? 'Sent to ' : 'Received from '}
              <span className="font-semibold text-neutral-800">
                {transaction.type === 'sent' ? transaction.recipientName : transaction.senderName}
              </span>
            </p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="glass-effect rounded-xl p-4">
              <h3 className="text-neutral-800 font-semibold mb-3">Transaction Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Transaction ID:</span>
                  <span className="text-neutral-800 font-mono text-sm">{transaction.id}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">PayTag:</span>
                  <span className="text-neutral-800">{transaction.payTag}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Date & Time:</span>
                  <span className="text-neutral-800 text-sm">{formatDateTime(transaction.date)}</span>
                </div>
                
                {transaction.memo && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Memo:</span>
                    <span className="text-neutral-800">{transaction.memo}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Type:</span>
                  <span className="text-neutral-800 capitalize">{transaction.type}</span>
                </div>
              </div>
            </div>

            {/* E-Slip Section */}
            <div className="glass-effect rounded-xl p-4">
              <h3 className="text-neutral-800 font-semibold mb-3">Digital Receipt (E-Slip)</h3>
              <p className="text-neutral-600 text-sm mb-4">
                Save this transaction as a digital receipt for your records
              </p>
              
              <GlassButton 
                onClick={handleSaveReceipt}
                variant="liquid"
                className="w-full flex items-center justify-center gap-2"
              >
                <span>💾</span>
                Save E-Slip
              </GlassButton>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <GlassButton 
                onClick={() => navigate('/paywise/history')}
                variant="glass"
                className="flex-1"
              >
                View History
              </GlassButton>
              
              <GlassButton 
                onClick={() => navigate('/paywise/transfer')}
                variant="liquid"
                className="flex-1"
              >
                Send Again
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-24 h-24 liquid-glass liquid-shape animate-liquid opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 liquid-glass liquid-shape animate-liquid delay-1000 opacity-30"></div>
    </div>
  );
};

export default TransactionDetails;