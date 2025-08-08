import { readContract, writeContract } from "@wagmi/core";
// import { useWatchContractEvent } from "wagmi";
import { config } from "./config";
import {
  ContractAdress,
  ABI,
  USDTContractAdress,
  USDTTestNetABI,
  X3DiamondAbi,
  X3DiamondAddress,
} from "./exports";
import { waitForTransactionReceipt } from "wagmi/actions";
export const getTxn = async (hash: any) => {
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
export const isUserExists = async (address: string) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "isUserExists",
    args: [address],
  });
  return result;
};

export const getIdToAddress = async (id: string) => {
  console.log("id too search",id);
  
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "idToAddress",
    args: [id],
  });
  return result;
};

export const USDTapprove = async (amount: string) => {
  const result = await writeContract(config, {
    abi: USDTTestNetABI,
    address: USDTContractAdress,
    functionName: "approve",
    args: [ContractAdress, amount],
  });
  return result;
};

export const register = async (address: string) => {
  const result = await writeContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "register",
    args: [address],
  });
  return result;
};
export const users = async (address:string) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "users",
    args: [address],
  });
  return result;
};

export const getSlotFilled = async (address :string, matrix:string, level:string) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "getSlotsFilled",
    args: [address, matrix, level],
  });
  return result;
};



export const activateLevel = async (matrix:string, level:string) => {
  const result = await writeContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "activateLevel",
    args: [matrix, level],
  });
  return result;
};
export const isLocked = async (add:string,matrix:string,level:string) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "isLocked",
    args: [add,matrix,level],
  });
  return result;
};







// X3 functions

export const X3activateLevel = async (level: string) => {
  const result = await writeContract(config, {
    abi: X3DiamondAbi,
    address: X3DiamondAddress,
    functionName: "upgradeX3Level",
    args: [level],
  });
  return result;
};

export const X3getSlotsFilled = async (add:string,level:string,matrix:string) => {
  const result = await readContract(config, {
    abi: X3DiamondAbi,
    address: X3DiamondAddress,
    functionName: "getSlotsFilled",
    args: [add,matrix, level],
  });
  return result;
};

export const X3isLocked = async (add:string,level:string) => {
  const result = await readContract(config, {
    abi: X3DiamondAbi,
    address: X3DiamondAddress,
    functionName: "isLocked",
    args: [add,level],
  });
  return result;
};

export const X3register = async () => {
  const result = await writeContract(config, {
    abi: X3DiamondAbi,
    address: X3DiamondAddress,
    functionName: "register",
  });
  return result;
};
export const X3USDTapprove = async (amount:number) => {
  let val = amount * 1000000000000000000; // USDT has 18 decimals
  const result = await writeContract(config, {
    abi: USDTTestNetABI,
    address: USDTContractAdress,
    functionName: "approve",
    args: [X3DiamondAddress, val],
  });
  return result;
};


export const X3Users = async (address:string) => {
  const result = await readContract(config, {
    abi: X3DiamondAbi,
    address: X3DiamondAddress,
    functionName: "users",
    args: [address],
  });
  console.log("X3 ", address, " : ", result);

  return result;
};

