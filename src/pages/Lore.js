import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Slide, Fade } = require("react-awesome-reveal");

function Lore() {
  return (
   <> 
   
   <Navigation />
    <section id="Lore " className="info_sec ">
      <div className="lore-container">
          <Slide direction='up' duration={7000}>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
              <h1 className="h1_heading set_font"> Mortals </h1>
            </div>
          </div>
          </Slide>
          <Fade duration={15000}>
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
          </Fade>
          <Slide direction='down' duration={7000}>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 lore-item">
                <img src="assets/images/banner/5barb_banner.png" alt="loreimg"></img>
            </div>
          </div>
          </Slide>
      </div>
    </section>
    
  <section className="footer">
  <Footer />
  </section>
	</>
  );
}

export default Lore;
