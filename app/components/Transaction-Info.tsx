import { useState, useEffect } from "react";
import { User, ExternalLink, Clock, Zap, ArrowUpRight, ArrowDownLeft, XCircle, CheckCircle, Users, Download } from "lucide-react";
import { users, X3getTransactionHistory, X3Users } from "@/config/Method";

// Define the transaction type from your data
interface Transaction {
  sender: string;
  amount: bigint;
  timestamp: bigint;
  transactionType: string;
}

// Processed transaction type for display
interface ProcessedTransaction {
  id: string;
  type: string;
  level: string;
  amount: string;
  status: string;
  timestamp: string;
  hash: string;
  from: string;
  to: string;
  userId: string; // Added userId field
}

// Transaction History Component
export const TransactionHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState("x1-x2");
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [transactions, setTransactions] = useState<{
    "x1-x2": ProcessedTransaction[];
    x3: ProcessedTransaction[];
  }>({
    "x1-x2": [],
    x3: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to validate Ethereum address
  const isValidAddress = (address: string): boolean => {
    return !!(address && address !== "0x0000000000000000000000000000000000000000" && address.length === 42 && address.startsWith("0x"));
  };

  // Function to convert BigInt timestamp to readable date
  const formatTimestamp = (timestamp: bigint): string => {
    try {
      const date = new Date(Number(timestamp) * 1000);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}:\d{2})/, '$3-$1-$2 $4');
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Function to convert Wei to readable amount (assuming 8 decimals based on your data)
  const formatAmount = (amount: bigint): string => {
    try {
      // Convert from wei to token amount (assuming 8 decimals)
      const divisor = BigInt(1000000); // 10^8
      const tokenAmount = Number(amount) / Number(divisor);
      return tokenAmount.toFixed(2);
    } catch (error) {
      return "0.00";
    }
  };

  // Function to extract level from transaction type
  const extractLevel = (transactionType: string): string => {
    return "X3"; // Default for Registration
  };

  // Function to determine transaction type category
  const getTransactionTypeCategory = (transactionType: string): string => {
    if (transactionType.includes("Registration")) return "registration";
    if (transactionType.includes("Activation")) return "upgrade";
    return "reward";
  };

  // Fixed getuserid function with proper error handling
  const getuserid = async (add: string): Promise<string> => {
    try {
      let resp = await users(add) as [string, bigint, bigint, bigint, bigint, bigint, bigint];
      return Number(resp[1]).toString();
    } catch (error) {
      console.log("error while getting id for address:", add);
      return "Unknown"; // Return a default value instead of undefined
    }
  };

  // Updated function to process raw transactions with async user ID fetching
  const processTransactions = async (rawTransactions: Transaction[]): Promise<ProcessedTransaction[]> => {
    const filteredTransactions = rawTransactions.filter(
      tx => isValidAddress(tx.sender) && tx.transactionType && tx.transactionType.trim() !== ""
    );

    // Process transactions with async user ID fetching
    const processedTransactions = await Promise.all(
      filteredTransactions.map(async (tx, index) => {
        const userId = await getuserid(tx.sender);
        
        return {
          id: `${tx.sender}-${tx.timestamp}-${index}`,
          type: getTransactionTypeCategory(tx.transactionType),
          level: extractLevel(tx.transactionType),
          amount: formatAmount(tx.amount),
          status: "completed", // All fetched transactions are completed
          timestamp: formatTimestamp(tx.timestamp),
          hash: `${tx.sender.slice(0, 6)}...${tx.sender.slice(-4)}`,
          from: tx.sender,
          to: tx.sender, // Assuming same for now, you can modify based on your needs
          userId: userId // Now properly awaited
        };
      })
    );

    return processedTransactions;
  };

  // Function to fetch X3 transaction data
  const fetchX3Transactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace this with your actual X3getTransactionHistory function call
      const X3Data = await X3getTransactionHistory();
      console.log("X3 Transaction data:", X3Data);
      
      // Process transactions with async user ID fetching
      const processedX3Transactions = await processTransactions(X3Data as Transaction[]);
      
      setTransactions(prev => ({
        ...prev,
        x3: processedX3Transactions
      }));
    } catch (error) {
      console.error("Error while getting X3 transactions:", error);
      setError("Failed to load X3 transactions");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch X1-X2 transaction data (you can implement this similarly)
  const fetchX1X2Transactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace this with your actual X1/X2 transaction history function
      // const X1X2Data = await X1X2getTransactionHistory();
      // const processedX1X2Transactions = await processTransactions(X1X2Data);
      
      // For now, using empty array - replace with actual implementation
      setTransactions(prev => ({
        ...prev,
        "x1-x2": []
      }));
    } catch (error) {
      console.error("Error while getting X1-X2 transactions:", error);
      setError("Failed to load X1-X2 transactions");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when tab changes
  useEffect(() => {
    if (activeTab === "x3") {
      fetchX3Transactions();
    } else {
      fetchX1X2Transactions();
    }
  }, [activeTab]);

  const getFilteredTransactions = () => {
    const currentTransactions = transactions[activeTab as keyof typeof transactions] || [];
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
            onClick={() => activeTab === "x3" ? fetchX3Transactions() : fetchX1X2Transactions()}
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
            <span className={activeTab === "x1-x2" ? "text-white" : "text-teal-300"}>
              X1
            </span>
            <span>/</span>
            <span className={activeTab === "x1-x2" ? "text-white" : "text-emerald-300"}>
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
            <span className={activeTab === "x3" ? "text-white" : "text-purple-300"}>
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
                User ID
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