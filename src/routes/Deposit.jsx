import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import DepositConfirm from "./DepositConfirm";
import { 
  ArrowLeft,
  DollarSign,
  Wallet,
  AlertTriangle,
  Shield,
  Zap
} from "lucide-react";


const Deposit = () => {
  const { user, token } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [depositData, setDepositData] = useState(null);
  const [loading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        // Check if user is using mock account (for testing purposes)
        const isMockUser = user?.userID?.includes('mock-') || 
                          user?.email?.includes('@test.com') || 
                          user?.email?.includes('@example.com') ||
                          user?.email?.includes('@novunt.com');
        
        if (isMockUser) {
          // Provide mock wallet data with $100 for testing
          console.log("Using mock wallet data for testing user:", user.email);
          setWallet({
            balance: 100.00, // $100 test balance
            totalDeposited: 100.00,
            totalWithdrawn: 0,
            walletAddress: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE" // Test USDT address
          });
          return;
        }
        
        const res = await fetch(`https://novunt.vercel.app/api/v1/wallets/${user.userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
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
        }
      } catch (err) {
        console.error("Failed to fetch wallet:", err);
      }
    };

    if (user?.userID) fetchWallet();
  }, [user?.userID, user?.email, token]);

  const handleOpenConfirmModal = () => {
    if (!amount || parseFloat(amount) < 20) {
      setError("Minimum deposit is $20 USDT");
      return;
    }
    setError("");
    
    // Create deposit data for the confirmation modal
    const newDepositData = {
      amount: parseFloat(amount),
      userId: user?.userID,
      walletAddress: wallet?.walletAddress || "Loading..."
    };
    
    setDepositData(newDepositData);
    setOpen(true);
  };

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
                💰 Fund Your Wallet
              </h1>
              <p className="text-slate-300">Add USDT to your wallet balance</p>
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <DollarSign className="w-8 h-8 text-green-400" />
                Deposit USDT
              </h2>
              <p className="text-slate-300">
                Securely fund your Novunt wallet with USDT. Minimum deposit amount is 20 USDT, and there are no transaction fees.
              </p>
            </div>

            {/* Amount Input */}
            <div className="space-y-6">
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                <label className="block text-white font-semibold mb-3">
                  Deposit Amount (USDT)
                </label>
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
                  Minimum: $20 USDT • No transaction fees
                </p>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-3">
                {[20, 100, 500, 1000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="bg-slate-700/50 border border-slate-600/50 rounded-lg py-2 text-white hover:bg-slate-600/50 transition-all text-sm"
                  >
                    ${quickAmount}
                  </button>
                ))}
              </div>

              {/* Deposit Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center border border-slate-600/50">
                  <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">Secure</p>
                  <p className="text-slate-300 text-xs">Protected deposits</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center border border-slate-600/50">
                  <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">Fast</p>
                  <p className="text-slate-300 text-xs">Quick processing</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center border border-slate-600/50">
                  <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">No Fees</p>
                  <p className="text-slate-300 text-xs">Zero charges</p>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              )}

              {/* Deposit Button */}
              <button
                onClick={handleOpenConfirmModal}
                disabled={!amount || parseFloat(amount) < 10 || loading}
                className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  amount && parseFloat(amount) >= 20 && !loading
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
                    <Wallet className="w-5 h-5" />
                    Proceed to Deposit
                  </>
                )}
              </button>

              {/* Info Note */}
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-200 font-semibold mb-1">Secure Deposit</h4>
                    <p className="text-blue-200/80 text-sm">
                      Your deposit will be credited to your wallet once the transaction is confirmed on the blockchain.
                      This usually takes a few minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <DepositConfirm
        isOpen={open}
        onClose={() => setOpen(false)}
        depositData={depositData}
        amount={parseFloat(amount) || 0}
        wallet={wallet}
      />
    </div>
  );
};

export default Deposit;
