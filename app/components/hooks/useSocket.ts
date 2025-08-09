// app/(wherever)/hooks/useSocket.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  all_entries: (data: unknown[]) => void;
  new_entries: (data: unknown[]) => void;
  error: (msg: string) => void;
}

interface ClientToServerEvents {
  init_address: (address: string) => void;
}

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<TypedSocket | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return socketRef.current;

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(SOCKET_URL, {
      // let it negotiate polling->websocket
      withCredentials: true,
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ connect_error:", err.message);
      setIsConnected(false);
    });

    socket.on("error", (msg) => {
      console.error("🧨 server error:", msg);
    });

    socketRef.current = socket;
    return socket;
  }, []);

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setIsConnected(false);
  }, []);

  const getSocket = useCallback(() => socketRef.current, []);

  useEffect(() => {
    // optional: auto-connect on mount
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { isConnected, getSocket, connect, disconnect };
}
