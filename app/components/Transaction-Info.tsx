import { useState } from "react";
import { User,ExternalLink,Clock,Zap,ArrowUpRight,ArrowDownLeft,XCircle,CheckCircle,Users,Download } from "lucide-react";

// Transaction History Component
export const TransactionHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState("x1-x2");
  const [transactionFilter, setTransactionFilter] = useState("all");

  // Sample transaction data
  const transactions = {
    "x1-x2": [
      {
        id: "1",
        type: "upgrade",
        level: "X2",
        amount: "40.00",
        status: "completed",
        timestamp: "2025-01-25 14:30:25",
        hash: "0xabcd...1234",
        from: "0x742d...7d8a",
        to: "0x1234...5678",
      },
      {
        id: "2",
        type: "reward",
        level: "X1",
        amount: "20.00",
        status: "completed",
        timestamp: "2025-01-25 12:15:10",
        hash: "0xefgh...5678",
        from: "0x5678...9abc",
        to: "0x742d...7d8a",
      },
      {
        id: "3",
        type: "registration",
        level: "X1",
        amount: "5.00",
        status: "pending",
        timestamp: "2025-01-25 10:45:33",
        hash: "0xijkl...9abc",
        from: "0x742d...7d8a",
        to: "0x9abc...def0",
      },
      {
        id: "4",
        type: "referral",
        level: "X1",
        amount: "2.50",
        status: "completed",
        timestamp: "2025-01-24 16:22:18",
        hash: "0xmnop...def0",
        from: "0xdef0...1234",
        to: "0x742d...7d8a",
      },
    ],
    x3: [
      {
        id: "5",
        type: "upgrade",
        level: "X3",
        amount: "80.00",
        status: "failed",
        timestamp: "2025-01-25 09:12:45",
        hash: "0xqrst...5678",
        from: "0x742d...7d8a",
        to: "0x5678...9abc",
      },
      {
        id: "6",
        type: "reward",
        level: "X3",
        amount: "40.00",
        status: "completed",
        timestamp: "2025-01-24 14:55:02",
        hash: "0xuvwx...9abc",
        from: "0x9abc...def0",
        to: "0x742d...7d8a",
      },
    ],
  };

  const getFilteredTransactions = () => {
    const currentTransactions =
      transactions[activeTab as keyof typeof transactions] || [];
    if (transactionFilter === "all") return currentTransactions;
    return currentTransactions.filter((tx) => tx.status === transactionFilter);
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
        <div className="flex items-center space-x-3">
          <select
            value={transactionFilter}
            onChange={(e) => setTransactionFilter(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

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
                Level
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
                Hash
              </th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTransactions().map((tx) => (
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
                    <span className="text-gray-300 font-mono text-sm">
                      {tx.hash}
                    </span>
                    <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {getFilteredTransactions().length === 0 && (
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
