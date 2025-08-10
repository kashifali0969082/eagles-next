// utils/distributionUtils.ts
import { DistributionTransaction, TransactionType } from './types';

// Function to convert address to a shorter display format (fallback)
export const addressToId = (address: string): string => {
  if (!address) return "N/A";
  // Take first 6 characters after 0x and last 4 characters
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Function to determine transaction type based on data
export const getTransactionType = (tx: DistributionTransaction): TransactionType => {
  if (tx.from === tx.to) return "reward";
  if (tx.matrix) return "matrix";
  if (tx.level) return "registration";
  return "distribution";
};

// Function to get matrix display
export const getMatrixDisplay = (tx: DistributionTransaction): string => {
  const transactionType = getTransactionType(tx);
  
  if (transactionType === "registration") return "X1/X2";
  if (tx.matrix === 1) return "X1";
  if (tx.matrix === 2) return "X2";
  if (!tx.matrix) return "X3";
  
  return "X3";
};

// Function to format amount (assuming it's in wei or smallest unit)
export const formatAmount = (amount: number): string => {
  // Assuming the amount needs to be divided by 1000000 (adjust based on your token decimals)
  return (amount / 1000000).toFixed(2);
};

// Function to format timestamp
export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString();
};

// Function to get filtered transactions
export const getFilteredTransactions = (
  transactions: DistributionTransaction[], 
  filter: "all" | "registration" | "matrix"
): DistributionTransaction[] => {
  switch (filter) {
    case "registration":
      return transactions.filter(tx => tx.level);
    case "matrix":
      return transactions.filter(tx => tx.matrix);
    default:
      return transactions;
  }
};