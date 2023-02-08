import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Slide } = require("react-awesome-reveal");

function Roadmap() {
    
  return (
   <> 
   <Navigation />
   <section id="Roadmap " className="info_sec ">
      <div class="container roadmap-container">
      <Slide>
         <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-12 text-center p-0">
               <h1 className="h1_heading set_font"> Roadmap </h1>
                  <div class="roadmap-item">
                     <img src="assets/images/roadmap.png" alt="roadmap"></img>
                  </div>    
               </div>
         </div>
      </Slide>
      </div>
   </section>
   <Footer />
	</>
  );
}

export default Roadmap;
