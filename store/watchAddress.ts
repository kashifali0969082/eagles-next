// watchAddress.ts
import axios from "axios";
import {
  dashboardStatsStore,
  useAdressStore,
  useStatsStore,
  useUserId,
  useUserLevels,
} from "./userCounterStore";
import { ApiUrl, usdtdecimals } from "@/config/exports";
import {
  useProfileStore,
  useUplinerStore,
  useX1LevelStore,
  useX2LevelStore,
} from "./userCounterStore";
import {
  get24HourDirects,
  get24HourPayment,
  get24HourTeamCount,
  isLocked,
  lastUserid,
  users,
  X3get24HourDirects,
  X3get24HourPayment,
  X3get24HourTeamCount,
  X3Users,
} from "@/config/Method";
import { getSlotFilled } from "@/config/Method";
interface Level {
  level: number;
  cost: number;
  slots: [number, number]; // [filled, recycled]
  maxUsers: number;
  recycleCount: number;
  name: string;
  locked: boolean;
}
// ✅ Corrected subscribe
const unsub = useAdressStore.subscribe(
  (state) => state.address,
  (address, prevAddress) => {
    if (address && address !== prevAddress) {
      console.log("Address changed (global watcher):", address);
      profilefun();
      UplinerId();
      getEveryLevelData();
      getEveryLevelDataX2();
      getDashStats();
    }
  },
  {
    fireImmediately: true, // run on first load if value is non-null
  }
);

const profilefun = async () => {
  console.log("profile function is running");
  const currentAddress = useAdressStore.getState().address;
const defaultProfile = {
  id: "",
  name: "name",
  profileImage: "",
  description: "description",
  email: "email@example.com",
  walletAddress: "wallet_address",
  socialLinks: {
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
    whatsapp: "",
  },
};
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
      useProfileStore.getState().setProfile(defaultProfile);
  }
};
const UplinerId = async () => {
  const currentAddress = useAdressStore.getState().address;

  console.log("upliner id is ");
  const setUplinerId = useUplinerStore.getState().setUplinerId; // ✅ CORRECT
  const SetUserId = useUserId.getState().setUserId; // ✅ CORRECT
  const setX1 = useUserLevels.getState().setLvlX1;
  const setX2 = useUserLevels.getState().setLvlX2;
  const setX3 = useUserLevels.getState().setLvlX3;
  const setTotalProfit = dashboardStatsStore.getState().setTotalProfit;
  const setTotalpartners = dashboardStatsStore.getState().setpartners;
  const setTotalTeam = dashboardStatsStore.getState().setteam;
  const sethr24Totalpartners = dashboardStatsStore.getState().sethr24partners;
  const sethr24TotalTeam = dashboardStatsStore.getState().sethr24team;

  try {
    let val = (await users(currentAddress)) as [
      string,
      BigInt,
      BigInt,
      BigInt,
      BigInt,
      BigInt,
      BigInt
    ];
    SetUserId(Number(val[1]).toString());
    setX1(Number(val[2]));
    setX2(Number(val[3]));

    let val2 = (await users(val[0])) as [
      string,
      BigInt,
      BigInt,
      BigInt,
      BigInt,
      BigInt,
      BigInt
    ];
    let X3val = (await X3Users(currentAddress)) as [
      string,
      BigInt,
      BigInt,
      BigInt,
      BigInt,
      BigInt
    ];
    setX3(Number(X3val[2]));
    let profit = Number(val[4]) + Number(X3val[3]);
    let partner = Number(val[5]) + Number(X3val[4]);
    let team = Number(val[6]) + Number(X3val[5]);

let par=await get24HourDirects(currentAddress)
let par24=await X3get24HourDirects(currentAddress)
let tea=await get24HourTeamCount(currentAddress)
let X3tea=await X3get24HourTeamCount(currentAddress)
let partner24hr=Number(par)+Number(par24);
let team24hr=Number(tea)+Number(X3tea);


sethr24TotalTeam(team24hr)
sethr24Totalpartners(partner24hr)
    setTotalpartners(partner)
    setTotalTeam(team)

    setTotalProfit(profit);
    console.log("upliner id is ", val2);
    setUplinerId(Number(val2[1]).toString());
  } catch (error) {
    console.log("error while getting users data", error);
  }
};
const setLevels = useX1LevelStore.getState().setLevels; // ✅ FIXED
const levels = useX1LevelStore.getState().levels;

const getEveryLevelData = async () => {
  const currentAddress = useAdressStore.getState().address;

  try {
    const updatedLevels: Level[] = await Promise.all(
      levels.map(async (lvl): Promise<Level> => {
        try {
          console.log("response", currentAddress);
          const response = (await getSlotFilled(
            currentAddress,
            "1",
            lvl.level.toString()
          )) as [bigint, bigint];
          console.log("response", response);
          const boolres = (await isLocked(
            currentAddress,
            "1",
            lvl.level.toString()
          )) as boolean;
          console.log("kas", boolres);

          return {
            ...lvl,
            slots: [Number(response[0]), lvl.slots[1]] as [number, number], // 👈 fix here
            recycleCount: Number(response[1]),
            maxUsers: Number(response[0]) + Number(response[1]) * 4,
            locked: boolres,
          };
        } catch (err) {
          console.error(`Error fetching level ${lvl.level}:`, err);
          return lvl;
        }
      })
    );

    setLevels(updatedLevels);
  } catch (error) {
    console.log("Error while getting slots:", error);
  }
};
const setLevelsX2 = useX2LevelStore.getState().setLevels; // ✅ FIXED
const levelsX2 = useX2LevelStore.getState().levels;

const getEveryLevelDataX2 = async () => {
  const currentAddress = useAdressStore.getState().address;

  try {
    const updatedLevels: Level[] = await Promise.all(
      levelsX2.map(async (lvl): Promise<Level> => {
        try {
          console.log("response", currentAddress);
          const response = (await getSlotFilled(
            currentAddress,
            "2",
            lvl.level.toString()
          )) as [bigint, bigint];
          console.log("response", response);
          const boolres = (await isLocked(
            currentAddress,
            "2",
            lvl.level.toString()
          )) as boolean;
          console.log("kas", boolres);

          return {
            ...lvl,
            slots: [Number(response[0]), lvl.slots[1]] as [number, number], // 👈 fix here
            recycleCount: Number(response[1]),
            maxUsers: Number(response[0]) + Number(response[1]) * 4,
            locked: boolres,
          };
        } catch (err) {
          console.error(`Error fetching level ${lvl.level}:`, err);
          return lvl;
        }
      })
    );

    setLevelsX2(updatedLevels);
  } catch (error) {
    console.log("Error while getting slots:", error);
  }
};

const getDashStats = async () => {
  const currentAddress = useAdressStore.getState().address;
  const sethr24ProfitProfit =
    dashboardStatsStore.getState().sethr24ProfitProfit;
  try {
    let val = await get24HourPayment(currentAddress);
    let valX3 = await X3get24HourPayment(currentAddress);
    let final = Number(val) + Number(valX3);
    console.log("zzz", final / usdtdecimals);

    sethr24ProfitProfit(final / usdtdecimals);
  } catch (error) {
    console.log("error while getting stats", error);
  }
};

export default unsub;
