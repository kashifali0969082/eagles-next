import React, { useEffect } from "react";
import { Zap } from "lucide-react";
import { YourApp } from "./custombtn";
import { useAccount } from "wagmi";
import { isUserExists } from "@/config/Method";
import { useAdressStore } from "@/store/userCounterStore";
export const Header: React.FC = () => {
  const { address } = useAccount();
  const setAdress = useAdressStore((state) => state.setAddress);
  useEffect(() => {
    const checkUser = async () => {
      const x = await exsistfun();
      if (x === true) {
        setAdress(address as string);
      } else {
        setAdress("");
      }
    };

    if (address) {
      checkUser();
    }
  }, [address]);

  const exsistfun = async () => {
    try {
      const val = await isUserExists(address as string);
      return val;
    } catch (error) {
      console.log("error while getting user existence", error);
      return false;
    }
  };

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
        </div>
      </div>
    </header>
  );
};

export default Header;
