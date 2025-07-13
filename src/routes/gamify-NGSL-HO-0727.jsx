import React from "react";
import { FaArrowLeft, FaCoins, FaTrophy, FaGift } from "react-icons/fa";
import gamify from "../assets/gamify.png";

const Gamify = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-[#D8DAFF] flex flex-col items-center px-4 lg:px-32 py-10">
      
      {/* Main Banner */}
      <div className="bg-white p-10 rounded-xl shadow-xl mt-10 w-full lg:w-3/4 text-center 
                      transform hover:scale-105 transition-all duration-500">
        <h3 className="text-3xl font-bold text-gray-900 animate-fade-in">
          Something<span className="text-blue-600"> BIG</span> is Coming!
        </h3>
        <img
          src={gamify}
          alt="Gamification Preview"
          className="w-full h-auto my-6 rounded-lg animate-fade-in"
        />
        <h4 className="text-lg font-semibold text-gray-800">How it works</h4>
        <p className="text-gray-600 mt-2">
          You'll soon be able to earn & redeem Drabux Experience Points for epic rewards!
        </p>
        <button className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md 
                          hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          Be the first to know
        </button>
      </div>

      {/* Desktop Feature Sections */}
      <div className="hidden lg:grid grid-cols-3 gap-8 mt-12 w-full lg:w-3/4">
        
        {/* Earn Rewards */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center 
                        hover:shadow-xl transform hover:scale-105 transition-all duration-500">
          <FaCoins className="text-yellow-500 text-5xl mb-4 animate-bounce" />
          <h4 className="text-lg font-semibold text-gray-900">Earn Rewards</h4>
          <p className="text-gray-600 text-sm mt-2">
            Gain Drabux Points by completing quests and engaging with the platform.
          </p>
        </div>

        {/* Level Up */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center 
                        hover:shadow-xl transform hover:scale-105 transition-all duration-500">
          <FaTrophy className="text-blue-500 text-5xl mb-4 animate-pulse" />
          <h4 className="text-lg font-semibold text-gray-900">Level Up</h4>
          <p className="text-gray-600 text-sm mt-2">
            Progress through levels and unlock exclusive investment perks.
          </p>
        </div>

        {/* Redeem Gifts */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center 
                        hover:shadow-xl transform hover:scale-105 transition-all duration-500">
          <FaGift className="text-red-500 text-5xl mb-4 animate-bounce" />
          <h4 className="text-lg font-semibold text-gray-900">Redeem Gifts</h4>
          <p className="text-gray-600 text-sm mt-2">
            Exchange your Drabux Points for investment bonuses and other rewards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gamify;
