import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Slide } = require("react-awesome-reveal");

function Roadmap() {
    
  return (
   <> 
   <Navigation />
   <section id="Roadmap " className="info_sec ">
      <div className="container roadmap-container">
      <Slide>
         <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 roadmap-desktop-item">
              
                  <div className="roadmap-item">
                     <img src="assets/images/banner/Roadmap-desktop.png" alt="roadmap"></img>
                  </div>    
               </div>
               <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center p-0 roadmap-mobile-item">
                  <div className="roadmap-item">
                     <img src="assets/images/banner/Roadmap-mobile.png" alt="roadmap"></img>
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
