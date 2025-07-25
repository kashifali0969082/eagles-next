import Image from "next/image";
import { Hero } from "./components/Hero";
import { Activity } from "./components/Activity";
export default function Home() {
  return (
    <>
      <Hero />
      <Activity />
    </>
  );
}
