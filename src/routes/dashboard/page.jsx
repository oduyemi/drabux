import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Footer } from "@/layouts/footer";
import { mockDataGenerator } from "../../utils/mockDataGeneratorFixed";
import { navbarLinks } from "../../constants/index.jsx";
import { 
  Package, 
  TrendingUp, 
  Wallet, 
  Crown, 
  Target,
  Zap,
  Trophy,
  Star,
  Users,
  Coins,
  ChevronRight,
  Eye,
  EyeOff,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingDown,
  Clock,
  Shield,
  CheckCircle,
  Calendar,
  BarChart3,
  HelpCircle,
  X,
  Gift,
  MessageCircle,
  Instagram,
  ExternalLink,
  Timer,
  DollarSign,
  Sparkles,
  Video,
  Phone,
  Facebook,
  Activity,
  Menu,
  Bell,
  User
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DashboardPage = () => {
  const { user, token } = useAuth();
  const location = useLocation();
  const [stakes, setStakes] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [showBalances, setShowBalances] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [performanceViewIndex, setPerformanceViewIndex] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Load bonus progress from localStorage or use default
  const loadBonusProgress = () => {
    try {
      const saved = localStorage.getItem('drabux_bonus_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all required fields exist
        return {
          socialMediaFollowed: {
            tiktok: false,
            telegram_channel: false,
            telegram_group: false,
            instagram: false,
            facebook: false,
            youtube: false,
            ...parsed.socialMediaFollowed
          },
          socialMediaCompleted: parsed.socialMediaCompleted || false,
          depositMade: parsed.depositMade || false,
          bonusEligible: parsed.bonusEligible !== undefined ? parsed.bonusEligible : true,
          bonusClaimed: parsed.bonusClaimed || false,
          daysRemaining: parsed.daysRemaining || 7,
          registrationTimestamp: parsed.registrationTimestamp || Date.now()
        };
      }
    } catch (error) {
      console.warn('Error loading bonus progress from localStorage:', error);
    }
    
    // Default state if nothing in localStorage - set registration timestamp to now
    return {
      socialMediaFollowed: {
        tiktok: false,
        telegram_channel: false,
        telegram_group: false,
        instagram: false,
        facebook: false,
        youtube: false
      },
      socialMediaCompleted: false,
      depositMade: false,
      bonusEligible: true,
      bonusClaimed: false,
      daysRemaining: 7,
      registrationTimestamp: Date.now()
    };
  };

  const [bonusProgress, setBonusProgress] = useState(loadBonusProgress);

  // Save bonus progress to localStorage whenever it changes
  const updateBonusProgress = (updater) => {
    setBonusProgress(prev => {
      const newProgress = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('drabux_bonus_progress', JSON.stringify(newProgress));
      } catch (error) {
        console.warn('Error saving bonus progress to localStorage:', error);
      }
      return newProgress;
    });
  };

  // Tooltip content for different cards
  const tooltipContent = {
    availableBalance: {
      title: "Available Balance",
      description: "This is your current account balance that's ready to be staked or withdrawn. You can use this amount to create new staking goals or transfer to external wallets.",
      action: "Use this balance to start new stakes or withdraw to your external wallet"
    },
    activeStakes: {
      title: "Active Stakes Value",
      description: "Total value of all your currently active staking goals. This money is working to generate returns and cannot be withdrawn until maturity.",
      action: "Monitor your growing stakes and wait for maturity to harvest profits"
    },
    totalEarnings: {
      title: "Total Earnings",
      description: "All the profits you've earned from completed staking goals. This includes bonus rewards and ROI from your stakes.",
      action: "These are your realized profits that can be withdrawn or restaked"
    },
    portfolioValue: {
      title: "Portfolio Value",
      description: "Your total wealth on the platform including available balance, active stakes, and earnings. This represents your complete financial position.",
      action: "Track your overall wealth growth and staking performance"
    },
    nxpPoints: {
      title: "NXP Points - Task-Based Rewards System",
      description: "Earn NXP through completing tasks with stake-based multipliers! Formula: NXP Earned = Base Task NXP + (Stake Amount × Task Points ÷ 100). Everyone gets base rewards, but higher stakes unlock bonus multipliers. Examples: Twitter follow (5 pts) with $50 stake = 3.50 NXP vs 1.25 NXP with $5 stake. Post testimonial video (15 pts) with $50 stake = 8.50 NXP! The system rewards both participation and stake.",
      action: "Complete available tasks and increase your stake amount to maximize NXP rewards. Higher stakes = higher multipliers on every task completed!"
    },
    nlpLegacy: {
      title: "NLP Legacy Points",
      description: "Novunt Legacy Points automatically calculated from your NXP (NXP ÷ 25 = NLP). These points will convert to blockchain tokens when we launch our cryptocurrency. NLP represents your long-term value and future governance rights in the Novunt ecosystem.",
      action: "Earn more NXP through tasks and staking to automatically increase your NLP balance. Every 25 NXP earned equals 1 additional NLP for future blockchain rewards"
    },
    nxpTaskRewards: {
      title: "NXP Task Rewards",
      description: "Your current stake multiplier for task rewards. Complete tasks like social media follows, reviews, or referrals to earn base NXP plus bonus points based on your stake amount. Formula: Base Task NXP + (Stake Amount × Task Points ÷ 100).",
      action: "Complete available tasks and increase your stake amount to maximize NXP rewards from each task"
    },
    nlpStakingPower: {
      title: "NLP Staking Power",
      description: "Your NLP tokens provide multiplied earning potential for your stakes. Higher NLP holdings increase your staking rewards through this multiplier effect.",
      action: "Accumulate more NLP through continued staking to boost your earning multiplier and maximize profits"
    },
    totalStakes: {
      title: "Total Stakes",
      description: "The cumulative amount you've staked in goals throughout your time on the platform.",
      action: "Continue staking to increase your portfolio and earnings potential"
    },
    totalWithdrawals: {
      title: "Total Withdrawals", 
      description: "All the money you've successfully withdrawn from your account to external wallets.",
      action: "Track your withdrawal history and ensure funds reached your external wallets"
    },
    totalBonus: {
      title: "Total Bonus",
      description: "All bonus rewards and ROI earned from your staking activities. This represents your staking gains.",
      action: "These bonuses can be withdrawn or used to create larger staking goals"
    },
    dailyPerformance: {
      title: "Daily Staking Performance",
      description: "Shows the daily return rates for the platform's staking algorithm. Your actual earnings depend on your stake amounts and these daily rates.",
      action: "Use this data to predict potential earnings and plan your staking strategy"
    },
    rankProgress: {
      title: "Rank Progression",
      description: "Your current tier level and progress toward the next rank. Higher ranks unlock better staking rates and exclusive features.",
      action: "Increase your staking activity to progress through ranks and unlock premium benefits"
    },
    goals: {
      title: "Financial Goals",
      description: "Personal financial targets you've set using your staking earnings. Track progress toward major purchases or savings milestones.",
      action: "Set realistic goals and use staking profits to achieve your financial dreams"
    },
    quickActions: {
      title: "Quick Actions",
      description: "Fast access to the most common platform activities. These shortcuts help you manage your stakes efficiently.",
      action: "Use these buttons to quickly stake funds, withdraw profits, or access other features"
    },
    performanceSummary: {
      title: "Performance Summary",
      description: "Key statistics about the platform's performance over the past 50 days, including averages and extremes.",
      action: "Use these metrics to understand platform consistency and plan your staking timing"
    },
    accountSummary: {
      title: "Account Summary", 
      description: "Complete overview of your account including balances, limits, verification status, and financial metrics.",
      action: "Monitor your account health and ensure you're maximizing available features"
    },
    financialOverview: {
      title: "Financial Overview",
      description: "Comprehensive view of your key financial metrics and activity on the platform. This shows your staking activity, completed goals, and earnings patterns.",
      action: "Use these metrics to track your progress and optimize your staking strategy"
    },
    activeStakesCount: {
      title: "Active Stakes",
      description: "Number of staking goals you currently have running. Each active stake is working to generate returns until it reaches maturity.",
      action: "Monitor your active stakes and plan when to create new ones for continuous growth"
    },
    completedStakes: {
      title: "Completed Stakes",
      description: "Total number of staking goals you've successfully completed. This shows your experience and consistency on the platform.",
      action: "Track your staking history and use this experience to make better staking decisions"
    },
    withdrawableAmount: {
      title: "Withdrawable Amount",
      description: "The total amount you can withdraw right now, including available balance and matured earnings minus platform fees.",
      action: "Withdraw these funds to your external wallet or reinvest them in new staking goals"
    },
    totalWithdrawn: {
      title: "Total Withdrawn",
      description: "Cumulative amount you've withdrawn from the platform to external wallets throughout your membership.",
      action: "Track your withdrawal history to see how much profit you've successfully taken out"
    },
    referrals: {
      title: "Referrals",
      description: "Number of people you've successfully referred to the platform. Referrals can earn you bonus rewards and commissions.",
      action: "Share your referral link to earn additional income from your network's staking activity"
    },
    dailyAverage: {
      title: "Daily Average Earnings",
      description: "Your average daily earnings based on recent staking performance. This helps predict your monthly earning potential.",
      action: "Use this metric to plan your financial goals and estimate future earnings"
    },
    registrationBonus: {
      title: "10% Registration Bonus",
      description: "Special welcome bonus for new members. Complete social media following and make your first deposit within 7 days to earn 10% bonus on your first deposit.",
      action: "Follow all social media accounts and make a deposit to claim your bonus before the deadline"
    },
    socialMediaStep: {
      title: "Social Media Following",
      description: "Follow all our official social media accounts to stay updated with platform news, tips, and exclusive offers. This is the first step to unlock your registration bonus.",
      action: "Click each platform to follow our accounts and get verified automatically"
    },
    depositStep: {
      title: "First Deposit",
      description: "Make your first deposit of at least $20 USDT to activate your account and become eligible for the 10% registration bonus.",
      action: "Complete your first deposit to unlock the bonus and start earning from staking"
    },
    timer: {
      title: "Bonus Countdown Timer",
      description: "This countdown shows the remaining time to complete your registration requirements. You have 7 days from account creation to follow all social media accounts and make your first deposit to unlock the 10% bonus.",
      action: "Complete all requirements before the timer reaches zero to claim your bonus"
    }
  };

  const handleSocialMediaFollow = (platform, url) => {
    // Open social media link
    window.open(url, '_blank');
    
    // Mark as followed (in real implementation, you'd verify this)
    updateBonusProgress(prev => ({
      ...prev,
      socialMediaFollowed: {
        ...prev.socialMediaFollowed,
        [platform]: true
      }
    }));
  };

  // Check if all social media platforms are followed
  const allSocialMediaFollowed = Object.values(bonusProgress.socialMediaFollowed).every(Boolean);

  // Update social media completion status
  useEffect(() => {
    if (allSocialMediaFollowed && !bonusProgress.socialMediaCompleted) {
      updateBonusProgress(prev => ({
        ...prev,
        socialMediaCompleted: true
      }));
    }
  }, [allSocialMediaFollowed, bonusProgress.socialMediaCompleted]);

  // Calculate remaining time for bonus eligibility
  const calculateRemainingTime = (registrationTimestamp, depositMade) => {
    const now = Date.now();
    const registrationTime = registrationTimestamp || now;
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const timeElapsed = now - registrationTime;
    const timeRemaining = sevenDaysInMs - timeElapsed;
    
    // If deposit is made, bonus is complete (no countdown needed)
    if (depositMade) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false, bonusComplete: true };
    }
    
    // If 7 days passed without deposit, bonus expired
    if (timeRemaining <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true, bonusComplete: false };
    }
    
    const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
    
    return { days, hours, minutes, seconds, expired: false, bonusComplete: false };
  };

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateRemainingTime(bonusProgress.registrationTimestamp, bonusProgress.depositMade);
      
      updateBonusProgress(prev => ({
        ...prev,
        daysRemaining: timeLeft.days,
        hoursRemaining: timeLeft.hours,
        minutesRemaining: timeLeft.minutes,
        secondsRemaining: timeLeft.seconds,
        bonusEligible: !timeLeft.expired && !prev.bonusClaimed && !timeLeft.bonusComplete
      }));
    }, 1000);

    // Initial calculation
    const timeLeft = calculateRemainingTime(bonusProgress.registrationTimestamp, bonusProgress.depositMade);
    updateBonusProgress(prev => ({
      ...prev,
      daysRemaining: timeLeft.days,
      hoursRemaining: timeLeft.hours,
      minutesRemaining: timeLeft.minutes,
      secondsRemaining: timeLeft.seconds,
      bonusEligible: !timeLeft.expired && !prev.bonusClaimed && !timeLeft.bonusComplete
    }));

    return () => clearInterval(timer);
  }, [bonusProgress.registrationTimestamp, bonusProgress.depositMade]);

  // Tooltip component
  // eslint-disable-next-line react/prop-types
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

  // Registration Bonus Component
  const RegistrationBonusTracker = () => {
    if (!bonusProgress.bonusEligible || bonusProgress.bonusClaimed) return null;

    const socialMediaPlatforms = [
      { key: 'tiktok', name: 'TikTok', icon: Video, url: 'https://tiktok.com/@novunt_official', color: 'from-black to-gray-800' },
      { key: 'telegram_channel', name: 'Telegram Channel', icon: MessageCircle, url: 'https://t.me/novunt_channel', color: 'from-slate-700 via-blue-900 to-slate-700' },
      { key: 'telegram_group', name: 'Telegram Group', icon: Phone, url: 'https://t.me/novunt_group', color: 'from-slate-600 via-blue-800 to-slate-600' },
      { key: 'instagram', name: 'Instagram', icon: Instagram, url: 'https://instagram.com/novunt_official', color: 'from-pink-400 to-purple-600' },
      { key: 'facebook', name: 'Facebook', icon: Facebook, url: 'https://facebook.com/novunt_official', color: 'from-slate-800 via-blue-900 to-slate-800' },
      { key: 'youtube', name: 'YouTube', icon: Users, url: 'https://youtube.com/@novunt_official', color: 'from-red-500 to-red-700' }
    ];

    const completedSocialMedia = Object.values(bonusProgress.socialMediaFollowed).filter(Boolean).length;
    const socialMediaProgress = (completedSocialMedia / socialMediaPlatforms.length) * 100;

    return (
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/30 mb-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500/30 p-3 rounded-xl">
                <Gift className="text-yellow-400" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center">
                  🎉 10% Registration Bonus
                  <Sparkles className="ml-2 text-yellow-400" size={20} />
                  <button 
                    onClick={() => setActiveTooltip('registrationBonus')}
                    className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                  >
                    <HelpCircle className="text-yellow-400" size={16} />
                  </button>
                </h3>
                <p className="text-yellow-200">Complete the steps below to unlock your bonus!</p>
                {/* Development reset button - only visible in development */}
                {import.meta.env.DEV && (
                  <div className="flex space-x-2 mt-2">
                    <button 
                      onClick={() => {
                        updateBonusProgress(prev => ({
                          ...prev,
                          registrationTimestamp: Date.now(),
                          daysRemaining: 7,
                          hoursRemaining: 0,
                          minutesRemaining: 0,
                          secondsRemaining: 0,
                          bonusEligible: true,
                          depositMade: false
                        }));
                      }}
                      className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded hover:bg-red-500/30 transition-colors"
                    >
                      🔄 Reset Timer (Dev)
                    </button>
                    <button 
                      onClick={() => {
                        updateBonusProgress(prev => ({
                          ...prev,
                          depositMade: true,
                          bonusEligible: false
                        }));
                      }}
                      className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded hover:bg-green-500/30 transition-colors"
                    >
                      💰 Simulate Deposit (Dev)
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Timer className="text-yellow-400" size={16} />
                  <span className="text-sm font-medium text-yellow-200">Time Remaining</span>
                  <HelpCircle 
                    className="text-yellow-200 hover:text-white cursor-pointer ml-1" 
                    size={14} 
                    onClick={() => setActiveTooltip('timer')}
                  />
                </div>
                {bonusProgress.depositMade ? (
                  // Bonus Complete State (Deposit Made)
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3 text-center border border-green-400/30">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <CheckCircle className="text-green-400" size={16} />
                        <span className="text-sm font-bold text-green-400">BONUS COMPLETE</span>
                      </div>
                      <p className="text-xs text-green-300">Deposit made! Bonus requirements fulfilled</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-400/20">
                      <div className="text-center mb-2">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Gift className="text-blue-400" size={14} />
                          <span className="text-xs font-semibold text-blue-300">BONUS AWARDED</span>
                        </div>
                        <p className="text-xs text-blue-200">Your 10% bonus has been applied!</p>
                      </div>
                    </div>
                  </div>
                ) : bonusProgress.bonusEligible ? (
                  // Active Countdown State
                  <div className="flex gap-1 text-center">
                    <div className="bg-yellow-500/20 rounded p-1 min-w-[35px]">
                      <div className="text-sm font-bold text-white">{bonusProgress.daysRemaining || 0}</div>
                      <div className="text-xs text-yellow-200">Days</div>
                    </div>
                    <div className="bg-yellow-500/20 rounded p-1 min-w-[35px]">
                      <div className="text-sm font-bold text-white">{bonusProgress.hoursRemaining || 0}</div>
                      <div className="text-xs text-yellow-200">Hrs</div>
                    </div>
                    <div className="bg-orange-500/20 rounded p-1 min-w-[35px]">
                      <div className="text-sm font-bold text-white">{bonusProgress.minutesRemaining || 0}</div>
                      <div className="text-xs text-orange-200">Min</div>
                    </div>
                    <div className="bg-orange-500/20 rounded p-1 min-w-[35px]">
                      <div className="text-sm font-bold text-white">{bonusProgress.secondsRemaining || 0}</div>
                      <div className="text-xs text-orange-200">Sec</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Expired Status */}
                    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-3 text-center border border-red-400/30">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Clock className="text-red-400" size={16} />
                        <span className="text-sm font-bold text-red-400">BONUS EXPIRED</span>
                      </div>
                      <p className="text-xs text-red-300">Registration bonus period ended</p>
                    </div>
                    
                    {/* Alternative Options */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-400/20">
                      <div className="text-center mb-2">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Star className="text-blue-400" size={14} />
                          <span className="text-xs font-semibold text-blue-300">EARN MORE</span>
                        </div>
                        <p className="text-xs text-blue-200">Continue earning through:</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-green-500/20 rounded p-2">
                          <div className="text-xs font-bold text-green-400">Staking</div>
                          <div className="text-xs text-green-300">Daily ROI</div>
                        </div>
                        <div className="bg-purple-500/20 rounded p-2">
                          <div className="text-xs font-bold text-purple-400">Referrals</div>
                          <div className="text-xs text-purple-300">Commissions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Step 1: Social Media Following */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                    bonusProgress.socialMediaCompleted ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                  }`}>
                    1
                  </span>
                  Follow Our Social Media
                  <button 
                    onClick={() => setActiveTooltip('socialMediaStep')}
                    className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                  >
                    <HelpCircle className="text-white" size={14} />
                  </button>
                </h4>
                {bonusProgress.socialMediaCompleted && (
                  <CheckCircle className="text-green-400" size={24} />
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-yellow-200 mb-2">
                  <span>Progress: {completedSocialMedia}/{socialMediaPlatforms.length}</span>
                  <span>{Math.round(socialMediaProgress)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full h-3 transition-all duration-1000"
                    style={{ width: `${socialMediaProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {socialMediaPlatforms.map((platform) => {
                  const Icon = platform.icon;
                  const isFollowed = bonusProgress.socialMediaFollowed[platform.key];
                  
                  return (
                    <button
                      key={platform.key}
                      onClick={() => handleSocialMediaFollow(platform.key, platform.url)}
                      disabled={isFollowed}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                        isFollowed 
                          ? 'bg-green-500/20 border border-green-400/30 cursor-default' 
                          : `bg-gradient-to-r ${platform.color}/20 border border-white/20 hover:scale-105 hover:border-white/40`
                      }`}
                    >
                      <Icon className={isFollowed ? 'text-green-400' : 'text-white'} size={20} />
                      <span className={`text-sm font-medium ${isFollowed ? 'text-green-400' : 'text-white'}`}>
                        {platform.name}
                      </span>
                      {isFollowed ? (
                        <CheckCircle className="text-green-400" size={16} />
                      ) : (
                        <ExternalLink className="text-white/60" size={16} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Make Deposit */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                    bonusProgress.depositMade ? 'bg-green-500 text-white' : 
                    bonusProgress.socialMediaCompleted ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'
                  }`}>
                    2
                  </span>
                  Make Your First Deposit
                  <button 
                    onClick={() => setActiveTooltip('depositStep')}
                    className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                  >
                    <HelpCircle className="text-white" size={14} />
                  </button>
                </h4>
                {bonusProgress.depositMade && (
                  <CheckCircle className="text-green-400" size={24} />
                )}
              </div>

              {!bonusProgress.socialMediaCompleted ? (
                <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-400/20">
                  <div className="flex items-center space-x-2 text-orange-200">
                    <Clock size={16} />
                    <span className="text-sm">Complete Step 1 to unlock this step</span>
                  </div>
                </div>
              ) : bonusProgress.depositMade ? (
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-400/20">
                  <div className="flex items-center space-x-2 text-green-200 mb-3">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Deposit completed! 🎉</span>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-lg font-bold mb-2">Your 10% bonus is ready!</p>
                    <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all">
                      Claim Bonus
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-400/20">
                    <div className="flex items-center space-x-2 text-yellow-200 mb-2">
                      <DollarSign size={16} />
                      <span className="text-sm font-medium">Make a deposit to earn 10% bonus</span>
                    </div>
                    <p className="text-xs text-yellow-300">Minimum deposit: $20 USDT</p>
                  </div>
                  
                  <Link 
                    to="/app/deposit" 
                    className="block bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-4 rounded-lg text-center hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    Make Deposit Now
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bonus Summary */}
          <div className="mt-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-200 text-sm">Total Bonus Available</p>
                <p className="text-2xl font-bold text-white">10% of First Deposit</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-200 text-sm">Status</p>
                <p className="text-lg font-bold text-white">
                  {bonusProgress.depositMade && bonusProgress.socialMediaCompleted ? 
                    '🎉 Ready to Claim!' : 
                    `Step ${bonusProgress.socialMediaCompleted ? '2' : '1'} of 2`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mock performance data (controlled from admin dashboard)
  // Rolling 50-day performance data - oldest entries automatically removed
  const performanceData = [
    { date: "2025-08-12", percentage: 1.2 },
    { date: "2025-08-11", percentage: 0.8 },
    { date: "2025-08-10", percentage: 1.4 },
    { date: "2025-08-09", percentage: 1.1 },
    { date: "2025-08-08", percentage: 0.9 },
    { date: "2025-08-07", percentage: 1.3 },
    { date: "2025-08-06", percentage: 0.7 },
    { date: "2025-08-05", percentage: 1.6 },
    { date: "2025-08-04", percentage: 1.0 },
    { date: "2025-08-03", percentage: 0.6 },
    { date: "2025-08-02", percentage: 1.5 },
    { date: "2025-08-01", percentage: 0.9 },
    { date: "2025-07-31", percentage: 1.2 },
    { date: "2025-07-30", percentage: 1.7 },
    { date: "2025-07-29", percentage: 0.8 },
    { date: "2025-07-28", percentage: 1.1 },
    { date: "2025-07-27", percentage: 1.4 },
    { date: "2025-07-26", percentage: 0.5 },
    { date: "2025-07-25", percentage: 1.8 },
    { date: "2025-07-24", percentage: 1.0 },
    { date: "2025-07-23", percentage: 0.7 },
    { date: "2025-07-22", percentage: 1.3 },
    { date: "2025-07-21", percentage: 1.6 },
    { date: "2025-07-20", percentage: 0.9 },
    { date: "2025-07-19", percentage: 1.2 },
    { date: "2025-07-18", percentage: 1.5 },
    { date: "2025-07-17", percentage: 0.6 },
    { date: "2025-07-16", percentage: 1.4 },
    { date: "2025-07-15", percentage: 1.1 },
    { date: "2025-07-14", percentage: 0.8 },
    { date: "2025-07-13", percentage: 1.7 },
    { date: "2025-07-12", percentage: 1.0 },
    { date: "2025-07-11", percentage: 1.3 },
    { date: "2025-07-10", percentage: 0.7 },
    { date: "2025-07-09", percentage: 1.5 },
    { date: "2025-07-08", percentage: 1.2 },
    { date: "2025-07-07", percentage: 0.9 },
    { date: "2025-07-06", percentage: 1.6 },
    { date: "2025-07-05", percentage: 0.4 },
    { date: "2025-07-04", percentage: 1.8 },
    { date: "2025-07-03", percentage: 1.1 },
    { date: "2025-07-02", percentage: 0.8 },
    { date: "2025-07-01", percentage: 1.4 },
    { date: "2025-06-30", percentage: 1.0 },
    { date: "2025-06-29", percentage: 1.7 },
    { date: "2025-06-28", percentage: 0.6 },
    { date: "2025-06-27", percentage: 1.3 },
    { date: "2025-06-26", percentage: 1.5 },
    { date: "2025-06-25", percentage: 0.9 },
    { date: "2025-06-24", percentage: 1.2 }
  ];

  // Calculate estimated earnings based on user's total stake or available balance
  const calculateEstimatedEarnings = (percentage) => {
    // If user has active stakes, calculate based on total stakes
    if (totalStakes > 0) {
      return Math.round((totalStakes * percentage) / 100);
    }
    // If user has no stakes but has account balance, show potential earnings
    if (accountBalance > 0) {
      return Math.round((accountBalance * percentage) / 100);
    }
    // If user has no stakes and no balance, show $0
    return 0;
  };

  // Pagination logic - 5 entries per view
  const entriesPerView = 5;
  const totalViews = Math.ceil(performanceData.length / entriesPerView);
  const currentViewData = performanceData.slice(
    performanceViewIndex * entriesPerView,
    (performanceViewIndex + 1) * entriesPerView
  );

  // Update time every second for live feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!user || !token) return;
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch Stakes
    fetch(`https://novunt.vercel.app/api/v1/transactions/stakes/history/${user.userID}`, { headers })
      .then(res => res.json())
      .then(data => {
        const stakes = data?.stakes || data?.data?.stakes || [];
        setStakes(stakes);
      })
      .catch(error => {
        console.error('Error fetching stakes:', error);
        setStakes([]);
      });

    // Fetch Withdrawals
    fetch(`https://novunt.vercel.app/api/v1/withdrawals/my-withdrawals`, { headers })
      .then(res => res.json())
      .then(data => {
        const withdrawals = data?.withdrawals || data?.data?.withdrawals || [];
        setWithdrawals(withdrawals);
      })
      .catch(error => {
        console.error('Error fetching withdrawals:', error);
        setWithdrawals([]);
      });
  }, [user, token]);

  // Computed values from actual data
  const totalStakes = stakes.filter(s => !s.isBonus).reduce((sum, s) => sum + (s.amount || 0), 0);
  const totalBonus = stakes.filter(s => s.isBonus).reduce((sum, s) => sum + (s.roiAmount || 0), 0);
  const totalWithdrawals = withdrawals.reduce((sum, w) => sum + (w.amount || 0), 0);
  const accountBalance = user?.wallet?.balance || 0;
  const nxpPoints = Math.floor(totalStakes * 100);
  const nlpPoints = Math.floor(totalBonus * 150);
  const totalEarnings = totalStakes + totalBonus;
  const progressPercentage = Math.min((totalEarnings / 100000) * 100, 100);
  
  // Enhanced financial calculations
  const netProfit = totalBonus - totalWithdrawals;
  const totalPortfolioValue = accountBalance + totalStakes + totalBonus;
  const profitMargin = totalStakes > 0 ? ((totalBonus / totalStakes) * 100) : 0;
  const withdrawableAmount = Math.max(accountBalance + totalBonus - (totalBonus * 0.1), 0); // Minus 10% fee
  const activeStakes = stakes.filter(s => !s.isCompleted).length;
  const completedStakes = stakes.filter(s => s.isCompleted).length;
  
  // Weekly performance (mock data - replace with real calculation)
  const weeklyChange = 4.2;
  const dailyEarnings = totalBonus > 0 ? totalBonus / 30 : 0; // Approximate daily earnings

  // User stats combining computed values with mock data for features not yet implemented
  const userStats = {
    nxp: nxpPoints || 2450,
    nlp: nlpPoints || 1225,
    totalStakes: totalStakes || 0,
    totalWithdrawals: totalWithdrawals || 0,
    totalBonus: totalBonus || 0,
    accountBalance: accountBalance,
    netProfit: netProfit || 0,
    totalPortfolioValue: totalPortfolioValue || 0,
    profitMargin: Math.round(profitMargin * 100) / 100 || 0,
    withdrawableAmount: withdrawableAmount || 0,
    activeStakes: activeStakes || 0,
    completedStakes: completedStakes || 0,
    weeklyChange: weeklyChange || 4.2,
    dailyEarnings: Math.round(dailyEarnings * 100) / 100 || 0,
    rank: "Principal Strategist",
    nextRank: "Elite Capitalist",
    rankProgress: Math.round(progressPercentage) || 65,
    referrals: 12,
    totalEarnings: totalEarnings || 15420,
    weeklyROI: 4.2,
    goals: [
      { name: "House Goal", current: 8500, target: 50000, progress: 17 },
      { name: "Car Goal", current: 12000, target: 25000, progress: 48 },
      { name: "Emergency Fund", current: 5000, target: 10000, progress: 50 }
    ]
  };

  // Check if user has made a deposit (based on account balance or stakes)
  useEffect(() => {
    const hasDeposit = accountBalance > 0 || totalStakes > 0;
    updateBonusProgress(prev => ({
      ...prev,
      depositMade: hasDeposit
    }));
  }, [accountBalance, totalStakes]);

  // Initialize activities data
  useEffect(() => {
    const generateInitialActivities = () => {
      const entries = mockDataGenerator.generateEntries(20);
      setActivities(entries);
    };

    generateInitialActivities();
    
    // Update activities every 30 seconds
    const interval = setInterval(() => {
      const newEntries = mockDataGenerator.generateEntries(20);
      setActivities(newEntries);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getRankColor = (rank) => {
    const colors = {
      "Associate Stakeholder": "from-green-400 to-green-600",
      "Principal Strategist": "from-slate-700 via-blue-900 to-slate-700", 
      "Elite Capitalist": "from-purple-400 to-purple-600",
      "Wealth Architect": "from-yellow-400 to-yellow-600",
      "Finance Titan": "from-red-400 to-red-600"
    };
    return colors[rank] || "from-gray-400 to-gray-600";
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
        {/* Creative Integrated Navigation */}
        <div className="mb-8">
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-r from-orange-500/15 to-yellow-500/15 backdrop-blur-md rounded-2xl p-4 border border-orange-400/25 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  {navbarLinks.slice(0, -1).map((group, groupIndex) => (
                    <div key={groupIndex} className="flex items-center space-x-6">
                      {group.links.map((link) => (
                        <Link
                          key={link.label}
                          to={link.path}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            location.pathname === link.path
                              ? 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-white shadow-lg border border-orange-400/30'
                              : 'text-orange-200 hover:bg-gradient-to-r hover:from-orange-500/15 hover:to-yellow-500/15 hover:text-white'
                          }`}
                        >
                          <span className="w-5 h-5">
                            {typeof link.icon === 'function' ? link.icon() : <link.icon size={20} />}
                          </span>
                          <span className="font-medium">{link.label}</span>
                          {location.pathname === link.path && (
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                          )}
                        </Link>
                      ))}
                      {groupIndex === 0 && <div className="w-px h-6 bg-orange-400/30"></div>}
                    </div>
                  ))}
                </div>
                
                {/* User Actions */}
                <div className="flex items-center space-x-4">
                  <Link
                    to="/app/notification"
                    className="relative p-3 bg-orange-500/20 rounded-xl border border-orange-400/30 hover:bg-orange-500/30 transition-all group"
                  >
                    <Bell className="text-orange-300 group-hover:text-orange-200" size={20} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-orange-400/50"></div>
                  </Link>
                  <Link
                    to="/app/edit-profile"
                    className="p-3 bg-orange-500/20 rounded-xl border border-orange-400/30 hover:bg-orange-500/30 transition-all group"
                  >
                    <User className="text-orange-300 group-hover:text-orange-200" size={20} />
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      window.location.href = "/auth/signin";
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl border border-red-400/30 text-red-300 hover:from-red-500/30 hover:to-red-600/30 hover:text-red-200 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <div className="bg-gradient-to-r from-orange-500/15 to-yellow-500/15 backdrop-blur-md rounded-2xl p-4 border border-orange-400/25 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <h3 className="text-white font-semibold">Navigation</h3>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 bg-orange-500/20 rounded-lg border border-orange-400/30"
                >
                  <Menu className="text-orange-300" size={20} />
                </button>
              </div>
              
              {mobileMenuOpen && (
                <div className="mt-4 space-y-2">
                  {navbarLinks.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-2">
                      {group.links.map((link) => (
                        <Link
                          key={link.label}
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                            location.pathname === link.path
                              ? 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-white'
                              : 'text-orange-200 hover:bg-orange-500/15'
                          }`}
                        >
                          <span className="w-5 h-5">
                            {typeof link.icon === 'function' ? link.icon() : <link.icon size={18} />}
                          </span>
                          <span>{link.label}</span>
                        </Link>
                      ))}
                      {groupIndex < navbarLinks.length - 1 && (
                        <div className="border-t border-orange-400/20 my-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome back, <span className="text-yellow-400">{user?.fname || 'Stakeholder'}</span>
              </h1>
              <p className="text-blue-200 text-lg">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setShowBalances(!showBalances)}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all"
              >
                {showBalances ? <Eye size={20} /> : <EyeOff size={20} />}
                <span>{showBalances ? 'Hide' : 'Show'} Balances</span>
              </button>
            </div>
          </div>

          {/* Enhanced Rank Status Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-500/30 p-3 rounded-xl border border-orange-400/30">
                    <Crown className="text-orange-400" size={32} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-2xl font-bold text-white">{userStats.rank}</h3>
                      <button 
                        onClick={() => setActiveTooltip('rankProgress')}
                        className="bg-orange-500/20 hover:bg-orange-500/30 rounded-full p-1 transition-all border border-orange-400/30"
                      >
                        <HelpCircle className="text-orange-400" size={16} />
                      </button>
                    </div>
                    <p className="text-orange-200 text-sm">Progress to {userStats.nextRank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-gradient-to-r from-orange-500/15 to-yellow-500/15 backdrop-blur-sm rounded-xl p-4 border border-orange-400/25">
                    <p className="text-3xl font-bold text-white mb-1">{userStats.rankProgress}%</p>
                    <p className="text-orange-200 text-sm">Completion</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-orange-200">
                  <span>Rank Progress</span>
                  <span>{userStats.rankProgress}% to {userStats.nextRank}</span>
                </div>
                <div className="w-full bg-orange-500/20 rounded-full h-4 relative overflow-hidden border border-orange-400/30">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out relative shadow-md"
                    style={{ width: `${userStats.rankProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-orange-300">
                  <span>{userStats.rank}</span>
                  <span>{userStats.nextRank}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Bonus Tracker */}
          <RegistrationBonusTracker />
        </div>

        {/* Enhanced Account Summary */}
        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 mb-8 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500/30 p-3 rounded-xl">
                <Wallet className="text-orange-400" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center">
                  Account Summary
                  <Sparkles className="ml-2 text-yellow-400" size={20} />
                  <button 
                    onClick={() => setActiveTooltip('accountSummary')}
                    className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                  >
                    <HelpCircle className="text-orange-400" size={16} />
                  </button>
                </h3>
                <p className="text-orange-200">Your complete financial overview and account status</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-green-400">
                  <CheckCircle size={16} className="mr-1" />
                  <span>Verified Account</span>
                </div>
                <div className="text-orange-200">
                  Member since {new Date(user?.createdAt || '2024-01-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Available Balance */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-4 border border-green-400/30">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-500/30 p-2 rounded-lg">
                  <Wallet className="text-green-400" size={20} />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <p className="text-sm text-green-200">Available Balance</p>
                    <button 
                      onClick={() => setActiveTooltip('availableBalance')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-green-300" size={12} />
                    </button>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {showBalances ? `$${userStats.accountBalance.toLocaleString()}` : '$****'}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-green-400 text-xs">
                <Shield size={12} className="mr-1" />
                <span>Ready to stake/withdraw</span>
              </div>
            </div>

            {/* Active Stakes Value */}
            <div className="bg-gradient-to-br from-slate-700/20 via-blue-900/20 to-slate-700/20 rounded-xl p-4 border border-blue-900/30">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <Package className="text-blue-200" size={20} />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <p className="text-sm text-blue-200">Active Stakes Value</p>
                    <button 
                      onClick={() => setActiveTooltip('activeStakes')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-blue-200" size={12} />
                    </button>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {showBalances ? `$${userStats.totalStakes.toLocaleString()}` : '$****'}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-blue-200 text-xs">
                <Clock size={12} className="mr-1" />
                <span>{userStats.activeStakes} stakes growing</span>
              </div>
            </div>

            {/* Total Earnings */}
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-400/30">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-purple-500/30 p-2 rounded-lg">
                  <TrendingUp className="text-purple-400" size={20} />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <p className="text-sm text-purple-200">Total Earnings</p>
                    <button 
                      onClick={() => setActiveTooltip('totalEarnings')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-purple-300" size={12} />
                    </button>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {showBalances ? `$${userStats.totalBonus.toLocaleString()}` : '$****'}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-purple-400 text-xs">
                <Star size={12} className="mr-1" />
                <span>Lifetime rewards</span>
              </div>
            </div>

            {/* Portfolio Value */}
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-4 border border-orange-400/30">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-orange-500/30 p-2 rounded-lg">
                  <BarChart3 className="text-orange-400" size={20} />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <p className="text-sm text-orange-200">Portfolio Value</p>
                    <button 
                      onClick={() => setActiveTooltip('portfolioValue')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-orange-300" size={12} />
                    </button>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {showBalances ? `$${userStats.totalPortfolioValue.toLocaleString()}` : '$****'}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-orange-400 text-xs">
                <TrendingUp size={12} className="mr-1" />
                <span>+{userStats.weeklyChange}% this week</span>
              </div>
            </div>
          </div>

          {/* Detailed Financial Overview */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-orange-500/30 p-2 rounded-lg">
                <BarChart3 className="text-orange-400" size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white flex items-center">
                  Financial Overview
                  <button 
                    onClick={() => setActiveTooltip('financialOverview')}
                    className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                  >
                    <HelpCircle className="text-orange-400" size={14} />
                  </button>
                </h4>
                <p className="text-orange-200 text-sm">Detailed account metrics and statistics</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 relative hover:bg-white/20 transition-all">
                <button 
                  onClick={() => setActiveTooltip('activeStakesCount')}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                >
                  <HelpCircle className="text-orange-200" size={10} />
                </button>
                <p className="text-lg font-bold text-white">{userStats.activeStakes}</p>
                <p className="text-xs text-orange-200">Active Stakes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 relative hover:bg-white/20 transition-all">
                <button 
                  onClick={() => setActiveTooltip('completedStakes')}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                >
                  <HelpCircle className="text-orange-200" size={10} />
                </button>
                <p className="text-lg font-bold text-white">{userStats.completedStakes}</p>
                <p className="text-xs text-orange-200">Completed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 relative hover:bg-white/20 transition-all">
                <button 
                  onClick={() => setActiveTooltip('withdrawableAmount')}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                >
                  <HelpCircle className="text-orange-200" size={10} />
                </button>
                <p className="text-lg font-bold text-white">
                  {showBalances ? `$${userStats.withdrawableAmount.toLocaleString()}` : '$****'}
                </p>
                <p className="text-xs text-orange-200">Withdrawable</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 relative hover:bg-white/20 transition-all">
                <button 
                  onClick={() => setActiveTooltip('totalWithdrawn')}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                >
                  <HelpCircle className="text-orange-200" size={10} />
                </button>
                <p className="text-lg font-bold text-white">
                  {showBalances ? `$${userStats.totalWithdrawals.toLocaleString()}` : '$****'}
                </p>
                <p className="text-xs text-orange-200">Total Withdrawn</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 relative hover:bg-white/20 transition-all">
                <button 
                  onClick={() => setActiveTooltip('referrals')}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                >
                  <HelpCircle className="text-orange-200" size={10} />
                </button>
                <p className="text-lg font-bold text-white">{userStats.referrals}</p>
                <p className="text-xs text-orange-200">Referrals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 relative hover:bg-white/20 transition-all">
                <button 
                  onClick={() => setActiveTooltip('dailyAverage')}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                >
                  <HelpCircle className="text-orange-200" size={10} />
                </button>
                <p className="text-lg font-bold text-white">
                  {showBalances ? `$${userStats.dailyEarnings.toLocaleString()}` : '$****'}
                </p>
                <p className="text-xs text-orange-200">Daily Avg.</p>
              </div>
            </div>
          </div>

          {/* Account Limits & Status */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-orange-500/30 p-2 rounded-lg">
                <Shield className="text-orange-400" size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Account Status & Limits</h4>
                <p className="text-orange-200 text-sm">Verification level and account capabilities</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-4 border border-green-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-emerald-400/5 to-green-400/5 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">Verification Level</p>
                    <p className="text-lg font-bold text-white">Premium</p>
                    <p className="text-xs text-green-300">Full access enabled</p>
                  </div>
                  <div className="bg-green-500/30 p-2 rounded-lg">
                    <CheckCircle className="text-green-400" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-orange-200 text-sm">Daily Withdraw Limit</p>
                    <p className="text-lg font-bold text-white">$50,000</p>
                    <p className="text-xs text-orange-200">Remaining: $50,000</p>
                  </div>
                  <div className="bg-orange-500/30 p-2 rounded-lg">
                    <Wallet className="text-orange-400" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/5 to-yellow-400/5 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-yellow-200 text-sm">Staking Capacity</p>
                    <p className="text-lg font-bold text-white">Unlimited</p>
                    <p className="text-xs text-yellow-300">Premium tier benefits</p>
                  </div>
                  <div className="bg-yellow-500/30 p-2 rounded-lg">
                    <Target className="text-yellow-400" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-9">
          {/* XP Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-500/30 p-3 rounded-xl border border-yellow-400/30">
                  <Zap className="text-yellow-400" size={24} />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1 mb-1">
                    <p className="text-orange-200 text-sm">NXP Rewards</p>
                    <button 
                      onClick={() => setActiveTooltip('nxpRewards')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-orange-300" size={12} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-white">{showBalances ? userStats.nxp.toLocaleString() : '****'}</p>
                </div>
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp size={16} className="mr-1" />
                <span>Gamification Earnings</span>
              </div>
            </div>
          </div>

          {/* NLP Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/30 p-3 rounded-xl border border-purple-400/30">
                  <Coins className="text-purple-400" size={24} />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1 mb-1">
                    <p className="text-orange-200 text-sm">NLP Token</p>
                    <button 
                      onClick={() => setActiveTooltip('nlpToken')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-orange-300" size={12} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-white">{showBalances ? Math.floor(userStats.nxp / 125).toLocaleString() : '****'}</p>
                </div>
              </div>
              <div className="flex items-center text-blue-400 text-sm">
                <Star size={16} className="mr-1" />
                <span>125,000,000 Total NLP Supply</span>
              </div>
            </div>
          </div>

          {/* Total Bonus */}
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500/30 p-3 rounded-xl border border-orange-400/30">
                  <Trophy className="text-orange-400" size={24} />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1 mb-1">
                    <p className="text-orange-200 text-sm">Total Bonus</p>
                    <button 
                      onClick={() => setActiveTooltip('totalBonus')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-orange-300" size={12} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-white">{showBalances ? `$${userStats.totalBonus.toLocaleString()}` : '$****'}</p>
                </div>
              </div>
              <div className="flex items-center text-orange-400 text-sm">
                <Star size={16} className="mr-1" />
                <span>Bonus earnings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions Center */}
        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 mb-8 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500/30 p-3 rounded-xl">
                  <Zap className="text-orange-400" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    Quick Actions
                    <Sparkles className="ml-2 text-yellow-400" size={20} />
                    <button 
                      onClick={() => setActiveTooltip('quickActions')}
                      className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-orange-400" size={16} />
                    </button>
                  </h3>
                  <p className="text-orange-200">Take instant action on your portfolio</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stake Funds */}
              <Link 
                to="/app/stake" 
                className="group bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-400/30 rounded-xl p-6 hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-orange-500/30 p-4 rounded-full mb-4 group-hover:bg-orange-500/40 transition-all">
                    <Package className="text-orange-400" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Stake Funds</h4>
                  <p className="text-orange-200 text-sm mb-3">Start earning up to 200% ROI</p>
                  <div className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-semibold">
                    10% Bonus Available
                  </div>
                </div>
              </Link>

              {/* Withdraw */}
              <button className="group bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-400/30 rounded-xl p-6 hover:from-yellow-500/30 hover:to-orange-600/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/5 to-yellow-400/5 animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-yellow-500/30 p-4 rounded-full mb-4 group-hover:bg-yellow-500/40 transition-all">
                    <Wallet className="text-yellow-400" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Withdraw</h4>
                  <p className="text-yellow-200 text-sm mb-3">Access your profits</p>
                  <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Min: $20 USDT
                  </div>
                </div>
              </button>

              {/* Transfer */}
              <button className="group bg-gradient-to-br from-orange-600/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-6 hover:from-orange-600/30 hover:to-yellow-500/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-yellow-400/5 to-orange-500/5 animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-orange-600/30 p-4 rounded-full mb-4 group-hover:bg-orange-600/40 transition-all">
                    <ArrowUpRight className="text-orange-500" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Transfer</h4>
                  <p className="text-orange-200 text-sm mb-3">Send to other users</p>
                  <div className="bg-orange-600/20 text-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
                    Instant Transfer
                  </div>
                </div>
              </button>

              {/* Deposit */}
              <button className="group bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-6 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/5 to-yellow-400/5 animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-yellow-500/30 p-4 rounded-full mb-4 group-hover:bg-yellow-500/40 transition-all">
                    <PlusCircle className="text-yellow-400" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Deposit</h4>
                  <p className="text-yellow-200 text-sm mb-3">Fund your account</p>
                  <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    USDT Only
                  </div>
                </div>
              </button>
            </div>

            {/* Action Stats */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-orange-500/30 p-2 rounded-lg">
                  <BarChart3 className="text-orange-400" size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Action Guidelines</h4>
                  <p className="text-orange-200 text-xs">Important limits and fees to know</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                  <p className="text-lg font-bold text-white">24hr</p>
                  <p className="text-xs text-orange-200">Cooldown Period</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                  <p className="text-lg font-bold text-white">5%</p>
                  <p className="text-xs text-orange-200">Withdrawal Fee</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                  <p className="text-lg font-bold text-white">200%</p>
                  <p className="text-xs text-orange-200">Max ROI Cap</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                  <p className="text-lg font-bold text-white">$20</p>
                  <p className="text-xs text-orange-200">Min Stake</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Goals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Financial Goals */}
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500/30 p-3 rounded-xl">
                    <Target className="text-orange-400" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      Financial Goals
                      <Sparkles className="ml-2 text-yellow-400" size={18} />
                      <button 
                        onClick={() => setActiveTooltip('goals')}
                        className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                      >
                        <HelpCircle className="text-orange-400" size={14} />
                      </button>
                    </h3>
                    <p className="text-orange-200 text-sm">Track your financial milestones</p>
                  </div>
                </div>
                <Link 
                  to="/app/stake" 
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-all flex items-center shadow-lg hover:scale-105"
                >
                  <Target size={16} className="mr-1" />
                  New Goal <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {userStats.goals.map((goal, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:border-orange-400/30 hover:bg-white/15 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-orange-500/30 p-2 rounded-lg">
                            <Target className="text-orange-400" size={16} />
                          </div>
                          <h4 className="font-semibold text-white">{goal.name}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-orange-400 font-bold text-lg">{goal.progress}%</span>
                          <p className="text-xs text-orange-200">Complete</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-orange-200 mb-3">
                        <span className="font-medium">
                          Current: {showBalances ? `$${goal.current.toLocaleString()}` : '$****'}
                        </span>
                        <span className="font-medium">Target: ${goal.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3 mb-3">
                        <div 
                          className="bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 rounded-full h-3 transition-all duration-1000 relative overflow-hidden"
                          style={{ width: `${goal.progress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-orange-300">
                          Remaining: ${(goal.target - goal.current).toLocaleString()}
                        </span>
                        <div className="flex items-center text-green-400">
                          <Clock size={12} className="mr-1" />
                          <span>Est. {Math.ceil((goal.target - goal.current) / 1000)} weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Goal Summary */}
                <div className="bg-gradient-to-r from-orange-500/15 to-yellow-500/15 backdrop-blur-sm rounded-xl p-4 border border-orange-400/25 mt-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-200">Total Goal Progress</p>
                      <p className="text-lg font-bold text-white">
                        {Math.round(userStats.goals.reduce((sum, goal) => sum + goal.progress, 0) / userStats.goals.length)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-orange-200">Goals Achieving</p>
                      <p className="text-lg font-bold text-white">
                        {userStats.goals.filter(g => g.progress > 50).length}/{userStats.goals.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Activities */}
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>
            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Activity className="mr-2 text-orange-400" size={24} />
                Platform Activities
                <span className="ml-2 px-2 py-1 bg-orange-500/30 rounded-full text-xs text-orange-200">
                  Live
                </span>
              </h3>
              
              <div className="flex-1 space-y-3">
                {activities.slice(0, 10).map((activity) => (
                  <div 
                    key={activity.id}
                    className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-lg p-3 border border-orange-400/20 hover:border-orange-400/40 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white leading-relaxed">
                          {activity.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-orange-200 space-x-3">
                          <span className="flex items-center">
                            <span className="mr-1">{activity.flag}</span>
                            {activity.country}
                          </span>
                          <span className="flex items-center">
                            <Clock className="mr-1" size={12} />
                            {activity.minutesAgo}m ago
                          </span>
                          {activity.priority === 'high' && (
                            <span className="bg-orange-500/30 px-2 py-0.5 rounded-full text-orange-200 text-xs">
                              Hot
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.priority === 'high' ? 'bg-orange-400 animate-pulse' :
                          activity.priority === 'medium' ? 'bg-yellow-400' :
                          'bg-orange-300'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {activities.length === 0 && (
                  <div className="text-center py-8 text-orange-200">
                    <Activity className="mx-auto mb-2 opacity-50" size={32} />
                    <p>Loading platform activities...</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-orange-400/20">
                <p className="text-xs text-orange-200 text-center">
                  Real-time platform activities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Staking Performance Data */}
        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 mb-8 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500/30 p-3 rounded-xl">
                  <TrendingUp className="text-orange-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    Daily Staking Performance
                    <Sparkles className="ml-2 text-yellow-400" size={18} />
                    <button 
                      onClick={() => setActiveTooltip('dailyPerformance')}
                      className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-orange-400" size={14} />
                    </button>
                  </h3>
                  <p className="text-orange-200 text-sm">Track daily earnings potential</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm text-orange-200">
                  Showing {performanceViewIndex * entriesPerView + 1}-{Math.min((performanceViewIndex + 1) * entriesPerView, performanceData.length)} of {performanceData.length} days
                </div>
              </div>
            </div>

          {/* Performance Data Table */}
          <div className="space-y-3">
            {currentViewData.map((data, index) => {
              const estimatedEarnings = calculateEstimatedEarnings(data.percentage);
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:border-orange-400/30 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-orange-500/30 p-2 rounded-lg">
                          <Calendar className="text-orange-400" size={16} />
                        </div>
                        <div>
                          <p className="text-white font-semibold">
                            {new Date(data.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          <p className="text-orange-200 text-sm">{data.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-white font-semibold">Daily Return</p>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              data.percentage >= 1.0 ? 'bg-green-400' : 
                              data.percentage >= 0.8 ? 'bg-yellow-400' : 'bg-orange-400'
                            } animate-pulse`}></div>
                            <span className={`text-lg font-bold ${
                              data.percentage >= 1.0 ? 'text-green-400' : 
                              data.percentage >= 0.8 ? 'text-yellow-400' : 'text-orange-400'
                            }`}>
                              {data.percentage}%
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-orange-200 text-sm">
                            {totalStakes > 0 ? 'Est. Earnings' : accountBalance > 0 ? 'Potential Earnings' : 'Est. Earnings'}
                          </p>
                          <p className="text-white font-bold text-lg">
                            {showBalances ? `$${estimatedEarnings.toLocaleString()}` : '$****'}
                          </p>
                          {totalStakes === 0 && accountBalance === 0 && (
                            <p className="text-xs text-gray-400 mt-1">No funds available</p>
                          )}
                          {totalStakes === 0 && accountBalance > 0 && (
                            <p className="text-xs text-orange-300 mt-1">Based on balance</p>
                          )}
                        </div>

                        <div className="bg-orange-500/20 rounded-lg p-2">
                          <TrendingUp className="text-orange-400" size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Performance Indicator Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            data.percentage >= 1.0 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                            data.percentage >= 0.8 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                            'bg-gradient-to-r from-orange-400 to-orange-600'
                          }`}
                          style={{ width: `${Math.min((data.percentage / 2.0) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-orange-200 mt-1">
                        <span>0%</span>
                        <span>Daily Performance</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
            <button
              onClick={() => setPerformanceViewIndex(Math.max(0, performanceViewIndex - 1))}
              disabled={performanceViewIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                performanceViewIndex === 0 
                  ? 'bg-white/5 text-gray-400 cursor-not-allowed' 
                  : 'bg-white/10 text-white hover:bg-orange-500/20 hover:border-orange-400/30'
              }`}
            >
              <ArrowDownLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalViews }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPerformanceViewIndex(i)}
                  className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                    i === performanceViewIndex 
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black' 
                      : 'bg-white/10 text-orange-200 hover:bg-white/20'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPerformanceViewIndex(Math.min(totalViews - 1, performanceViewIndex + 1))}
              disabled={performanceViewIndex === totalViews - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                performanceViewIndex === totalViews - 1 
                  ? 'bg-white/5 text-gray-400 cursor-not-allowed' 
                  : 'bg-white/10 text-white hover:bg-orange-500/20 hover:border-orange-400/30'
              }`}
            >
              <span>Next</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Performance Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-4 border border-green-400/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-emerald-400/5 to-green-400/5 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <p className="text-green-200 text-sm">Avg Daily Return</p>
                    <button 
                      onClick={() => setActiveTooltip('performanceSummary')}
                      className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all"
                    >
                      <HelpCircle className="text-green-300" size={10} />
                    </button>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {(performanceData.reduce((sum, d) => sum + d.percentage, 0) / performanceData.length).toFixed(2)}%
                  </p>
                  <p className="text-xs text-green-300 mt-1">50-day average</p>
                </div>
                <div className="bg-green-500/30 p-2 rounded-lg">
                  <TrendingUp className="text-green-400" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-400/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm">Total Returns</p>
                  <p className="text-xl font-bold text-white">
                    {performanceData.reduce((sum, d) => sum + d.percentage, 0).toFixed(1)}%
                  </p>
                  <p className="text-xs text-orange-300 mt-1">50-day cumulative</p>
                </div>
                <div className="bg-orange-500/30 p-2 rounded-lg">
                  <BarChart3 className="text-orange-400" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-xl p-4 border border-red-400/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/5 via-red-500/5 to-red-400/5 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm">Worst Day</p>
                  <p className="text-xl font-bold text-white">
                    {Math.min(...performanceData.map(d => d.percentage) || [0])}%
                  </p>
                  <p className="text-xs text-red-300 mt-1">Lowest return</p>
                </div>
                <div className="bg-red-500/30 p-2 rounded-lg">
                  <TrendingDown className="text-red-400" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/5 to-yellow-400/5 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-yellow-200 text-sm">Best Day</p>
                  <p className="text-xl font-bold text-white">
                    {Math.max(...performanceData.map(d => d.percentage) || [0])}%
                  </p>
                  <p className="text-xs text-yellow-300 mt-1">Highest return</p>
                </div>
                <div className="bg-yellow-500/30 p-2 rounded-lg">
                  <Trophy className="text-yellow-400" size={24} />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Tooltip Modal */}
      <Tooltip 
        content={tooltipContent[activeTooltip]} 
        isVisible={!!activeTooltip} 
        onClose={() => setActiveTooltip(null)} 
      />
    </div>
  );
};

export default DashboardPage;
