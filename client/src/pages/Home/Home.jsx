import React from "react";
import HomeSection1 from "./components/HomeSection1";
import HomeSection2 from "./components/HomeSection2";
import HomeSection3 from "./components/HomeSection3";
import HeroSection from "./components/HeroSection";
import PlantRecommendationSection from "./components/PlantRecommendationSection";
import SEO from "../../components/SEO";

function Home() {
  return (
    <>
      <SEO
        title="A.R. Landscape - Transform Your Outdoors"
        description="Welcome to A.R. Landscapers, your one-stop solution for expert landscaping services, including plant selling, landscape design, drip irrigation systems, and more. Transform your outdoor spaces with us."
      />
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
