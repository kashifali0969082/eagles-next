// store/distributionStore.ts
import { create } from 'zustand';
import axios from 'axios';
import { ApiUrl } from '@/config/exports';

// Types for the distribution data
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

// Interface for storing address to ID mappings
export interface AddressIdMapping {
  [address: string]: string;
}

export interface DistributionState {
  // Data
  transactions: DistributionTransaction[];
  addressIds: AddressIdMapping;
  
  // Loading states
  isLoading: boolean;
  isLoadingIds: Set<string>;
  
  // Error states
  error: string | null;
  
  // Actions
  setTransactions: (transactions: DistributionTransaction[]) => void;
  setAddressIds: (addressIds: AddressIdMapping) => void;
  updateAddressId: (address: string, id: string) => void;
  setLoading: (loading: boolean) => void;
  setLoadingIds: (loadingIds: Set<string>) => void;
  addLoadingId: (address: string) => void;
  removeLoadingId: (address: string) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // API Actions
  fetchDistributionData: () => Promise<void>;
  fetchUserIds: (addresses: string[]) => Promise<void>;
  
  // Utility Actions
  getUniqueAddresses: () => string[];
  getUserIdDisplay: (address: string) => string;
  reset: () => void;
}

// Your getuserid function - import this from your utils
export const getuserid = async (add: string): Promise<string> => {
  try {
    // Import your users function here and uncomment below
    // let resp = (await users(add)) as [string, bigint, bigint, bigint, bigint, bigint, bigint];
    // return Number(resp[1]).toString();
    
    // Temporary mock - replace with your actual implementation
    console.log("Getting ID for address:", add);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response - replace with actual implementation
    return `ID_${add.slice(-4)}`;
  } catch (error) {
    console.log("error while getting id for address:", add);
    return "Unknown";
  }
};

// Function to convert address to a shorter display format (fallback)
const addressToId = (address: string): string => {
  if (!address) return "N/A";
  // Take first 6 characters after 0x and last 4 characters
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const useDistributionStore = create<DistributionState>((set, get) => ({
  // Initial state
  transactions: [],
  addressIds: {},
  isLoading: false,
  isLoadingIds: new Set(),
  error: null,

  // Basic setters
  setTransactions: (transactions) => set({ transactions }),
  setAddressIds: (addressIds) => set({ addressIds }),
  updateAddressId: (address, id) => 
    set((state) => ({
      addressIds: { ...state.addressIds, [address]: id }
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingIds: (isLoadingIds) => set({ isLoadingIds }),
  addLoadingId: (address) => 
    set((state) => ({
      isLoadingIds: new Set([...state.isLoadingIds, address])
    })),
  removeLoadingId: (address) => 
    set((state) => {
      const newSet = new Set(state.isLoadingIds);
      newSet.delete(address);
      return { isLoadingIds: newSet };
    }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // API Actions
  fetchDistributionData: async () => {
    const { setLoading, setError, setTransactions, fetchUserIds, getUniqueAddresses } = get();
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${ApiUrl}/transaction-distribution`);
      console.log("Distribution data:", response.data);
      
      // Assuming the data is in response.data or response.data.data
      const distributionData = Array.isArray(response.data) 
        ? response.data 
        : response.data.data || [];
        
      setTransactions(distributionData);
      
      // Fetch user IDs for all unique addresses
      const uniqueAddresses = getUniqueAddresses();
      if (uniqueAddresses.length > 0) {
        await fetchUserIds(uniqueAddresses);
      }
      
    } catch (error) {
      console.error("Error while getting distribution entries", error);
      setError("Failed to load distribution data. Please try again.");
    } finally {
      setLoading(false);
    }
  },

  fetchUserIds: async (addresses) => {
    const { addressIds, updateAddressId, addLoadingId, removeLoadingId } = get();
    
    // Filter out addresses we already have
    const addressesToFetch = addresses.filter(addr => !addressIds[addr]);
    
    if (addressesToFetch.length === 0) return;

    // Add all addresses to loading state
    addressesToFetch.forEach(addr => addLoadingId(addr));

    try {
      // Fetch IDs in parallel with individual error handling
      const idPromises = addressesToFetch.map(async (address) => {
        try {
          const id = await getuserid(address);
          return { address, id, success: true };
        } catch (error) {
          console.error(`Failed to fetch ID for ${address}:`, error);
          return { address, id: "Error", success: false };
        }
      });

      const results = await Promise.allSettled(idPromises);
      
      // Update store with results
      results.forEach((result, index) => {
        const address = addressesToFetch[index];
        if (result.status === 'fulfilled') {
          updateAddressId(address, result.value.id);
        } else {
          updateAddressId(address, "Error");
        }
        removeLoadingId(address);
      });

    } catch (error) {
      console.error("Error fetching user IDs:", error);
      // Remove all loading states
      addressesToFetch.forEach(addr => removeLoadingId(addr));
    }
  },

  // Utility functions
  getUniqueAddresses: () => {
    const { transactions } = get();
    const addresses = new Set<string>();
    transactions.forEach(tx => {
      addresses.add(tx.from);
      addresses.add(tx.to);
    });
    return Array.from(addresses);
  },

  getUserIdDisplay: (address) => {
    const { addressIds, isLoadingIds } = get();
    if (isLoadingIds.has(address)) return "Loading...";
    return addressIds[address] || addressToId(address);
  },

  reset: () => set({
    transactions: [],
    addressIds: {},
    isLoading: false,
    isLoadingIds: new Set(),
    error: null,
  }),
}));