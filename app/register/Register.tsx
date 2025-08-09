"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { getIdToAddress, USDTapprove, getTxn, register } from "@/config/Method";
import { usdtdecimals } from "@/config/exports";
import { toast, ToastContainer } from "react-toastify";
import { dashboardStatsStore } from "@/store/userCounterStore";

const RegistrationPage: React.FC = () => {
  const [uplineId, setUplineId] = useState("1");
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isRegistrationAvailable, setIsRegistrationAvailable] = useState(true);
  const [hasRequiredBalance, setHasRequiredBalance] = useState(false);
  const [isUSDTApproved, setIsUSDTApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const router = useRouter();
  const effect = dashboardStatsStore.getState().effect;
  const settranstable = dashboardStatsStore.getState().seteffect;

  const handleRegistration = async () => {
    setIsLoading(true);
    await getAddress();
    setIsLoading(false);
  };

  const getAddress = async () => {
    try {
      setIsLoading(true);

      // ✅ Wallet connection check
      if (!address) {
        toast("Please connect your wallet first.");
        setIsLoading(false);
        return;
      }
      // const upline = await isUserExists(address);
      // ✅ Upline validation
      if (!uplineId) {
        console.error("❌ Upline ID is missing or invalid.");
        toast("Invalid upline ID. Please check and try again.");
        setIsLoading(false);
        return;
      }

      const uplineAddress = await getIdToAddress(uplineId);
      if (!uplineAddress) {
        console.error("❌ Unable to fetch wallet address for given upline.");
        toast("Failed to get upline wallet address. Please try again.");
        setIsLoading(false);
        return;
      }

      try {
        const approveTx = await USDTapprove((5 * usdtdecimals).toString());
        if (!approveTx) {
          console.log("jhkjhkj");

          console.error("❌ USDT Approval tx failed.");
          toast("USDT Approval failed. Please try again.");
          setIsLoading(false);
          return;
        }

        const receipt = await getTxn(approveTx);
        settranstable(!effect);

        if (!receipt) {
          console.error("❌ USDT Approval transaction failed.");
          toast("Approval failed. Please check your wallet.");
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("❌ Error during USDT approval:", err);
        toast("An error occurred during USDT approval.");
        setIsLoading(false);
        return;
      }

      // ✅ Register
      try {
        const registerTx = await register(uplineAddress as string);
        if (!registerTx) {
          toast(" Registration tx failed.");
          alert("Registration failed. Please try again.");
          setIsLoading(false);
          return;
        }

        const registerReceipt = await getTxn(registerTx);
        if (!registerReceipt) {
          console.error("❌ Registration transaction failed.");
          toast("Transaction failed. Please check your wallet.");
          setIsLoading(false);
          return;
        }
        router.push("/dashboard");
        setIsLoading(false);
      } catch (err) {
        console.error("❌ Error during registration:", err);
        toast("An error occurred during registration. Please try again.");
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      toast("Unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const RequirementItem: React.FC<{
    text: string;
    isComplete: boolean;
    isWarning?: boolean;
  }> = ({ text, isComplete, isWarning = false }) => (
    <div className="flex items-start space-x-3 py-2">
      <div
        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
          isComplete
            ? "bg-yellow-400"
            : isWarning
            ? "bg-orange-400"
            : "bg-gray-400"
        }`}
      ></div>
      <span
        className={`text-sm leading-relaxed ${
          isComplete
            ? "text-yellow-400"
            : isWarning
            ? "text-orange-400"
            : "text-gray-300"
        }`}
      >
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden flex items-center justify-center p-4">
      {/* Central Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Registration Card */}
        <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 animate-fade-in-up">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-2">
              Registration
            </h1>
            <p className="text-lg text-yellow-300 font-medium"></p>
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

          {/* Requirements Section */}
          <div className="mb-8">
            <h3 className="text-yellow-200 text-sm font-medium mb-4">
              Requirements:
            </h3>
            <div className="space-y-2">
              <RequirementItem
                text="Connect your wallet to proceed"
                isComplete={isWalletConnected}
              />
              <RequirementItem
                text="Ensure registration is available"
                isComplete={isRegistrationAvailable}
              />
              <RequirementItem
                text="Maintain minimum balance of 5 USDT and 0.001 BNB"
                isComplete={hasRequiredBalance}
                isWarning={true}
              />
              <RequirementItem
                text="Approve USDT spending for contract"
                isComplete={isUSDTApproved}
                isWarning={true}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleRegistration}
              className={`w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 `}
              disabled={isLoading}
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
            <span className="text-sm">Registration fee 5$</span>
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "rgba(24, 24, 27, 0.8)",
          border: "1px solid rgba(250, 204, 21, 0.3)",
          color: "#FACC15",
          backdropFilter: "blur(10px)",
          borderRadius: "0.75rem",
        }}
      />
    </div>
  );
};

export default RegistrationPage;
