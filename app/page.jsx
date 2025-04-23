import Carousel from "@/components/carousel";
import CitySearch from "@/components/citySearch";
import TarifTabs from "@/components/traifSection";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <CitySearch />
      <TarifTabs />
    </div>
  );
}
