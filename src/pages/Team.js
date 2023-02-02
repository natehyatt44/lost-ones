import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Slide } = require("react-awesome-reveal");

function Team() {
    
  return (
   <> 
   <Navigation />
      <div class="container team-container">
        <Slide Left>
          <div class="row">
              <div class="col-xl-12 col-sm-12">
                <div class="row">
                            <div class="col-sm-12 col-xl-6">
                                <div class="team-item">
                                    <title>Jman</title>
                                    <p>CEO / Project Coordinator</p>
                                    <img src="assets\images\team\jman1.png" alt="teamimg"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-6">
                                <div class="team-item">
                                    <title>Head Poncho</title>
                                    <p>Community Manager / Story & Lore Writer</p>
                                    <img src="assets\images\team\poncho1.png" alt="teamimg"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-6">
                                <div class="team-item">
                                    <title>Alixon</title>
                                    <p>Artist</p>
                                    <img src="assets\images\team\alixon1.png" alt="teamimg"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-6">
                                <div class="team-item">
                                    <title>nbreezay</title>
                                    <p>Lead Developer</p>
                                    <img src="assets\images\team\nbreezay1.png" alt="teamimg"></img>
                                </div>
                            </div>
                  
                </div>
              </div>
          </div>
          </Slide>
      </div>
      <Footer />
	</>
  );
}

export default Team;
