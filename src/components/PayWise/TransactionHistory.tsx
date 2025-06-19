import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard } from '../shared';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  recipientName: string;
  payTag: string;
  amount: number;
  memo: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();

  // Mock transaction data
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN1704123456789',
      type: 'sent',
      recipientName: 'Alice Johnson',
      payTag: '@alice456',
      amount: 250.00,
      memo: 'Dinner split',
      date: new Date('2025-06-19T14:30:00'),
      status: 'completed'
    },
    {
      id: 'TXN1704123456788',
      type: 'received',
      recipientName: 'John Smith',
      payTag: '@john123',
      amount: 500.00,
      memo: 'Rent payment',
      date: new Date('2025-06-18T09:15:00'),
      status: 'completed'
    },
    {
      id: 'TXN1704123456787',
      type: 'sent',
      recipientName: 'Bob Wilson',
      payTag: '@bob789',
      amount: 75.50,
      memo: 'Coffee',
      date: new Date('2025-06-17T16:45:00'),
      status: 'completed'
    },
    {
      id: 'TXN1704123456786',
      type: 'sent',
      recipientName: 'Alice Johnson',
      payTag: '@alice456',
      amount: 120.00,
      memo: 'Movie tickets',
      date: new Date('2025-06-16T19:20:00'),
      status: 'completed'
    },
    {
      id: 'TXN1704123456785',
      type: 'received',
      recipientName: 'John Smith',
      payTag: '@john123',
      amount: 300.00,
      memo: 'Freelance work',
      date: new Date('2025-06-15T11:30:00'),
      status: 'completed'
    }
  ]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getTransactionIcon = (transaction: Transaction) => {
    if (transaction.type === 'sent') {
      return <span className="text-red-400">↗️</span>;
    } else {
      return <span className="text-green-400">↙️</span>;
    }
  };

  const getTransactionColor = (transaction: Transaction) => {
    return transaction.type === 'sent' ? 'text-red-400' : 'text-green-400';
  };

  const handleTransactionClick = (transactionId: string) => {
    navigate(`/paywise/transaction/${transactionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-purple-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-32 h-32 bg-indigo-400/10 rounded-full animate-float delay-1000 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-blue-400/10 rounded-full animate-float delay-2000 blur-xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <GlassCard className="max-w-md w-full mx-auto">
          <div className="flex items-center justify-between">
            <Link 
              to="/paywise"
              className="text-white/60 hover:text-white transition-colors duration-200"
            >
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-white">Transaction History</h1>
            <div className="w-6"></div> {/* Spacer */}
          </div>
        </GlassCard>
      </div>

      {/* Transaction List */}
      <div className="relative z-10 flex-1 max-w-md w-full mx-auto">
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              onClick={() => handleTransactionClick(transaction.id)}
              className="glass-effect rounded-xl p-4 border border-white/20 hover:border-white/40 cursor-pointer hover:scale-[1.02] transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    {getTransactionIcon(transaction)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">
                      {transaction.type === 'sent' ? 'To ' : 'From '}
                      {transaction.recipientName}
                    </h3>
                    <p className="text-white/60 text-xs">{transaction.payTag}</p>
                    {transaction.memo && (
                      <p className="text-white/50 text-xs mt-1">{transaction.memo}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${getTransactionColor(transaction)}`}>
                    {transaction.type === 'sent' ? '-' : '+'}₿{transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-white/50 text-xs">{formatDate(transaction.date)}</p>
                  <p className="text-white/40 text-xs">{formatTime(transaction.date)}</p>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="flex justify-end mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                  transaction.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-red-400/20 text-red-400'
                }`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state (if no transactions) */}
        {transactions.length === 0 && (
          <GlassCard className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📭</span>
            </div>
            <h3 className="text-white font-semibold mb-2">No Transactions Yet</h3>
            <p className="text-white/60 text-sm mb-6">Your transaction history will appear here</p>
            <Link 
              to="/paywise/transfer"
              className="inline-block liquid-glass rounded-xl py-2 px-4 text-white font-medium hover:scale-105 transition-transform"
            >
              Send Your First Payment
            </Link>
          </GlassCard>
        )}
      </div>

      {/* Quick Actions FAB */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={() => navigate('/paywise/transfer')}
          className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 animate-glow"
        >
          <span className="text-xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;