// Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { YourApp } from "./custombtn";
import { useAccount } from "wagmi";
import { useRouter, usePathname } from "next/navigation";
import { useSocket } from "./hooks/useSocket";
import { useEntriesStore } from "@/store/notification";
export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnected: wagmiConnected } = useAccount();
  const { isConnected: socketConnected, getSocket, connect } = useSocket();
  const { entries, setAll, addNew } = useEntriesStore();

  // Ensure we’re connected once the header mounts
  useEffect(() => {
    connect();
  }, [connect]);

  // Emit init once we have both wallet + socket
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onAll = (data: any[]) => {
      console.log("📦 all_entries:", data);
      setAll(data);
    };

    const onNew = (data: any[]) => {
      console.log("🆕 new_entries:", data);
      addNew(data);
    };

    // Attach listeners once
    socket.on("all_entries", onAll);
    socket.on("new_entries", onNew);

    // If address becomes available and socket is up, init
    if (socketConnected && address) {
      console.log("🚀 emitting init_address", address);
      socket.emit("init_address", address);
    }

    // Clean up
    return () => {
      socket.off("all_entries", onAll);
      socket.off("new_entries", onNew);
    };
  }, [socketConnected, address, getSocket]);

  // (Your existing route guard)
  useEffect(() => {
    // ...your redirect logic here...
  }, [address, pathname, router]);
  console.log("taste", entries);

  return (
    <header className="relative z-50 bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-lg border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
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
