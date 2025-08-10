// Define the raw contract transaction structure based on your data
export interface RawContractTransaction {
  0: string; // sender address
  1: bigint; // amount
  2: bigint; // level (1 for X1, 2 for X2)
  3: bigint; // timestamp
  4: string; // transaction type description
}

// Define the transaction type from your data
export interface Transaction {
  sender: string;
  amount: bigint;
  level?: bigint; // Made optional since X3 might not have this field
  timestamp: bigint;
  transactionType: string;
}

// Processed transaction type for display
export interface ProcessedTransaction {
  id: string;
  type: string;
  level: string;
  amount: string;
  status: string;
  timestamp: string;
  hash: string;
  from: string;
  to: string;
  userId: string;
}

// Store state types
export interface TransactionState {
  transactions: {
    "x1-x2": ProcessedTransaction[];
    x3: ProcessedTransaction[];
  };
  loading: {
    "x1-x2": boolean;
    x3: boolean;
  };
  error: {
    "x1-x2": string | null;
    x3: string | null;
  };
  lastFetched: {
    "x1-x2": number | null;
    x3: number | null;
  };
}

export type ContractType = "x1-x2" | "x3";
export type TransactionFilter = "all" | "completed" | "pending" | "failed";
export type TransactionTypeCategory = "registration" | "upgrade" | "reward" | "transaction" | "referral";




// types/distributionTypes.ts

export interface DistributionTransaction {
  _id: string;
  from: string;
  to: string;
  amount: number;
  level?: number;
  matrix?: number;
  createdAt: string;
  updatedAt: string;
  seen: boolean;
  __v: number;
}

export interface AddressIdMapping {
  [address: string]: string;
}

export type DistributionFilter = "all" | "registration" | "matrix";

export type TransactionType = "reward" | "matrix" | "registration" | "distribution";