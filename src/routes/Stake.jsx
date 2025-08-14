import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import StakeConfirmModal from "../Modals/StakeConfirmModal";
import { 
  ArrowLeft,
  Target,
  DollarSign,
  Calendar,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertTriangle,
  Wallet,
  Star,
  Zap,
  Trophy,
  Calculator,
  Sparkles,
  Crown,
  Heart,
  Home,
  Car,
  GraduationCap,
  Plane,
  Briefcase,
  ChevronRight,
  Clock
} from "lucide-react";


const Stake = () => {
  const { user, token } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [walletLoading, setWalletLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [depositData, setDepositData] = useState(null);
  const [goal, setGoal] = useState("");
  const [loading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Predefined goal templates for easy selection
  const goalTemplates = [
    { name: "Emergency Fund", icon: Shield, color: "from-green-500 to-emerald-600", description: "Build financial security" },
    { name: "Dream Home", icon: Home, color: "from-blue-500 to-indigo-600", description: "Save for your perfect home" },
    { name: "New Car", icon: Car, color: "from-purple-500 to-violet-600", description: "Get your dream vehicle" },
    { name: "Education", icon: GraduationCap, color: "from-yellow-500 to-orange-500", description: "Invest in knowledge" },
    { name: "Vacation", icon: Plane, color: "from-cyan-500 to-blue-500", description: "Travel the world" },
    { name: "Business", icon: Briefcase, color: "from-red-500 to-pink-500", description: "Start your venture" },
    { name: "Wedding", icon: Heart, color: "from-pink-500 to-rose-500", description: "Special day funds" },
    { name: "Retirement", icon: Crown, color: "from-orange-500 to-yellow-500", description: "Golden years planning" }
  ];

  // Estimated earnings calculator
  const calculateEstimatedEarnings = (investAmount) => {
    // 200% ROI means 2x return (capital + profit)
    // So profit = original amount (100% profit on top of capital)
    return investAmount; // This is the profit only
  };

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        setWalletLoading(true);
        
        // Check if user is using mock account (for testing purposes)
        const isMockUser = user?.userID?.includes('mock-') || 
                          user?.email?.includes('@test.com') || 
                          user?.email?.includes('@example.com') ||
                          user?.email?.includes('@novunt.com');
        
        if (isMockUser) {
          // Check if there's an updated wallet balance in localStorage
          const storedWallet = JSON.parse(localStorage.getItem('mockWallet') || '{}');
          
          // Provide mock wallet data with updated balance from localStorage
          console.log("Using mock wallet data for testing user:", user.email);
          setWallet({
            balance: storedWallet.balance !== undefined ? storedWallet.balance : 100.00,
            totalDeposited: storedWallet.totalDeposited || 100.00,
            totalWithdrawn: storedWallet.totalWithdrawn || 0,
            walletAddress: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE" // Test USDT address
          });
          setWalletLoading(false);
          return;
        }
        
        const res = await fetch(`https://novunt.vercel.app/api/v1/wallets/${user.userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Wallet API response:", data); // Debug log
        console.log("Wallet object:", data.wallet); // Debug log
        
        if (res.ok && data) {
          const walletData = data.wallet || data.data?.wallet || {};
          setWallet({
            balance: walletData.balance || 0,
            totalDeposited: walletData.totalDeposited || 0,
            totalWithdrawn: walletData.totalWithdrawn || 0,
            walletAddress: walletData.walletAddress || "Loading..."
          });
        } else {
          console.error("Wallet fetch failed:", data?.message || "Unknown error");
          setWallet({ balance: 0, totalDeposited: 0, totalWithdrawn: 0, walletAddress: "Unavailable" });
        }
      } catch (err) {
        console.error("Failed to fetch wallet:", err);
        setWallet({ balance: 0, totalDeposited: 0, totalWithdrawn: 0, walletAddress: "Unavailable" });
      } finally {
        setWalletLoading(false);
      }
    };

    if (user?.userID) {
      fetchWallet();
    } else {
      setWalletLoading(false);
    }
  }, [user?.userID, user?.email, token]);

  const [checked, setChecked] = useState({
    risk: false,
    terms: false,
    withdrawal: false,
    responsibility: false,
  });

  const toggleCheck = (key) => {
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const toggleAllChecks = () => {
    const allCheckedState = Object.values(checked).every(Boolean);
    const newState = {};
    Object.keys(checked).forEach(key => {
      newState[key] = !allCheckedState;
    });
    setChecked(newState);
  };

  const allChecked = Object.values(checked).every(Boolean);

  const handleOpenConfirmModal = () => {
    // Check if wallet balance is sufficient
    if (!wallet?.balance || wallet?.balance <= 0) {
      setError("You need to fund your wallet before staking. Please deposit USDT first.");
      return;
    }
    
    if (!amount || parseFloat(amount) < 20) {
      setError("Minimum staking amount is $20 USDT");
      return;
    }
    
    // Check if user has enough balance for the stake
    if (parseFloat(amount) > (wallet?.balance || 0)) {
      setError(`Insufficient balance. You have $${wallet?.balance || 0} USDT available.`);
      return;
    }
    
    if (!goal) {
      setError("Please select or enter an investment goal");
      return;
    }
    setError("");
    
    // Create stake data for the confirmation modal
    const newStakeData = {
      amount: parseFloat(amount),
      goal: goal,
      userId: user?.userID,
      expectedReturn: parseFloat(amount) * 2, // 100% ROI
      expectedProfit: parseFloat(amount)
    };
    
    setDepositData(newStakeData);
    setOpen(true);
  };

  const handleGoalTemplateSelect = (template) => {
    setGoal(template.name);
  };

  // Show loading spinner while wallet is being fetched
  if (walletLoading) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Loading wallet information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1426] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl px-4 py-2 text-white hover:bg-slate-700/90 transition-all"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🚀 Create Staking Goal
              </h1>
              <p className="text-slate-300">Build your wealth with smart staking strategies</p>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl px-4 py-2">
              <Wallet className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm">
                Balance: ${wallet?.balance?.toLocaleString() || '0'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
          >
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= stepNumber 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                        : 'bg-slate-700 text-slate-400'
                    }`}>
                      {step > stepNumber ? <CheckCircle size={20} /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-16 h-1 mx-2 rounded transition-all ${
                        step > stepNumber ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Labels */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
              <div className={`transition-all ${step >= 1 ? 'text-white' : 'text-slate-400'}`}>
                <h3 className="font-semibold">Choose Goal</h3>
                <p className="text-sm opacity-70">Select your target</p>
              </div>
              <div className={`transition-all ${step >= 2 ? 'text-white' : 'text-slate-400'}`}>
                <h3 className="font-semibold">Set Amount</h3>
                <p className="text-sm opacity-70">Staking details</p>
              </div>
              <div className={`transition-all ${step >= 3 ? 'text-white' : 'text-slate-400'}`}>
                <h3 className="font-semibold">Confirm</h3>
                <p className="text-sm opacity-70">Review & stake</p>
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              {/* Step 1: Goal Selection */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                      <Target className="w-8 h-8 text-blue-400" />
                      What&apos;s Your Staking Goal?
                    </h2>
                    <p className="text-slate-300">Choose a template or create your own financial target</p>
                  </div>

                  {/* Goal Templates Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {goalTemplates.map((template, index) => {
                      const Icon = template.icon;
                      const isSelected = goal === template.name;
                      return (
                        <motion.button
                          key={template.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleGoalTemplateSelect(template)}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            isSelected
                              ? `bg-gradient-to-r ${template.color} border-white/30 shadow-lg scale-105`
                              : 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70 hover:border-slate-500/50'
                          }`}
                        >
                          <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                          <h3 className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {template.name}
                          </h3>
                          <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                            {template.description}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Custom Goal Input */}
                  <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Or Create Your Custom Goal
                    </h3>
                    <input
                      type="text"
                      placeholder="e.g., Save for Dream Wedding, New Business, etc."
                      value={goal}
                      onChange={(e) => {
                        setGoal(e.target.value);
                      }}
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  {goal && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setStep(2)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Continue to Amount
                      <ChevronRight size={20} />
                    </motion.button>
                  )}
                </motion.div>
              )}

              {/* Step 2: Amount Input */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                      <DollarSign className="w-8 h-8 text-green-400" />
                      Staking Amount
                    </h2>
                    <p className="text-slate-300">How much do you want to stake for &quot;{goal}&quot;?</p>
                  </div>

                  {/* Amount Input with Live Calculator */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                        <label className="block text-white font-semibold mb-3">Staking Amount (USDT)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <input
                            type="number"
                            placeholder="100"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-10 pr-4 py-4 text-white text-xl font-bold placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
                          />
                        </div>
                        <p className="text-slate-400 text-sm mt-2">
                          Minimum: $20 USDT • Available Balance: ${wallet?.balance?.toLocaleString() || '0'} USDT
                        </p>
                        {wallet?.balance <= 0 ? (
                          <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3 mt-2">
                            <p className="text-red-300 text-sm">
                              ⚠️ No funds available. Please <span className="font-semibold">deposit USDT</span> to your wallet first.
                            </p>
                            <button
                              onClick={() => window.location.href = '/app/deposit'}
                              className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                              Deposit Funds
                            </button>
                          </div>
                        ) : amount && parseFloat(amount) < 20 && parseFloat(amount) > 0 ? (
                          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3 mt-2">
                            <p className="text-yellow-300 text-sm">
                              ⚠️ Minimum staking amount is $20 USDT. Please enter at least $20.
                            </p>
                          </div>
                        ) : amount && parseFloat(amount) > (wallet?.balance || 0) ? (
                          <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3 mt-2">
                            <p className="text-red-300 text-sm">
                              ⚠️ Insufficient balance. You can stake up to ${wallet?.balance?.toLocaleString() || '0'} USDT.
                            </p>
                          </div>
                        ) : null}
                      </div>

                      {/* Quick Amount Buttons */}
                      <div className="grid grid-cols-3 gap-3">
                        {[100, 500, 1000].map((quickAmount) => (
                          <button
                            key={quickAmount}
                            onClick={() => setAmount(quickAmount.toString())}
                            className="bg-slate-700/50 border border-slate-600/50 rounded-lg py-2 text-white hover:bg-slate-600/50 transition-all"
                          >
                            ${quickAmount}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Earnings Calculator */}
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-6 border border-green-400/30">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-green-400" />
                        Projected Earnings
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Your Stake:</span>
                          <span className="text-white font-bold">${amount ? parseFloat(amount).toLocaleString() : '0'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Expected ROI:</span>
                          <span className="text-green-400 font-bold">200%</span>
                        </div>
                        
                        <div className="border-t border-slate-600 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Estimated Earnings:</span>
                            <span className="text-green-400 font-bold text-xl">
                              ${amount ? calculateEstimatedEarnings(parseFloat(amount)).toLocaleString() : '0'}
                            </span>
                          </div>
                        </div>

                        <div className="bg-green-500/10 rounded-lg p-3 border border-green-400/20">
                          <p className="text-green-200 text-sm">
                            💡 Your total return would be <span className="font-bold">${amount ? (parseFloat(amount) + calculateEstimatedEarnings(parseFloat(amount))).toLocaleString() : '0'}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Staking Timeline */}
                  <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      Staking Timeline
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">Lock Period</p>
                        <p className="text-slate-300 text-sm">Flexible timeline</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">Daily Rewards</p>
                        <p className="text-slate-300 text-sm">Compound returns</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <Shield className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">Secure Stakes</p>
                        <p className="text-slate-300 text-sm">Protected funds</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all"
                    >
                      Back
                    </button>
                    {amount && parseFloat(amount) >= 20 && parseFloat(amount) <= (wallet?.balance || 0) && (
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        Review Staking
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                      Review Your Staking
                    </h2>
                    <p className="text-slate-300">Confirm your details before proceeding</p>
                  </div>

                  {/* Staking Summary */}
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl p-6 border border-blue-400/30">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      Staking Summary
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-slate-600">
                          <span className="text-slate-300">Goal:</span>
                          <span className="text-white font-semibold">{goal}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-600">
                          <span className="text-slate-300">Staking Amount:</span>
                          <span className="text-white font-bold text-lg">${parseFloat(amount).toLocaleString()} USDT</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-600">
                          <span className="text-slate-300">Expected ROI:</span>
                          <span className="text-green-400 font-bold">200%</span>
                        </div>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          Projected Returns
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-300">Expected Earnings:</span>
                            <span className="text-green-400 font-bold">
                              ${calculateEstimatedEarnings(parseFloat(amount) || 0).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="text-slate-300">Total Return:</span>
                            <span className="text-white font-bold">
                              ${((parseFloat(amount) || 0) + calculateEstimatedEarnings(parseFloat(amount) || 0)).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        Terms & Conditions
                      </h3>
                      <button
                        onClick={toggleAllChecks}
                        className="px-3 py-1 text-xs bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 rounded-lg transition-colors duration-200"
                      >
                        {Object.values(checked).every(Boolean) ? 'Unselect All' : 'Select All'}
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {Object.keys(checked).map((key, index) => (
                        <label key={index} className="flex items-start space-x-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={checked[key]}
                            onChange={() => toggleCheck(key)}
                            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                            {key === "risk"
                              ? "I understand this staking carries potential risks, including market fluctuations."
                              : key === "terms"
                              ? "I have reviewed the staking details and accept the terms."
                              : key === "withdrawal"
                              ? "I acknowledge that my staked funds will be locked, and only the rewards will be available for withdrawal."
                              : "I am staking with my own discretion and accept full responsibility for my decision."}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Risk Warning */}
                  <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-yellow-200 font-semibold mb-1">Staking Risk Notice</h4>
                        <p className="text-yellow-200/80 text-sm">
                          Please ensure you understand that cryptocurrency staking carries inherent risks. 
                          Only stake what you can afford to lose.
                        </p>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-red-300">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all"
                    >
                      Back to Amount
                    </button>
                    
                    <button
                      onClick={handleOpenConfirmModal}
                      disabled={!allChecked || loading}
                      className={`flex-2 py-3 px-8 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        allChecked && !loading
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105"
                          : "bg-slate-600 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Confirm Staking
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      <StakeConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        stakeData={depositData}
        onConfirm={(stakeData) => {
          console.log("Stake confirmed:", stakeData);
          // Here you can add API call to process the stake
          // For now, just log the data
        }}
      />
    </div>
  );
};

export default Stake;
