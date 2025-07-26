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
  description:string;
  profileImage: string;
  socialLinks: SocialLinks;
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
    description:"",
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
