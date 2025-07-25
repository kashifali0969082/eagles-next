// store/useCounterStore.ts
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface CounterState {
  address: string;
  setAddress: (addr: string) => void;
}

export const useAdressStore = create(
  subscribeWithSelector<CounterState>((set) => ({
    address: "",
    setAddress: (addr) => set({ address: addr }),
  }))
);

interface UserDataState {
  name: string;
  setName: (name: string) => void;
}

export const useUserData = create<UserDataState>((set) => ({
  name: "",
  setName: (name) => set({ name }),
}));
