// import { FiBell, FiUser, FiLogOut, FiEye, FiEyeOff, FiArrowDown, FiArrowUp } from "react-icons/fi";
// import { useState, useEffect } from "react";
// import dashboardIcon from "../assets/home.png";
// import transactionsIcon from "../assets/transactions.png";
// import teamIcon from "../assets/team.png";
// import questIcon from "../assets/quest.png";
// import logoIcon from "../assets/logoNew.png";
// import Rectangle from "../assets/Rectangle.png";
// import { PiHandWithdrawBold } from "react-icons/pi";
// import { PiHandDepositFill } from "react-icons/pi";
// import InvestmentGraph from "../components/InvestmentGraph";
// import DepositModal from "../Modals/DepositModal.jsx";


// const Dashboard = () => {
//   const [showBalance, setShowBalance] = useState(true);
//   const [isDepositOpen, setIsDepositOpen] = useState(false);
//   const [showNav, setShowNav] = useState(true);
//   let scrollTimeout;

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowNav(false);
//       clearTimeout(scrollTimeout);
//       scrollTimeout = setTimeout(() => setShowNav(true), 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       clearTimeout(scrollTimeout);
//     };
//   }, []);


//   return (
//     <div className="flex h-screen bg-gradient-to-r from-[#F5F5F5] to-[#D8DAFF] ">
//       {/* Side Navigation - Desktop Only */}
//       <nav className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen md:bg-white md:p-4 md:border-r md:w-40">
//         {/* <img src={logoIcon} alt="Logo" className="w-20 h-20 bg-blue-600 p-2 rounded-full mb-4" /> */}
//         <div className="flex flex-col gap-20 items-center top-20">
//           <div className="flex flex-col items-center mt-20">
//             <img src={dashboardIcon} alt="Dashboard" className="w-6 h-6 cursor-pointer" />
//             <span className="text-xs mt-1">Dashboard</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <img src={transactionsIcon} alt="Transactions" className="w-6 h-6 cursor-pointer" />
//             <span className="text-xs mt-1">Transactions</span>
//           </div>
          
//           <div className="flex flex-col items-center">
//           <img src={logoIcon} alt="Logo" className="w-12 h-12 bg-blue-600 p-2 rounded-full" />
//             <span className="text-xs mt-1">Withdraw</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <img src={teamIcon} alt="Team" className="w-6 h-6 cursor-pointer" />
//             <span className="text-xs mt-1">Team</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <img src={questIcon} alt="Quest" className="w-6 h-6 cursor-pointer" />
//             <span className="text-xs mt-1">Quest</span>
//           </div>
//         </div>
//         <div className="mt-auto flex justify-center gap-4">
//           <FiLogOut size={24} className="cursor-pointer text-red-600" />
//         </div>
//       </nav>

//       <div className="flex-1 flex flex-col md:ml-40 -z-0">
//         {/* Top Navigation */}
//         <header className="flex justify-between items-center p-4 bg-white shadow-md">
//           <h2 className="text-lg font-semibold text-blue-900">Welcome Back, Muaz!</h2>
//           <div className="flex gap-4">
//             <FiBell size={24} className="cursor-pointer text-blue-600" />
//             <FiUser size={24} className="cursor-pointer text-blue-600" />
//           </div>
//         </header>

//         <section
//   className="relative text-white p-4 rounded-2xl shadow-md mt-2 mx-auto flex flex-col justify-between w-5/5  md:w-3/5 h-80"
//   style={{ backgroundImage: `url(${Rectangle})`, backgroundSize: "cover", backgroundPosition: "center" }}
// >
//   {/* Account Balance Header */}
//   <div className="flex justify-between items-center w-full">
//     <h3 className="text-xl font-bold">Account Balance</h3>

//     {/* Eye Icon (Properly Positioned) */}
//     <button onClick={() => setShowBalance(!showBalance)} className="text-white">
//       {showBalance ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//     </button>
//   </div>

//   {/* Balance Amount & DLP */}
//   <div className="flex justify-between items-center w-full mb-4 ">
//     <p className="text-4xl font-extrabold">{showBalance ? "$2,000" : "****"}</p>

//     {/* Drabux Legacy Point (DLP) */}
//     <div className="text-white bg-gradient-to-r from-[#00006D] to-[#0000D3] px-4 py-2 rounded-lg  text-sm font-semibold shadow">
//       1250 DLP
//     </div>
//   </div>

//   {/* Deposit & Spending Details */}
//   <div className="grid grid-cols-3 items-center text-sm opacity-90 w-full mb-4">
//   {/* Total Deposit */}
//   <div className="flex flex-col items-center">
//     <span className="text-xs font-semibold">Total Deposit</span>
//     <span className="text-lg font-bold">$12,000</span>
//   </div>

//   {/* Vertical Dashed Line */}
//   <div className="flex justify-center h-full">
//     <div className="border-l-2 border-dashed border-gray-400 h-10"></div>
//   </div>

//   {/* Earnings */}
//   <div className="flex flex-col items-center">
//     <span className="text-xs font-semibold">Earnings</span>
//     <span className="text-lg font-bold">$500</span>
//   </div>
// </div>

//   {/* Deposit & Withdraw Buttons */}
//   <div className="flex justify-between items-center w-full mb-20 ml-2">

//     <button  onClick={() => setIsDepositOpen(true)}
//     className="flex items-center bg-gradient-to-r from-[#00006D] to-[#0000D3] text-white px-6 py-2 rounded-lg shadow">
//     Deposit <PiHandDepositFill className="mr-2" size={20} /> 
//     </button>
//     <button className="flex items-center bg-gradient-to-r from-[#00006D] to-[#0000D3] px-6 py-2 rounded-lg shadow">
//     Withdraw  <PiHandWithdrawBold className="mr-2" size={20} /> 
//     </button>
//   </div>
// </section>

// <InvestmentGraph />
//         {/* Transaction History */}
//         <h3 className="text-center text-lg font-bold mt-8 bg-gradient-to-r bg from-[#F5F5F5] to-[#D8DAFF]">Transaction History</h3>
//         <div className="m-4 p-4 bg-white rounded-xl shadow-md ">
//           <div>
//           <p className="font-semibold">Goal: School Fees</p>
//           <p className="text-sm text-gray-600">28/2/2025 - Status: <span className="text-red-500 font-semibold">Completed</span></p>
//           </div>
//           <div className="bg-red-600 text-white text-right px-3 py-2 rounded mt-2">-$150</div>
//         </div>
//         <div className="m-4 p-4 bg-white rounded-xl shadow-md">
//           <p className="font-semibold">Goal: House Rent</p>
//           <p className="text-sm text-gray-600">25/2/2025 - Status: <span className="text-yellow-300 font-semibold">Received</span></p>
//           <div className="bg-blue-600 text-white text-right px-1 py-2 rounded-full mt-2">+$500</div>
//         </div>
        
//         {/* Bottom Navigation */}
//         <nav
//           className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#F5F5F5] to-[#D8DAFF] p-4 border-t flex justify-around items-center shadow-md md:hidden transition-transform duration-300 ${
//             showNav ? "translate-y-0" : "translate-y-full"
//           }`}
//         >
//           <div className="flex flex-col items-center">
//             <img src={dashboardIcon} alt="Dashboard" className="w-6 h-6" />
//             <span className="text-xs mt-1">Dashboard</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <img src={transactionsIcon} alt="Transactions" className="w-6 h-6" />
//             <span className="text-xs mt-1">Transactions</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <img src={logoIcon} alt="Logo" className="w-12 h-12 bg-blue-600 p-2 rounded-full" />
//           </div>
//           <div className="flex flex-col items-center">
//             <img src={teamIcon} alt="Team" className="w-6 h-6" />
//             <span className="text-xs mt-1">Team</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <img src={questIcon} alt="Quest" className="w-6 h-6" />
//             <span className="text-xs mt-1">Quest</span>
//             <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />

//           </div>
//         </nav>
//       </div>
      
//     </div>
    
//   );
// };

// export default Dashboard;