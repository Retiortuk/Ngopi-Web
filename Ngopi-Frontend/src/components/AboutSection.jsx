import React from "react";
import imgAboutIcon from '../images/ngopi-icon.png';

function AboutSection() {
    return(
        <section id="about-sect" className="py-1">

                <div className="row about-section mt-5 pt-4 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {/* <!-- TAGLINE  --> */}
                    <div className="col-12 about-headline text-center justify-content-center align-items-center mt-5 pt-5">
                        <h1>About Ngopi.</h1>
                        <p>Learn of our journey.</p>
                    </div>
    
                    {/* <!-- ABOUT CONTENT --> */}
                    <div className="col-12 about-container d-flex flex-md-row flex-column justify-content-center align-items-center mt-3">
                        {/* <!-- IMG --> */}
                        <div className="col-4">
                            <img src={imgAboutIcon}className="img-fluid" alt="Ngopi." />
                        </div>
    
                        {/* <!-- TEXT --> */}
                        <div className="col-md-4 col-10 d-flex align-items-center justify-content-center text-md-start text-center mt-4 mt-md-0">
                            <div className="about-text">
                                <h2 className="mb-3">Ngopi.</h2>
                                <p>Ngopi Caffee is more than just a coffee shop; it's a community hub, a place where the rich aroma of freshly brewed coffee blends with the warmth of good company and conversation. Rooted in the Indonesian tradition of "Ngopi" - a relaxed invitation to have coffee and connect - we aim to create a welcoming and vibrant space for everyone to enjoy their daily dose of delight.</p>
                                <p>Inspired by the lively "warungs" and "kedais" of Indonesia, where coffee breaks are an integral part of daily life and social interaction, Ngopi Caffee was established in 2026 in the heart of Purwokerto. Our founders, Gesa, envisioned a modern interpretation of this tradition, offering high-quality coffee and a comfortable ambiance that encourages connection and relaxation</p>
                            </div>
                        </div>
                    </div>
    
                    {/* <!-- MOTTO --> */}
                    <div className="col-12 about-motto text-center align-items-center justify-content-center mt-5">
                        <h2>"Let's Ngopi."</h2>
                        <p className="fst-italic">~ Est. 2026 ~</p>
                    </div>
                </div>
        </section>
    );
}

export default AboutSection;