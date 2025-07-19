import React from "react";
import { Zap } from "lucide-react";
import { YourApp } from "./custombtn";

export const Header: React.FC = () => {
  return (
    <header className="relative z-50 bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-lg border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
            <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              THE EAGLES.IO
            </h1>
          </div>
          <YourApp />
          {/* <button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black px-3 py-2 sm:px-6 sm:py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 text-xs sm:text-sm">
            Connect
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
