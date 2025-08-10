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
} from "lucide-react";
import  { DistributionFilter } from "../components/types/types";
import {
  getTransactionType,
  getMatrixDisplay,
  formatAmount,
  formatTimestamp,
  getFilteredTransactions,
} from "../components/types/distribution-utils";
import { useDistributionStore } from "@/store/distribution-store";

const DistributionTable: React.FC = () => {
  const [filter, setFilter] = useState<DistributionFilter>("all");

  // Zustand store hooks
  const {
    transactions,
    isLoading,
    error,
    getUserIdDisplay,
    fetchDistributionData,
    clearError,
  } = useDistributionStore();

  // Function to get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <Coins className="w-4 h-4 text-green-400" />;
      case "matrix":
        return <TrendingUp className="w-4 h-4 text-purple-400" />;
      case "registration":
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case "distribution":
        return <ArrowDownLeft className="w-4 h-4 text-yellow-400" />;
      default:
        return <Zap className="w-4 h-4 text-gray-400" />;
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

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl font-bold text-white mb-4 sm:mb-0">
          Distribution Transactions
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

   

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Type
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Matrix
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                From
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                To
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Time
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => {
              const transactionType = getTransactionType(tx);
              return (
                <tr
                  key={tx._id}
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(transactionType)}
                      <span className="text-white text-sm capitalize">
                        {transactionType}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
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
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-semibold text-sm">
                        {getUserIdDisplay(tx.from)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold text-sm">
                        {getUserIdDisplay(tx.to)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-mono">
                      ${formatAmount(tx.amount)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300 text-sm">
                      {formatTimestamp(tx.createdAt)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-sm">
                        Completed
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No distribution transactions found.</p>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {transactions.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Transactions</div>
            <div className="text-white text-xl font-bold">
              {filteredTransactions.length}
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Volume</div>
            <div className="text-white text-xl font-bold">
              ${filteredTransactions
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Average Amount</div>
            <div className="text-white text-xl font-bold">
              ${filteredTransactions.length > 0
                ? (
                    filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0) /
                    filteredTransactions.length
                  ).toLocaleString()
                : 0}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributionTable;