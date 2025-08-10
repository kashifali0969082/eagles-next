"use client";
import { useState } from "react";
import {
  User,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  XCircle,
  CheckCircle,
  Users,
} from "lucide-react";
import { useTransactionStore } from "@/store/transactionstore";
import { ContractType, TransactionFilter } from './types/types';
// Transaction History Component
export const TransactionHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContractType>("x1-x2");
  const [transactionFilter, setTransactionFilter] = useState<TransactionFilter>("all");

  // Zustand store hooks
  const {
    getTransactions,
    isLoading,
    hasError,
    getError,
    fetchX1X2Transactions,
    fetchX3Transactions,
    clearErrors,
  } = useTransactionStore();

  // Get current tab data from store
  const transactions = getTransactions(activeTab);
  const loading = isLoading(activeTab);
  const error = getError(activeTab);

  const getFilteredTransactions = () => {
    if (transactionFilter === "all") return transactions;
    return transactions.filter((tx) => tx.status === transactionFilter);
  };

  const handleRetry = () => {
    clearErrors(activeTab);
    if (activeTab === "x3") {
      fetchX3Transactions();
    } else {
      fetchX1X2Transactions();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "upgrade":
        return <ArrowUpRight className="w-4 h-4 text-blue-400" />;
      case "reward":
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case "registration":
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case "referral":
        return <Users className="w-4 h-4 text-purple-400" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl font-bold text-white mb-4 sm:mb-0">
          Transaction History
        </h3>
        {loading && (
          <div className="flex items-center space-x-2 text-yellow-400">
            <Clock className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        )}
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

      {/* Contract Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("x1-x2")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === "x1-x2"
              ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
              : "text-gray-300 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span
              className={activeTab === "x1-x2" ? "text-white" : "text-teal-300"}
            >
              X1
            </span>
            <span>/</span>
            <span
              className={
                activeTab === "x1-x2" ? "text-white" : "text-emerald-300"
              }
            >
              X2
            </span>
            <span>Contract</span>
          </span>
        </button>
        <button
          onClick={() => setActiveTab("x3")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === "x3"
              ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg"
              : "text-gray-300 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span
              className={activeTab === "x3" ? "text-white" : "text-purple-300"}
            >
              X3
            </span>
            <span>Contract</span>
          </span>
        </button>
      </div>

   

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
                Amount
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Status
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Time
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                User ID
              </th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTransactions().map((tx:any) => (
              <tr
                key={tx.id}
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(tx.type)}
                    <span className="text-white text-sm capitalize">
                      {tx.type}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`font-semibold ${
                      tx.level === "X1"
                        ? "text-teal-400"
                        : tx.level === "X2"
                        ? "text-emerald-400"
                        : "text-purple-400"
                    }`}
                  >
                    {tx.level}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-white font-mono">${tx.amount}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(tx.status)}
                    <span
                      className={`text-sm capitalize ${
                        tx.status === "completed"
                          ? "text-green-400"
                          : tx.status === "pending"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300 text-sm">{tx.timestamp}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-semibold text-sm">
                      {tx.userId}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {getFilteredTransactions().length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No transactions found for the selected filter.</p>
          </div>
        </div>
      )}
    </div>
  );
};