"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; 
export const Hero: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const router = useRouter();

  const mlmTipsAndQuotes = [
    "🚀 Success in MLM is about consistency, not luck.",
    "💡 Your network is your net worth.",
    "🔥 Talk to people every day — the fortune is in the follow-up.",
    "🧠 Learn daily, grow weekly, earn monthly.",
    "💬 Every 'no' brings you closer to a 'yes'.",
    "🎯 Don't aim for perfection, aim for progress.",
    "🏗️ Build relationships, not just downlines.",
    "📈 Your success depends on how many people you help succeed.",
    "🕒 You're not late. You're just getting started.",
    "💎 Consistency turns average people into legends.",
    "🧭 Leadership is not a title, it's influence.",
    "🛠️ Tools work when you work the tools.",
    "🌱 Grow your mindset and your income will follow.",
    "🗣️ Speak with belief, act with purpose.",
    "🌐 Your next superstar might be one message away."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === mlmTipsAndQuotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, [mlmTipsAndQuotes.length]);

  return (
    <>
      {/* Contract Address Ticker - Moved from Header */}
      <div className="relative z-40 bg-gradient-to-r from-black/80 to-gray-900/80 overflow-hidden border-b border-yellow-500/10">
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          
          @keyframes scroll-mobile {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          
          .ticker-content {
            animation: scroll 40s linear infinite;
          }
          
          .ticker-content:hover {
            animation-play-state: paused;
          }
          
          @media (max-width: 640px) {
            .ticker-content {
              animation: scroll-mobile 25s linear infinite;
            }
          }
          
          @media (max-width: 480px) {
            .ticker-content {
              animation: scroll-mobile 20s linear infinite;
            }
          }
        `}</style>

        <div className="py-1 sm:py-2 px-2 sm:px-4">
          <div className="ticker-content whitespace-nowrap">
            <span className="text-gray-300 font-medium text-xs sm:text-sm">
              {/* Desktop/Tablet Content */}
              <span className="hidden sm:inline">
                🔗 Smart Contract Address:
                <span className="mx-2 font-mono text-yellow-300">
                  0x742d35Cc6634C0532925a3b8D1C9d2c5fC2e7d8a
                </span>
                •
                <span className="mx-2 text-gray-300">
                  Network: BSC (Binance Smart Chain)
                </span>
                •
                <span className="mx-2 text-gray-300">
                  Status: Active & Verified
                </span>
                •
                <span className="mx-2 text-yellow-300">✅ Audited Contract</span>
                •
                <span className="mx-2 text-gray-300">⚡ Real-time Updates</span>
                •
                <span className="mx-2 text-gray-300">👥 Total Members: 5,410</span>
                •
                <span className="mx-2 text-gray-300">
                  💰 USDT Distributed: $7,332.50
                </span>
                •
                <span className="mx-4 text-yellow-400">
                  🔗 Smart Contract: 0x742d35Cc6634C0532925a3b8D1C9d2c5fC2e7d8a
                </span>
                •
                <span className="mx-2 text-green-400">🚀 Join 5,410+ Members</span>
                •
                <span className="mx-2 text-yellow-300">💎 Secure & Transparent</span>
              </span>

              {/* Mobile Content - Shorter version */}
              <span className="inline sm:hidden">
                🔗 Contract: 
                <span className="mx-1 font-mono text-yellow-300 text-xs">
                  0x742d...7d8a
                </span>
                • BSC Network • ✅ Verified • 👥 5,410 Members • 💰 $7,332.50 Distributed •
                <span className="mx-1 text-yellow-400">
                  🚀 Join Now!
                </span>
                • 🔗 Contract: 0x742d...7d8a • ✅ Audited • 💎 Secure
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-8 sm:py-12 lg:py-16">
        <style>{`
          @keyframes smooth-pulse {
            0%, 100% { 
              transform: scale(1); 
              opacity: 0.6; 
            }
            50% { 
              transform: scale(1.1); 
              opacity: 0.8; 
            }
          }
          
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes slide-in-right {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slide-out-left {
            0% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(-50px); }
          }
          
          .animate-smooth-pulse {
            animation: smooth-pulse 4s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }
          
          .animate-bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
          }
          
          .animate-slide-in {
            animation: slide-in-right 0.6s ease-out;
          }
          
          .animation-delay-200 {
            animation-delay: 200ms;
          }
          
          .animation-delay-300 {
            animation-delay: 300ms;
          }
        `}</style>

        {/* Central Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-full blur-2xl animate-smooth-pulse"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 lg:space-y-12">
          
          {/* Header Section */}
          <div className="animate-fade-in-up space-y-3 sm:space-y-4 lg:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-yellow-400 to-amber-400 bg-clip-text text-transparent leading-tight">
              THE EAGLES.IO
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              A decentralized networking platform based on{" "}
              <span className="text-yellow-400 font-semibold">smart contracts</span>
            </p>
          </div>

          {/* Motivational Quotes Carousel */}
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
              <div className="relative h-12 sm:h-16 lg:h-20 flex items-center justify-center">
                <div 
                  key={currentQuoteIndex}
                  className="absolute inset-0 flex items-center justify-center animate-slide-in"
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-yellow-100 font-medium leading-relaxed px-2 sm:px-4">
                    {mlmTipsAndQuotes[currentQuoteIndex]}
                  </p>
                </div>
              </div>
              
              {/* Quote Progress Indicators */}
              <div className="flex justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6 overflow-x-auto pb-2">
                {mlmTipsAndQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuoteIndex(index)}
                    className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex 
                        ? 'bg-yellow-400 w-6 sm:w-8' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <button onClick={
              ()=>router.push('../login')
            } className="group bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black px-6 sm:px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 animate-bounce-subtle w-full sm:w-40 max-w-xs">
              Login
            </button>
            <button onClick={
              ()=>router.push('../register')
            }  className="group bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black px-6 sm:px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 animate-bounce-subtle animation-delay-200 w-full sm:w-40 max-w-xs">
              Register
            </button>
            <button className="group bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-black px-6 sm:px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-600/25 animate-bounce-subtle animation-delay-300 w-full sm:w-40 max-w-xs">
              Search ID
            </button>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-4 sm:p-6 text-center hover:border-yellow-500/40 transition-all duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">5,410+</div>
              <div className="text-gray-400 text-sm sm:text-base">Active Members</div>
            </div>
            <div className="bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-4 sm:p-6 text-center hover:border-yellow-500/40 transition-all duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">$7,332</div>
              <div className="text-gray-400 text-sm sm:text-base">USDT Distributed</div>
            </div>
            <div className="bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-4 sm:p-6 text-center hover:border-yellow-500/40 transition-all duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-gray-400 text-sm sm:text-base">Success Rate</div>
            </div>
          </div>

          {/* Mobile Call-to-Action */}
          <div className="block sm:hidden px-4 pt-4">
            <div className="bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-4 text-center">
              <p className="text-yellow-300 text-sm font-medium">
                🚀 Join thousands of successful entrepreneurs building their future with smart contracts
              </p>
            </div>
          </div>

          {/* Desktop Additional Info */}
          <div className="hidden sm:block max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-gray-900/40 to-black/40 backdrop-blur-lg border border-yellow-500/10 rounded-xl p-4 text-center">
                <h4 className="text-yellow-400 font-semibold mb-2">🔒 Secure Platform</h4>
                <p className="text-gray-400 text-sm">Built on audited smart contracts with transparent operations</p>
              </div>
              <div className="bg-gradient-to-r from-gray-900/40 to-black/40 backdrop-blur-lg border border-yellow-500/10 rounded-xl p-4 text-center">
                <h4 className="text-yellow-400 font-semibold mb-2">🌐 Global Community</h4>
                <p className="text-gray-400 text-sm">Connect with entrepreneurs worldwide and build your network</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;