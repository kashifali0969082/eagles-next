"use client"
import React, { useState } from "react";
import { Zap, Check, AlertCircle, Wallet, Info } from "lucide-react";

interface StarProps {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  direction: number;
  rotationSpeed: number;
}

const AnimatedStars: React.FC = () => {
  const [stars, setStars] = useState<StarProps[]>([]);

  React.useEffect(() => {
    const generateStars = () => {
      const newStars: StarProps[] = [];
      for (let i = 0; i < 80; i++) {
        const direction = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.8 + 0.2;
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: Math.cos(direction) * speed,
          speedY: Math.sin(direction) * speed,
          opacity: Math.random() * 0.5 + 0.1,
          direction,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
      setStars(newStars);
    };

    generateStars();

    const animateStars = () => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          x: star.x + star.speedX * 0.3,
          y: star.y + star.speedY * 0.3,
          direction: star.direction + star.rotationSpeed,
          speedX:
            star.x > window.innerWidth + 10
              ? -Math.abs(star.speedX)
              : star.x < -10
              ? Math.abs(star.speedX)
              : star.speedX + Math.sin(star.direction) * 0.005,
          speedY:
            star.y > window.innerHeight + 10
              ? -Math.abs(star.speedY)
              : star.y < -10
              ? Math.abs(star.speedY)
              : star.speedY + Math.cos(star.direction) * 0.005,
        }))
      );
    };

    const interval = setInterval(animateStars, 80);
    const handleResize = () => generateStars();

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.1; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes golden-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-golden-shimmer {
          animation: golden-shimmer 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-yellow-400"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 1.5}px rgba(255, 215, 0, ${
              star.opacity * 0.3
            })`,
            transform: `rotate(${star.direction}rad)`,
            animation: `twinkle ${
              2 + Math.random() * 3
            }s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

const RegistrationPage: React.FC = () => {
  const [uplineId, setUplineId] = useState("1");
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isNetworkConnected, setIsNetworkConnected] = useState(true);
  const [isRegistrationAvailable, setIsRegistrationAvailable] = useState(true);
  const [hasRequiredBalance, setHasRequiredBalance] = useState(false);
  const [isUSDTApproved, setIsUSDTApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Handle registration logic here
  };

  const handleApproveUSDT = async () => {
    setIsLoading(true);
    // Simulate USDT approval
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsUSDTApproved(true);
    setIsLoading(false);
  };

  const StatusItem: React.FC<{
    icon: React.ReactNode;
    text: string;
    isComplete: boolean;
    isWarning?: boolean;
  }> = ({ icon, text, isComplete, isWarning = false }) => (
    <div className="flex items-center space-x-3 py-2">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        isComplete 
          ? "bg-yellow-500/20 text-yellow-400" 
          : isWarning 
          ? "bg-orange-500/20 text-orange-400"
          : "bg-gray-500/20 text-gray-400"
      }`}>
        {icon}
      </div>
      <span className={`text-sm ${
        isComplete 
          ? "text-yellow-400" 
          : isWarning 
          ? "text-orange-400"
          : "text-gray-400"
      }`}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden flex items-center justify-center p-4">
      <AnimatedStars />

      {/* Central Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Connect Wallet Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleConnectWallet}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
          >
            <Wallet className="w-5 h-5" />
            <span className="text-sm font-semibold">Connect Wallet</span>
          </button>
        </div>

        {/* Registration Card */}
        <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 animate-fade-in-up">
          
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-2">
              Registration
            </h1>
            <p className="text-lg text-yellow-300 font-medium">
              in Theeagles USDT
            </p>
          </div>

          {/* Your Upline Section */}
          <div className="mb-8">
            <label className="block text-yellow-200 text-sm font-medium mb-3">
              Your upline
            </label>
            <input
              type="text"
              value={uplineId}
              onChange={(e) => setUplineId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:border-yellow-400/50"
              placeholder="Enter upline ID"
            />
          </div>

          {/* Status Section */}
          <div className="space-y-3 mb-8">
            <StatusItem
              icon={<Check className="w-4 h-4" />}
              text="Wallet: connected"
              isComplete={isWalletConnected}
            />
            <StatusItem
              icon={<Check className="w-4 h-4" />}
              text="Network: Smart chain"
              isComplete={isNetworkConnected}
            />
            <StatusItem
              icon={<Check className="w-4 h-4" />}
              text="Registration: available"
              isComplete={isRegistrationAvailable}
            />
            <StatusItem
              icon={<AlertCircle className="w-4 h-4" />}
              text="Balance: min 5 USDT and 0.001 BNB"
              isComplete={hasRequiredBalance}
              isWarning={true}
            />
            <StatusItem
              icon={<AlertCircle className="w-4 h-4" />}
              text="Approve USDT"
              isComplete={isUSDTApproved}
              isWarning={true}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {!isUSDTApproved && (
              <button
                onClick={handleApproveUSDT}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Approving...</span>
                  </div>
                ) : (
                  "Approve USDT"
                )}
              </button>
            )}

            <button
              onClick={handleRegistration}
              disabled={isLoading || !isUSDTApproved}
              className={`w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 ${
                (isLoading || !isUSDTApproved) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Registration"
              )}
            </button>
          </div>

          {/* Registration Fee */}
          <div className="flex items-center justify-center space-x-2 mt-6 text-yellow-300">
            <span className="text-sm">Registration fee</span>
            <Info className="w-4 h-4" />
          </div>

          {/* Footer */}
          <div className="text-center mt-6 animate-fade-in-up animation-delay-300">
            <p className="text-gray-400 text-sm">
              A decentralized networking platform based on{" "}
              <span className="text-yellow-400 font-semibold">
                smart contracts
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;