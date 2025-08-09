import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  getTransactionHistory,
  X3getTransactionHistory,
} from "@/config/Method";
import {
  TransactionState,
  ContractType,
  ProcessedTransaction,
} from '../app/components/types/types';
import {
  parseRawContractData,
  processTransactions,
} from '../app/components/types/utils';

interface TransactionActions {
  fetchX1X2Transactions: () => Promise<void>;
  fetchX3Transactions: () => Promise<void>;
  fetchAllTransactions: () => Promise<void>;
  clearTransactions: (contractType?: ContractType) => void;
  clearErrors: (contractType?: ContractType) => void;
  getTransactions: (contractType: ContractType) => ProcessedTransaction[];
  isLoading: (contractType?: ContractType) => boolean;
  hasError: (contractType?: ContractType) => boolean;
  getError: (contractType: ContractType) => string | null;
  shouldRefetch: (contractType: ContractType, cacheTimeMs?: number) => boolean;
}

type TransactionStore = TransactionState & TransactionActions;

const CACHE_TIME = 10* 60 * 1000; // 5 minutes

export const useTransactionStore = create<TransactionStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      transactions: {
        "x1-x2": [],
        x3: [],
      },
      loading: {
        "x1-x2": false,
        x3: false,
      },
      error: {
        "x1-x2": null,
        x3: null,
      },
      lastFetched: {
        "x1-x2": null,
        x3: null,
      },

      // Actions
      fetchX1X2Transactions: async () => {
        const state = get();
        if (state.loading["x1-x2"]) return;

        set((state) => ({
          loading: { ...state.loading, "x1-x2": true },
          error: { ...state.error, "x1-x2": null },
        }));

        try {
          // Get raw contract data
          const rawData = (await getTransactionHistory()) as any;
          console.log("Raw X1-X2 Transaction data:", rawData);

          // Parse and convert to Transaction format
          const parsedTransactions = parseRawContractData(rawData as any[]);
          console.log("Parsed X1-X2 Transaction data:", parsedTransactions);

          // Process transactions with async user ID fetching
          const processedTransactions = await processTransactions(
            parsedTransactions,
            "x1-x2"
          );
          console.log("Processed X1-X2 Transaction data:", processedTransactions);

          set((state) => ({
            transactions: {
              ...state.transactions,
              "x1-x2": processedTransactions,
            },
            loading: { ...state.loading, "x1-x2": false },
            lastFetched: { ...state.lastFetched, "x1-x2": Date.now() },
          }));
        } catch (error) {
          console.error("Error while getting X1-X2 transactions:", error);
          set((state) => ({
            loading: { ...state.loading, "x1-x2": false },
            error: { ...state.error, "x1-x2": "Failed to load X1-X2 transactions" },
          }));
        }
      },

      fetchX3Transactions: async () => {
        const state = get();
        if (state.loading.x3) return;

        set((state) => ({
          loading: { ...state.loading, x3: true },
          error: { ...state.error, x3: null },
        }));

        try {
          const X3Data = await X3getTransactionHistory();
          console.log("X3 Transaction data:", X3Data);

          // Process X3 data - X3 doesn't use level field
          const processedX3Data = (X3Data as any[]).map((tx) => ({
            sender: tx.sender,
            amount: tx.amount,
            level: undefined, // X3 doesn't use level field
            timestamp: tx.timestamp,
            transactionType: tx.transactionType || "X3 Transaction",
          }));

          console.log("Processed X3 raw data:", processedX3Data);

          // Process transactions with async user ID fetching
          const processedX3Transactions = await processTransactions(
            processedX3Data,
            "x3"
          );

          set((state) => ({
            transactions: {
              ...state.transactions,
              x3: processedX3Transactions,
            },
            loading: { ...state.loading, x3: false },
            lastFetched: { ...state.lastFetched, x3: Date.now() },
          }));
        } catch (error) {
          console.error("Error while getting X3 transactions:", error);
          set((state) => ({
            loading: { ...state.loading, x3: false },
            error: { ...state.error, x3: "Failed to load X3 transactions" },
          }));
        }
      },

      fetchAllTransactions: async () => {
        const { fetchX1X2Transactions, fetchX3Transactions } = get();
        await Promise.all([
          fetchX1X2Transactions(),
          fetchX3Transactions(),
        ]);
      },

      clearTransactions: (contractType) => {
        if (contractType) {
          set((state) => ({
            transactions: {
              ...state.transactions,
              [contractType]: [],
            },
            lastFetched: {
              ...state.lastFetched,
              [contractType]: null,
            },
          }));
        } else {
          set({
            transactions: {
              "x1-x2": [],
              x3: [],
            },
            lastFetched: {
              "x1-x2": null,
              x3: null,
            },
          });
        }
      },

      clearErrors: (contractType) => {
        if (contractType) {
          set((state) => ({
            error: {
              ...state.error,
              [contractType]: null,
            },
          }));
        } else {
          set({
            error: {
              "x1-x2": null,
              x3: null,
            },
          });
        }
      },

      getTransactions: (contractType) => {
        return get().transactions[contractType] || [];
      },

      isLoading: (contractType) => {
        const state = get();
        if (contractType) {
          return state.loading[contractType];
        }
        return state.loading["x1-x2"] || state.loading.x3;
      },

      hasError: (contractType) => {
        const state = get();
        if (contractType) {
          return !!state.error[contractType];
        }
        return !!state.error["x1-x2"] || !!state.error.x3;
      },

      getError: (contractType) => {
        return get().error[contractType];
      },

      shouldRefetch: (contractType, cacheTimeMs = CACHE_TIME) => {
        const state = get();
        const lastFetched = state.lastFetched[contractType];
        if (!lastFetched) return true;
        return Date.now() - lastFetched > cacheTimeMs;
      },
    }),
    {
      name: 'transaction-storage',
    }
  )
);