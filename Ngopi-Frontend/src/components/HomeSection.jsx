import React from "react";
import imgHome from '../images/coffee.png';
import { useAuth } from "../contexts/AuthContext.jsx";

function HomeSection() {
    const {user, isAuthenticated} = useAuth();

    const getDisplayName = () => {
        if (!user || !user.name) {
            return '';
        }
        const firstName = user.name.split(' ')[0];
        return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    };
    const displayName = getDisplayName();

    return (
        <section id="home-sect" className="py-1">
                <div className="row home-section">
                    
                    {/* <!-- Welcoming User --> */}
                    <div className="col-12 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
                        {isAuthenticated ? (
                            <>
                                <h2 className="text-center mt-5">Hi, {displayName} Let's Ngopi</h2>
                                <p className="text-center"> Welcome to Ngopi.</p>
                            </>
                        ): (
                            <>
                                <h2 className="text-center mt-5">Welcome to Ngopi.</h2>
                                <p className="text-center">Your favorite coffee and toast shop</p>
                            </>
                        )}
                    </div>
    
                    {/* <!-- IMAGE-HOME and DESCRIPTION-PROFILE --> */}
                    <div className="col-12 d-flex flex-md-row flex-column align-items-center justify-content-center mt-5 gap-5">
                        {/* <!-- IMAGE-HOME --> */}
                        <div className="col-4 image-home">
                                <img src={imgHome} className="img-fluid" alt="Coffee" />
                        </div>
    
                        {/* <!-- DESCRIPTION-PROFILE -->     */}
                        <div className="col-md-4 col-10 d-flex align-items-center justify-content-center text-md-start text-center mt-4 mt-md-0" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
                            <div className="description-home">
                                <h2 className="card-title text-md-start text-center mb-3">Coffee at Ngopi.</h2>
                                <p className="card-text">Ngopi invites you to experience the authentic taste of Central Java with our wide range of local coffee blends. Grown in the fertile volcanic soil of our homeland, each blend captures the distinct terroir of the region, offering a unique sensory journey. From the robust kick of our Robusta to the nuanced sweetness of our Arabica, we meticulously select and expertly roast the finest beans to unlock their full aromatic potential. Discover coffee that is rich in flavor, steeped in tradition, and brimming with the spirit of Purwokerto.</p>
                            </div>
                        </div>
                    </div>     
                </div>
        </section>
    );
}

export default HomeSection;