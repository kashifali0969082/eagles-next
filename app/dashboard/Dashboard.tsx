"use client"
import React, { useState } from "react";
import {
  User,
  Copy,
  Share2,
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  ChevronDown,
  Bell,
  LogOut,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const [profileExpanded, setProfileExpanded] = useState(false);

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    gradient: string;
  }> = ({ title, value, icon, gradient }) => (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all duration-300 group">
      <div
        className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-gray-300 text-sm mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );

  const LevelCard: React.FC<{
    level: string;
    progress: number;
    price: string;
    slots: number;
    totalSlots: number;
  }> = ({ level, progress, price, slots, totalSlots }) => (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">{level}</h3>
        <span className="text-yellow-400 font-bold text-lg">{price}</span>
      </div>

      <div className="flex items-center justify-center space-x-2 mb-6">
        {[...Array(totalSlots)].map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full transition-all duration-300 ${
              i < slots
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg shadow-yellow-400/50"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Progress</span>
          <span className="text-yellow-400 text-sm font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full transition-all duration-500 shadow-lg shadow-yellow-400/30"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/30">
        Upgrade for {price}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse top-20 left-20"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 rounded-full blur-2xl animate-pulse bottom-20 right-20"></div>
      </div>

  
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Tester Dev</h2>
                <p className="text-yellow-400 font-semibold">ID: 4679</p>
                <p className="text-gray-400 text-sm">Joined by ID: 1</p>
              </div>
            </div>
            <button
              onClick={() => setProfileExpanded(!profileExpanded)}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  profileExpanded ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>

          {profileExpanded && (
            <div className="border-t border-gray-700 pt-6">
              <div className="mb-4">
                <p className="text-gray-300 text-sm mb-2">
                  Personal Referral Link
                </p>
                <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-3">
                  <span className="text-yellow-400 font-mono text-sm flex-1">
                    theeagles.io/4679
                  </span>
                  <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Profit"
            value="$0"
            icon={<DollarSign className="w-6 h-6 text-black" />}
            gradient="from-yellow-400 to-amber-500"
          />
          <StatCard
            title="Daily Profit"
            value="$0.00"
            icon={<TrendingUp className="w-6 h-6 text-black" />}
            gradient="from-yellow-400 to-amber-500"
          />
          <StatCard
            title="Partners"
            value="0"
            icon={<Users className="w-6 h-6 text-black" />}
            gradient="from-yellow-400 to-amber-500"
          />
          <StatCard
            title="Team Members"
            value="0"
            icon={<Users className="w-6 h-6 text-black" />}
            gradient="from-yellow-400 to-amber-500"
          />
        </div>

        {/* Level Progress */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Level Progress
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <LevelCard
              level="X1"
              progress={80}
              price="$160"
              slots={5}
              totalSlots={12}
            />
            <LevelCard
              level="X2"
              progress={40}
              price="$50"
              slots={4}
              totalSlots={12}
            />
            <LevelCard
              level="X3"
              progress={20}
              price="$20"
              slots={0}
              totalSlots={7}
            />
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Platform Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Members</span>
                <span className="text-yellow-400 font-bold text-lg">5,410</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Users</span>
                <span className="text-yellow-400 font-bold text-lg">5,410</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Transactions</span>
                <span className="text-cyan-400 font-bold text-lg">
                  Processing
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              USDT Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Members Received</span>
                <span className="text-green-400 font-bold text-lg">
                  $7,332.50
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Turnover</span>
                <span className="text-cyan-400 font-bold text-lg">$0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Growth Rate</span>
                <span className="text-green-400 font-bold text-lg">+100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Information */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">
            Smart Contract Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Contract Level</p>
              <p className="text-yellow-400 font-bold text-lg">X1 / X2</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Network</p>
              <p className="text-yellow-400 font-bold text-lg">Smart Chain</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Contract Address</p>
              <p className="text-yellow-400 font-bold text-lg font-mono">
                0x55...a32
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            New Features Coming Soon
          </h2>
          <p className="text-gray-400 mb-8">
            We're working on exciting new features to enhance your experience!
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
