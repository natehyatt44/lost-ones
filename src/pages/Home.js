import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import MailingListAdd from '../components/emailData';
import Footer from '../components/Footer';
const { Slide, Fade } = require("react-awesome-reveal");

function Home() {
  const [loading, setLoading] = useState(true);
  
  const handleImageLoad = () => {
    setLoading(false);
  }

  const companyText = `A Digital Collectibles Company dedicated to integrity, transparency, and trust as we build out an ecosystem of interconnected Digital Art Collectibles for Hedera and the greater ecosystem as a whole. 
                       \nA compelling storyline filled with intrigue and mystery, with the intent to drive community engagement through a "choose your own adventure" game entitled "The Lost Ones".
                       \nWelcome to the club.
                         `;

  return (
   <> 
   <Navigation />
   
   <div className="row">
      <div className={`col-0 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 banner-desktop-item ${!loading && 'loaded'}`}>
        <img onLoad={handleImageLoad} src="assets/images/banner/hbarb_banner_desktop.png" alt="bannerimg"></img>
      </div>
      <div className={`col-12 col-sm-12 banner-mobile-item ${!loading && 'loaded'}`}>
        <img onLoad={handleImageLoad} src="assets/images/banner/hbarb_banner_mobile.png" alt="bannerimg"></img>
      </div>
    </div>
    {!loading && (
    <>
    <Fade duration={10000}>
    <section id="About " className="info_sec ">
      <div className="about-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 about-item">
                <br/>
                <pre className="para_p">
                  {companyText}
                </pre>
            </div>
          </div> 
      </div>
    </section>
    </Fade>
     <section id="Team " className="info_sec ">
      <div className="team-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 team-header">
                <h1 className="h1_heading set_font"> The Team </h1>
                <br/>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                      <a href="https://twitter.com/jmjustinmyers"><img src="assets/images/team/jman1.png" alt="teamimg"></img></a>
                      <Slide direction="up" duration={2000}><title>Jman</title></Slide>
                      <Slide direction="down" duration={2000}><p>CEO / Founder</p></Slide>
                  </div>
       
                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                      <a href="https://twitter.com/alixonjviloria"><img src="assets/images/team/alixon1.png" alt="teamimg"></img></a>
                      <Slide direction="up" duration={2000}><title>Alixon</title></Slide>
                      <Slide direction="down" duration={2000}><p>Artist & Creative Director</p></Slide>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                      <a href="https://twitter.com/nbreezay_hbar"><img src="assets/images/team/nbreezay1.png" alt="teamimg"></img></a>
                      <Slide direction="up" duration={2000}><title>nbreezay</title></Slide>
                      <Slide direction="down" duration={2000}><p>Developer</p></Slide>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                        <a href="https://twitter.com/supernalartss"><img src="assets/images/team/supernal.png" alt="teamimg"></img></a>
                        <Slide direction="up" duration={2000}><title>Supernal</title></Slide>
                        <Slide direction="down" duration={2000}><p>Community Dev / Creative Writer</p></Slide>
                    </div> 
                </div>
            </div>
          </div>
      </div>
  <Slide direction="left" duration={1000}>
  <div className="mail-container">
    <div className="row">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0">
        <MailingListAdd/>
      </div>
    </div>
    </div>
    <br/>
  </Slide> 
  </section> 
  <section className="footer">
  <Footer />
  </section>
  </>
   )}
	</>
  );
}

export default Home;
