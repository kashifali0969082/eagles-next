import { useUserLevels } from "@/store/userCounterStore";
import { useRouter } from "next/navigation";
// Combined Responsive Level Progress Component
export const LevelProgress: React.FC = () => {
  const router = useRouter();
  const X1level = useUserLevels((state) => state.lvlX1);
  const X2level = useUserLevels((state) => state.lvlX2);
  const X3level = useUserLevels((state) => state.lvlX3);

  const PriceX3 = [
    { cost: 20, name: "Spark" },
    { cost: 40, name: "Glow" },
    { cost: 80, name: "Flare" },
    { cost: 160, name: "Blaze" },
    { cost: 320, name: "Inferno" },
    { cost: 640, name: "Nova" },
    { cost: 1250, name: "Eclipse" },
  ];

  const Price = [
    { name: "Bronze", cost: 2.5 },
    { name: "Silver", cost: 5 },
    { name: "Gold", cost: 10 },
    { name: "Platinum", cost: 20 },
    { name: "Emerald", cost: 40 },
    { name: "Sapphire", cost: 80 },
    { name: "Ruby", cost: 160 },
    { name: "Diamond", cost: 320 },
    { name: "Master", cost: 640 },
    { name: "Grandmaster", cost: 1250 },
    { name: "Legendary", cost: 2500 },
    { name: "Mythic", cost: 5000 },
  ];

  const levelData = [
    {
      level: "X1",
      price: Price[X1level]?.cost ?? 0,
      name: Price[X1level - 1]?.name ?? "name",
      progress: Math.round((X1level / 12) * 100),
      filledSlots: X1level,
      totalSlots: 12,
      colorScheme: {
        background: "from-slate-900/90 to-gray-900/90",
        border: "border-teal-500",
        text: "text-teal-400",
        gradient: "from-teal-400 to-cyan-500",
        button:
          "from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600",
        shadow: "shadow-teal-500/30 hover:shadow-teal-500/40",
      },
      route: "/lvlX1",
    },
    {
      level: "X2",
      price: Price[X2level]?.cost ?? 0,
      name: Price[X2level - 1]?.name ?? "name",
      progress: Math.round((X2level / 12) * 100),
      filledSlots: X2level,
      totalSlots: 12,
      colorScheme: {
        background: "from-gray-900/90 to-emerald-900/10",
        border: "border-emerald-500",
        text: "text-emerald-400",
        gradient: "from-emerald-400 to-green-500",
        button:
          "from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600",
        shadow: "shadow-emerald-500/30 hover:shadow-emerald-500/40",
      },
      route: "/lvlX2",
    },
    {
      level: "X3",
      price: PriceX3[X3level]?.cost ?? 0,
      name: PriceX3[X3level - 1]?.name ?? "spark",
      progress: Math.round((X3level / 7) * 100),
      filledSlots: X3level,
      totalSlots: 7,

      colorScheme: {
        background: "from-gray-900/90 to-purple-900/20",
        border: "border-purple-500",
        text: "text-purple-400",
        gradient: "from-purple-400 to-violet-500",
        button:
          "from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600",
        shadow: "shadow-purple-500/30 hover:shadow-purple-500/40",
      },
      route: "/lvlX3",
    },
  ];

  return (
    <div className="mb-4 lg:mb-8">
      <h3 className="text-lg lg:text-2xl font-bold text-white mb-3 lg:mb-6 text-center">
        Level Progress
      </h3>
      <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-3 lg:gap-6">
        {levelData.map((item) => (
          <div
            key={item.level}
            onClick={() => router.push(item.route)}
            className={`bg-gradient-to-br ${item.colorScheme.background} backdrop-blur-lg border ${item.colorScheme.border}/20 rounded-xl p-6 hover:${item.colorScheme.border}/40 transition-all duration-300 shadow-lg ${item.colorScheme.shadow}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-2xl font-bold bg-gradient-to-r ${item.colorScheme.gradient} bg-clip-text text-transparent`}
              >
                {item.level}
              </h3>
              <h3 className={`${item.colorScheme.text} font-bold text-lg`}>
                {item.name}
              </h3>
              <span className={`${item.colorScheme.text} font-bold text-lg`}>
                ${item.price}
              </span>
            </div>

            <div className="flex items-center justify-center space-x-2 mb-6">
              {[...Array(item.totalSlots)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    i < item.filledSlots
                      ? `bg-gradient-to-r ${
                          item.colorScheme.gradient
                        } shadow-lg ${item.colorScheme.text.replace(
                          "text-",
                          "shadow-"
                        )}/50 animate-pulse`
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Progress</span>
                <span className={`${item.colorScheme.text} text-sm font-bold`}>
                  {item.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${
                    item.colorScheme.gradient
                  } h-3 rounded-full transition-all duration-500 shadow-lg ${item.colorScheme.text.replace(
                    "text-",
                    "shadow-"
                  )}/50`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
            {item.price === 0 ? (
              <button
                className={`w-full bg-gradient-to-r ${item.colorScheme.button} text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${item.colorScheme.shadow}`}
                disabled={true}
              >
                Max Reached
              </button>
            ) : (
              <button
                className={`w-full bg-gradient-to-r ${item.colorScheme.button} text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${item.colorScheme.shadow}`}
              >
                Upgrade for ${item.price}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
