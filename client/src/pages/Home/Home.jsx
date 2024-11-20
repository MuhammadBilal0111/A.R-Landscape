import React from "react";
import HomeSection1 from "./components/HomeSection1";
import HomeSection2 from "./components/HomeSection2";
import HomeSection3 from "./components/HomeSection3";
import HeroSection from "./components/HeroSection";
import PlantRecommendationSection from "./components/PlantRecommendationSection";
function Home() {
  return (
    <>
      <div className="flex flex-col gap-8 lg:mt-0">
        <HeroSection />
        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
        <PlantRecommendationSection />
      </div>
    </>
  );
}

export default Home;
