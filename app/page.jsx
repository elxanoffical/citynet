import Carousel from "@/components/carousel";
import CityAbout from "@/components/cityAbout";
import CitySearch from "@/components/citySearch";
import JoinSteps from "@/components/cityStep";
import PromoBanner from "@/components/promoBanner";
import TarifTabs from "@/components/traifSection";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <CitySearch />
      <TarifTabs />
      <PromoBanner/>
      <CityAbout/>
      <JoinSteps/>
    </div>
  );
}
