import { Facebook, Instagram, Youtube, MessageCircle, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-16 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 px-6 py-12 lg:px-12">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">NOVUNT</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Revolutionizing wealth creation through intelligent staking solutions and blockchain innovation.
                </p>
              </div>
              <div className="flex space-x-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-3">
                {['Dashboard', 'Staking', 'Rewards', 'Analytics'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'API Reference', 'Support Center', 'Community'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">Platform Stats</h4>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                  <p className="text-2xl font-bold text-white">$2.5M+</p>
                  <p className="text-blue-200 text-xs">Total Value Staked</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                  <p className="text-2xl font-bold text-white">10K+</p>
                  <p className="text-blue-200 text-xs">Active Stakeholders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Contact Section */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                  Follow Us
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://facebook.com/novunt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600/20 hover:bg-blue-600/40 p-3 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"
                  >
                    <Facebook className="text-blue-400 group-hover:text-blue-300 transition-colors" size={20} />
                  </a>
                  <a 
                    href="https://instagram.com/novunt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-600/20 hover:bg-pink-600/40 p-3 rounded-xl border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 group"
                  >
                    <Instagram className="text-pink-400 group-hover:text-pink-300 transition-colors" size={20} />
                  </a>
                  <a 
                    href="https://tiktok.com/@novunt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-600/20 hover:bg-gray-600/40 p-3 rounded-xl border border-gray-500/30 hover:border-gray-400/50 transition-all duration-300 group"
                  >
                    <div className="text-gray-400 group-hover:text-gray-300 transition-colors text-xl font-bold">
                      ♪
                    </div>
                  </a>
                  <a 
                    href="https://t.me/novunt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500/20 hover:bg-blue-500/40 p-3 rounded-xl border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 group"
                  >
                    <MessageCircle className="text-blue-400 group-hover:text-blue-300 transition-colors" size={20} />
                  </a>
                  <a 
                    href="https://youtube.com/@novunt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600/20 hover:bg-red-600/40 p-3 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group"
                  >
                    <Youtube className="text-red-400 group-hover:text-red-300 transition-colors" size={20} />
                  </a>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Contact Support
                </h4>
                <div className="space-y-3">
                  <a 
                    href="mailto:support@novunt.com" 
                    className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 group"
                  >
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Mail className="text-blue-400 group-hover:text-blue-300 transition-colors" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Email Support</p>
                      <p className="text-blue-200 text-xs">support@novunt.com</p>
                    </div>
                  </a>
                  <div className="text-xs text-blue-200/80">
                    Response time: Within 24 hours
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-6">
                <p className="text-blue-200 text-sm">
                  © 2024 <span className="font-bold text-white">Novunt</span>. All rights reserved.
                </p>
                <div className="hidden md:flex items-center space-x-1">
                  <div className="w-1 h-4 bg-blue-500 rounded-full opacity-80"></div>
                  <div className="w-1 h-4 bg-blue-400 rounded-full opacity-60"></div>
                  <div className="w-1 h-4 bg-blue-300 rounded-full opacity-40"></div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
                <div className="w-px h-4 bg-white/20"></div>
                <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">
                  Terms of Service
                </a>
                <div className="w-px h-4 bg-white/20"></div>
                <span className="text-blue-200 text-sm">v2.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
