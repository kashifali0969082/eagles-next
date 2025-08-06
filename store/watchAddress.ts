// watchAddress.ts
import axios from "axios";
import { useAdressStore } from "./userCounterStore";
import { ApiUrl } from "@/config/exports";
import { useProfileStore,useUplinerStore } from "./userCounterStore";
import { users } from "@/config/Method";

// ✅ Corrected subscribe
const unsub = useAdressStore.subscribe(
  (state) => state.address,
  (address, prevAddress) => {
    if (address && address !== prevAddress) {
      console.log("Address changed (global watcher):", address);
      profilefun();
      UplinerId();
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
    const response = await axios.get(
      `${ApiUrl}/user/profile/${currentAddress}`
    );
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
const UplinerId = async () => {
  const currentAddress = useAdressStore.getState().address;
  
  console.log("upliner id is ");
  const { setUplinerId } = useUplinerStore();

  try {
    let val = await users(currentAddress) as [string, BigInt,BigInt,BigInt,BigInt,BigInt,BigInt];
    let val2 =await users(val[0]) as [string, BigInt,BigInt,BigInt,BigInt,BigInt,BigInt];
    console.log("upliner id is ", val2);
    setUplinerId(Number(val2[1]).toString())
    
  } catch (error) {
    console.log("error while getting users data", error);
  }
};
export default unsub;
