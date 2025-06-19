import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GlassButton } from '../shared';

interface TransferData {
  payTag: string;
  recipientName: string;
  amount: string;
  memo: string;
}

const TransferFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [transferData, setTransferData] = useState<TransferData>({
    payTag: '',
    recipientName: '',
    amount: '',
    memo: ''
  });
  const [pin, setPin] = useState('');
  const [pinAttempts, setPinAttempts] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for PayTag validation
  const mockUsers = {
    '@john123': 'John Smith',
    '@alice456': 'Alice Johnson',
    '@bob789': 'Bob Wilson'
  };

  const validatePayTag = (payTag: string) => {
    if (!payTag.startsWith('@')) {
      return 'PayTag must start with @';
    }
    if (payTag.length < 4) {
      return 'PayTag must be at least 4 characters';
    }
    if (!mockUsers[payTag as keyof typeof mockUsers]) {
      return 'User not found';
    }
    return '';
  };

  const validateAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      return 'Amount must be greater than 0';
    }
    if (num > 10000) { // Mock balance limit
      return 'Amount exceeds available balance';
    }
    return '';
  };

  const handleStep1Submit = () => {
    const payTagError = validatePayTag(transferData.payTag);
    const amountError = validateAmount(transferData.amount);

    if (payTagError || amountError) {
      setErrors({
        payTag: payTagError,
        amount: amountError
      });
      return;
    }

    setErrors({});
    setTransferData(prev => ({
      ...prev,
      recipientName: mockUsers[transferData.payTag as keyof typeof mockUsers]
    }));
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const handlePinSubmit = () => {
    if (pin !== '123456') { // Mock PIN
      setPinAttempts(prev => prev + 1);
      setPin('');
      
      if (pinAttempts >= 2) {
        setErrors({ pin: 'Too many incorrect attempts. Transaction locked.' });
        return;
      }
      
      setErrors({ pin: 'Incorrect PIN. Please try again.' });
      return;
    }

    // Success - navigate to success page
    navigate('/paywise', { state: { success: true, transactionId: 'TXN' + Date.now() } });
  };

  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Send Money</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm mb-2">Recipient PayTag</label>
          <input
            type="text"
            placeholder="@username123"
            value={transferData.payTag}
            onChange={(e) => setTransferData(prev => ({ ...prev, payTag: e.target.value }))}
            className="w-full glass-effect rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/30 focus:border-white/50 focus:outline-none"
          />
          {errors.payTag && <p className="text-red-400 text-sm mt-1">{errors.payTag}</p>}
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2">Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={transferData.amount}
            onChange={(e) => setTransferData(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full glass-effect rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/30 focus:border-white/50 focus:outline-none"
          />
          {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2">Memo (Optional)</label>
          <input
            type="text"
            placeholder="What's this for?"
            value={transferData.memo}
            onChange={(e) => setTransferData(prev => ({ ...prev, memo: e.target.value }))}
            className="w-full glass-effect rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/30 focus:border-white/50 focus:outline-none"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <GlassButton 
            onClick={() => navigate('/paywise')}
            variant="glass"
            className="flex-1"
          >
            Cancel
          </GlassButton>
          <GlassButton 
            onClick={handleStep1Submit}
            variant="liquid"
            className="flex-1"
          >
            Continue
          </GlassButton>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Confirm Transfer</h2>
      
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <h3 className="text-xl font-semibold text-white">{transferData.recipientName}</h3>
          <p className="text-white/60">{transferData.payTag}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-white/80">Amount:</span>
            <span className="text-white font-semibold">₿{transferData.amount}</span>
          </div>
          {transferData.memo && (
            <div className="flex justify-between">
              <span className="text-white/80">Memo:</span>
              <span className="text-white">{transferData.memo}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <GlassButton 
          onClick={() => setStep(1)}
          variant="glass"
          className="flex-1"
        >
          Back
        </GlassButton>
        <GlassButton 
          onClick={handleConfirm}
          variant="liquid"
          className="flex-1"
        >
          Confirm
        </GlassButton>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Enter PIN</h2>
      
      <div className="text-center mb-6">
        <p className="text-white/80 mb-4">Enter your 6-digit PIN to authorize this transaction</p>
        
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-xl glass-effect border ${
                i < pin.length ? 'border-white/50' : 'border-white/20'
              } flex items-center justify-center`}
            >
              {i < pin.length && <div className="w-3 h-3 bg-white rounded-full"></div>}
            </div>
          ))}
        </div>

        {errors.pin && <p className="text-red-400 text-sm mb-4">{errors.pin}</p>}

        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num, i) => (
            <button
              key={i}
              onClick={() => {
                if (num === '⌫') {
                  setPin(prev => prev.slice(0, -1));
                } else if (num !== '' && pin.length < 6) {
                  setPin(prev => prev + num);
                }
              }}
              className={`w-16 h-16 rounded-xl glass-effect border border-white/30 text-white font-semibold hover:scale-105 transition-transform ${
                num === '' ? 'invisible' : ''
              }`}
              disabled={num === '' || (pinAttempts >= 3)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <GlassButton 
          onClick={() => setStep(2)}
          variant="glass"
          className="flex-1"
        >
          Back
        </GlassButton>
        <GlassButton 
          onClick={handlePinSubmit}
          variant="liquid"
          className="flex-1"
          disabled={pin.length !== 6 || pinAttempts >= 3}
        >
          Authorize
        </GlassButton>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-green-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-32 h-32 bg-blue-400/10 rounded-full animate-float delay-1000 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-indigo-400/10 rounded-full animate-float delay-2000 blur-xl"></div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2">
          {[1,2,3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                stepNum <= step ? 'bg-white text-blue-900' : 'glass-effect text-white/60'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && <div className={`w-12 h-0.5 ${stepNum < step ? 'bg-white' : 'bg-white/20'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <GlassCard className="max-w-md w-full mx-4 mt-16">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </GlassCard>
    </div>
  );
};

export default TransferFlow;