import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import MailingListAdd from '../components/emailData';
import Footer from '../components/Footer';
const { Slide, Fade, JackInTheBox } = require("react-awesome-reveal");

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

    {/* <div className="video-container">
    <video width="50%" autoPlay muted onEnded={(e) => e.target.pause()} controls>
        <source src="assets/images/barbinkvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    </div> */}

    

    {!loading && (
    <>
    <Fade duration={5000}>
    <section id="About " className={`info_sec ${!loading && 'loaded'}`}>
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
    <section id="Lore" className={`info_sec ${!loading && 'loaded'}`}>
        <div className="lore-container">
            <div className="row">
                <div className="col-12 col-md-12 text-center p-0 lore-item">
                    <h1 className="h1_heading set_font"> Collection Lore </h1>
                    <br />
                </div>
                {/* Mortals */}
                <div className="col-12 col-md-4 text-center p-0 lore-item">
                  <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/mortals">
                      <p className="para_p">Mortals</p>
                  </a>
                  <Slide direction="left" duration={1000}>
                      <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/mortals">
                          <img src="assets/images/home/mortal.png" alt="teamimg" className="round-image"></img>
                      </a>
                  </Slide>
                  <br />
                </div>
                {/* Gaians */}
                <div className="col-12 col-md-4 text-center p-0 lore-item">
                  <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/gaians">
                      <p className="para_p">Gaians</p>
                  </a>
                  <Slide direction="right" duration={1000}>
                      <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/gaians">
                          <img src="assets/images/home/gaian.png" alt="teamimg" className="round-image"></img>
                      </a>
                  </Slide>
                  <br />
                </div>
                {/* Runekin */}
                <div className="col-12 col-md-4 text-center p-0 lore-item">
                  <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/runekin">
                      <p className="para_p">Runekin</p>
                  </a>
                  <Slide direction="left" duration={1000}>
                      <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/runekin">
                          <img src="assets/images/home/runekin.png" alt="teamimg" className="round-image"></img>
                      </a>
                  </Slide>
                  <br />
                </div>
                <div className="row">
                {/* Soulweavers */}
                <div className="col-12 col-md-4 text-center p-0 lore-item">
                  <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/soulweavers">
                      <p className="para_p">Soulweavers</p>
                  </a>
                  <Slide direction="right" duration={1000}>
                      <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/soulweavers">
                          <img src="assets/images/home/soulweaver.png" alt="teamimg" className="round-image"></img>
                      </a>
                  </Slide>
                  <br />
              </div>
                {/* Zephyr */}
                <div className="col-12 col-md-4 text-center p-0 lore-item">
                  <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/zephyr">
                      <p className="para_p">Zephyr</p>
                  </a>
                  <Slide direction="left" duration={1000}>
                      <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/zephyr">
                          <img src="assets/images/home/zephyr.png" alt="teamimg" className="round-image"></img>
                      </a>
                  </Slide>
                  <br />
                </div>
                {/* Archangels */}
                <div className="col-12 col-md-4 text-center p-0 lore-item">
                  <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/archangels">
                      <p className="para_p">Archangels</p>
                  </a>
                  <Slide direction="right" duration={1000}>
                      <a href="https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore/archangels">
                          <img src="assets/images/home/archangel.png" alt="teamimg" className="round-image"></img>
                      </a>
                  </Slide>
                  <br />
                </div>
            </div>
        </div>
        </div>
    </section>

     <section id="Team " className={`info_sec ${!loading && 'loaded'}`}>
      <div className="team-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 team-header">
                <h1 className="h1_heading set_font"> The Team </h1>
                <br/>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center p-0 team-item">
                      <a href="https://twitter.com/jmjustinmyers"><img src="assets/images/team/jman1.png" alt="teamimg"></img></a>
                      <title>Jman</title>
                      <p>CEO / Founder</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center p-0 team-item">
                      <a href="https://twitter.com/nbreezay_hbar"><img src="assets/images/team/nbreezay1.png" alt="teamimg"></img></a>
                      <title>nbreezay</title>
                      <p>Developer</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center p-0 team-item">
                        <a href="https://twitter.com/supernalartss"><img src="assets/images/team/supernal.png" alt="teamimg"></img></a>
                        <title>Supernal</title>
                        <p>Community Dev / Creative Writer</p>
                    </div> 
                </div>
            </div>
          </div>
      </div>
  <Fade duration={3000}>
  <div className={`mail-container ${!loading && 'loaded'}`}>
    <div className="row">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0">
        <MailingListAdd/>
      </div>
    </div>
    </div>
    <br/>
  </Fade> 
  </section> 
  <section className={`footer ${!loading && 'loaded'}`}>
  <Footer />
  </section>
  </>
   )}
	</>
  );
}

export default Home;
