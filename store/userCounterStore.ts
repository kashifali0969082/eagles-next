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

interface SocialLinks {
  facebook: string;
  youtube: string;
  instagram: string;
  twitter: string;
  whatsapp: string;
}

interface ProfileData {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLinks;
  email: string;
  walletAddress: string;
}

interface ProfileState {
  profile: ProfileData;
  setProfile: (data: ProfileData) => void;
  updateSocialLink: (platform: keyof SocialLinks, url: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    id: "",
    name: "",
    profileImage: "",
    description: "",
    email: "",
    walletAddress: "",
    socialLinks: {
      facebook: "",
      youtube: "",
      instagram: "",
      twitter: "",
      whatsapp: "",
    },
  },
  setProfile: (data) => set({ profile: data }),
  updateSocialLink: (platform, url) =>
    set((state) => ({
      profile: {
        ...state.profile,
        socialLinks: {
          ...state.profile.socialLinks,
          [platform]: url,
        },
      },
    })),
}));

interface ProfileRefresher {
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}

export const Refresherfun = create<ProfileRefresher>((set) => ({
  refresh: false,
  setRefresh: (value) => set({ refresh: value }),
}));

//upliner store
interface UplinerStore {
  uplinerId: string;
  setUplinerId: (id: string) => void;
}

export const useUplinerStore = create<UplinerStore>((set) => ({
  uplinerId: "",
  setUplinerId: (id: string) => set({ uplinerId: id }),
}));

interface userID {
  userIDper: string;
  setUserId: (id: string) => void;
}

export const useUserId = create<userID>((set) => ({
  userIDper: "",
  setUserId: (id: string) => set({ userIDper: id }),
}));

interface UserLevels {
  lvlX1: number;
  lvlX2: number;
  lvlX3: number;
  setLvlX1: (level: number) => void;
  setLvlX2: (level: number) => void;
  setLvlX3: (level: number) => void;
  setAllLevels: (levels: {
    lvlX1?: number;
    lvlX2?: number;
    lvlX3?: number;
  }) => void;
}

export const useUserLevels = create<UserLevels>((set) => ({
  lvlX1: 0,
  lvlX2: 0,
  lvlX3: 0,
  setLvlX1: (level) => set({ lvlX1: level }),
  setLvlX2: (level) => set({ lvlX2: level }),
  setLvlX3: (level) => set({ lvlX3: level }),
  setAllLevels: (levels) =>
    set((state) => ({
      lvlX1: levels.lvlX1 ?? state.lvlX1,
      lvlX2: levels.lvlX2 ?? state.lvlX2,
      lvlX3: levels.lvlX3 ?? state.lvlX3,
    })),
}));

// X1
// ✅ zustand/levelStore.ts
export type Level = {
  level: number;
  cost: number;
  slots: [number, number];
  maxUsers: number;
  recycleCount: number;
  name: string;
  locked: boolean;
};
type LevelStore = {
  levels: LevelX2[];
  setLevels: (levels: LevelX2[]) => void;
  updateLevel: (index: number, partial: Partial<LevelX2>) => void;
  // NEW: unlock up to a specific level (1-based level number)
  unlockLevelsUpTo: (levelNumber: number) => void;
  // NEW: unlock all levels
  unlockAll: () => void;
};

export const useX1LevelStore = create<LevelStore>((set) => ({
  levels: [
    {
      level: 1,
      cost: 2.5,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Bronze",
      locked: false,
    },
    {
      level: 2,
      cost: 5,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Silver",
      locked: false,
    },
    {
      level: 3,
      cost: 10,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Gold",
      locked: false,
    },
    {
      level: 4,
      cost: 20,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Platinum",
      locked: false,
    },
    {
      level: 5,
      cost: 40,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Emerald",
      locked: false,
    },
    {
      level: 6,
      cost: 80,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Sapphire",
      locked: false,
    },
    {
      level: 7,
      cost: 160,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Ruby",
      locked: false,
    },
    {
      level: 8,
      cost: 320,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Diamond",
      locked: false,
    },
    {
      level: 9,
      cost: 640,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Master",
      locked: false,
    },
    {
      level: 10,
      cost: 1250,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Grandmaster",
      locked: false,
    },
    {
      level: 11,
      cost: 2500,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Legendary",
      locked: false,
    },
    {
      level: 12,
      cost: 5000,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Mythic",
      locked: false,
    },
  ],
  setLevels: (levels) => set({ levels }),
  updateLevel: (index, partial) =>
    set((state) => ({
      levels: state.levels.map((lvl, i) =>
        i === index ? { ...lvl, ...partial } : lvl
      ),
    })),

  // unlock every level whose level number is <= levelNumber
  unlockLevelsUpTo: (levelNumber: number) =>
    set((state) => ({
      levels: state.levels.map((lvl) =>
        lvl.level <= levelNumber ? { ...lvl, locked: false } : lvl
      ),
    })),

  // unlock all levels
  unlockAll: () =>
    set((state) => ({
      levels: state.levels.map((lvl) => ({ ...lvl, locked: false })),
    })),
}));

type LevelX2 = {
  level: number;
  cost: number;
  slots: [number, number];
  maxUsers: number;
  recycleCount: number;
  name: string;
  locked: boolean;
};

type LevelStoreX2 = {
  levels: LevelX2[];
  setLevels: (levels: LevelX2[]) => void;
  updateLevel: (index: number, partial: Partial<LevelX2>) => void;
  // NEW: unlock up to a specific level (1-based level number)
  unlockLevelsUpTo: (levelNumber: number) => void;
  // NEW: unlock all levels
  unlockAll: () => void;
};

export const useX2LevelStore = create<LevelStoreX2>((set, get) => ({
  levels: [
    {
      level: 1,
      cost: 2.5,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Bronze",
      locked: false,
    },
    {
      level: 2,
      cost: 5,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Silver",
      locked: false,
    },
    {
      level: 3,
      cost: 10,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Gold",
      locked: false,
    },
    {
      level: 4,
      cost: 20,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Platinum",
      locked: false,
    },
    {
      level: 5,
      cost: 40,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Emerald",
      locked: false,
    },
    {
      level: 6,
      cost: 80,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Sapphire",
      locked: false,
    },
    {
      level: 7,
      cost: 160,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Ruby",
      locked: false,
    },
    {
      level: 8,
      cost: 320,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Diamond",
      locked: false,
    },
    {
      level: 9,
      cost: 640,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Master",
      locked: false,
    },
    {
      level: 10,
      cost: 1250,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Grandmaster",
      locked: false,
    },
    {
      level: 11,
      cost: 2500,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Legendary",
      locked: false,
    },
    {
      level: 12,
      cost: 5000,
      slots: [0, 0],
      maxUsers: 0,
      recycleCount: 0,
      name: "Mythic",
      locked: false,
    },
  ],
  setLevels: (levels) => set({ levels }),
  updateLevel: (index, partial) =>
    set((state) => ({
      levels: state.levels.map((lvl, i) =>
        i === index ? { ...lvl, ...partial } : lvl
      ),
    })),

  // unlock every level whose level number is <= levelNumber
  unlockLevelsUpTo: (levelNumber: number) =>
    set((state) => ({
      levels: state.levels.map((lvl) =>
        lvl.level <= levelNumber ? { ...lvl, locked: false } : lvl
      ),
    })),

  // unlock all levels
  unlockAll: () =>
    set((state) => ({
      levels: state.levels.map((lvl) => ({ ...lvl, locked: false })),
    })),
}));

interface UserState {
  totalUsers: number;
  setTotalUsers: (count: number) => void;
}

export const useStatsStore = create<UserState>((set) => ({
  totalUsers: 0, // initial value
  setTotalUsers: (count) => set({ totalUsers: count }),
}));

interface StatsState {
  totalProfit: number;
  setTotalProfit: (profit: number) => void;
  hr24Profit: number;
  sethr24ProfitProfit: (profit: number) => void;
  partners: number;
  setpartners: (profit: number) => void;
  hr24partners: number;
  sethr24partners: (profit: number) => void;
  team: number;
  setteam: (profit: number) => void;
  hr24team: number;
  sethr24team: (profit: number) => void;
  effect: boolean;
  seteffect: (profit: boolean) => void;
}

export const dashboardStatsStore = create<StatsState>((set) => ({
  totalProfit: 0,
  setTotalProfit: (profit) => set({ totalProfit: profit }),
  hr24Profit: 0,
  sethr24ProfitProfit: (profit) => set({ hr24Profit: profit }),
  partners: 0,
  setpartners: (profit) => set({ partners: profit }),
  hr24partners: 0,
  sethr24partners: (profit) => set({ hr24partners: profit }),
  team: 0,
  setteam: (profit) => set({ team: profit }),
  hr24team: 0,
  sethr24team: (profit) => set({ hr24team: profit }),
  effect: false,
  seteffect: (profit) => set({ effect: profit }),
}));
