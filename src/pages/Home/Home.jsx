import React from "react";
import IntroSection from "../../components/IntroSection/IntroSection";
import GrayListingSection from "../../components/GrayListingSection/GrayListingSection";
import ExploreVehicles from "../../components/exploreVehicles/exploreVehicles";
import Reviews from "../../components/Reviews/reviews";
import Services from "../../components/Services/services";




const Home = () => {
  return (
    <div>
      <IntroSection />
      <GrayListingSection />
      <ExploreVehicles />
      <Reviews />
      <Services />
      
    </div>
    
  );
};

export default Home;