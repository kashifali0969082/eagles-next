import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { YourApp } from "./custombtn";
import { useAccount } from "wagmi";
// import { io, Socket } from "socket.io-client";
// import { useSocket } from "./hooks/useSocket";
interface Notification {
  from: string;
  to: string;
  amount: number;
  createdAt: string;
}


export const Header: React.FC = () => {
  // const { address,isConnected } = useAccount();
  // const { connect, disconnect, getSocket } = useSocket()
  // const socket = io('http://localhost:5000');


// socket connection
  //  useEffect(() => {
  //   if (isConnected ||address) {
      
  //     socket.on('connect', () => {
  //       console.log('✅ Socket connected:', socket.id);
  //       socket.emit('init_address', "0x3E1BD75C255759D4D973117f76E90F492DbE5a9a");
  //     });
      
  //     socket.on('all_entries', (data) => {
  //       console.log('📦 Initial entries:', data);
  //     });
      
  //     socket.on('new_entries', (data) => {
  //       console.log('🆕 New entries received:', data);
  //     });
      
  //   }
  //   else{

  //     return () => {
  //       socket.disconnect();
  //     }
  //   };
  // }, [address,isConnected]);




  
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
