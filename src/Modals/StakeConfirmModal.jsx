import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X, TrendingUp, Clock, DollarSign, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StakeConfirmModal = ({ isOpen, onClose, stakeData, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirmStake = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate staking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create transaction record for history
      const transaction = {
        id: `stake_${Date.now()}`,
        type: "stake",
        amount: stakeData?.amount,
        goal: stakeData?.goal,
        status: "confirmed",
        date: new Date().toISOString(),
        transactionId: `STK${Date.now().toString().slice(-6)}`,
        expectedReturn: stakeData?.expectedReturn || (stakeData?.amount * 2),
        expectedProfit: stakeData?.expectedProfit || stakeData?.amount
      };
      
      // Save transaction to localStorage for demo purposes
      const existingTransactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
      existingTransactions.unshift(transaction); // Add to beginning of array
      localStorage.setItem('userTransactions', JSON.stringify(existingTransactions));
      
      // Update wallet balance for demo (deduct staked amount)
      const currentWallet = JSON.parse(localStorage.getItem('mockWallet') || '{}');
      if (currentWallet.balance) {
        currentWallet.balance = Math.max(0, currentWallet.balance - stakeData?.amount);
        localStorage.setItem('mockWallet', JSON.stringify(currentWallet));
      }
      
      // Call the onConfirm callback if provided
      if (onConfirm) {
        await onConfirm(stakeData);
      }
      
      setIsSuccess(true);
      
      // Auto redirect to dashboard after success
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(false);
        onClose();
        navigate('/app/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error("Staking failed:", error);
      setIsProcessing(false);
      // Handle error - could show error state
    }
  };

  const expectedReturn = stakeData?.amount ? stakeData.amount * 2 : 0; // 100% ROI
  const expectedProfit = stakeData?.amount ? stakeData.amount : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold focus:outline-none z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            // Success State
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Stake Successful!</h3>
              <p className="text-slate-300 mb-2">
                Your ${stakeData?.amount} USDT has been successfully staked.
              </p>
              <p className="text-blue-400 text-sm">
                Redirecting to dashboard...
              </p>
            </div>
          ) : isProcessing ? (
            // Processing State
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-400 border-t-transparent"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Processing Stake...</h3>
              <p className="text-slate-300">
                Please wait while we process your staking request.
              </p>
            </div>
          ) : (
            // Confirmation State
            <>
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Confirm Your Stake</h3>
                <p className="text-slate-300">
                  Please review your staking details before confirming.
                </p>
              </div>

              {/* Stake Details */}
              <div className="bg-slate-700/50 rounded-xl p-4 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="w-4 h-4" />
                    <span>Stake Amount</span>
                  </div>
                  <span className="text-white font-semibold">${stakeData?.amount} USDT</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Target className="w-4 h-4" />
                    <span>Goal</span>
                  </div>
                  <span className="text-white font-semibold">{stakeData?.goal}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <TrendingUp className="w-4 h-4" />
                    <span>Expected Profit</span>
                  </div>
                  <span className="text-green-400 font-semibold">${expectedProfit.toLocaleString()} USDT</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4" />
                    <span>Total Return</span>
                  </div>
                  <span className="text-blue-400 font-semibold">${expectedReturn.toLocaleString()} USDT</span>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3 mb-6">
                <p className="text-yellow-200 text-sm">
                  ⚠️ Once confirmed, your staked funds will be locked. Only rewards will be available for withdrawal.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmStake}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Confirm Stake
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StakeConfirmModal;
