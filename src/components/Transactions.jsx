import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rectangle from "../assets/Rectangle.png";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { 
  Wallet,
  TrendingUp,
  Clock,
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

const getStatusStyles = (status) => {
  const base = "text-xs font-semibold px-3 py-1.5 rounded-full capitalize flex items-center gap-1.5";
  switch (status) {
    case "confirmed":
      return `${base} text-green-700 bg-green-100 border border-green-200`;
    case "pending":
      return `${base} text-yellow-700 bg-yellow-100 border border-yellow-200`;
    case "failed":
      return `${base} text-red-700 bg-red-100 border border-red-200`;
    default:
      return base;
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-3 h-3" />;
    case "pending":
      return <AlertCircle className="w-3 h-3" />;
    case "failed":
      return <XCircle className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
};

const getTransactionIcon = (type) => {
  const iconClass = "w-5 h-5";
  switch (type?.toLowerCase()) {
    case "deposit":
      return <ArrowDownLeft className={`${iconClass} text-green-500`} />;
    case "withdrawal":
    case "withdraw":
      return <ArrowUpRight className={`${iconClass} text-red-500`} />;
    case "investment":
    case "stake":
      return <TrendingUp className={`${iconClass} text-blue-500`} />;
    default:
      return <DollarSign className={`${iconClass} text-gray-500`} />;
  }
};

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return {
    date: date.toLocaleDateString(undefined, options),
    time,
  };
};

const Transactions = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    if (!token) return;

    const fetchTransactions = async () => {
      try {
        // Get local transactions first (for demo/testing)
        const localTransactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
        
        const res = await fetch(
          "https://novunt.vercel.app/api/v1/transactions/my-transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          // Combine API transactions with local transactions
          const apiTransactions = data.transactions || [];
          const allTransactions = [...localTransactions, ...apiTransactions];
          setTransactions(allTransactions);
        } else {
          console.error("Error fetching transactions:", data.message);
          // If API fails, still show local transactions
          setTransactions(localTransactions);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        // If API fails, still show local transactions
        const localTransactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
        setTransactions(localTransactions);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  // Filter and search transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.status === filter;
    const matchesSearch = 
      tx.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount?.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case "amount":
        return b.amount - a.amount;
      case "type":
        return a.type.localeCompare(b.type);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Calculate transaction statistics
  const stats = {
    total: transactions.length,
    confirmed: transactions.filter(tx => tx.status === "confirmed").length,
    pending: transactions.filter(tx => tx.status === "pending").length,
    failed: transactions.filter(tx => tx.status === "failed").length,
    totalAmount: transactions
      .filter(tx => tx.status === "confirmed")
      .reduce((sum, tx) => sum + tx.amount, 0)
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#0B1426]">
      {/* Enhanced Header Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" />
        <img
          src={rectangle}
          alt="background"
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Header Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                Transaction History
              </h1>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-blue-200 text-sm">Total</div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-green-200 text-sm">Confirmed</div>
                <div className="text-2xl font-bold text-white">{stats.confirmed}</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-yellow-200 text-sm">Pending</div>
                <div className="text-2xl font-bold text-white">{stats.pending}</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-blue-200 text-sm">Volume</div>
                <div className="text-2xl font-bold text-white">
                  ${stats.totalAmount.toLocaleString()}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="relative -mt-8 z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex items-center gap-2 bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 min-w-64">
              <Search className="w-5 h-5 text-blue-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none flex-1 text-white placeholder-slate-400"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2">
                <Filter className="w-4 h-4 text-blue-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-transparent outline-none text-sm text-white"
                >
                  <option value="all" className="bg-slate-800">All Status</option>
                  <option value="confirmed" className="bg-slate-800">Confirmed</option>
                  <option value="pending" className="bg-slate-800">Pending</option>
                  <option value="failed" className="bg-slate-800">Failed</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none text-sm text-white"
                >
                  <option value="date" className="bg-slate-800">Sort by Date</option>
                  <option value="amount" className="bg-slate-800">Sort by Amount</option>
                  <option value="type" className="bg-slate-800">Sort by Type</option>
                </select>
              </div>

              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your transactions...</p>
          </motion.div>
        ) : sortedTransactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-12 max-w-lg mx-auto shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Transactions Found</h3>
              <p className="text-slate-300 mb-8">
                {searchTerm || filter !== "all" 
                  ? "No transactions match your current filters."
                  : "Start investing or depositing to see your transaction history."
                }
              </p>
              {!searchTerm && filter === "all" && (
                <Link
                  to="/app/invest"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
                >
                  <TrendingUp className="w-5 h-5" />
                  Start Investing
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="md:hidden space-y-4">
              <AnimatePresence>
                {sortedTransactions.map((tx, index) => {
                  const { date, time } = formatDateTime(tx.createdAt);
                  return (
                    <motion.div
                      key={tx._id || tx.transactionId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-slate-800/95 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl">
                            {getTransactionIcon(tx.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white capitalize">{tx.type}</h3>
                            <p className="text-sm text-slate-400">Transaction</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">
                            ${tx.amount.toLocaleString()}
                          </p>
                          <div className={getStatusStyles(tx.status)}>
                            {getStatusIcon(tx.status)}
                            {tx.status}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-4 h-4" />
                          {date}
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="w-4 h-4" />
                          {time}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Transaction ID</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-300 bg-slate-700/50 px-2 py-1 rounded">
                              {tx.transactionId?.slice(0, 12)}...
                            </span>
                            <button
                              onClick={() => copyToClipboard(tx.transactionId)}
                              className="p-1 hover:bg-slate-700 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-slate-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <PieChart className="w-6 h-6" />
                    Transaction Details
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr className="text-left text-sm font-semibold text-slate-300">
                        <th className="px-6 py-4">Transaction</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date & Time</th>
                        <th className="px-6 py-4">Transaction ID</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {sortedTransactions.map((tx, index) => {
                          const { date, time } = formatDateTime(tx.createdAt);
                          return (
                            <motion.tr
                              key={tx._id || tx.transactionId}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-slate-700/50 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-indigo-900/20 transition-all duration-300"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-lg">
                                    {getTransactionIcon(tx.type)}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-white capitalize">{tx.type}</p>
                                    <p className="text-sm text-slate-400">
                                      {tx.type?.toLowerCase() === 'deposit' ? 'Incoming' : 
                                       tx.type?.toLowerCase() === 'withdrawal' ? 'Outgoing' : 'Investment'}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              
                              <td className="px-6 py-4">
                                <p className="text-lg font-bold text-white">
                                  ${tx.amount.toLocaleString()}
                                </p>
                                <p className="text-sm text-slate-400">USD</p>
                              </td>
                              
                              <td className="px-6 py-4">
                                <div className={getStatusStyles(tx.status)}>
                                  {getStatusIcon(tx.status)}
                                  {tx.status}
                                </div>
                              </td>
                              
                              <td className="px-6 py-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-slate-300">
                                    <Calendar className="w-4 h-4" />
                                    {date}
                                  </div>
                                  <div className="flex items-center gap-2 text-slate-400">
                                    <Clock className="w-4 h-4" />
                                    {time}
                                  </div>
                                </div>
                              </td>
                              
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-mono text-slate-300 bg-slate-700/50 px-2 py-1 rounded">
                                    {tx.transactionId?.slice(0, 8)}...
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(tx.transactionId)}
                                    className="p-1 hover:bg-slate-700 rounded transition-colors"
                                    title="Copy full ID"
                                  >
                                    <Copy className="w-4 h-4 text-slate-400" />
                                  </button>
                                </div>
                              </td>
                              
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="View Details">
                                    <Eye className="w-4 h-4 text-slate-400" />
                                  </button>
                                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="External Link">
                                    <ExternalLink className="w-4 h-4 text-slate-400" />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
