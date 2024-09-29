import React from "react";
import IntroSection from "../../components/IntroSection/IntroSection";
import GrayListingSection from "../../components/GrayListingSection/GrayListingSection";
import ExploreVehicles from "../../components/ExploreVehicles/ExploreVehicles";
import Catalog from "../../components/Catalog/Catalog";
import GetStarted from "../../components/GetStarted/GetStarted";
import Reviews from "../../components/Reviews/reviews";
import Services from "../../components/Services/services";

const Home = () => {
    return (
        <div>
            <IntroSection/>
            <GrayListingSection/>
            <Catalog/>
            <ExploreVehicles/>
            <GetStarted/>
            <Services />
            <Reviews />
        </div>
    );
};

export default Home;