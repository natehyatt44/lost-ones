import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Team() {
    
  return (
   <> 
   <Navigation />
      <div class="container team-container">
          <div class="row">
              <div class="col-xl-12 col-sm-12">
                <div class="row">
                            <div class="col-sm-12 col-xl-6">
                                <div class="team-item">
                                    <title>Jman</title>
                                    <p>CEO / Project Coordinator</p>
                                    <img src="assets\images\team\jman.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-6">
                                <div class="team-item">
                                    <title>Head Poncho</title>
                                    <p>Community Manager / Story & Lore Writer</p>
                                    <img src="assets\images\team\poncho.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-6">
                                <div class="team-item">
                                    <title>Alixon</title>
                                    <p>Artist</p>
                                    <img src="assets\images\team\alixon.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-6">
                                <div class="team-item">
                                    <title>nbreezay</title>
                                    <p>Lead Developer</p>
                                    <img src="assets\images\team\nbreezay.png"></img>
                                </div>
                            </div>
                  
                </div>
              </div>
          </div>
      </div>
      <Footer />
	</>
  );
}

export default Team;
