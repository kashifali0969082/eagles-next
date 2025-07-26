// watchAddress.ts
import axios from "axios";
import { useAdressStore } from "./userCounterStore";
import { ApiUrl } from "@/config/exports";
import { useProfileStore } from "./userCounterStore";
// ✅ Corrected subscribe
const unsub = useAdressStore.subscribe(
  (state) => state.address,
  (address, prevAddress) => {
    if (address && address !== prevAddress ) {
      console.log("Address changed (global watcher):", address);
      profilefun();
    }
  },
  {
    fireImmediately: true, // run on first load if value is non-null
  }
);

const profilefun = async () => {
  console.log("profile function is running");
  const currentAddress = useAdressStore.getState().address;

  try {
    const response = await axios.get(`${ApiUrl}/user/profile/${currentAddress}`);
    const profileData = response.data?.data;

    if (profileData) {
      useProfileStore.getState().setProfile(profileData);
      console.log("✅ Profile updated:", profileData);
    } else {
      console.warn("⚠️ No profile data found in response.");
    }
  } catch (error) {
    console.error("❌ Error while getting profile:", error);
  }
};

export default unsub;
