"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  TrendingUp,
  Coins,
  RefreshCw,
  UserPlus,
  Edit3,
} from "lucide-react";
import { DistributionFilter } from "../components/types/types";
import {
  getTransactionType,
  getMatrixDisplay,
  formatAmount,
  formatTimestamp,
  getFilteredTransactions,
} from "../components/types/distribution-utils";
import { useDistributionStore } from "@/store/distribution-store";
import { users } from "@/config/Method";
import { useRouter, usePathname } from "next/navigation";

const DistributionTable: React.FC = () => {
  const [filter, setFilter] = useState<DistributionFilter>("all");

  const router = useRouter();
  // Zustand store hooks
  const {
    transactions,
    isLoading,
    error,
    getUserIdDisplay,
    fetchDistributionData,
    clearError,
  } = useDistributionStore();

  // Function to get type icon with proper styling
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <Coins className="w-6 h-6 text-green-400 bg-green-400/20 p-1 rounded-lg" />;
      case "matrix":
        return <TrendingUp className="w-6 h-6 text-purple-400 bg-purple-400/20 p-1 rounded-lg" />;
      case "registration":
        return <UserPlus className="w-6 h-6 text-blue-400 bg-blue-400/20 p-1 rounded-lg" />;
      case "distribution":
        return <Coins className="w-6 h-6 text-yellow-400 bg-yellow-400/20 p-1 rounded-lg" />;
      default:
        return <Zap className="w-6 h-6 text-gray-400 bg-gray-400/20 p-1 rounded-lg" />;
    }
  };

  // Get filtered transactions using utility function
  const filteredTransactions = getFilteredTransactions(transactions, filter);

  // Handle retry
  const handleRetry = () => {
    clearError();
    fetchDistributionData();
  };

  // Fetch data on component mount
  useEffect(() => {
    if (transactions.length === 0) {
      fetchDistributionData();
    }
  }, []);

  const searchfunction = async (address: string) => {
    try {
      let val = (await users(address)) as [
        string,
        BigInt,
        BigInt,
        BigInt,
        BigInt,
        BigInt,
        BigInt
      ];
      console.log("val val val", val);
      router.push(`/IdSearch?id=${Number(val[1])}`);
    } catch (error) {
      console.log("error while searching by address", error);
    }
  };


    const aDDabrar = async (address: string) => {
    try {
      let val = (await users(address)) as [
        string,
        BigInt,
        BigInt,
        BigInt,
        BigInt,
        BigInt,
        BigInt
      ];
      console.log("val val val", val);
      return Number(val[1])
    } catch (error) {
      console.log("error while searching by address", error);
    }
  };

  // Function to get relative time (like "2 minutes ago")
  const getRelativeTime = (timestamp: string) => {
    const now = new Date().getTime();
    const txTime = new Date(timestamp).getTime();
    const diffInMinutes = Math.floor((now - txTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'}`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) === 1 ? '' : 's'}`;
    return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) === 1 ? '' : 's'}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl font-bold text-white mb-4 sm:mb-0">
          P2P Transactions
        </h3>
        <div className="flex items-center space-x-4">
          {isLoading && (
            <div className="flex items-center space-x-2 text-yellow-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-red-300 hover:text-red-100 text-xs underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Transaction Cards */}
      <div className="space-y-3">
        {filteredTransactions.map((tx) => {
          const transactionType = getTransactionType(tx);
          const isNewUser = transactionType === "registration";
          
          return (
            <div
              key={tx._id}
              className="flex items-center justify-between p-4 bg-gray-800/40 border border-gray-700/50 rounded-lg hover:bg-gray-800/60 transition-all duration-200"
            >
              {/* Left side - Icon and content */}
              <div className="flex items-center space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  {getTypeIcon(transactionType)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  {isNewUser ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">new user joined</span>
                      </div>
                      <div 
                        onClick={() => searchfunction(tx.to)}
                        className="text-blue-400 font-semibold cursor-pointer hover:text-blue-300"
                      >
                        ID ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}

                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3 mb-1">
                        <div 
                          onClick={() => searchfunction(tx.to)}
                          className="text-blue-400 font-semibold cursor-pointer hover:text-blue-300"
                        >
                          ID {tx.to.slice(0, 6)}...{tx.to.slice(-4)}

                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-white">
                          + {formatAmount(tx.amount)} USD
                        </span>
                        <span className="text-gray-400">in</span>
                        <span
                          className={`font-semibold ${
                            getMatrixDisplay(tx) === "X1/X2"
                              ? "text-yellow-400"
                              : getMatrixDisplay(tx) === "X1"
                              ? "text-teal-400"
                              : getMatrixDisplay(tx) === "X2"
                              ? "text-emerald-400"
                              : "text-purple-400"
                          }`}
                        >
                          {getMatrixDisplay(tx)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right side - Time and Edit icon */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <span className="text-gray-400 text-sm">
                  {getRelativeTime(tx.createdAt)}
                </span>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-300" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredTransactions.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No distribution transactions found.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributionTable;


















// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   User,
//   Clock,
//   ArrowUpRight,
//   ArrowDownLeft,
//   Zap,
//   TrendingUp,
//   Coins,
//   RefreshCw,
// } from "lucide-react";
// import { DistributionFilter } from "../components/types/types";
// import {
//   getTransactionType,
//   getMatrixDisplay,
//   formatAmount,
//   formatTimestamp,
//   getFilteredTransactions,
// } from "../components/types/distribution-utils";
// import { useDistributionStore } from "@/store/distribution-store";
// import { users } from "@/config/Method";
// import { useRouter, usePathname } from "next/navigation";

// const DistributionTable: React.FC = () => {
//   const [filter, setFilter] = useState<DistributionFilter>("all");

//   const router = useRouter();
//   // Zustand store hooks
//   const {
//     transactions,
//     isLoading,
//     error,
//     getUserIdDisplay,
//     fetchDistributionData,
//     clearError,
//   } = useDistributionStore();

//   // Function to get type icon
//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case "reward":
//         return <Coins className="w-4 h-4 text-green-400" />;
//       case "matrix":
//         return <TrendingUp className="w-4 h-4 text-purple-400" />;
//       case "registration":
//         return <Zap className="w-4 h-4 text-yellow-400" />;
//       case "distribution":
//         return <ArrowDownLeft className="w-4 h-4 text-yellow-400" />;
//       default:
//         return <Zap className="w-4 h-4 text-gray-400" />;
//     }
//   };

//   // Get filtered transactions using utility function
//   const filteredTransactions = getFilteredTransactions(transactions, filter);

//   // Handle retry
//   const handleRetry = () => {
//     clearError();
//     fetchDistributionData();
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     if (transactions.length === 0) {
//       fetchDistributionData();
//     }
//   }, []);
//   const searchfunction = async (address: string) => {
//     try {
//       let val = (await users(address)) as [
//         string,
//         BigInt,
//         BigInt,
//         BigInt,
//         BigInt,
//         BigInt,
//         BigInt
//       ];
//       console.log("val val val", val);
//       router.push(`/IdSearch?id=${Number(val[1])}`);
//     } catch (error) {
//       console.log("error while searching by address", error);
//     }
//   };
//   return (
//     <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//         <h3 className="text-xl font-bold text-white mb-4 sm:mb-0">
//           P2P table
//         </h3>
//         <div className="flex items-center space-x-4">
//           {isLoading && (
//             <div className="flex items-center space-x-2 text-yellow-400">
//               <RefreshCw className="w-4 h-4 animate-spin" />
//               <span className="text-sm">Loading...</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {error && (
//         <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
//           <p className="text-red-400 text-sm">{error}</p>
//           <button
//             onClick={handleRetry}
//             className="mt-2 text-red-300 hover:text-red-100 text-xs underline"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Transaction Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-700">
//               <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
//                 Type
//               </th>
//               <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
//                 Matrix
//               </th>
//               <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
//                 From
//               </th>
//               <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
//                 To
//               </th>
//               <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
//                 Amount
//               </th>
//               <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
//                 Time
//               </th>
//               <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.map((tx) => {
//               const transactionType = getTransactionType(tx);
//               return (
//                 <tr
//                   key={tx._id}
//                   className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
//                 >
//                   <td className="py-4 px-4">
//                     <div className="flex items-center space-x-2">
//                       {getTypeIcon(transactionType)}
//                       <span className="text-white text-sm capitalize">
//                         {transactionType}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span
//                       className={`font-semibold ${
//                         getMatrixDisplay(tx) === "X1/X2"
//                           ? "text-yellow-400"
//                           : getMatrixDisplay(tx) === "X1"
//                           ? "text-teal-400"
//                           : getMatrixDisplay(tx) === "X2"
//                           ? "text-emerald-400"
//                           : "text-purple-400"
//                       }`}
//                     >
//                       {getMatrixDisplay(tx)}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div
//                       onClick={() => searchfunction(tx.from)}
//                       className="flex items-center space-x-2"
//                     >
//                       <User className="w-4 h-4 text-blue-400" />
//                       <span className="text-blue-400 font-semibold text-sm">
//                         {`${tx.from.slice(0, 3)}...${tx.from.slice(-3)}`}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div
//                      onClick={() => searchfunction(tx.to)}
//                     className="flex items-center space-x-2">
//                       <User className="w-4 h-4 text-green-400" />
//                       <span className="text-green-400 font-semibold text-sm">
//                         {`${tx.to.slice(0, 3)}...${tx.to.slice(-3)}`}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className="text-white font-mono">
//                       ${formatAmount(tx.amount)}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className="text-gray-300 text-sm">
//                       {formatTimestamp(tx.createdAt)}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                       <span className="text-green-400 text-sm">Completed</span>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {filteredTransactions.length === 0 && !isLoading && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
//             <p>No distribution transactions found.</p>
//           </div>
//         </div>
//       )}

//       {/* Summary Stats */}
//     </div>
//   );
// };

// export default DistributionTable;
