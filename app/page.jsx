import Carousel from "@/components/carousel";
import CityAbout from "@/components/cityAbout";
import CitySearch from "@/components/citySearch";
import JoinSteps from "@/components/cityStep";
import OnlinePayment from "@/components/onlinePayment";
import PromoBanner from "@/components/promoBanner";
import SpecialOffers from "@/components/specialOffers";
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
      <SpecialOffers/>
      <OnlinePayment/>
    </div>
  );
}
