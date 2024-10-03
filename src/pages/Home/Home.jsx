import React from "react";
import IntroSection from "../../components/IntroSection/IntroSection";
import GrayListingSection from "../../components/GrayListingSection/GrayListingSection";
import ExploreVehicles from "../../components/ExploreVehicles/ExploreVehicles";
import Catalog from "../../components/Catalog/Catalog";
import GetStarted from "../../components/GetStarted/GetStarted";
import Reviews from "../../components/Reviews/Reviews"
import Services from "../../components/Services/Services";

const Home = () => {
    return (
        <div>
            <IntroSection/>
            <GrayListingSection/>
            <Catalog/>
            <ExploreVehicles/>
            <Services />
            <Reviews />
            <GetStarted/>
        </div>
    );
};

export default Home;