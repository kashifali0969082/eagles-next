"use client";
import { DollarSign, TrendingUp, Users,MoveUp } from "lucide-react";
import { dashboardStatsStore } from "@/store/userCounterStore";
import { mainnetDecimals, usdtdecimals } from "@/config/exports";

export const StatsGrid: React.FC = () => {
  const { totalProfit, hr24Profit, partners, team, hr24partners, hr24team } =
    dashboardStatsStore();

  console.log("bakwas", totalProfit);

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    gradient: string;
  }> = ({ title, value, icon, gradient }) => (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-lg lg:rounded-xl p-3 lg:p-6 hover:border-yellow-500/40 transition-all duration-300 group text-center lg:text-left">
      <div
        className={`w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mb-2 lg:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto lg:mx-0`}
      >
        {icon}
      </div>
      <h3 className="text-gray-300 text-xs lg:text-sm mb-1 lg:mb-2">{title}</h3>
      <p className="text-lg lg:text-2xl font-bold text-white">{value}</p>
    </div>
  );

  const DualStatCard: React.FC<{
    title: string;
    primaryValue: string;
    secondaryValue: string;
    icon: React.ReactNode;
    gradient: string;
  }> = ({ title, primaryValue, secondaryValue, icon, gradient }) => (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-lg lg:rounded-xl p-3 lg:p-6 hover:border-yellow-500/40 transition-all duration-300 group text-center lg:text-left">
      <div
        className={`w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mb-2 lg:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto lg:mx-0`}
      >
        {icon}
      </div>
      <h3 className="text-gray-300 text-xs lg:text-sm mb-1 lg:mb-2">{title}</h3>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1 lg:gap-2">
        <p className="text-lg lg:text-2xl font-bold text-white">
          {primaryValue}
        </p>
        <div className="flex items-center justify-center lg:justify-end gap-1">
          <MoveUp className="w-5 h-5 lg:w-4 lg:h-4 text-green-500" />
          <span className="text-xs lg:text-sm font-semibold text-green-500">
            {secondaryValue}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-4 lg:mb-8">
      <StatCard
        title="Total Profit"
        value={`$${(totalProfit).toLocaleString()}`}
        icon={<DollarSign className="w-4 h-4 lg:w-6 lg:h-6 text-black" />}
        gradient="from-blue-400 to-blue-500"
      />
      <StatCard
        title="Daily Profit"
        value={`$${hr24Profit.toLocaleString()}`}
        icon={<TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-black" />}
        gradient=" from-teal-400 to-cyan-500"
      />
      <DualStatCard
        title="Partners"
        primaryValue={partners.toString()}
        secondaryValue={hr24partners.toString()} // Replace with your actual secondary value or variable
        icon={<Users className="w-4 h-4 lg:w-6 lg:h-6 text-black" />}
        gradient="from-emerald-400 to-green-500"
      />
      <DualStatCard
        title="Team Members"
        primaryValue={team.toString()}
        secondaryValue={hr24team.toString()} // Replace with your actual secondary value or variable
        icon={<Users className="w-4 h-4 lg:w-6 lg:h-6 text-black" />}
        gradient="from-purple-400 to-pink-500"
      />
    </div>
  );
};
