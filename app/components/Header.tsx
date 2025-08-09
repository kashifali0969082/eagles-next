import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { YourApp } from "./custombtn";
import { useAccount } from "wagmi";
import {
  useUplinerStore,
  useAdressStore,
  useStatsStore,
  dashboardStatsStore,
} from "@/store/userCounterStore";
import { useRouter, usePathname } from "next/navigation";
import { current } from "@reduxjs/toolkit";
import { lastUserid, X3getTransactionHistory } from "@/config/Method";
import { useTransactionStore } from "@/store/transactionstore";

// import { io, Socket } from "socket.io-client";
// import { useSocket } from "./hooks/useSocket";
interface Notification {
  from: string;
  to: string;
  amount: number;
  createdAt: string;
}

export const Header: React.FC = () => {
  const { address, isConnected } = useAccount();
  const pathname = usePathname(); // Get current route
  const currentAddress = useAdressStore.getState().address;
  const { effect } = dashboardStatsStore();
  // const { connect, disconnect, getSocket } = useSocket()
  // const socket = io('http://localhost:5000');
  const router = useRouter();

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
  useEffect(() => {
    console.log("use effect chala", currentAddress, address);
    if (
      currentAddress !== address &&
      pathname !== "/" &&
      !pathname.startsWith("/IdSearch")
    ) {
      router.push("/login");
    }
  }, [address, pathname]);
  const DashboardStats = async () => {
    try {
      const SetUserId = useStatsStore.getState().setTotalUsers;

      let totalMembers = (await lastUserid()) as bigint;
      console.log("total mem", totalMembers);

      SetUserId(Number(totalMembers));
    } catch (error) {
      console.log("error while getting stats", error);
    }
  };

  useEffect(() => {
    DashboardStats();
  }, []);

  //x3 transactions

  const { fetchAllTransactions, isLoading, shouldRefetch } =
    useTransactionStore();

  // Fetch transactions when component mounts or when cache expires
  useEffect(() => {
    const fetchData = async () => {
      const shouldRefetchX1X2 = shouldRefetch("x1-x2");
      const shouldRefetchX3 = shouldRefetch("x3");

      // Force refetch if effect changed OR cache expired
      if (shouldRefetchX1X2 || shouldRefetchX3 || effect) {
        console.log("Fetching transaction data in header...");
        await fetchAllTransactions();
      }
    };

    fetchData();
  }, [fetchAllTransactions, shouldRefetch, effect]);

  return (
    <header className="relative z-50 bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-lg border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => router.push("/")}
            className="flex items-center space-x-2"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
            <h1
              onClick={() => router.push("/")}
              className="text-base sm:text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
            >
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
