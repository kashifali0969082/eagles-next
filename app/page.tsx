import Image from "next/image";
import { Hero } from "./components/Hero";
import { Activity } from "./components/Activity";
import { StatsGrid } from "./components/StatsGrid";
import { TransactionHistory } from "./components/Transaction-Info";

export default function Home() {
  return (
    <>
      <Hero />
      <Activity />
      {/* <TransactionHistory /> */}
    </>
  );
}
