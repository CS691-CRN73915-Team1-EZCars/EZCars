import React from "react";
import IntroSection from "../../components/IntroSection/IntroSection";
import GrayListingSection from "../../components/GrayListingSection/GrayListingSection";
import ExploreVehicles from "../../components/exploreVehicles/exploreVehicles";
import Catalog from "../../components/Catalog/catalog";



const Home = () => {
  return (
    <div>
      <IntroSection />
      <GrayListingSection />
      <Catalog />
      <ExploreVehicles />
      
    </div>
    
  );
};

export default Home;