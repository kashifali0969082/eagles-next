"use client"
import React, { useState, useEffect } from 'react';
import { HiOutlineArrowPath, HiSparkles, HiTrophy, HiLightBulb } from 'react-icons/hi2';
import { GoPeople, GoRocket } from 'react-icons/go';
import { RiLockLine, RiStarFill } from 'react-icons/ri';
import { FiTarget, FiTrendingUp, FiAward } from 'react-icons/fi';
import ParticleBackground from '../components/particlex2';
// Types and Interfaces
interface UserData {
  id: string;
  totalReferrals: number;
  totalEarnings: number;
  recycleCount: number;
}

interface Level {
  level: number;
  cost: number;
  slots: [number, number]; // [filled, recycled]
  maxUsers: number;
  recycleCount: number;
}

interface ProgressBarProps {
  progress: number;
  level: number;
}

interface ApiData {
  referredUsers?: Array<{
    currentX2Level: number;
  }>;
  data?: {
    currentX2Level: number;
  };
}

interface SlotsData {
  [key: string]: [number, number];
}

interface ReferredUsersCount {
  [level: number]: number;
}

// Progress Bar Component
const ProgressBar: React.FC<ProgressBarProps> = ({ progress, level }) => (
  <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
    <div 
      className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${Math.min(progress, 100)}%` }}
    />
  </div>
);

// Main Component
const Levelx2Enhanced: React.FC = () => {
  // State with proper typing
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>({
    id: "12345",
    totalReferrals: 24,
    totalEarnings: 1250.75,
    recycleCount: 8
  });
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [referredUsersCountByLevel, setReferredUsersCountByLevel] = useState<ReferredUsersCount>({});
  const [slotsData, setSlotsData] = useState<SlotsData>({});

  // Level data with proper typing
  const levels: Level[] = [
    { level: 1, cost: 2.5, slots: [1, 0], maxUsers: 4, recycleCount: 0 },
    { level: 2, cost: 5, slots: [3, 1], maxUsers: 8, recycleCount: 1 },
    { level: 3, cost: 10, slots: [2, 0], maxUsers: 8, recycleCount: 0 },
    { level: 4, cost: 20, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
    { level: 5, cost: 40, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
    { level: 6, cost: 80, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
    { level: 7, cost: 160, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
    { level: 8, cost: 320, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
    { level: 9, cost: 640, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
    { level: 10, cost: 1250, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
    { level: 11, cost: 2500, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
    { level: 12, cost: 5000, slots: [0, 0], maxUsers: 0, recycleCount: 0 },
  ];

  // Effect for fetching data (you can integrate your actual API calls here)
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // Your existing fetchData logic here
        // Example:
        // const result = await users(address);
        // const level = result[3]?.toString(); // X2 uses index 3
        // setActiveLevel(Number(level));
        
        console.log('Fetching X2 data...');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handler functions with proper typing
  const handleActivateLevel = async (level: number, cost: number): Promise<void> => {
    setShowAnimation(true);
    try {
      // Your activation logic here for X2
      // Example:
      // const val = (cost * 1e18).toString();
      // const usdtApp = await USDTapprove(val);
      // await getTxn(usdtApp);
      // const approvetx = await activateLevel('2', level.toString()); // '2' for X2
      // await getTxn(approvetx);
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      setActiveLevel(level);
    } catch (error) {
      console.error('Error activating level:', error);
    } finally {
      setShowAnimation(false);
    }
  };

  const handleLevelClick = (level: Level): void => {
    setSelectedLevel(selectedLevel === level.level ? null : level.level);
  };

  // Calculate overall progress
  const overallProgress: number = (activeLevel / 12) * 100;

  // X2 Circle Layout Component
  const X2CircleLayout: React.FC<{ slotFilled: number }> = ({ slotFilled }) => {
    return (
      <div className="flex flex-col items-center space-y-1">
        {/* Top circle */}
        <div className="flex justify-center">
          <div
            className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
              slotFilled >= 1
                ? 'bg-gradient-to-r from-emerald-400 to-green-500 border-emerald-400 shadow-lg shadow-emerald-400/50'
                : 'border-gray-500 bg-gray-800/80'
            }`}
          />
        </div>
        
        {/* Bottom row with 3 circles */}
        <div className="flex space-x-1">
          {[2, 3, 4].map((circleIndex) => {
            const isFilled = circleIndex <= slotFilled;
            return (
              <div
                key={circleIndex}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  isFilled
                    ? 'bg-gradient-to-r from-emerald-400 to-green-500 border-emerald-400 shadow-lg shadow-emerald-400/50'
                    : 'border-gray-500 bg-gray-800/80'
                }`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header Section */}
      <div className="relative z-10 p-6">
        <div className="bg-gradient-to-r from-emerald-400 to-green-500 p-0.5 rounded-2xl mb-6">
          <div className="bg-black/80 md:bg-black/95 backdrop-blur-sm md:backdrop-blur-none rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-emerald-600 to-green-700 rounded-full">
                  <GoRocket className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-400">ID: {userData.id}</p>
                  <p className="text-sm text-gray-500">Theeagles.io X2 Program</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 text-sm">Current Level</p>
                <p className="text-3xl font-bold text-white">{activeLevel}/12</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">X2 Progress</span>
                <span className="text-emerald-400">{Math.round(overallProgress)}%</span>
              </div>
              <ProgressBar progress={overallProgress} level={activeLevel} />
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {levels.map((level: Level) => {
            const isActive: boolean = level.level <= activeLevel;
            const isNextLevel: boolean = level.level === activeLevel + 1;
            const isSelected: boolean = selectedLevel === level.level;
            const slotFilled: number = level.slots[0];

            return (
              <div
                key={level.level}
                className={`relative rounded-2xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-br from-slate-900/60 to-gray-900/60 backdrop-blur border-2 border-emerald-500 shadow-lg shadow-emerald-500/30'   
                    : isNextLevel
                    ? 'bg-black/50 md:bg-black/80 backdrop-blur-sm md:backdrop-blur-none border-2 border-emerald-400/50 shadow-lg shadow-emerald-400/20'
                    : 'bg-black/40 md:bg-black/70 backdrop-blur-sm md:backdrop-blur-none border border-gray-600'
                } ${isSelected ? 'scale-105 shadow-xl shadow-emerald-500/40' : ''}`}
                onClick={() => handleLevelClick(level)}
              >
                {/* Level Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-emerald-400">Lv</span>
                    <span className="text-2xl font-bold text-white">{level.level}</span>
                    {isActive && <RiStarFill className="text-yellow-400 w-4 h-4" />}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold text-white">{level.cost}</div>
                    <div className="text-xs text-emerald-400">USDT</div>
                  </div>
                </div>

                {/* Main Content */}
                {isActive ? (
                  <div className="space-y-3">
                    {/* X2 Circle Layout */}
                    <div className="flex justify-center">
                      <X2CircleLayout slotFilled={slotFilled} />
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center space-x-1 text-teal-400">
                        <GoPeople className="w-4 h-4" />
                        <span>{level.recycleCount >= 1 ? level.recycleCount * 4 + slotFilled : slotFilled}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-cyan-400">
                        <HiOutlineArrowPath className="w-4 h-4" />
                        <span>{level.recycleCount}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-20">
                    {isNextLevel ? (
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          handleActivateLevel(level.level, level.cost);
                        }}
                        disabled={showAnimation}
                        className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 transform hover:scale-105 disabled:opacity-50"
                      >
                        {showAnimation ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Activating...</span>
                          </div>
                        ) : (
                          'Activate'
                        )}
                      </button>
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        <RiLockLine className="text-gray-500 w-6 h-6" />
                        <span className="text-xs text-gray-500">Locked</span>
                      </div>
                    )}
                  </div>
                )}              
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Levelx2Enhanced;