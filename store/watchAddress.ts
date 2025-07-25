// watchAddress.ts
import axios from "axios";
import { useAdressStore } from "./userCounterStore";
import { ApiUrl } from "@/config/exports";
// ✅ Corrected subscribe
const unsub = useAdressStore.subscribe(
  (state) => state.address,
  (address, prevAddress) => {
    if (address && address !== prevAddress) {
      console.log("Address changed (global watcher):", address);
      profilefun();
    }
  },
  {
    fireImmediately: true, // run on first load if value is non-null
  }
);

const profilefun = async () => {
  const currentAddress = useAdressStore.getState().address;
  try {
    let prof = await axios.get(`${ApiUrl}/user/${currentAddress}`);
    console.log(prof.data.data.name);
  } catch (error) {
    alert("error while getting profile error");
  }
};
export default unsub;
