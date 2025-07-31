import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import cardImage from "../assets/Rectangle-back.png";

const Team = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [downlineUsers, setDownlineUsers] = useState([]);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(userInfo?.referralCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const totalPoints = downlineUsers.reduce((sum, u) => sum + (u.points || 0), 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      {/* Total Points Card */}
      <div
        className="relative w-full max-w-md text-white p-6 rounded-2xl shadow-lg"
        style={{ backgroundImage: `url(${cardImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <p className="text-sm">Total Points Earned</p>
        <h2 className="text-4xl font-bold">{totalPoints} DLP</h2>
        <div className="mt-2 flex justify-between text-sm">
          <p>Rank Name: <span className="font-semibold">{userInfo?.rank || "Unranked"}</span></p>
          <p>Level {userInfo?.level || 1}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full max-w-md">
        <div className="w-full bg-gray-300 h-2 rounded-full">
          <div className="bg-blue-500 h-2 rounded-full w-[40%]"></div>
        </div>
        <p className="text-xs text-gray-300 mt-1 text-right">NR Elite Capitalist</p>
      </div>

      {/* Rank Requirements */}
      <div className="w-full max-w-md bg-white mt-6 p-4 rounded-xl shadow-md">
        <h3 className="text-blue-900 font-bold text-sm bg-gray-200 px-3 py-1 rounded-md inline-block">Next Rank Requirements</h3>
        <p className="text-sm mt-2"><span className="font-semibold">Team Investment:</span> $250,000</p>
        <p className="text-sm mt-1"><span className="font-semibold">Rank Bonus:</span> 15% of The Rank Bonus Pool</p>
        <p className="text-sm mt-1"><span className="font-semibold">Lower Rank Requirement:</span> 2 Principal Strategists</p>
        <p className="text-sm mt-1"><span className="font-semibold">Direct Downline:</span> 15</p>
      </div>

      {/* Referral Section */}
      <div className="w-full max-w-md bg-white mt-6 p-4 rounded-xl shadow-md">
        <h3 className="text-blue-900 font-bold text-sm bg-gray-200 px-3 py-1 rounded-md inline-block">Referral</h3>
        <div className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg">
          <input
            type="text"
            readOnly
            value={userInfo?.referralCode || ""}
            className="bg-transparent text-sm w-full text-gray-700 outline-none"
          />
          <button onClick={handleCopy} className="text-blue-600 flex items-center space-x-1 text-sm">
            <FaCopy />
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Downline List */}
      <div className="w-full max-w-md bg-white mt-6 p-4 rounded-xl shadow-md">
        <h3 className="text-blue-900 font-bold text-sm">Your Downline</h3>
        {downlineUsers.map((user) => (
          <div key={user._id} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-0">
            <div className="flex items-center space-x-3">
              <img src={user.avatar || "https://via.placeholder.com/40"} alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-gray-500">Level {user.level} - Joined {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-blue-700 text-sm font-semibold">{user.points || 0} DLP</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
