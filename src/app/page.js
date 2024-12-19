"use client";

import { Inter } from "next/font/google";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import SocialProof from "./components/SocialProof";
import Footer from "./components/Footer";
import PricingCards from "./components/PricingCard";
import LearnMore from "./components/LearnMore";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      // className={`min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white ${inter.className} overflow-x-hidden`}
      className={`min-h-screen  text-white ${inter.className} overflow-x-hidden`}
    >
      <HeroSection />
      <FeaturesSection />
      <LearnMore />
      <HowItWorks />
      <PricingCards />
      <SocialProof />
      <Footer />
    </main>
  );
}
