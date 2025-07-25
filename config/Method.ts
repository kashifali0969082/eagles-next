import { readContract, writeContract } from "@wagmi/core";
// import { useWatchContractEvent } from "wagmi";
import {
  config,
} from "./config";
import { ContractAdress,ABI,USDTContractAdress,USDTTestNetABI } from "./exports";
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

export const getIdToAddress = async (id :string) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "idToAddress",
    args: [id],
  });
  return result;
};

export const USDTapprove = async (amount:string) => {
  const result = await writeContract(config, {
    abi: USDTTestNetABI,
    address: USDTContractAdress,
    functionName: "approve",
    args: [ContractAdress, amount],
  });
  return result;
};

export const register = async (address:string) => {
  const result = await writeContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "register",
    args: [address],
  });
  return result;
};