import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Slide } = require("react-awesome-reveal");

function Roadmap() {
    
  return (
   <> 
   <Navigation />
      <div class="container roadmap-container">
      <Slide>
      <div class="row">
              <div class="col-xl-12 col-sm-12">
                <div class="row">
                            <div class="col-sm-12 col-xl-12">
                                <div class="roadmap-item">
        
                     <img src="assets\images\roadmap.png" alt="roadmap"></img>
                  </div>    
                  <div class="roadmap-item">
                                    <title>Head Poncho</title>
                                  
                                    <img src="assets\images\team\poncho1.png" alt="teamimg"></img>
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

export default Roadmap;
