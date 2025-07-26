"use client";
import React, { useEffect, useState } from "react";
import { Zap, Eye, EyeOff, Router } from "lucide-react";
import { useAccount } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
import { isUserExists } from "@/config/Method";
import { useRouter } from "next/navigation";
import { useAdressStore } from "@/store/userCounterStore";
import axios from "axios";
import { ApiUrl } from "@/config/exports";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const [LoginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  const setAddress = useAdressStore((state) => state.setAddress);
  // useEffect(() => {
  //   GettingProfileApi();
  // }, []);
  // const GettingProfileApi = async () => {
  //   try {
  //     let resp = await axios.get(
  //       `${ApiUrl}/user/profile/0x36c59a95Bbe5E2Beac4DAc8dabc06632d7b6F824`
  //     );
  //     console.log("profile resp ", resp);
  //   } catch (error) {
  //     toast.error("error while Geeting Profile");
  //   }
  // };

  useEffect(() => {
    if (isConnected) {
      setPassword(address as string);
    }
  }, [isConnected, address]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isConnected) {
      toast("Connect your wallet!");
      setIsLoading(false);
      return;
    }
    if (address !== password) {
      toast("Connect with same wallet adress!");
      setIsLoading(false);
      return;
    }
    let val = await isUserExists(password as string);
    if (isConnected && val === true) {
      setAddress(password);
      setTimeout(() => {
        router.push("/dashboard");
            setIsLoading(false);

      }, 2000);
    } else {
      toast("Account not registered");
      setTimeout(() => {
        router.push("/register");
            setIsLoading(false);
      }, 2000);
    }
    // setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-full blur-2xl animate-smooth-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-8 shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Welcome Back
              </h1>
            </div>
            <p className="text-gray-300 text-md">Login Now</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-yellow-200"
              >
                Registerd Address
              </label>
              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:border-yellow-400/50"
                  placeholder="Enter your address"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <a
                  className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
                  onClick={() => router.push("/register")}
                >
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 animate-fade-in-up animation-delay-300">
          <p className="text-gray-400 text-sm">
            A decentralized networking platform based on{" "}
            <span className="text-yellow-400 font-semibold">
              smart contracts
            </span>
          </p>
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

export default LoginPage;
