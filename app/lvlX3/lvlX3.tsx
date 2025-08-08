"use client"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import {
  X3activateLevel,
  X3getSlotsFilled,
  X3isLocked,
  X3register,
  X3USDTapprove,
  X3Users,
  isUserExists,
  getTxn,
} from "@/config/Method";
// Custom SVG Icons
const ArrowPathIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8z" />
    <path d="M12 19v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-2.97 2.17-5.43 5-5.91V4.07C7.05 4.56 4 7.92 4 12c0 4.42 3.58 8 8 8z" />
  </svg>
);

const PeopleIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
type SlotData = {
  slotsFilled: number;
  recycleCount: number;
  isLocked: boolean;
};
type SlotsData = {
  [key: `level${number}`]: SlotData;
};
const LockIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Levelx3 = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [data, setData] = useState("");
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [slotsData, setSlotsData] =useState<SlotsData>({});
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (address) fetchX3UserData();
  }, [address]);

  useEffect(() => {
    if (address && activeLevel) getBoolSlotsAndRecycle(address, activeLevel);
  }, [address, activeLevel]);

  const fetchX3UserData = async () => {
    try {
      const data = (await X3Users(address as string)) as any;
      setActiveLevel(Number(data?.[2]) || 0);
      setData(data);
    } catch (error) {
      console.error("Error while fetching X3 data:", error);
    }
  };

  const getBoolSlotsAndRecycle = async (
    address: string,
    activeLevel: number,
    matrix: string = "3"
  ) => {
    for (let i = 0; i < activeLevel; i++) {
      try {
        const val = (await X3getSlotsFilled(
          address,
          (i + 1).toString(),
          matrix
        )) as any;
        const slotsFilled = Number(val[0]);
        const recycleCount = Number(val[1]);
        const lock = await X3isLocked(address as string, (i + 1).toString());

        setSlotsData((prev) => ({
          ...prev,
          [`level${i + 1}`]: {
            slotsFilled,
            recycleCount,
            isLocked: lock,
          },
        }));
      } catch (err) {
        console.error(`Failed to fetch data for level ${i + 1}`, err);
      }
    }
  };

  const handleActivateNextLevel = async (level: any, cost: number) => {
    setLoading(true);
    console.log("X3",level,cost);
    
    const val = await isUserExists(address as string);
    if (!val) {
      alert("User does not exist, please register first.");
      setLoading(false);
      return;
    }

    try {
      const approve = await X3USDTapprove(cost);
      const approveReceipt = await getTxn(approve as string);
      if (!approveReceipt) throw new Error("Approval transaction failed");

      if (level === 1 && cost === 20) {
        const register = await X3register();
        const registerReceipt = await getTxn(register as string);
        if (!registerReceipt) throw new Error("Registration failed");
      } else {
        const activate = await X3activateLevel(level);
        const activateReceipt = await getTxn(activate as string);
        if (!activateReceipt)
          throw new Error(`Activation failed for level ${level}`);
      }

      setActiveLevel((prev) => prev + 1);
      alert(`${level} level activated successfully`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error in handleActivateNextLevel:", error.message);
      } else {
        console.log("Error in handleActivateNextLevel:", error);
      }
    } finally {
      setLoading(false);
    }
  };

const levels = [
  { level: 1, cost: 20, name: "Spark" },
  { level: 2, cost: 40, name: "Glow" },
  { level: 3, cost: 80, name: "Flare" },
  { level: 4, cost: 160, name: "Blaze" },
  { level: 5, cost: 320, name: "Inferno" },
  { level: 6, cost: 640, name: "Nova" },
  { level: 7, cost: 1250, name: "Eclipse" },
];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div
        className={`relative transition-all duration-500 ${
          loading ? "blur-sm" : ""
        }`}
      >
        {/* Header Section */}
        <div
          className={`transform transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-purple-800/20 to-pink-800/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 mb-8 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Theeagles.io User
              </h1>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full">
                <span className="text-white font-semibold">
                  ID {data?.[1]?.toString()}
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              ID {data?.[1]?.toString()} / Theeagles.io x3 ({activeLevel}/7)
            </p>
            <div className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000 ease-out"
                style={{ width: `${(activeLevel / 7) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {levels.map((level, index) => {
            const slotData = slotsData[`level${level.level}`] || {
              slotsFilled: 0,
              recycleCount: 0,
              isLocked: false,
            };

            const isActive = level.level <= activeLevel;
            const isNextLevel = level.level === Number(activeLevel) + 1;

            return (
              <div
                key={level.level}
                className={`transform transition-all duration-700 hover:scale-105 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`relative group rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
                    isActive
                      ? "hover:shadow-pink-500/25 bg-gradient-to-r from-pink-500 to-yellow-400"
                      : "bg-gradient-to-r from-gray-800 to-gray-900 opacity-60"
                  }`}
                >
                  {/* Animated Border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 opacity-0 transition-opacity duration-300 ${
                      isActive ? "group-hover:opacity-100" : ""
                    }`}
                  ></div>
                  <div
                    className={`absolute inset-[2px] rounded-2xl ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-yellow-400"
                        : "bg-gradient-to-r from-gray-800 to-gray-900"
                    }`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative z-10 p-6 h-72">
                    {/* Level Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div
                        className={`${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      >
                        <h3 className="text-xl font-bold mb-1">
                          Level {level.level}
                        </h3>
                        <div className="flex items-center gap-2">
                          <img
                            src="/assets/LoginImages/tether.png"
                            alt="USDT"
                            className="h-4 w-4"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFD700'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ctext x='12' y='16' text-anchor='middle' fill='%23000' font-size='10' font-weight='bold'%3E%24%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <span className="font-semibold">
                            {level.cost} USDT
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isActive
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-gray-700/50 text-gray-500 border border-gray-600/50"
                        }`}
                      >
                        {isActive ? "Active" : "Locked"}
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="mb-6 flex justify-center items-center h-24">
                      {isActive ? (
                        slotData.isLocked ? (
                          <div className="flex justify-center items-center h-24">
                            <div className="bg-red-500/20 p-4 rounded-full">
                              <LockIcon size={32} className="text-red-500" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center gap-4">
                            {[0, 3].map((offset, triIndex) => (
                              <div
                                key={triIndex}
                                className="relative w-16 h-16"
                              >
                                {[1, 2, 3].map((i) => {
                                  const index = offset + i;
                                  const isFilled =
                                    index <= slotData.slotsFilled;

                                  const positions: Record<number, string> = {
                                    1: "left-0",
                                    2: "left-1/2",
                                    3: "left-full",
                                  };

                                  return (
                                    <div
                                      key={index}
                                      className={`absolute ${positions[i]} transition-all duration-500`}
                                      style={{
                                        animationDelay: `${index * 200}ms`,
                                      }}
                                    >
                                      <div
                                        className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                                          isFilled
                                            ? "bg-yellow-400 border-yellow-300 shadow-lg shadow-yellow-400/50 animate-pulse"
                                            : "bg-transparent border-white/50"
                                        }`}
                                      ></div>
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        )
                      ) : (
                        <div className="flex justify-center items-center h-24">
                          {isNextLevel ? (
                            <button
                              className="group relative px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 active:scale-95 disabled:opacity-50"
                              onClick={() =>
                                handleActivateNextLevel(level.level, level.cost)
                              }
                              disabled={loading}
                            >
                              <span className="relative z-10">
                                {loading ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                  </div>
                                ) : (
                                  "Activate"
                                )}
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                          ) : (
                            <div className="bg-gray-500/20 p-4 rounded-full">
                              <LockIcon size={32} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/20 mt-auto">
                      <div
                        className={`flex items-center gap-2 ${
                          isActive ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isActive ? "bg-blue-500/20" : "bg-gray-600/20"
                          }`}
                        >
                          <PeopleIcon size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {slotData.recycleCount >= 1
                              ? slotData.recycleCount * 6 + slotData.slotsFilled
                              : slotData.slotsFilled}
                          </div>
                          <div
                            className={`text-xs ${
                              isActive ? "text-white/60" : "text-gray-600"
                            }`}
                          >
                            Users
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-2 ${
                          isActive ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isActive ? "bg-green-500/20" : "bg-gray-600/20"
                          }`}
                        >
                          <ArrowPathIcon size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {slotData.recycleCount || 0}
                          </div>
                          <div
                            className={`text-xs ${
                              isActive ? "text-white/60" : "text-gray-600"
                            }`}
                          >
                            Recycles
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-800/90 to-pink-800/90 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center border border-purple-500/30 shadow-2xl">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-400"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-pink-400"></div>
            </div>
            <p className="text-white font-medium mt-4 text-lg">
              Processing transaction...
            </p>
            <p className="text-white/60 text-sm mt-2">
              Please wait while we confirm your transaction
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Levelx3;
