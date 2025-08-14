import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { mockDataGenerator } from '../utils/mockDataGeneratorFixed';

const LiveActivityPopup = ({ isOpen, onClose }) => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate initial activities
      const initialActivities = mockDataGenerator.generateEntries(50);
      setActivities(initialActivities);
      setCurrentIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activities.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % activities.length;
          // Generate new activity occasionally to keep it fresh
          if (Math.random() < 0.3) {
            const newActivity = mockDataGenerator.generateEntry();
            setActivities(prev => [...prev.slice(1), newActivity]);
            return prevIndex;
          }
          return nextIndex;
        });
        setIsAnimating(false);
      }, 150);
    }, 15000); // Change every 15 seconds

    return () => clearInterval(interval);
  }, [isOpen, activities.length]);

  if (!isOpen) return null;

  const currentActivity = activities[currentIndex];

  return (
    <div className="fixed top-16 right-2 md:top-20 md:right-4 z-40 animate-slide-in-right">
      <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-lg md:rounded-xl shadow-xl md:shadow-2xl border border-indigo-200/50 p-2 md:p-4 w-72 md:w-96 relative backdrop-blur-sm">
        {/* Beautiful gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-lg md:rounded-xl"></div>
        
        {/* Simple one-line activity display */}
        {currentActivity && (
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3 flex-1">
              {/* Animated pulse dot */}
              <div className="relative">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              
              {/* Activity message */}
              <div className="flex-1">
                <p className={`text-xs md:text-sm font-medium text-gray-800 transition-all duration-500 leading-tight ${isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
                  {currentActivity.message}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 md:mt-1 hidden md:block">
                  {new Date(currentActivity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={onClose}
              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 ml-2 md:ml-3"
              title="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        {/* Live indicator badge */}
        <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shadow-lg">
          🔴 LIVE
        </div>
      </div>
    </div>
  );
};

export default LiveActivityPopup;
