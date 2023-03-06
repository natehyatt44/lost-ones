import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Slide } = require("react-awesome-reveal");

function Home() {
    
  return (
   <> 
   
   <Navigation />
   <Slide>
   <div className="row">
      <div className="col-0 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 banner-desktop-item">
         <img src="assets/images/banner/home_banner7.png" alt="bannerimg"></img>
      </div>
      <div className="col-12 col-sm-12  banner-mobile-item">
         <img src="assets/images/banner/home_banner_mobile.png" alt="bannerimg"></img>
      </div>
 
    </div>
    <section id="Lore " className="info_sec ">
      <div className="container fluid-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
                <br/>
                <h1 className="h1_heading set_font"> Lore </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
                <h1 className="h1_head_sml set_font"> Mortals </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
                <br/>
                <p className="para_p">
                  Destroyed by their own hand, the Mortal's home planet of Earth died many eons ago. Unable to work together and live in peaceful harmony with the planet they once called home, the sustainability of life on earth slowly faded away. Some even surmise that an uncontrollable form of AI may have contributed to the gradual progression of the tragedy, but the specifics of these events are uncertain now. 
                  The sands of time have slowly eroded away much of this ancient history. 
                  <br/><br/>
                  What IS known is that much interplanetary colonization occurred before this all came to pass, 
                  which allowed for the technologies of the race to continue to grow and expand in a more purposeful and meaningful direction.
                  Seeming to have learned from the mistakes of their past, friendship and family are the sole cornerstone for this race, with much emphasis being placed on community and 
                  peaceful coexistence. In line with this new mindset is also a healthy dose of ultraviolent protectionism of what they now hold most dear... each other. 
                  <br/><br/>
                  Finally, intergalactic travel was accomplished, and over time, many members of this race have elected to migrate throughout the universe.
                </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
                <img src="assets/images/banner/5barb_banner.png" alt="loreimg"></img>
            </div>
          </div>
      </div>
    </section>
    <section id="Prologue " className="traitbackground_sec ">
      <div className="container fluid-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 prologue-item">
                <br/><br/><br/><br/><br/>
                <h1 className="h1_heading set_font"> Prologue - The Search for Absolute Truth </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 prologue-item">
                <br/><br/>
                <p className="para_p">
                  Reality is an Illusion. Everything changes; All flows. Nothing stays the same... Nothing Lasts! We have yet to discover the true nature of reality, but we are ever persistent in our attempt to learn the true purpose of the universe and everything in it. What are we here to do? Why does anything exist at all, rather than not exist? 
                  <br/><br/>
                  Our collective human experiences are filtered through the five senses; Touch, Taste, Sight, Sound & Smell. The philosopher Aristotle theorized that these five vectors into experiencing the external world were the means by which the soul cultivates its insight and judgmentjudgement on life. Our understanding of reality is not just limited by the five primary senses; The mind plays a crucial role in interpreting and understanding the information received through these limited channels. To understand reality beyond what can be perceived by these senses, one must use their mind, as the true reality cannot be fully perceived through physical senses alone - If we are to grasp the foundation of existence itself, we must go beyond the body and into the mind. Only by realizing the imagination can we come to know our true purpose.  
                  <br/><br/>
                  The vastness of time is infinite, but our lifespans are limited. Only a select few, brave explorers will be able to uncover the secrets of reality in their lifetime. In time you may find that your perceptions are there to hide true reality because the truth is too complicated. Do you consider yourself brave enough to go it alone, becoming lost in the chaos of discovery? Cast aside your understanding of reality, and your culturally defined notions as to what is or isn't real -- embrace your experience of life within the present moment, and follow your intuition. Be careful; be sincere; be true to yourself, and you just might survive the mind-bending trials & tribulations that soon lie before you. Those who survive will be rewarded with a treasure beyond what their imagination can conceive of, or believe to be real. This is a test for those willing to uncover the actual nature that lies beneath & beyond the universe itself.
                </p>
                <br/><br/><br/><br/>
            </div>
          </div>
      </div>
    </section>
    <section id="Team " className="info_sec ">
      <div className="container team-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 team-header">
                <br/><br/><br/>
                <h1 className="h1_heading set_font"> The Founders </h1>
                <br/><br/>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                      <img src="assets/images/team/jman1.png" alt="teamimg"></img>
                      <title>Jman</title>
                      <p>CEO / Project Coordinator</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                      <img src="assets/images/team/poncho1.png" alt="teamimg"></img>
                      <title>Head Poncho</title>
                      <p>Community Manager / Story & Lore Writer</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                      <img src="assets/images/team/alixon1.png" alt="teamimg"></img>
                      <title>Alixon</title>
                      <p>Artist & Creative Director</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                      <img src="assets/images/team/nbreezay1.png" alt="teamimg"></img>
                      <title>nbreezay</title>
                      <p>Lead Developer</p>
                  </div>
                </div>
                <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 team-header">
                  <br/><br/>
                  <h1 className="h1_heading set_font"> The Mods </h1>
                  <br/><br/>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                        <img src="assets/images/team/sasan.png" alt="teamimg"></img>
                        <title>Sasan</title>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                        <img src="assets/images/team/blueboy.png" alt="teamimg"></img>
                        <title>Blueboy</title>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                        <img src="assets/images/team/boss.png" alt="teamimg"></img>
                        <title>'BossinN</title>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 text-center p-0 team-item">
                        <img src="assets/images/team/supernal.png" alt="teamimg"></img>
                        <title>Supernal</title>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  </Slide>
  <Footer />
	</>
  );
}

export default Home;
