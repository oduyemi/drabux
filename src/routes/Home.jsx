import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/novunt_logo.png";
import getStartedImage from "../assets/get_started.png";
import LiveActivityPopup from "../components/LiveActivityPopup";

const Home = () => {
  // Animated headline words
  const [animatedWord, setAnimatedWord] = useState("Value");
  
  // Live Activity Popup state
  const [showActivityPopup, setShowActivityPopup] = useState(false);
  
  useEffect(() => {
    const words = ["Value", "Net Worth", "Growth"];
    let i = 0;
    const interval = setInterval(() => {
      setAnimatedWord(words[i % words.length]);
      i++;
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Show activity popup after 5 seconds on first visit
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenActivityPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowActivityPopup(true);
        localStorage.setItem('hasSeenActivityPopup', 'true');
      }, 5000); // Show after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Animated gold goal meter fill (slow, fill then clear and restart)
  const [goalPercent, setGoalPercent] = useState(0);
  useEffect(() => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += 1;
      if (percent > 200) {
        setTimeout(() => {
          setGoalPercent(0);
          percent = 0;
        }, 600);
        return;
      }
      setGoalPercent(percent);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer for bonus (simulate 7 days left)
  const [countdown, setCountdown] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const end = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, end - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
  <div className="relative min-h-screen w-full bg-[#0A0A6E] text-white overflow-hidden flex flex-col">
      {/* Logo & Nav */}
      <header className="w-full flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 z-20">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Novunt Logo" className="w-20 sm:w-28 drop-shadow-xl animate-fade-in" />
        </div>
        
        {/* Mobile Live Activity Button */}
        <button 
          onClick={() => setShowActivityPopup(true)}
          className="sm:hidden text-yellow-400 hover:text-yellow-300 font-semibold text-xs bg-white/10 px-2 py-1 rounded-lg transition-all hover:bg-white/20"
        >
          🔴 Live
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-6">
          <button 
            onClick={() => setShowActivityPopup(true)}
            className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm bg-white/10 px-3 py-1 rounded-lg transition-all hover:bg-white/20"
          >
            🔴 Live Activity
          </button>
          <Link to="/auth/signin" className="text-white/80 hover:text-blue-300 font-semibold">Sign In</Link>
          <Link to="/auth/create" className="text-blue-300 hover:text-white font-semibold">Get Started</Link>
        </nav>
      </header>

      {/* Cinematic Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-2 sm:px-0 mt-8 sm:mt-0">
        {/* Hero Section with Goal Meter */}
        <div className="relative mx-auto mb-6 w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1A23FF]/30 to-[#A3A3FF]/10 blur-2xl opacity-60"></div>
          <svg className="w-full h-full" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle cx="80" cy="80" r="70" stroke="#FFD700" strokeWidth="8" fill="none" opacity="0.18" />
            {/* Animated gold fill circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#FFD700"
              strokeWidth="8"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset={440 - (goalPercent / 200) * 440}
              style={{ transition: 'stroke-dashoffset 0.3s linear' }}
            />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FFD700" fontSize="2.2rem" fontWeight="bold">{goalPercent}%</text>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-sans tracking-tight drop-shadow-lg animate-slide-down mb-2">
          <span className="block text-blue-200">Stake Today. Earn 200%. Secure Your Legacy.</span>
        </h1>
        <div className="mt-4 text-xl sm:text-2xl font-bold text-[#1A23FF] animate-fade-in">
          No Limits to <span className="animate-word-change">{animatedWord}</span>
        </div>
        {/* Countdown Timer & CTA */}
        <div className="mt-6 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-blue-200">Your 10% Bonus Expires In:</span>
          <span className="text-2xl font-bold text-blue-300 tracking-wide mt-1">
            {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
          </span>
          <span className="text-sm text-white/70 mt-1">Don’t Miss This Exclusive Offer – Stake Now!</span>
          {/* Urgent Bonus CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/auth/create">
            <button className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-xl font-bold text-[#0e4b8c] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-yellow-600 hover:text-white animate-bounce">
              Claim Your 10% Bonus & Start Staking
            </button>
          </Link>
          <Link to="/auth/signin">
            <button className="rounded-full bg-white/90 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-xl font-bold text-[#0e4b8c] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-100 hover:text-blue-900 animate-fade-in">
              Sign In
            </button>
          </Link>
        </div>
        </div>
        {/* Social Proof */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <span className="text-white/80 text-sm sm:text-base font-semibold bg-white/10 px-4 py-2 rounded-xl shadow">Trusted by 5,000+ stakeholders</span>
          <span className="text-white/80 text-sm sm:text-base font-semibold bg-white/10 px-4 py-2 rounded-xl shadow">Secured by Blockchain & 2FA</span>
        </div>
      </section>

      {/* How It Works Section */}
  <section className="z-10 mt-16 max-w-3xl mx-auto text-center animate-fade-in pb-16 px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-200 mb-6">How Novunt Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-blue-200/30 flex flex-col items-center">
            <span className="text-4xl mb-2">💰</span>
            <h3 className="text-lg font-bold text-blue-300 mb-2">Stake USDT</h3>
            <p className="text-sm text-white/80">Deposit USDT and choose your financial goal. Start earning instantly and track your growth in real time.</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-blue-400/30 flex flex-col items-center">
            <span className="text-4xl mb-2">📈</span>
            <h3 className="text-lg font-bold text-blue-400 mb-2">Track & Earn</h3>
            <p className="text-sm text-white/80">Unlock bonuses, climb the leaderboard, and earn XP, NLP, and referral rewards as you grow.</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-green-400/30 flex flex-col items-center">
            <span className="text-4xl mb-2">🏆</span>
            <h3 className="text-lg font-bold text-green-300 mb-2">Unlock Rewards</h3>
            <p className="text-sm text-white/80">Secure your legacy with blockchain rewards, achievement badges, and exclusive perks.</p>
          </div>
        </div>
      </section>

      {/* Mobile-only Image */}
      <div className="absolute bottom-0 left-0 w-full md:hidden animate-fade-in">
        <img
          src={getStartedImage}
          alt="Get Started"
          className="w-full opacity-80 object-cover"
        />
      </div>

      {/* Live Activity Popup */}
      <LiveActivityPopup 
        isOpen={showActivityPopup} 
        onClose={() => setShowActivityPopup(false)} 
      />

    {/* Animations */}
    <style>{`
      .animate-fade-in { animation: fadeIn 1.2s ease; }
      .animate-slide-down { animation: slideDown 1.2s cubic-bezier(.23,1,.32,1); }
      .animate-bounce { animation: bounce 1.2s infinite alternate; }
      .animate-word-change { transition: color 0.5s, text-shadow 0.5s; color: #FFD700; text-shadow: 0 0 10px #FFD70088; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-8px); } }
    `}</style>
    </div>
  );
};

export default Home;
