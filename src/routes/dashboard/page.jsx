
import { InvestmentHistory } from "@/constants";

import { Footer } from "@/layouts/footer";
import { DollarSign, Package, TrendingUp, Wallet } from "lucide-react";
import InvestmentGraph from "../../components/InvestmentGraph";
import Account from "../../components/Account.jsx";

const DashboardPage = () => {
   

    return (
        <div className="flex flex-col gap-y-4 z-[-9999]">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors">
                            <Package size={26} />
                        </div>
                        <p className="card-title">Total Investments</p>
                    </div>
                    <div className="card-body bg-white transition-colors dark:bg-blue-600/20">
                        <p className="text-3xl font-bold text-black transition-colors">25,154</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:bg-blue-600/20">
                            <TrendingUp size={18} />
                            25%
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg p-2 text-blue-700 transition-colors dark:bg-blue-600/20">
                            <DollarSign size={26} />
                        </div>
                        <p className="card-title">Total Withdrawal</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-blue-600/20">
                        <p className="text-3xl font-bold text-black transition-colors">$16,000</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:bg-blue-600/20">
                            <TrendingUp size={18} />
                            12%
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Wallet size={26} />
                        </div>
                        <p className="card-title">Total Bonus</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-blue-600/20">
                        <p className="text-3xl font-bold text-black transition-colors">15,400k</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:bg-blue-600/20">
                            <TrendingUp size={18} />
                            15%
                        </span>
                    </div>
                </div>
            </div>
            {/* account bal */}

            <Account/>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <InvestmentGraph />
            </div>

            <div className="card font-grotesk w-full">
                <div className="card-header"></div>
                <div className="card-body p-0">
                    <div className="relative h-[800px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <h2 className="font-sans-serif mb-4 text-center text-2xl font-bold">Investments History</h2>
                        <div className="space-y-6">
                            {InvestmentHistory.map((investment, index) => {
                                const progress = parseInt(investment.PercentageEarned); // Convert to number

                                return (
                                    <div
                                        key={index}
                                        className="flex w-full flex-col rounded-2xl bg-white p-2"
                                    >
                                        {/* Investment Details */}
                                        <div className="flex items-start justify-between gap-2 md:items-center">
                                            <div className="w-2/3 space-y-2">
                                                <p className="font-grotesk text-lg font-bold">Goal: {investment.Goal}</p>
                                                <p className="text-sm text-gray-500">{investment.Date}</p>
                                                <div className="flex items-center space-x-2">
                                                    <p className="text-sm font-medium">Status:</p>
                                                    <span
                                                        className={`h-3 w-3 rounded-full ${
                                                            investment.Status === "Active"
                                                                ? "bg-green-500"
                                                                : investment.Status === "Pending"
                                                                  ? "bg-yellow-500"
                                                                  : "bg-red-500"
                                                        }`}
                                                    ></span>
                                                    <p className="text-sm">{investment.Status}</p>
                                                </div>
                                            </div>

                                            <div className="flex w-2/5 flex-col space-y-2">
                                                <p className="text-md font-thin text-black">
                                                    Initial Deposit
                                                    <br />
                                                    <span className="text-2xl font-medium text-[#0000FE]">${investment.InitialDeposit}</span>
                                                </p>
                                                <p className="text-sm font-bold text-[#0000FE]">Earnings: {investment.Earnings}</p>
                                                <p className="text-sm font-thin text-black">Expected ROI: {investment.ExpectedROI}</p>
                                            </div>
                                        </div>

                                        {/* 🔹 Progress Bar with PercentageEarned */}
                                        <div className="relative mt-4 h-3 w-full rounded-full bg-gradient-to-r from-[#D8DAFF] to-[#F5F5F5] dark:bg-gray-700">
                                            <div
                                                className="flex h-3 items-center justify-center rounded-full bg-blue-600"
                                                style={{ width: `${progress}%` }}
                                            >
                                                {/* Show percentage inside the bar if space allows, otherwise show outside */}
                                                <span
                                                    className={`text-xs font-bold text-white ${
                                                        progress < 15 ? "absolute right-0 pr-2 text-black" : ""
                                                    }`}
                                                >
                                                    {progress}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardPage;
