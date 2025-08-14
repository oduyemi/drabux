import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Download, 
  ExternalLink,
  Star,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Target,
  ChevronRight,
  HelpCircle,
  Trophy,
  GraduationCap,
  Brain,
  Lightbulb,
  Eye,
  EyeOff
} from "lucide-react";

const Education = () => {
  const [activeCategory, setActiveCategory] = useState("basics");
  const [showProgress, setShowProgress] = useState(true);

  const categories = [
    { id: "basics", name: "Staking Basics", icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { id: "advanced", name: "Advanced Strategies", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
    { id: "security", name: "Security & Safety", icon: Shield, color: "from-green-500 to-green-600" },
    { id: "tutorials", name: "Video Tutorials", icon: PlayCircle, color: "from-orange-500 to-orange-600" },
  ];

  const userProgress = {
    totalLessons: 25,
    completedLessons: 12,
    totalHours: 48,
    completedHours: 22,
    certificates: 3,
    currentStreak: 7
  };

  const progressPercentage = Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100);

  const educationalContent = {
    basics: [
      {
        title: "What is USDT Staking?",
        description: "Master the fundamentals of cryptocurrency staking and discover how USDT staking generates passive income on Novunt.",
        type: "article",
        duration: "5 min read",
        difficulty: "Beginner",
        rating: 4.8,
        completed: true,
        progress: 100,
        content: "Comprehensive guide covering USDT mechanics, staking benefits, risk assessment, and platform-specific features."
      },
      {
        title: "Setting Financial Goals",
        description: "Learn to create SMART financial objectives using our goal-based staking system for maximum success.",
        type: "interactive",
        duration: "7 min read",
        difficulty: "Beginner",
        rating: 4.9,
        completed: true,
        progress: 100,
        content: "Step-by-step framework for goal setting, progress tracking, and milestone achievement strategies."
      },
      {
        title: "Understanding Returns & ROI",
        description: "Deep dive into return calculations, compounding effects, and factors influencing your earnings.",
        type: "guide",
        duration: "10 min read",
        difficulty: "Intermediate",
        rating: 4.7,
        completed: false,
        progress: 45,
        content: "Mathematical foundations of ROI, risk-adjusted returns, and portfolio optimization techniques."
      }
    ],
    advanced: [
      {
        title: "Portfolio Optimization Strategies",
        description: "Advanced techniques for maximizing returns while minimizing risk through strategic diversification.",
        type: "masterclass",
        duration: "25 min read",
        difficulty: "Advanced",
        rating: 4.6,
        completed: false,
        progress: 0,
        content: "Professional-level strategies including modern portfolio theory and algorithmic rebalancing."
      },
      {
        title: "Market Analysis & Timing",
        description: "Technical and fundamental analysis techniques for optimal entry and exit timing.",
        type: "article",
        duration: "20 min read",
        difficulty: "Advanced",
        rating: 4.5,
        completed: false,
        progress: 0,
        content: "Chart pattern recognition, market sentiment analysis, and timing optimization strategies."
      },
      {
        title: "Risk Management Framework",
        description: "Comprehensive risk assessment and mitigation strategies for long-term wealth preservation.",
        type: "guide",
        duration: "15 min read",
        difficulty: "Intermediate",
        rating: 4.8,
        completed: false,
        progress: 30,
        content: "Risk metrics, portfolio stress testing, and defensive positioning techniques."
      }
    ],
    security: [
      {
        title: "Account Security Mastery",
        description: "Complete security protocol implementation for maximum account and fund protection.",
        type: "checklist",
        duration: "8 min read",
        difficulty: "Beginner",
        rating: 4.9,
        completed: true,
        progress: 100,
        content: "Multi-layer security setup including 2FA, password management, and device security."
      },
      {
        title: "Advanced Threat Protection",
        description: "Identify and defend against sophisticated phishing, social engineering, and crypto-specific attacks.",
        type: "guide",
        duration: "12 min read",
        difficulty: "Intermediate",
        rating: 4.8,
        completed: false,
        progress: 0,
        content: "Real-world attack scenarios, prevention strategies, and incident response procedures."
      },
      {
        title: "Transaction Security Protocol",
        description: "Best practices for secure deposits, withdrawals, and transaction verification procedures.",
        type: "guide",
        duration: "6 min read",
        difficulty: "Beginner",
        rating: 4.7,
        completed: true,
        progress: 100,
        content: "Step-by-step secure transaction workflows and verification checkpoints."
      }
    ],
    tutorials: [
      {
        title: "Complete Platform Walkthrough",
        description: "Comprehensive video tour covering every feature from account setup to advanced strategies.",
        type: "video",
        duration: "18 min",
        difficulty: "Beginner",
        rating: 4.9,
        completed: false,
        progress: 60,
        content: "HD video tutorial with interactive elements and downloadable checklists."
      },
      {
        title: "Dashboard Analytics Deep Dive",
        description: "Master every metric, chart, and insight available in your dashboard for data-driven decisions.",
        type: "video",
        duration: "12 min",
        difficulty: "Intermediate",
        rating: 4.8,
        completed: false,
        progress: 0,
        content: "Advanced analytics interpretation and actionable insights extraction."
      },
      {
        title: "Advanced Features Masterclass",
        description: "Unlock the full potential of NXP points, referral systems, and legacy point optimization.",
        type: "video",
        duration: "22 min",
        difficulty: "Advanced",
        rating: 4.7,
        completed: false,
        progress: 0,
        content: "Expert-level feature utilization for maximum platform benefits."
      }
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 bg-green-500/20 border-green-400/30";
      case "Intermediate": return "text-yellow-400 bg-yellow-500/20 border-yellow-400/30";
      case "Advanced": return "text-red-400 bg-red-500/20 border-red-400/30";
      default: return "text-gray-400 bg-gray-500/20 border-gray-400/30";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return <PlayCircle size={16} />;
      case "guide": return <FileText size={16} />;
      case "interactive": return <Brain size={16} />;
      case "masterclass": return <GraduationCap size={16} />;
      case "checklist": return <Target size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "video": return "text-red-400 bg-red-500/20";
      case "guide": return "text-blue-400 bg-blue-500/20";
      case "interactive": return "text-purple-400 bg-purple-500/20";
      case "masterclass": return "text-yellow-400 bg-yellow-500/20";
      case "checklist": return "text-green-400 bg-green-500/20";
      default: return "text-orange-400 bg-orange-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements - Matching Dashboard */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 py-6 md:px-8 lg:px-12">
        {/* Header Section - Dashboard Style */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Education <span className="text-yellow-400">Center</span>
              </h1>
              <p className="text-blue-200 text-lg">
                Master smart investing with our comprehensive learning platform
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setShowProgress(!showProgress)}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all"
              >
                {showProgress ? <Eye size={20} /> : <EyeOff size={20} />}
                <span>{showProgress ? 'Hide' : 'Show'} Progress</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Overview - Dashboard Card Style */}
        {showProgress && (
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500/30 p-3 rounded-xl">
                    <GraduationCap className="text-yellow-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Learning Progress</h3>
                    <p className="text-yellow-200">Track your educational journey</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-2xl font-bold text-white">{progressPercentage}%</p>
                    <p className="text-sm text-yellow-200">Completed</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-orange-200 text-sm">Lessons</p>
                  <p className="text-xl font-bold text-white">{userProgress.completedLessons}/{userProgress.totalLessons}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-orange-200 text-sm">Study Hours</p>
                  <p className="text-xl font-bold text-white">{userProgress.completedHours}h</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-orange-200 text-sm">Certificates</p>
                  <p className="text-xl font-bold text-white">{userProgress.certificates}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-orange-200 text-sm">Day Streak</p>
                  <p className="text-xl font-bold text-white">{userProgress.currentStreak}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-yellow-200 mb-2">
                  <span>Overall Progress</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-orange-500/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full h-3 transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar - Dashboard Style */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 sticky top-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Brain className="mr-2 text-yellow-400" size={24} />
                  Learning Paths
                </h2>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-white shadow-lg border border-orange-400/30'
                            : 'text-orange-200 hover:bg-gradient-to-r hover:from-orange-500/15 hover:to-yellow-500/15 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}/20`}>
                          <Icon size={16} className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                        </div>
                        <span className="font-medium text-sm">{category.name}</span>
                        {isActive && <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse ml-auto"></div>}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-orange-400/20">
                  <h3 className="text-sm font-semibold text-orange-200 mb-3">Quick Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white">
                      <span>Total Content</span>
                      <span className="font-bold">47 items</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Average Rating</span>
                      <span className="font-bold">4.8 ⭐</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Total Students</span>
                      <span className="font-bold">5,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {educationalContent[activeCategory]?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 hover:border-orange-400/50 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${getTypeColor(item.type)}`}>
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors mb-2">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(item.difficulty)}`}>
                              {item.difficulty}
                            </span>
                            <div className="flex items-center text-orange-200 text-sm">
                              <Clock size={14} className="mr-1" />
                              {item.duration}
                            </div>
                            <div className="flex items-center text-yellow-400 text-sm">
                              <Star size={14} className="mr-1" />
                              {item.rating}
                            </div>
                            {item.completed && (
                              <div className="flex items-center text-green-400 text-sm">
                                <Trophy size={14} className="mr-1" />
                                Completed
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 p-2 rounded-lg transition-all">
                          <ExternalLink size={16} className="text-blue-400" />
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all">
                          <Download size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-orange-200 mb-4">{item.description}</p>
                    
                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <p className="text-white text-sm leading-relaxed">{item.content}</p>
                    </div>
                    
                    {/* Progress Bar */}
                    {item.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-orange-200 mb-2">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-orange-500/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-500 rounded-full h-2 transition-all duration-1000"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all">
                        {item.completed ? (
                          <>
                            <Trophy size={16} />
                            <span>Review</span>
                          </>
                        ) : item.progress > 0 ? (
                          <>
                            <PlayCircle size={16} />
                            <span>Continue</span>
                          </>
                        ) : (
                          <>
                            <ChevronRight size={16} />
                            <span>Start Learning</span>
                          </>
                        )}
                      </button>
                      <div className="flex items-center space-x-2 text-orange-200">
                        <button className="hover:text-white transition-colors">
                          <HelpCircle size={16} />
                        </button>
                        <span className="text-sm">Need help?</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Quick Access Section - Dashboard Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-8 border border-orange-400/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
              <Lightbulb className="mr-2 text-yellow-400" size={28} />
              Learning Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-all border border-white/20">
                <FileText className="mx-auto mb-3 text-blue-400" size={32} />
                <h3 className="font-bold text-white mb-2">Complete Guide</h3>
                <p className="text-orange-200 text-sm mb-4">Comprehensive PDF manual with all strategies</p>
                <button className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 px-4 py-2 rounded-lg text-blue-300 transition-all border border-blue-400/30">
                  Download PDF
                </button>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-all border border-white/20">
                <Target className="mx-auto mb-3 text-green-400" size={32} />
                <h3 className="font-bold text-white mb-2">Goal Calculator</h3>
                <p className="text-orange-200 text-sm mb-4">Interactive tool for financial planning</p>
                <button className="bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 px-4 py-2 rounded-lg text-green-300 transition-all border border-green-400/30">
                  Use Calculator
                </button>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-all border border-white/20">
                <Users className="mx-auto mb-3 text-purple-400" size={32} />
                <h3 className="font-bold text-white mb-2">Community Hub</h3>
                <p className="text-orange-200 text-sm mb-4">Connect with experts and peers</p>
                <button className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 px-4 py-2 rounded-lg text-purple-300 transition-all border border-purple-400/30">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
