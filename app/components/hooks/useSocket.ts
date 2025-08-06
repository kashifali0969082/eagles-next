// "use client"

// import { useCallback, useEffect, useRef, useState } from "react"
// import { io, Socket } from "socket.io-client"

// interface ServerToClientEvents {
//   connect: () => void
//   disconnect: (reason: string) => void
//   connect_error: (error: Error) => void
//   error: (errorMsg: string) => void
//   // Add other custom events here if needed
// }

// interface ClientToServerEvents {
//   // Add client-to-server event signatures if needed
// }

// type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>

// export function useSocket() {
//   const [isConnected, setIsConnected] = useState<boolean>(false)
//   const socketRef = useRef<TypedSocket | null>(null)

//   const connect = useCallback(() => {
//     if (socketRef.current) {
//       socketRef.current.disconnect()
//     }

//     console.log("Initializing socket connection...")

//     socketRef.current = io("http://localhost:5000", {
//       transports: ["websocket"],
//       // auth: { token },
//     })

//     socketRef.current.on("connect", () => {
//       console.log("✅ Socket connected:", socketRef.current?.id)
//       setIsConnected(true)
//     })

//     socketRef.current.on("disconnect", (reason) => {
//       console.log("❌ Socket disconnected:", reason)
//       setIsConnected(false)
//     })

//     socketRef.current.on("connect_error", (error) => {
//       console.error("Connection error:", error.message)
//       setIsConnected(false)
//     })

//     socketRef.current.on("error", (errorMsg: string) => {
//       console.error("Socket error:", errorMsg)
//     })

//     return socketRef.current
//   }, [])

//   const disconnect = useCallback(() => {
//     if (socketRef.current) {
//       socketRef.current.disconnect()
//       setIsConnected(false)
//       socketRef.current = null
//     }
//   }, [])

//   const getSocket = useCallback((): TypedSocket | null => {
//     return socketRef.current
//   }, [])

//   useEffect(() => {
//     return () => {
//       if (socketRef.current) {
//         console.log("Cleaning up socket connection")
//         socketRef.current.disconnect()
//       }
//     }
//   }, [])

//   return {
//     getSocket,
//     isConnected,
//     connect,
//     disconnect,
//   }
// }
