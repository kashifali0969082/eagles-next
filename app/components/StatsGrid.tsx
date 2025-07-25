import { DollarSign, TrendingUp, Users } from "lucide-react";

// Combined Responsive Stats Grid Component
export const StatsGrid: React.FC = () => {
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

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-4 lg:mb-8">
      <StatCard
        title="Total Profit"
        value="$0"
        icon={<DollarSign className="w-4 h-4 lg:w-6 lg:h-6 text-black" />}
        gradient="from-yellow-400 to-amber-500"
      />
      <StatCard
        title="Daily Profit"
        value="$0.00"
        icon={<TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-black" />}
        gradient="from-yellow-400 to-amber-500"
      />
      <StatCard
        title="Partners"
        value="0"
        icon={<Users className="w-4 h-4 lg:w-6 lg:h-6 text-black" />}
        gradient="from-yellow-400 to-amber-500"
      />
      <StatCard
        title="Team Members"
        value="0"
        icon={<Users className="w-4 h-4 lg:w-6 lg:h-6 text-black" />}
        gradient="from-yellow-400 to-amber-500"
      />
    </div>
  );
};