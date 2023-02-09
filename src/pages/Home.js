import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Slide } = require("react-awesome-reveal");

function Home() {
    
  return (
   <> 
   
   <Navigation />
   <Slide>
   <div class="container banner-container">
    <div class="row">
        <div className="col-0 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 banner-desktop-item">
          <img src="assets/css/barbinc_banner3.png" alt="bannerimg"></img>
        </div>
        <div className="col-12 col-sm-12  banner-mobile-item">
          <img src="assets/css/barbmobile_banner1.png" alt="bannerimg"></img>
        </div>
      </div>
    </div>
    <section id="Lore " className="info_sec ">
      <div class="container lore-container">
          <div class="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
                <h1 className="h1_heading set_font"> Lore </h1>
            </div>
          </div>
          <div class="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
                <img src="assets/css/banner_barbs.png" alt="loreimg"></img>
            </div>
            <div class="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-left p-0 lore-item">
                  <h1 className="h1_head_sml set_font"> Mortals </h1>
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
          </div>
      </div>
    </section>
    <section id="Prologue " className="info_sec ">
      <div class="container prologue-container">
          <div class="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
                <h1 className="h1_heading set_font"> Prologue - The Lost Ones </h1> <br/><br/>
                <div class="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-left p-0 lore-item">
                      <p className="para_p">
                        Warning: The world around you is not real. It’s not even close. Your senses are not a limited window into reality, they are an abstraction of each 
                        individual's objective fiction known as reality, which is separate from the true nature of existence. At all times and in all places, 
                        there are atoms, particles, and physical laws that remain not yet fully understood beneath the surface. To most of us, what is tangible to our senses 
                        is generally what is accepted as real. The experience is real, and your perceptions are real – as perceptions. However, 
                        there is also a hidden dimension beyond what can be perceived by the senses. Venture further if you dare Lost One, but beware, 
                        questioning the fabric of reality can lead one to madness or enlightenment. I must warn you, it may be hard to tell the difference. 
                        <br/><br/>
                        If you've made it this far then welcome, Lost One. The journey out of the ignorant abyss is difficult, but guidance awaits the courageous. 
                        Can you recall how long your soul has been wandering? Probably not, but you are lucky to find this path, as some have been wandering aimlessly for eons. 
                        The ancients claimed that evolution hasn't given living beings the innate ability to perceive reality's truth, as their senses are restricted. 
                        As a result, the inhabitants of this galaxy have evolved to focus on surviving in their environment, not to grasp reality’s true essence. 
                        <br/><br/>
                        Aristotle, the ancient philosopher, was the first to recognize these five senses: touch, hearing, sight, smell, and taste. 
                        He theorized that these five portals to the external world were the means by which each soul came to know the world. In his search for divine truth, 
                        he also theorized about certain elusive sensory perceptions– color, sound, and temperature.  
                        He also stressed the unreliable nature of these instincts – emphasizing the importance of the mind's role in deciphering this sensory information. 
                        Aristotle also noted that our thoughts and ideas exist beyond the realm of what can be perceived through our faculties. 
                        This is the path to a deeper understanding. The vastness of time is infinite, but our lifespans are limited. Use your time wisely, only a select few, 
                        brave explorers will be able to uncover the secrets of reality in their lifetime. Best of luck on your journey. 
                        In time you may find that your perceptions are there to hide true reality because the truth is too complicated.
                      </p>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </section>
    <section id="Team " className="info_sec ">
      <div class="container team-container">
          <div class="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 team-item">
                <h1 className="h1_heading set_font"> The Team </h1><br/><br/>
                <div class="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-center p-0 team-item">
                      <div class="team-item">
                        <title>Jman</title>
                        <p>CEO / Project Coordinator</p>
                        <img src="assets/images/team/jman1.png" alt="teamimg"></img>
                      </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-center p-0 team-item">
                      <div class="team-item">
                        <title>Head Poncho</title>
                        <p>Community Manager / Story & Lore Writer</p>
                        <img src="assets/images/team/poncho1.png" alt="teamimg"></img>
                      </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-center p-0 team-item">
                      <div class="team-item">
                        <title>Alixon</title>
                        <p>Artist</p>
                        <img src="assets/images/team/alixon1.png" alt="teamimg"></img>
                      </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-center p-0 team-item">
                      <div class="team-item">
                        <title>nbreezay</title>
                        <p>Lead Developer</p>
                        <img src="assets/images/team/nbreezay1.png" alt="teamimg"></img>
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
