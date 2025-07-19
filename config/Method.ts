import { readContract, writeContract } from "@wagmi/core";
// import { useWatchContractEvent } from "wagmi";
import {
  config,
  ContractAdress,
  ABI,
  USDTTestNetABI,
  USDTContractAdress,
  X3DiamondAddress,
  X3DiamondAbi,
  usdtTestnetAbi,
  USDTTestnetadd,
} from "./config";
import { waitForTransactionReceipt } from "wagmi/actions";
export const getTxn = async (hash:any) => {
  try {
    if (!hash) {
      return null;
    }
    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash,
    });

    return transactionReceipt.status === "success" ? true : false;
  } catch (error) {
    console.error("Error getTxn:", error);
    return null;
  }
};


// ReadMethods
export const isUserExists = async (address:string) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "isUserExists",
    args: [address],
  });
  return result;
};