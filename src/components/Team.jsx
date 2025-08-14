import { useEffect, useState } from "react";
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Target, 
  Crown, 
  ChevronRight,
  Copy,
  CheckCircle,
  UserPlus,
  BarChart3,
  Award,
  Users2,
  Gift,
  HelpCircle,
  X
} from "lucide-react";
import PropTypes from "prop-types";

const Team = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [downlineUsers, setDownlineUsers] = useState([]);
  const [copied, setCopied] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [expandedUsers, setExpandedUsers] = useState([]);

  useEffect(() => {
    if (!userId) return;

    // Fetch user data
    fetch(`/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.user); // Assumes { user: {...} } structure
      })
      .catch((err) => console.error("Error fetching user:", err));

    // Fetch downline users
    fetch(`/users/downlines/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDownlineUsers(data.downlines || []);
      })
      .catch((err) => console.error("Error fetching downlines:", err));
  }, [userId]);

  const toggleUserExpansion = (userId) => {
    setExpandedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const getDownlineCount = (userId) => {
    return displayDownlines.filter(u => u.uplineId === userId).length;
  };

  // Mock downline data for demonstration - replace with real data when available
  const mockDownlines = [
    // Level 1 - Direct Referrals (no uplineId - they are direct to current user)
    { _id: '1', username: 'AlexJohnson', level: 1, points: 1250, investment: 5000, isActive: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-15' },
    { _id: '2', username: 'SarahChen', level: 1, points: 980, investment: 3500, isActive: true, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-18' },
    { _id: '3', username: 'MikeRodriguez', level: 1, points: 2100, investment: 8000, isActive: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-20' },
    { _id: '4', username: 'EmmaWilson', level: 1, points: 750, investment: 2500, isActive: true, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-22' },
    { _id: '5', username: 'DavidKim', level: 1, points: 1800, investment: 6000, isActive: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-25' },
    { _id: '6', username: 'MeganWilson', level: 1, points: 450, investment: 1500, isActive: false, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', createdAt: '2024-02-01' },
    { _id: '7', username: 'TylerBrown', level: 1, points: 320, investment: 1000, isActive: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', createdAt: '2024-02-03' },
    { _id: '8', username: 'SamanthaMiller', level: 1, points: 890, investment: 3000, isActive: true, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', createdAt: '2024-02-05' },
    
    // Level 2 - Indirect Referrals (referenced by AlexJohnson)
    { _id: '9', username: 'LisaThompson', level: 2, points: 3200, investment: 12000, isActive: true, uplineId: '1', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-10' },
    { _id: '10', username: 'JamesBrown', level: 2, points: 2800, investment: 10000, isActive: true, uplineId: '1', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-12' },
    { _id: '11', username: 'MariaGarcia', level: 2, points: 1950, investment: 7500, isActive: true, uplineId: '2', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-14' },
    { _id: '12', username: 'RobertLee', level: 2, points: 4100, investment: 15000, isActive: true, uplineId: '2', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-16' },
    { _id: '13', username: 'JenniferDavis', level: 2, points: 1650, investment: 5500, isActive: true, uplineId: '3', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-19' },
    { _id: '14', username: 'AshleyDavis', level: 2, points: 1800, investment: 6500, isActive: false, uplineId: '4', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-28' },
    
    // Level 3 - Extended Network (referenced by Level 2 users)
    { _id: '15', username: 'ChristopherMiller', level: 3, points: 5800, investment: 22000, isActive: true, uplineId: '9', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-05' },
    { _id: '16', username: 'AmandaTaylor', level: 3, points: 4200, investment: 16000, isActive: true, uplineId: '9', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-07' },
    { _id: '17', username: 'DanielAnderson', level: 3, points: 3600, investment: 13500, isActive: true, uplineId: '10', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-09' },
    { _id: '18', username: 'JessicaMartinez', level: 3, points: 2900, investment: 11000, isActive: true, uplineId: '11', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-11' },
    { _id: '19', username: 'KevinWhite', level: 3, points: 5100, investment: 19000, isActive: true, uplineId: '12', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-13' },
    { _id: '20', username: 'JustinGarcia', level: 3, points: 2800, investment: 10500, isActive: false, uplineId: '13', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-30' },
    
    // Level 4 - Deep Network
    { _id: '21', username: 'NicoleJohnson', level: 4, points: 8900, investment: 35000, isActive: true, uplineId: '15', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-01' },
    { _id: '22', username: 'StevenWilson', level: 4, points: 7200, investment: 28000, isActive: true, uplineId: '16', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-03' },
    { _id: '23', username: 'RachelBrown', level: 4, points: 6500, investment: 25000, isActive: true, uplineId: '17', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-05' },
    { _id: '24', username: 'MatthewDavis', level: 4, points: 8100, investment: 32000, isActive: true, uplineId: '18', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-07' },
    { _id: '25', username: 'StephanieGarcia', level: 4, points: 5800, investment: 22000, isActive: true, uplineId: '19', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', createdAt: '2024-01-09' },
    
    // Level 5 - Foundation Network
    { _id: '26', username: 'AndrewMiller', level: 5, points: 12500, investment: 50000, isActive: true, uplineId: '21', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', createdAt: '2023-12-20' },
    { _id: '27', username: 'LaurenAnderson', level: 5, points: 9800, investment: 38000, isActive: true, uplineId: '22', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', createdAt: '2023-12-22' },
    { _id: '28', username: 'RyanMartinez', level: 5, points: 11200, investment: 45000, isActive: true, uplineId: '23', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', createdAt: '2023-12-25' },
    { _id: '29', username: 'HannahWhite', level: 5, points: 8700, investment: 33000, isActive: true, uplineId: '24', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', createdAt: '2023-12-28' },
    { _id: '30', username: 'BrandonJohnson', level: 5, points: 13400, investment: 52000, isActive: true, uplineId: '25', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', createdAt: '2023-12-30' }
  ];

  // Use mock data for demonstration, fallback to real data when available
  const displayDownlines = downlineUsers.length > 0 ? downlineUsers : mockDownlines;
  
  const totalTeamInvestment = displayDownlines.reduce((sum, u) => sum + (u.investment || 0), 0);
  const activeDownlines = displayDownlines.filter(u => u.isActive).length;

  // Mock data for demonstration - replace with real data
  const mockUserInfo = {
    rank: "Principal Strategist",
    level: 2,
    referralCode: "AlexJohnson", // This will be the username part
    teamInvestment: 25000,
    nextRank: "Elite Capitalist",
    rankProgress: 65,
    ...userInfo
  };

  // Generate full referral URL
  const getReferralUrl = () => {
    const username = mockUserInfo.referralCode || "username";
    return `www.novunt.com/team/${username}`;
  };

  const handleCopy = () => {
    const fullUrl = getReferralUrl();
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const rankRequirements = {
    "Associate Investor": { investment: 5000, downlines: 5, bonus: "15%", color: "from-green-500/20 to-green-600/20" },
    "Principal Strategist": { investment: 10000, downlines: 10, bonus: "17.5%", color: "from-slate-700/20 via-blue-900/20 to-slate-700/20" },
    "Elite Capitalist": { investment: 25000, downlines: 15, bonus: "20%", color: "from-purple-500/20 to-purple-600/20" },
    "Wealth Architect": { investment: 50000, downlines: 20, bonus: "22.5%", color: "from-yellow-500/20 to-yellow-600/20" },
    "Finance Titan": { investment: 100000, downlines: 25, bonus: "25%", color: "from-red-500/20 to-red-600/20" }
  };

  const currentRank = mockUserInfo.rank;
  const nextRank = mockUserInfo.nextRank;
  const nextRankReqs = rankRequirements[nextRank] || rankRequirements["Elite Capitalist"];

  // Tooltip component
  const Tooltip = ({ content, isVisible, onClose }) => {
    if (!isVisible || !content) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <HelpCircle className="mr-2 text-blue-200" size={24} />
              {content.title}
            </h3>
            <button 
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <X className="text-white" size={16} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-200 font-semibold mb-2">What this means:</h4>
              <p className="text-white text-sm leading-relaxed">{content.description}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-400/20">
              <h4 className="text-green-200 font-semibold mb-2">What you can do:</h4>
              <p className="text-white text-sm leading-relaxed">{content.action}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-slate-700 via-blue-900 to-slate-700 hover:from-slate-600 hover:via-blue-800 hover:to-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    );
  };

  Tooltip.propTypes = {
    content: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired
    }),
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  const tooltipContent = {
    teamInvestment: {
      title: "Team Investment",
      description: "Total amount invested by all members in your downline network. This includes direct and indirect referrals.",
      action: "Focus on recruiting active investors and supporting your team to increase this value."
    },
    rankBonus: {
      title: "Rank Bonus Pool",
      description: "Weekly bonus allocation from the platform's profit pool. Higher ranks get larger percentages of the bonus pool.",
      action: "Work towards the next rank to unlock higher bonus percentages and increase your earnings."
    },
    referralSystem: {
      title: "Multi-Level Referral",
      description: "Earn bonuses from 5 levels of referrals. Level 1: 5%, Level 2: 2%, Level 3: 1.5%, Level 4: 1%, Level 5: 0.5%.",
      action: "Share your referral code and help your referrals succeed to maximize your earnings."
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 py-6 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center">
                <Users className="mr-3 text-blue-400" size={32} />
                Team Management
              </h1>
              <p className="text-blue-200 text-lg">Build your network, climb the ranks, and maximize your earnings</p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-xl p-3 border border-orange-400/30">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-orange-400" size={20} />
                  <span className="text-white font-semibold">{currentRank}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

                {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          {/* Team Stake Card */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-emerald-400/5 to-green-400/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-500/30 p-3 rounded-xl">
                  <TrendingUp className="text-green-400" size={24} />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <p className="text-green-200 text-sm">Team Stake</p>
                    <button 
                      onClick={() => setActiveTooltip('teamInvestment')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-green-300" size={12} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-white">${totalTeamInvestment.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center text-green-300 text-xs">
                <BarChart3 size={12} className="mr-1" />
                <span>Network value</span>
              </div>
            </div>
          </div>

          {/* Active Downlines Card */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-violet-400/5 to-purple-400/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/30 p-3 rounded-xl">
                  <Users2 className="text-purple-400" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-purple-200 text-sm">Active Downlines</p>
                  <p className="text-2xl font-bold text-white">{activeDownlines}</p>
                </div>
              </div>
              <div className="flex items-center text-purple-300 text-xs">
                <UserPlus size={12} className="mr-1" />
                <span>Active members</span>
              </div>
            </div>
          </div>

          {/* Rank Progress Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500/30 p-3 rounded-xl">
                  <Crown className="text-orange-400" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-orange-200 text-sm">Next Rank</p>
                  <p className="text-lg font-bold text-white">{nextRank}</p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${mockUserInfo.rankProgress}%` }}
                ></div>
              </div>
              <div className="flex items-center text-orange-300 text-xs">
                <Target size={12} className="mr-1" />
                <span>{mockUserInfo.rankProgress}% complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/30 p-3 rounded-xl">
                <Users2 className="text-blue-400" size={24} />
              </div>
              <div className="text-right">
                <p className="text-blue-200 text-sm">Total Members</p>
                <p className="text-2xl font-bold text-white">{displayDownlines.length}</p>
              </div>
            </div>
            <div className="flex items-center text-blue-300 text-xs">
              <Users size={12} className="mr-1" />
              <span>All downline</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/30 p-3 rounded-xl">
                <Users2 className="text-green-400" size={24} />
              </div>
              <div className="text-right">
                <p className="text-green-200 text-sm">Active Members</p>
                <p className="text-2xl font-bold text-white">{activeDownlines}</p>
              </div>
            </div>
            <div className="flex items-center text-green-300 text-xs">
              <UserPlus size={12} className="mr-1" />
              <span>Currently active</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/30 p-3 rounded-xl">
                <Users2 className="text-purple-400" size={24} />
              </div>
              <div className="text-right">
                <p className="text-purple-200 text-sm">Inactive Members</p>
                <p className="text-2xl font-bold text-white">{displayDownlines.length - activeDownlines}</p>
              </div>
            </div>
            <div className="flex items-center text-purple-300 text-xs">
              <X size={12} className="mr-1" />
              <span>Not currently active</span>
            </div>
          </div>
        </div>

        {/* Team Level Breakdown */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 p-3 rounded-xl">
              <BarChart3 className="text-indigo-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Team Level Breakdown</h3>
              <p className="text-indigo-200 text-sm">Distribution of members across different levels</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((level) => {
              const levelMembers = displayDownlines.filter(u => u.level === level);
              const activeMembers = levelMembers.filter(u => u.isActive);
              const totalInvestment = levelMembers.reduce((sum, u) => sum + (u.investment || 0), 0);
              
              return (
                <div key={level} className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-400/20 text-center">
                  <div className="text-2xl font-bold text-white mb-1">Level {level}</div>
                  <div className="text-indigo-300 text-sm mb-2">{levelMembers.length} members</div>
                  <div className="text-green-300 text-xs mb-2">{activeMembers.length} active</div>
                  <div className="text-blue-300 text-xs">${totalInvestment.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rank Requirements & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Rank Status */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 p-3 rounded-xl">
                <Award className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Current Rank</h3>
                <p className="text-blue-200 text-sm">Your current position and benefits</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200 text-sm">Rank Name</span>
                  <span className="text-white font-semibold">{currentRank}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200 text-sm">Level</span>
                  <span className="text-white font-semibold">{mockUserInfo.level}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200 text-sm">Bonus Allocation</span>
                  <span className="text-white font-semibold">{rankRequirements[currentRank]?.bonus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Rank Requirements */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 p-3 rounded-xl">
                <Target className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Next Rank: {nextRank}</h3>
                <p className="text-green-200 text-sm">Requirements to advance</p>
        </div>
      </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-green-200 text-sm">Team Investment</span>
                  <span className="text-white font-semibold">${nextRankReqs.investment.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-green-200 text-sm">Direct Downlines</span>
                  <span className="text-white font-semibold">{nextRankReqs.downlines}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-green-200 text-sm">Rank Bonus</span>
                  <span className="text-white font-semibold">{nextRankReqs.bonus} of Pool</span>
                </div>
              </div>
            </div>
        </div>
      </div>

        {/* Referral System */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 p-3 rounded-xl">
              <Gift className="text-yellow-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Referral System</h3>
              <p className="text-yellow-200 text-sm">Share your code and earn from 5 levels</p>
            </div>
            <button 
              onClick={() => setActiveTooltip('referralSystem')}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <HelpCircle className="text-yellow-300" size={20} />
            </button>
      </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Referral Code */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/20">
              <h4 className="text-yellow-200 font-semibold mb-3">Your Referral URL</h4>
              <div className="flex items-center space-x-3">
          <input
            type="text"
            readOnly
                  value={getReferralUrl()}
                  className="flex-1 bg-white/10 text-white font-mono text-lg px-4 py-3 rounded-lg border border-yellow-400/30 focus:outline-none focus:border-yellow-400/50"
                />
                <button 
                  onClick={handleCopy}
                  className={`p-3 rounded-lg transition-all ${
                    copied 
                      ? 'bg-green-500/30 border border-green-400/30 text-green-300' 
                      : 'bg-yellow-500/30 border border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/50'
                  }`}
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <p className="text-yellow-300 text-xs mt-2">
                {copied ? "URL copied to clipboard!" : "Click to copy your referral URL"}
              </p>
            </div>

            {/* Referral Levels */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/20">
              <h4 className="text-yellow-200 font-semibold mb-3">Bonus Structure</h4>
              <div className="space-y-2">
                {[
                  { level: 1, bonus: "5%", color: "from-green-500/20 to-green-600/20" },
                  { level: 2, bonus: "2%", color: "from-blue-500/20 to-blue-600/20" },
                  { level: 3, bonus: "1.5%", color: "from-purple-500/20 to-purple-600/20" },
                  { level: 4, bonus: "1%", color: "from-yellow-500/20 to-yellow-600/20" },
                  { level: 5, bonus: "0.5%", color: "from-red-500/20 to-red-600/20" }
                ].map((item) => (
                  <div key={item.level} className={`bg-gradient-to-r ${item.color} rounded-lg p-2 flex items-center justify-between`}>
                    <span className="text-white text-sm">Level {item.level}</span>
                    <span className="text-white font-semibold">{item.bonus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Downline Members */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 p-3 rounded-xl">
                <Users className="text-indigo-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Your Team Hierarchy</h3>
                <p className="text-indigo-200 text-sm">Click on any referral to see their downline structure</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg px-3 py-2 border border-indigo-400/30">
                <span className="text-indigo-300 text-sm">Hierarchical List</span>
              </div>
            </div>
          </div>
          
          {displayDownlines.length > 0 ? (
            <div className="relative">
              {/* Hierarchical List Structure */}
              <div className="space-y-4">
                {/* Root Node - Current User */}
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4 border border-indigo-400/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                        alt="You" 
                        className="w-full h-full rounded-full border-2 border-indigo-400/70" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">You - Team Leader</h3>
                      <p className="text-indigo-300 text-sm">Managing your referral network</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-indigo-500/30 rounded-lg px-3 py-2">
                        <span className="text-indigo-300 text-sm font-semibold">
                          {displayDownlines.filter(u => u.level === 1).length} direct referrals
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level 1 - Direct Referrals */}
                <div className="ml-8">
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg px-4 py-2 border border-green-400/30 inline-block">
                      <span className="text-green-300 font-semibold">Level 1 - Direct Referrals</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {displayDownlines.filter(u => u.level === 1).map((user) => (
                      <div key={user._id} className="relative">
                        {/* Connection Line */}
                        <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-green-400/50 to-transparent transform -translate-x-1/2"></div>
                        
                        {/* User Item */}
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-400/30 hover:border-green-400/50 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10">
                                <img 
                                  src={user.avatar || "https://via.placeholder.com/40"} 
                                  alt="User" 
                                  className="w-full h-full rounded-full border-2 border-green-400/50" 
                                />
                              </div>
                              <div>
                                <p className="text-white font-semibold">{user.username}</p>
                                <p className="text-green-300 text-xs">Direct Referral</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="bg-green-500/30 rounded-lg px-3 py-2">
                                <span className="text-green-300 text-sm font-semibold">
                                  {getDownlineCount(user._id)} downlines
                                </span>
                              </div>
                              <button 
                                onClick={() => toggleUserExpansion(user._id)}
                                className="bg-green-500/20 hover:bg-green-500/30 rounded-lg p-2 transition-all"
                              >
                                <ChevronRight 
                                  size={20} 
                                  className={`text-green-400 transition-transform duration-200 ${
                                    expandedUsers.includes(user._id) ? 'rotate-90' : ''
                                  }`}
                                />
          </button>
        </div>
      </div>

                          {/* Expanded Downline List */}
                          {expandedUsers.includes(user._id) && (
                            <div className="mt-4 pt-4 border-t border-green-400/20">
                              {/* Level 2 - User's Direct Referrals */}
                              <div className="ml-6 space-y-3">
                                <div className="mb-3">
                                  <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg px-3 py-1 border border-blue-400/30 inline-block">
                                    <span className="text-blue-300 font-semibold text-sm">Level 2 - {user.username}&apos;s Direct Referrals</span>
                                  </div>
                                </div>
                                
                                {displayDownlines.filter(u => u.uplineId === user._id).length > 0 ? (
                                  <div className="space-y-2">
                                    {displayDownlines.filter(u => u.uplineId === user._id).map((downlineUser) => (
                                      <div key={downlineUser._id} className="relative">
                                        {/* Connection Line */}
                                        <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-400/50 to-transparent transform -translate-x-1/2"></div>
                                        
                                        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-3 border border-blue-400/30 hover:border-blue-400/50 transition-all">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                              <div className="w-8 h-8">
                                                <img 
                                                  src={downlineUser.avatar || "https://via.placeholder.com/40"} 
                                                  alt="User" 
                                                  className="w-full h-full rounded-full border border-blue-400/50" 
                                                />
                                              </div>
                                              <div>
                                                <p className="text-white font-semibold text-sm">{downlineUser.username}</p>
                                                <p className="text-blue-300 text-xs">Indirect Referral</p>
                                              </div>
                                            </div>
            <div className="flex items-center space-x-3">
                                              <div className="bg-blue-500/30 rounded px-2 py-1">
                                                <span className="text-blue-300 text-xs font-semibold">
                                                  {getDownlineCount(downlineUser._id)} downlines
                                                </span>
                                              </div>
                                              <button 
                                                onClick={() => toggleUserExpansion(downlineUser._id)}
                                                className="bg-blue-500/20 hover:bg-blue-500/30 rounded p-1 transition-all"
                                              >
                                                <ChevronRight 
                                                  size={16} 
                                                  className={`text-blue-400 transition-transform duration-200 ${
                                                    expandedUsers.includes(downlineUser._id) ? 'rotate-90' : ''
                                                  }`}
                                                />
                                              </button>
                                            </div>
                                          </div>

                                          {/* Level 3 - Deep Expansion */}
                                          {expandedUsers.includes(downlineUser._id) && (
                                            <div className="mt-3 pt-3 border-t border-blue-400/20">
                                              <div className="ml-4 space-y-2">
                                                <div className="mb-2">
                                                  <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded px-2 py-1 border border-purple-400/30 inline-block">
                                                    <span className="text-purple-300 font-semibold text-xs">Level 3 - Extended Network</span>
                                                  </div>
                                                </div>
                                                
                                                {displayDownlines.filter(u => u.uplineId === downlineUser._id).length > 0 ? (
                                                  <div className="space-y-2">
                                                    {displayDownlines.filter(u => u.uplineId === downlineUser._id).map((deepUser) => (
                                                      <div key={deepUser._id} className="relative">
                                                        {/* Connection Line */}
                                                        <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-purple-400/50 to-transparent transform -translate-x-1/2"></div>
                                                        
                                                        <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded p-2 border border-purple-400/30">
                                                          <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                              <div className="w-6 h-6">
                                                                <img 
                                                                  src={deepUser.avatar || "https://via.placeholder.com/40"} 
                                                                  alt="User" 
                                                                  className="w-full h-full rounded-full border border-purple-400/50" 
                                                                />
                                                              </div>
              <div>
                                                                <p className="text-white font-semibold text-xs">{deepUser.username}</p>
                                                                <p className="text-purple-300 text-xs">Extended Network</p>
                                                              </div>
                                                            </div>
                                                            <div className="bg-purple-500/30 rounded px-2 py-1">
                                                              <span className="text-purple-300 text-xs font-semibold">
                                                                {getDownlineCount(deepUser._id)} downlines
                                                              </span>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ))}
                                                  </div>
                                                ) : (
                                                  <div className="text-center py-3">
                                                    <p className="text-purple-300 text-xs">No downlines at this level</p>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-4">
                                    <p className="text-blue-300 text-sm">No downlines at this level</p>
                                  </div>
                                )}
              </div>
            </div>
                          )}
                        </div>
          </div>
        ))}
                  </div>
                </div>
              </div>

              {/* Tree Legend */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                    <span className="text-indigo-300">You - Team Leader</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-green-300">Level 1 - Direct (5% bonus)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-blue-300">Level 2 - Indirect (2% bonus)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-300">Level 3 - Extended (1.5% bonus)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto text-indigo-400/50" size={48} />
              <h4 className="text-white font-semibold mt-4">No downline members yet</h4>
              <p className="text-indigo-200 text-sm mt-2">Share your referral code to start building your team</p>
              <button className="mt-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-300 px-6 py-2 rounded-lg border border-indigo-400/30 transition-all">
                Share Referral Code
              </button>
            </div>
          )}
        </div>

        {/* Tooltip */}
        <Tooltip content={tooltipContent[activeTooltip]} isVisible={!!activeTooltip} onClose={() => setActiveTooltip(null)} />
      </div>
    </div>
  );
};

Team.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Team;
