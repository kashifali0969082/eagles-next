"use client"
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { isUserExists, getIdToAddress } from "@/config/Method";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAdressStore } from "@/store/userCounterStore";
export const SearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchError, setSearchError] = useState("");
    const setAddress = useAdressStore((state) => state.setAddress);
  
const router=useRouter();
  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchError("Please enter a valid ID");
      return;
    }

    setIsLoading(true);
    setSearchError("");
    setSearchResult(null);

    try {
      let resp = await getIdToAddress(searchId as string);
      let final=await isUserExists(resp as string)
      if (!final) {

        setSearchError("User not found. Please check the ID and try again.");
        setSearchResult(null);
                  setIsLoading(false);

      } else {
        setAddress(resp as string)
        setTimeout(() => {
          setIsLoading(false);
          router.push(`/IdSearch?addres=${resp}`);     
          setSearchError("");
        }, 2000);
        onClose(); // close modal after navigating
      }
    } catch (error) {
      console.log("error while getting address for id");
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSearchId("");
    setSearchResult(null);
    setSearchError("");
    setIsLoading(false);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes modalFadeIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes overlayFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.33); }
          80%, 100% { opacity: 0; }
        }
        
        @keyframes pulse-dot {
          0% { transform: scale(0.8); }
          50% { transform: scale(1); }
          100% { transform: scale(0.8); }
        }
        
        .animate-modal-fade-in {
          animation: modalFadeIn 0.3s ease-out;
        }
        
        .animate-overlay-fade-in {
          animation: overlayFadeIn 0.3s ease-out;
        }
        
        .pulse-ring {
          animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        .pulse-dot {
          animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
        }
        
        body {
          overflow: hidden;
        }
      `}</style>

      {/* Full Screen Backdrop with Blur */}
      <div
        className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur-md animate-overlay-fade-in"
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />

      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-full p-4 relative z-10">
        {/* Modal */}
        <div className="relative w-full max-w-md mx-auto bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border border-yellow-500/30 rounded-2xl shadow-2xl animate-modal-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xl font-bold text-white">Search User ID</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Search Input */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Enter User ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="e.g., 4679"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchId.trim()}
              className={`w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/30 mb-6 ${
                isLoading || !searchId.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-black/20 pulse-ring"></div>
                    <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-black pulse-dot"></div>
                  </div>
                  <span>Searching...</span>
                </div>
              ) : (
                "Search User"
              )}
            </button>
            {/* Error Message */}
            {searchError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{searchError}</p>
              </div>
            )}
            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">
                Enter any user ID to view their profile and stats
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
