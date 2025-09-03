import React from "react";
import HomeSection from "../components/HomeSection.jsx";
import FeaturedSection from "../components/FeaturedSection.jsx";
import MenuSection from "../components/MenuSection.jsx";
import AboutSection from "../components/AboutSection.jsx";

function HomePage() {
    return(
        <div id="scroll-container" className="container-main" data-bs-spy="scroll" data-bs-target="#navbar-example" data-bs-offset="100" tabIndex="0">
            <HomeSection />
            <FeaturedSection />
            <MenuSection />
            <AboutSection />
        </div>
    );
}

export default HomePage;