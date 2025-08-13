import { users } from "@/config/Method";
import {
  Transaction,
  ProcessedTransaction,
  TransactionTypeCategory,
} from "./types";
import { usdtdecimals } from "@/config/exports";

// Function to validate Ethereum address
export const isValidAddress = (address: string): boolean => {
  return !!(
    address &&
    address !== "0x0000000000000000000000000000000000000000" &&
    address.length === 42 &&
    address.startsWith("0x")
  );
};

// Function to convert BigInt timestamp to readable date
export const formatTimestamp = (timestamp: bigint): string => {
  try {
    const date = new Date(Number(timestamp) * 1000);
    return date
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}:\d{2})/, "$3-$1-$2 $4");
  } catch (error) {
    return "Invalid Date";
  }
};

// Function to convert Wei to readable amount (assuming 6 decimals based on your data: 5000000)
export const formatAmount = (amount: bigint): string => {
  try {
    // Convert from wei to token amount (assuming 6 decimals based on 5000000)
    const divisor = BigInt(usdtdecimals); // 10^6
    const tokenAmount = Number(amount) / Number(divisor);
    return tokenAmount.toFixed(2);
  } catch (error) {
    return "0.00";
  }
};

// Function to extract level from transaction level field
export const extractLevel = (
  level: bigint | undefined,
  transactionType: string,
  contractType?: string
): string => {
  // If we know this is from X3 contract, always return X3
  if (contractType === "x3") {
    return "X3";
  }

  if (transactionType.includes("Registration")) return "X1/X2"; // Default registration to X1

  // For X1/X2 contracts, first try to extract level from transaction type description
  if (transactionType) {
    const levelMatch = transactionType.match(/Level\s*(\d+)/i);
    if (levelMatch) {
      const levelNum = parseInt(levelMatch[1]);
      if (levelNum === 1 && transactionType.includes("Registration"))
        return "X1/X2";
      if (levelNum === 2 && transactionType.includes("Registration"))
        return "X1/X2";
      if (levelNum === 1) return "X1/X2";
      if (levelNum === 2) return "X2/X2";
    }
  }

  // Fallback to using the level field if it exists and is valid
  if (level !== undefined && level !== null && !isNaN(Number(level))) {
    const levelNum = Number(level);
    if (levelNum === 1) return "X1/X2";
    if (levelNum === 2) return "X1/X2";
  }

  // Check if transaction type mentions X3 directly
  if (
    transactionType.includes("X3") ||
    transactionType.toLowerCase().includes("x3")
  ) {
    return "X3";
  }

  return "Unknown"; // Final fallback
};

// Function to determine transaction type category
export const getTransactionTypeCategory = (
  transactionType: string
): TransactionTypeCategory => {
  if (transactionType.includes("Registration")) return "registration";
  if (transactionType.includes("Activation")) return "upgrade";
  if (transactionType.includes("Reward") || transactionType.includes("Payout"))
    return "reward";
  return "transaction";
};

// Fixed getuserid function with proper error handling
export const getuserid = async (add: string): Promise<string> => {
  try {
    let resp = (await users(add)) as [
      string,
      bigint,
      bigint,
      bigint,
      bigint,
      bigint,
      bigint
    ];
    return Number(resp[1]).toString();
  } catch (error) {
    console.log("error while getting id for address:", add);
    return "Unknown";
  }
};

// Function to convert raw contract data to Transaction format
export const parseRawContractData = (rawData: any[]): Transaction[] => {
  console.log("Parsing raw data:", rawData);

  return rawData
    .filter((item) => {
      // Handle different possible data formats
      let address, amount, timestamp, transactionType, level;

      if (Array.isArray(item)) {
        // Array format: [address, amount, level, timestamp, transactionType]
        address = item[0];
        amount = item[1];
        level = item[2];
        timestamp = item[3];
        transactionType = item[4];
      } else if (typeof item === "object" && item !== null) {
        // Object format: {0: address, 1: amount, 2: level, 3: timestamp, 4: transactionType}
        address = item[0] || item.sender;
        amount = item[1] || item.amount;
        level = item[2] || item.level;
        timestamp = item[3] || item.timestamp;
        transactionType = item[4] || item.transactionType;
      }

      console.log("Filtering item:", {
        address,
        amount,
        level,
        timestamp,
        transactionType,
      });

      return (
        isValidAddress(address) &&
        Number(amount || 0) > 0 &&
        Number(timestamp || 0) > 0 &&
        transactionType &&
        transactionType.trim() !== ""
      );
    })
    .map((item) => {
      // Handle different possible data formats for mapping
      let address, amount, level, timestamp, transactionType;

      if (Array.isArray(item)) {
        address = item[0];
        amount = item[1];
        level = item[2];
        timestamp = item[3];
        transactionType = item[4];
      } else if (typeof item === "object" && item !== null) {
        address = item[0] || item.sender;
        amount = item[1] || item.amount;
        level = item[2] || item.level;
        timestamp = item[3] || item.timestamp;
        transactionType = item[4] || item.transactionType;
      }

      const parsedTransaction = {
        sender: address,
        amount: BigInt(amount || 0),
        level: BigInt(level || 1),
        timestamp: BigInt(timestamp || 0),
        transactionType: transactionType || "",
      };

      console.log("Mapped transaction:", parsedTransaction);
      return parsedTransaction;
    });
};

// Updated function to process raw transactions with async user ID fetching
export const processTransactions = async (
  rawTransactions: Transaction[],
  contractType?: string
): Promise<ProcessedTransaction[]> => {
  const filteredTransactions = rawTransactions.filter(
    (tx) =>
      isValidAddress(tx.sender) &&
      tx.transactionType &&
      tx.transactionType.trim() !== ""
  );

  // Process transactions with async user ID fetching
  const processedTransactions = await Promise.all(
    filteredTransactions.map(async (tx, index) => {
      const userId = await getuserid(tx.sender);

      return {
        id: `${tx.sender}-${tx.timestamp}-${index}`,
        type: getTransactionTypeCategory(tx.transactionType),
        level: extractLevel(tx.level, tx.transactionType, contractType),
        amount: formatAmount(tx.amount),
        status: "completed", // All fetched transactions are completed
        timestamp: formatTimestamp(tx.timestamp),
        hash: `${tx.sender.slice(0, 6)}...${tx.sender.slice(-4)}`,
        from: tx.sender,
        to: tx.sender, // Assuming same for now, you can modify based on your needs
        userId: userId,
      };
    })
  );

  return processedTransactions;
};
