// Combined Responsive Level Progress Component
export const LevelProgress: React.FC = () => {
  const levelData = [
    {
      level: "X1",
      price: "$160",
      progress: 80,
      filledSlots: 5,
      totalSlots: 12,
      mobileSlots: 3,
      mobileTotalSlots: 6,
      colorScheme: {
        background: "from-slate-900/90 to-gray-900/90",
        border: "border-teal-500",
        text: "text-teal-400",
        gradient: "from-teal-400 to-cyan-500",
        button: "from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600",
        shadow: "shadow-teal-500/30 hover:shadow-teal-500/40"
      }
    },
    {
      level: "X2", 
      price: "$50",
      progress: 40,
      filledSlots: 4,
      totalSlots: 12,
      mobileSlots: 2,
      mobileTotalSlots: 6,
      colorScheme: {
        background: "from-gray-900/90 to-emerald-900/10",
        border: "border-emerald-500",
        text: "text-emerald-400",
        gradient: "from-emerald-400 to-green-500",
        button: "from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600",
        shadow: "shadow-emerald-500/30 hover:shadow-emerald-500/40"
      }
    },
    {
      level: "X3",
      price: "$20", 
      progress: 20,
      filledSlots: 0,
      totalSlots: 7,
      mobileSlots: 0,
      mobileTotalSlots: 4,
      colorScheme: {
        background: "from-gray-900/90 to-purple-900/20",
        border: "border-purple-500",
        text: "text-purple-400",
        gradient: "from-purple-400 to-violet-500",
        button: "from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600",
        shadow: "shadow-purple-500/30 hover:shadow-purple-500/40"
      }
    }
  ];

  return (
    <div className="mb-4 lg:mb-8">
      <h3 className="text-lg lg:text-2xl font-bold text-white mb-3 lg:mb-6 text-center">
        Level Progress
      </h3>
      
      {/* Mobile: Horizontal Scroll */}
      <div className="flex space-x-3 overflow-x-auto pb-2 lg:hidden">
        {levelData.map((item) => (
          <div 
            key={item.level}
            className={`flex-shrink-0 w-48 bg-gradient-to-br ${item.colorScheme.background} backdrop-blur-lg border ${item.colorScheme.border}/30 rounded-lg p-3`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className={`text-sm font-bold bg-gradient-to-r ${item.colorScheme.gradient} bg-clip-text text-transparent`}>
                {item.level}
              </h4>
              <span className={`${item.colorScheme.text} font-bold text-xs`}>{item.price}</span>
            </div>
            
            <div className="flex justify-center space-x-1 mb-2">
              {[...Array(item.mobileTotalSlots)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < item.mobileSlots 
                      ? `bg-gradient-to-r ${item.colorScheme.gradient}` 
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
              <div
                className={`bg-gradient-to-r ${item.colorScheme.gradient} h-1 rounded-full`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
            
            <p className={`${item.colorScheme.text} text-xs text-center`}>{item.progress}%</p>
          </div>
        ))}
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {levelData.map((item) => (
          <div 
            key={item.level}
            className={`bg-gradient-to-br ${item.colorScheme.background} backdrop-blur-lg border ${item.colorScheme.border}/20 rounded-xl p-6 hover:${item.colorScheme.border}/40 transition-all duration-300 shadow-lg ${item.colorScheme.shadow}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${item.colorScheme.gradient} bg-clip-text text-transparent`}>
                {item.level}
              </h3>
              <span className={`${item.colorScheme.text} font-bold text-lg`}>{item.price}</span>
            </div>

            <div className="flex items-center justify-center space-x-2 mb-6">
              {[...Array(item.totalSlots)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    i < item.filledSlots
                      ? `bg-gradient-to-r ${item.colorScheme.gradient} shadow-lg ${item.colorScheme.text.replace('text-', 'shadow-')}/50 animate-pulse`
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Progress</span>
                <span className={`${item.colorScheme.text} text-sm font-bold`}>{item.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${item.colorScheme.gradient} h-3 rounded-full transition-all duration-500 shadow-lg ${item.colorScheme.text.replace('text-', 'shadow-')}/50`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>

            <button className={`w-full bg-gradient-to-r ${item.colorScheme.button} text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${item.colorScheme.shadow}`}>
              Upgrade for {item.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};